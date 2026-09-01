import type { Express } from "express";
import { storage } from "../storage";
import { api } from "./api";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import MemoryStore from "memorystore";

const scryptAsync = promisify(scrypt);
const SessionStore = MemoryStore(session);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePassword(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedPasswordBuf = Buffer.from(hashed, "hex");
  const suppliedPasswordBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

export async function registerRoutes(app: Express): Promise<void> {
  const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
  if (!process.env.SESSION_SECRET) {
    console.warn("WARNING: SESSION_SECRET not set. Using a random secret (sessions won't persist across restarts).");
  }

  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' && !!process.env.SESSION_SECRET,
      sameSite: 'lax' as const,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new SessionStore({ checkPeriod: 86400000 })
  }));

  // Auth Middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if ((req.session as any).userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  // Auth Routes
  app.post(api.auth.login.path, async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    (req.session as any).userId = user.id;
    res.json(user);
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    if (!(req.session as any).userId) return res.status(401).send(null);
    const user = await storage.getUser((req.session as any).userId);
    res.json(user);
  });

  // Projects
  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });
  app.post(api.projects.create.path, requireAuth, async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.patch("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const project = await storage.updateProject(parseInt(req.params.id), req.body);
      res.json(project);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.delete(api.projects.delete.path, requireAuth, async (req, res) => {
    await storage.deleteProject(parseInt(req.params.id));
    res.sendStatus(204);
  });

  // Films
  app.get(api.films.list.path, async (_req, res) => {
    const films = await storage.getFilms();
    res.json(films);
  });
  app.get(api.films.get.path, async (req, res) => {
    const film = await storage.getFilm(parseInt(req.params.id));
    if (!film) return res.status(404).json({ message: "Film not found" });
    res.json(film);
  });
  app.post(api.films.create.path, requireAuth, async (req, res) => {
    try {
      const film = await storage.createFilm(req.body);
      res.status(201).json(film);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.patch("/api/films/:id", requireAuth, async (req, res) => {
    try {
      const film = await storage.updateFilm(parseInt(req.params.id), req.body);
      res.json(film);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.delete(api.films.delete.path, requireAuth, async (req, res) => {
    await storage.deleteFilm(parseInt(req.params.id));
    res.sendStatus(204);
  });

  // Articles
  app.get(api.articles.list.path, async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });
  app.post(api.articles.create.path, requireAuth, async (req, res) => {
    try {
      const article = await storage.createArticle(req.body);
      res.status(201).json(article);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.patch("/api/articles/:id", requireAuth, async (req, res) => {
    try {
      const article = await storage.updateArticle(parseInt(req.params.id), req.body);
      res.json(article);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.delete(api.articles.delete.path, requireAuth, async (req, res) => {
    await storage.deleteArticle(parseInt(req.params.id));
    res.sendStatus(204);
  });

  // Partners
  app.get(api.partners.list.path, async (_req, res) => {
    const partners = await storage.getPartners();
    res.json(partners);
  });
  app.post(api.partners.create.path, requireAuth, async (req, res) => {
    try {
      const partner = await storage.createPartner(req.body);
      res.status(201).json(partner);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });
  app.delete(api.partners.delete.path, requireAuth, async (req, res) => {
    await storage.deletePartner(parseInt(req.params.id));
    res.sendStatus(204);
  });

  // Contact
  app.get(api.contact.submit.path, requireAuth, async (_req, res) => {
    const contacts = await storage.getContacts();
    res.json(contacts);
  });
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const contact = await storage.createContact(req.body);
      res.status(201).json(contact);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // Public organization knowledge
  app.get(api.knowledge.profile.path, async (_req, res) => {
    const profile = await storage.getOrganizationProfile();
    if (!profile) return res.status(404).json({ message: "Organization profile not found" });
    res.json(profile);
  });
  app.get(api.knowledge.metrics.path, async (_req, res) => {
    res.json(await storage.getImpactMetrics());
  });
  app.get(api.knowledge.sources.path, async (_req, res) => {
    res.json(await storage.getResearchSources());
  });
  app.get(api.knowledge.socials.path, async (_req, res) => {
    res.json(await storage.getSocialLinks());
  });

  await seed();

}

async function seed() {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD must be configured.");
  }

  const configuredAdmin = await storage.getUserByUsername(adminUsername);
  const legacyAdmin = configuredAdmin ? undefined : await storage.getUserByUsername("admin");
  const admin = configuredAdmin ?? legacyAdmin;
  const hashedPassword = await hashPassword(adminPassword);

  if (admin) {
    await storage.updateUserCredentials(admin.id, adminUsername, hashedPassword);
  } else {
    console.log("Seeding admin user...");
    await storage.createUser({
      username: adminUsername,
      password: hashedPassword,
      isAdmin: true
    });
  }

  const existingProjects = await storage.getProjects();
  const existingTitles = new Set(existingProjects.map(p => p.title));

  const allProjects = [
    {
      title: "Elles se réalisent",
      description: "Programme phare d'incubation de femmes réalisatrices : sélection de dix femmes par promotion, ateliers d'écriture de scénario, renforcement des capacités techniques, résidence créative et accompagnement à la production de courts métrages engagés sur les droits des femmes. Six promotions formées depuis 2017.",
      imageUrl: "/images/community-engagement-1.jpg",
      date: "2017 — en cours"
    },
    {
      title: "De l'idée au court métrage",
      description: "Programme soutenu par Féministes en Action (Equipop) pour l'incubation complète de projets filmiques féminins : de l'écriture scénaristique à la production et à la diffusion de courts métrages exempts de stéréotypes de genre, abordant les violences basées sur le genre. Les projets sélectionnés font l'objet d'un accompagnement personnalisé jusqu'à la projection publique.",
      imageUrl: "/images/community-screening.jpg",
      date: "2022 — en cours"
    },
    {
      title: "Projections-débats communautaires",
      description: "Projections de films suivies de débats animés dans les quartiers, villages, communes et établissements scolaires de Ouagadougou et des provinces du Burkina Faso. Ces séances visent à sensibiliser les communautés aux droits des femmes, aux violences basées sur le genre et à l'égalité hommes-femmes, en s'appuyant sur le pouvoir d'empathie du cinéma.",
      imageUrl: "/images/partners-1.jpg",
      date: "2017 — en cours"
    },
    {
      title: "Le genre s'invite au FESPACO",
      description: "Présence de Taafé Vision au FESPACO — le plus grand festival de cinéma africain — avec un stand genre au Marché International du Cinéma (MIC), un panel dédié à la représentativité des femmes dans le cinéma africain, des pitchs de projets réalisés par des femmes et la mise en lumière de talents féminins burkinabè. En 2025, l'événement a réuni des professionnels du cinéma, des partenaires et des militantes autour du thème de l'égalité de genre dans le septième art.",
      imageUrl: "/images/film-poster-1.jpg",
      date: "Février 2025"
    },
    {
      title: "16 jours d'activisme — Cinéma contre les VBG",
      description: "Chaque année du 25 novembre au 10 décembre, Taafé Vision s'engage dans la campagne mondiale des 16 jours d'activisme contre les violences basées sur le genre en organisant des projections-débats dans les localités burkinabè. En décembre 2025, le film « À tout prix » — sur l'excision — a été projeté à Ziniaré et a touché des centaines de participant·es, suscitant des témoignages poignants de femmes concernées.",
      imageUrl: "/images/community-screening.jpg",
      date: "Annuel — novembre-décembre"
    },
    {
      title: "Plaidoyer et réseautage féministe",
      description: "Taafé Vision s'inscrit dans les réseaux féministes régionaux et internationaux (Feminaction, Equipop, Foundation for a Just Society) pour porter le plaidoyer en faveur des droits des femmes au-delà du cinéma. L'association participe à des conférences, forums et événements dédiés à l'égalité de genre, et produit des contenus de sensibilisation diffusés sur ses réseaux sociaux auprès de plusieurs milliers de personnes.",
      imageUrl: "/images/partners-2.jpg",
      date: "2017 — en cours"
    },
  ];

  const projectsToAdd = allProjects.filter(p => !existingTitles.has(p.title));
  if (projectsToAdd.length > 0) {
    console.log(`Seeding ${projectsToAdd.length} new project(s)...`);
    for (const project of projectsToAdd) {
      await storage.createProject(project);
    }
  }

  const films = await storage.getFilms();
  if (films.length === 0 || films.length <= 2) {
    console.log("Seeding films...");
    const filmsToSeed = [
      {
        title: "A TOUT PRIX",
        director: "Maimouna OUEDRAOGO",
        synopsis: "Kilayé et Mayô, couple jeune et complice, vivent paisiblement à Ouagadougou avec leur fille de huit ans, Barkima. Un matin, la quiétude du foyer est troublée par la visite inopinée de Yaba, la mère de Kilayé. Mayô surprend alors une discussion alarmante : il est question d’exciser Barkima. Résolue et elle-même survivante de cette pratique dangereuse, elle tente de s’opposer à cette décision. La tension monte, les convictions s’entrechoquent. Arrivera-t-elle à sauver sa fille du couteau de l’exciseuse ?",
        year: 2024,
        imageUrl: "/images/a-tout-prix.jpg",
        videoUrl: "#"
      },
      {
        title: "AFFRANCHIE",
        director: "Naima Maguilatou TRAORE",
        synopsis: "Après son mariage, Dia, âgée de 23 ans et déléguée des étudiants.tes de son Université est encore sous contraceptif, situation qui déplait à Maman, sa belle-mère. Elle ambitionne bâtir une carrière avant d’envisager d’avoir des enfants. La matriarche, offusquée par le choix de Dia exige d’elle une grossesse avant les 15 jours de confinement traditionnel de la nouvelle mariée. Dia restera-t-elle sur sa position ou cédera-t-elle à la pression de sa belle-mère ?",
        year: 2024,
        imageUrl: "/images/affranchie.jpg",
        videoUrl: "#"
      },
      {
        title: "TERMINUS",
        director: "Salimata OUEDRAOGO",
        synopsis: "Aicha, une adolescente vit dans une zone à haut défi sécuritaire. Pour s’assurer une bonne couverture sociale, son père lui impose un mariage auquel elle s’oppose farouchement. Elle migre en ville où elle trouve un emploi d’aide-ménagère. Cependant son calvaire est sans fin car le mari de sa patronne la harcèle et tente de la violer. Va-t-elle céder ou être contrainte de fuir à nouveau ?",
        year: 2024,
        imageUrl: "/images/terminus.jpg",
        videoUrl: "#"
      },
      {
        title: "LE POIDS DU DESHONNEUR",
        director: "Maimouna LENGLENGUE",
        synopsis: "Nafi, une jeune mère constamment battue par son mari, décide de quitte le foyer. Elle est renvoyée par sa famille auprès de qui she cherche refuge et fait face à l'inaction des services sociaux. Elle trouve bientôt un emploi et réorganise sa vie. Cependant, menacée de bannissement, Nafi retourne auprès de son bourreau. Ce dernier récidivise. Cette fois, leur voisine, longtemps témoin silencieuse de ces violences décide d'agir. Parviendra-t-elle à sauver Nafi ?",
        year: 2024,
        imageUrl: "/images/poids-du-deshonneur.jpg",
        videoUrl: "#"
      },
      {
        title: "KANU",
        director: "Djata OUATTARA",
        synopsis: "Désœuvré et obsédé par l'idée d'offrir une meilleure vie à sa mère rongée par un passé douloureux et secret, Sié, un jeune homme intègre les rangs terroristes. Sous la direction de Bella, son mentor, il s'apprête à perpétrer son premier attentat. Mais avant, il fait la connaissance de Yé, une jeune citadine rescapée d'une attaque terroriste et qui a décidé de s'engager pour la paix. Kanu, le film montre la puissance de l'amour maternel et l'importance de l'engagement citoyen des femmes pour la préservation de la paix.",
        year: 2024,
        imageUrl: "/images/kanu.jpg",
        videoUrl: "#"
      },
      {
        title: "AU PIED DU MUR",
        director: "Délia E. Y. IDO",
        synopsis: "Marietou est une jeune fille de 17 ans, qui vient d’obtenir une bourse d’étude étrangère. Mais ses rêves tombent à l’eau car son père a décidé de la donner en mariage à son riche ami. Marietou se retrouve face à un dilemme : obéir à son père ou poursuivre ses rêves. Elle décide de s’enfuir. Parviendra-t-elle à échapper à ce destin tracé pour elle ?",
        year: 2024,
        imageUrl: "/images/au-pied-du-mur.jpg",
        videoUrl: "#"
      },
      {
        title: "INCOMPRISE",
        director: "Cathérine GOLO",
        synopsis: "Fatim, une jeune fille victime de viol et enceinte est contrainte d’épouser son bourreau en guise de réparation du déshonneur faite à sa famille. Dans son foyer, elle subit beaucoup de violences psychologique et physique. Avec le soutien de sa cousine, Fatim décide de se prendre en main.",
        year: 2024,
        imageUrl: "/images/incomprise.jpg",
        videoUrl: "#"
      },
      {
        title: "MANIPULATIONS",
        director: "Assita SOMA",
        synopsis: "Kadi, jeune femme d’une trentaine d’années, titulaire d’un master II en Droit, vit avec son mari Abdoul et ses deux enfants. L’homme de sa vie se montre attentionné et très amoureux de son épouse si bien qu’il la convainc de limiter ses sorties et se propose de lui faire toutes ses courses. Kady est tellement reconnaissante de cet amour et de cette bienveillance qu’elle implique son mari dans tout ce qu’elle fait. Mais derrière cet amour se cache une manipulation pernicieuse. Kadi saura-t-elle se libérer ?",
        year: 2024,
        imageUrl: "/images/manipulations.jpg",
        videoUrl: "#"
      },
      {
        title: "AU-DELA DE L’AMOUR",
        director: "Ekua Zinogo BANCE",
        synopsis: "Fatigué et révolté de l’humiliation que son père lui inflige au quotidien du fait de sa condition de sans emploi, Madi se saisit de la première opportunité de travail qui lui tombe sous la main sans réfléchir. Au fil du temps, sa mère, qui ne reconnait plus son fils, exprime ses inquiétudes à son mari qui fait la sourde oreille. Quand la mère de Madi découvre enfin ce qu’il fait réellement, elle décide d’agir pour sauver son fils.",
        year: 2024,
        imageUrl: "/images/au-dela-de-lamour.jpg",
        videoUrl: "#"
      },
      {
        title: "LES VOISINS",
        director: "Edith Martine TRAORE",
        synopsis: "Maya, une jeune dame s’installe nouvellement dans un quartier de Ouagadougou avec son mari Marcus et leur fille Maelys. Ses voisins, chefs d’ateliers, ont la fâcheuse habitude de bruler les ordures, ce qui fragilise considérablement l’état de santé de sa fille qui souffre d’asthme. Inquiète après la première interpellation inféconde de Marcus, Maya tente de trouver une solution pacifique pour préserver la santé de sa fille et le vivre ensemble.",
        year: 2024,
        imageUrl: "/images/mes-voisins.jpg",
        videoUrl: "#"
      },
      {
        title: "LES INSEPARABLES",
        director: "Djeneba LY",
        synopsis: "Les familles Cissé et Bazongo, ont toujours entretenu de bonnes relations de voisinage jusqu'au jour où Ladji Cissé, désormais respectueux des préceptes d'un nouveau guide spirituel, s'oppose farouchement à la grande amitié qui existe entre sa fille Habiba Cissé et Esther, la fille des Bazongo. Ladji Cissé, en plus d'interdire l'accès à sa cour à la famille Bazongo, les harcèle quotidiennement. Une histoire de tolérance religieuse et d'amitié par-delà les barrières.",
        year: 2024,
        imageUrl: "/images/inseparables.jpg",
        videoUrl: "#"
      },
      {
        title: "JUGE T. BLANCHE",
        director: "LAGUEMPEDO Barkima Nafissatou",
        synopsis: "Juge T. Blanche, une femme trentenaire se rend coupable du meurtre du Général Juste TAMALEBO, son père. Tenue par un pacte de silence scellé entre sa défunte mère Aline et elle, Blanche est contrainte de garder secrètes les faits de viols incestueux dont elle a été victime durant son enfance. Un film poignant sur le silence, le traumatisme et la justice.",
        year: 2024,
        imageUrl: "/images/juge-blanche.jpg",
        videoUrl: "#"
      }
    ];

    for (const film of filmsToSeed) {
      await storage.createFilm(film);
    }
  }

  const partners = await storage.getPartners();
  if (partners.length === 0) {
    console.log("Seeding partners...");
    await storage.createPartner({
      name: "FESPACO",
      logoUrl: "/images/logo.jpg",
      website: "https://fespaco.org"
    });
    await storage.createPartner({
      name: "Union Européenne",
      logoUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80",
      website: "https://europa.eu"
    });
    await storage.createPartner({
      name: "FDCT / PAIC-GC",
      logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    });
    await storage.createPartner({
      name: "Equipop",
      logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    });
    await storage.createPartner({
      name: "Foundation for a Just Society (FJS)",
      logoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
    });
    await storage.createPartner({
      name: "Agence Burkinabe de la Cinematographie et de l'Audioviseul (ABCA)",
      logoUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80"
    });
  }

  const articles = await storage.getArticles();
  if (articles.length === 0) {
    console.log("Seeding articles...");
    await storage.createArticle({
      title: "Lancement du projet 'Elles se réalisent' 2024",
      content: "Nous sommes fières d'annoncer le lancement de notre programme phare pour l'année 2024. Ce programme sélectionnera 10 femmes réalisatrices pour une formation complète et une aide à la production de leurs courts-métrages.",
      category: "news",
      imageUrl: "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80"
    });
    await storage.createArticle({
      title: "Cinéma et droits des femmes au FESPACO 2024",
      content: "Taafé Vision sera présente au FESPACO 2024 avec un stand dédié à la promotion des femmes cinéastes. Rejoignez-nous pour des panels, des pitchs et des projections spéciales.",
      category: "event",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178f50002c4b?auto=format&fit=crop&q=80"
    });
    await storage.createArticle({
      title: "Projection-débat: 'Violences et Résilience'",
      content: "Nous organisons une série de projections-débats dans les communes de Ouagadougou pour sensibiliser aux violences basées sur le genre. Venez découvrir nos derniers courts-métrages et participer au débat.",
      category: "event",
      imageUrl: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
    });
    await storage.createArticle({
      title: "Nos films primés au festival d'Ouagadougou",
      content: "Trois de nos productions ont été sélectionnées et récompensées au festival du cinéma d'Ouagadougou. Bravo à toutes les réalisatrices qui ont contribué à ces succès!",
      category: "news",
      imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80"
    });
  }

  await seedOrganizationKnowledge();
}

async function seedOrganizationKnowledge() {
  const profile = await storage.getOrganizationProfile();
  if (!profile) {
    await storage.createOrganizationProfile({
      slug: "taafe-vision",
      name: "Taafé Vision",
      tagline: "Cinéma et droits des femmes au Burkina Faso",
      foundedYear: 2017,
      city: "Ouagadougou",
      country: "Burkina Faso",
      story: "Taafé Vision est née de la volonté de professionnelles et de passionné·es du cinéma de formaliser un engagement commun pour une meilleure représentativité des femmes dans l'industrie cinématographique. L'association agit par la production, la formation, la diffusion et le débat communautaire.",
      mission: "Produire et diffuser des films exempts de stéréotypes de genre, soutenir l'abandon des violences basées sur le genre et contribuer à la promotion des femmes dans un monde plus juste et égalitaire.",
      vision: "À l'horizon 2030, devenir une association leader de la lutte pour un monde plus égalitaire, juste et exempt de violences envers les femmes, au moyen du film.",
      meaning: "« Taafé » signifie pagne en bambara. Le pagne symbolisant la femme au Burkina Faso, Taafé Vision signifie littéralement « vision de femmes ».",
      website: "https://taafevision.org/",
      email: "info@taafevision.org",
    });
  }

  if ((await storage.getImpactMetrics()).length === 0) {
    const metrics = [
      {
        label: "Femmes formées", value: 33, suffix: "+",
        description: "Accompagnement technique et artistique de futures cinéastes.",
        sourceName: "Taafé Vision — site officiel", sourceUrl: "https://taafevision.org/", sourceDate: "2026", displayOrder: 1,
      },
      {
        label: "Productions", value: 10, suffix: "+",
        description: "Documentaires et fictions engagés pour le changement social et l'égalité.",
        sourceName: "Taafé Vision — site officiel", sourceUrl: "https://taafevision.org/", sourceDate: "2026", displayOrder: 2,
      },
      {
        label: "Personnes sensibilisées", value: 6000, suffix: "+",
        description: "Public touché par les projections et débats communautaires.",
        sourceName: "Taafé Vision — site officiel", sourceUrl: "https://taafevision.org/", sourceDate: "2026", displayOrder: 3,
      },
      {
        label: "Projets de films incubés", value: 10, suffix: "",
        description: "Projets présentés par la sixième promotion lors des pitchs de mai 2026.",
        sourceName: "Burkina24",
        sourceUrl: "https://burkina24.com/2026/05/30/cinema-au-feminin-avec-taafe-vision-10-projets-de-films-pour-briser-les-silences/",
        sourceDate: "30 mai 2026", displayOrder: 4,
      },
    ];
    for (const metric of metrics) await storage.createImpactMetric(metric);
  }

  if ((await storage.getResearchSources()).length === 0) {
    const sources = [
      {
        title: "Taafé Vision — présentation et productions",
        summary: "Le site officiel présente l'association, ses axes d'action, ses chiffres clés, ses productions et ses partenaires.",
        sourceName: "Taafé Vision", sourceUrl: "https://taafevision.org/", sourceType: "Site officiel", publishedAt: "2026", topic: "Présentation",
      },
      {
        title: "Taafé Vision — annuaire des organisations féministes",
        summary: "Fiche institutionnelle indiquant une création le 9 janvier 2017, une implantation à Ouagadougou et une intervention régionale et internationale.",
        sourceName: "Feminaction", sourceUrl: "https://feminaction.fr/osc/taafe-vision/", sourceType: "Fiche institutionnelle", publishedAt: "2026", topic: "Historique",
      },
      {
        title: "De l'idée au court métrage",
        summary: "Féministes en Action documente le programme de Taafé Vision consacré à l'accompagnement de femmes dans l'écriture, la production et la diffusion de courts métrages.",
        sourceName: "Equipop", sourceUrl: "https://equipop.org/de-lidee-au-court-metrage/", sourceType: "Partenaire", publishedAt: "4 mai 2023", topic: "Formation et production",
      },
      {
        title: "Elles se réalisent : donner la parole aux femmes",
        summary: "Burkina24 décrit une série d'ateliers de renforcement de capacités pour dix femmes autour de la réécriture de scénarios de courts métrages.",
        sourceName: "Burkina24", sourceUrl: "https://burkina24.com/2024/02/16/cinema-lassociation-taafe-vision-donne-la-parole-aux-femmes-a-travers-le-projet-elles-se-realisent/", sourceType: "Presse", publishedAt: "16 février 2024", topic: "Elles se réalisent",
      },
      {
        title: "Le genre s'invite au FESPACO 2025",
        summary: "Taafé Vision a organisé des activités autour de la représentation des femmes dans le cinéma africain : panels, échanges et mise en lumière de talents féminins.",
        sourceName: "Mousso News", sourceUrl: "https://www.moussonews.com/cinema-le-genre-sinvite-au-fespaco-avec-taafe-vision/", sourceType: "Presse", publishedAt: "2025", topic: "FESPACO",
      },
      {
        title: "Dix projets de films pour briser les silences",
        summary: "La sixième promotion a présenté dix projets de courts métrages de fiction après des formations techniques et une résidence d'écriture ; trois projets doivent être sélectionnés pour la production.",
        sourceName: "Burkina24", sourceUrl: "https://burkina24.com/2026/05/30/cinema-au-feminin-avec-taafe-vision-10-projets-de-films-pour-briser-les-silences/", sourceType: "Presse", publishedAt: "30 mai 2026", topic: "Incubation",
      },
      {
        title: "16 jours d'activisme : projection-débat autour de À tout prix",
        summary: "Un reportage documente l'utilisation d'une projection-débat du film À tout prix pour sensibiliser aux violences faites aux femmes.",
        sourceName: "Burkina24", sourceUrl: "https://burkina24.com/2025/12/10/16-jours-dactivisme-taafe-vision-utilise-le-cinema-pour-sensibiliser-aux-violences-faites-aux-femmes/", sourceType: "Presse", publishedAt: "10 décembre 2025", topic: "Sensibilisation",
      },
      {
        title: "Le genre s'invite au FESPACO — programme 2025",
        summary: "ArtistesBF revient sur la présence de Taafé Vision au FESPACO et sur son programme consacré à la représentativité des femmes dans le septième art.",
        sourceName: "ArtistesBF", sourceUrl: "https://www.artistesbf.org/fespaco-2025-le-genre-sinvite-un-projet-de-lassociation-taafe-vision/", sourceType: "Presse culturelle", publishedAt: "2025", topic: "FESPACO",
      },
    ];
    for (const source of sources) await storage.createResearchSource(source);
  }

  if ((await storage.getSocialLinks()).length === 0) {
    const socials = [
      { platform: "facebook", label: "Facebook", url: "https://facebook.com/taafevision", sourceUrl: "https://taafevision.org/", verificationNote: "Lien public référencé dans la navigation du projet.", displayOrder: 1, isVisible: true },
      { platform: "instagram", label: "Instagram", url: "https://instagram.com/taafevision", sourceUrl: "https://taafevision.org/", verificationNote: "Lien public référencé dans la navigation du projet.", displayOrder: 2, isVisible: true },
      { platform: "youtube", label: "YouTube", url: "https://youtube.com/@taafevision", sourceUrl: "https://taafevision.org/", verificationNote: "Lien public référencé dans la navigation du projet.", displayOrder: 3, isVisible: true },
      { platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@taafevision", sourceUrl: "https://taafevision.org/", verificationNote: "Lien public référencé dans la navigation du projet.", displayOrder: 4, isVisible: true },
    ];
    for (const social of socials) await storage.createSocialLink(social);
  }
}
