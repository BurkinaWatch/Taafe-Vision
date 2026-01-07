import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
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

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'taafe_vision_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: app.get('env') === 'production' },
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
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const contact = await storage.createContact(req.body);
      res.status(201).json(contact);
    } catch (e) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  await seed();

  return httpServer;
}

async function seed() {
  const admin = await storage.getUserByUsername("admin");
  if (!admin) {
    console.log("Seeding admin user...");
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      isAdmin: true
    });
  }

  const projects = await storage.getProjects();
  if (projects.length === 0) {
    console.log("Seeding projects...");
    await storage.createProject({
      title: "Elles se réalisent",
      description: "Formation de femmes réalisatrices aboutissant à la production de courts-métrages porteurs de messages sociaux et de sensibilisation aux droits des femmes.",
      imageUrl: "/images/community-engagement-1.jpg",
      date: "2023-2024"
    });
    await storage.createProject({
      title: "De l'idée au court métrage",
      description: "Incubation complète de projets filmiques féminins : écriture, production et diffusion de films sans stéréotypes abordant les violences basées sur le genre.",
      imageUrl: "/images/community-screening.jpg",
      date: "2024"
    });
    await storage.createProject({
      title: "Projections communautaires",
      description: "Projections suivies de débats dans les villages, quartiers et écoles pour sensibiliser aux droits des femmes et engager les communautés.",
      imageUrl: "/images/partners-1.jpg",
      date: "2024"
    });
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
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
        videoUrl: "#"
      },
      {
        title: "AFFRANCHIE",
        director: "Naima Maguilatou TRAORE",
        synopsis: "Après son mariage, Dia, âgée de 23 ans et déléguée des étudiants.tes de son Université est encore sous contraceptif, situation qui déplait à Maman, sa belle-mère. Elle ambitionne bâtir une carrière avant d’envisager d’avoir des enfants. La matriarche, offusquée par le choix de Dia exige d’elle une grossesse avant les 15 jours de confinement traditionnel de la nouvelle mariée. Dia restera-t-elle sur sa position ou cédera-t-elle à la pression de sa belle-mère ?",
        year: 2024,
        imageUrl: "@assets/WhatsApp_Image_2026-01-06_at_14.41.00_(2)_1767738441353.jpeg",
        videoUrl: "#"
      },
      {
        title: "TERMINUS",
        director: "Salimata OUEDRAOGO",
        synopsis: "Aicha, une adolescente vit dans une zone à haut défi sécuritaire. Pour s’assurer une bonne couverture sociale, son père lui impose un mariage auquel elle s’oppose farouchement. Elle migre en ville où elle trouve un emploi d’aide-ménagère. Cependant son calvaire est sans fin car le mari de sa patronne la harcèle et tente de la violer. Va-t-elle céder ou être contrainte de fuir à nouveau ?",
        year: 2024,
        imageUrl: "@assets/WhatsApp_Image_2026-01-06_at_14.41.00_(1)_1767738441353.jpeg",
        videoUrl: "#"
      },
      {
        title: "LE POIDS DU DESHONNEUR",
        director: "Maimouna LENGLENGUE",
        synopsis: "Nafi, une jeune mère constamment battue par son mari, décide de quitte le foyer. Elle est renvoyée par sa famille auprès de qui she cherche refuge et fait face à l’inaction des services sociaux. Elle trouve bientôt un emploi et réorganise sa vie. Cependant, menacée de bannissement, Nafi retourne auprès de son bourreau. Ce dernier récidivise. Cette fois, leur voisine, longtemps témoin silencieuse de ces violences décide d’agir. Parviendra-t-elle à sauver Nafi ?",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
        videoUrl: "#"
      },
      {
        title: "KANU",
        director: "Djata OUATTARA",
        synopsis: "Désœuvré et obsédé par l’idée d’offrir une meilleure vie à sa mère rongée par un passé douloureux et secret, Sié, un jeune homme intègre les rangs terroristes. Sous la direction de Bella, son mentor, il s’apprête à perpétrer son premier attentat. Mais avant, il fait la connaissance de Yé, une jeune citadine rescapée d’une attaque terroriste et qui a décidé de s’engager pour la paix. Kanu, le film montre la puissance de l’amour maternel et l’importance de l’engagement citoyen des femmes pour la préservation de la paix.",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
        videoUrl: "#"
      },
      {
        title: "AU PIED DU MUR",
        director: "Délia E. Y. IDO",
        synopsis: "Marietou est une jeune fille de 17 ans, qui vient d’obtenir une bourse d’étude étrangère. Mais ses rêves tombent à l’eau car son père a décidé de la donner en mariage à son riche ami. Marietou se retrouve face à un dilemme : obéir à son père ou poursuivre ses rêves. Elle décide de s’enfuir. Parviendra-t-elle à échapper à ce destin tracé pour elle ?",
        year: 2024,
        imageUrl: "@assets/FB_IMG_1767709939584_1767738441352.jpg",
        videoUrl: "#"
      },
      {
        title: "INCOMPRISE",
        director: "Cathérine GOLO",
        synopsis: "Fatim, une jeune fille victime de viol et enceinte est contrainte d’épouser son bourreau en guise de réparation du déshonneur faite à sa famille. Dans son foyer, elle subit beaucoup de violences psychologique et physique. Avec le soutien de sa cousine, Fatim décide de se prendre en main.",
        year: 2024,
        imageUrl: "@assets/WhatsApp_Image_2026-01-06_at_16.19.53_1767738441353.jpeg",
        videoUrl: "#"
      },
      {
        title: "MANIPULATIONS",
        director: "Assita SOMA",
        synopsis: "Kadi, jeune femme d’une trentaine d’années, titulaire d’un master II en Droit, vit avec son mari Abdoul et ses deux enfants. L’homme de sa vie se montre attentionné et très amoureux de son épouse si bien qu’il la convainc de limiter ses sorties et se propose de lui faire toutes ses courses. Kady est tellement reconnaissante de cet amour et de cette bienveillance qu’elle implique son mari dans tout ce qu’elle fait. Mais derrière cet amour se cache une manipulation pernicieuse. Kadi saura-t-elle se libérer ?",
        year: 2024,
        imageUrl: "@assets/WhatsApp_Image_2026-01-06_at_14.41.00_1767738441353.jpeg",
        videoUrl: "#"
      },
      {
        title: "AU-DELA DE L’AMOUR",
        director: "Ekua Zinogo BANCE",
        synopsis: "Fatigué et révolté de l’humiliation que son père lui inflige au quotidien du fait de sa condition de sans emploi, Madi se saisit de la première opportunité de travail qui lui tombe sous la main sans réfléchir. Au fil du temps, sa mère, qui ne reconnait plus son fils, exprime ses inquiétudes à son mari qui fait la sourde oreille. Quand la mère de Madi découvre enfin ce qu’il fait réellement, elle décide d’agir pour sauver son fils.",
        year: 2024,
        imageUrl: "@assets/png_20220502_125658_0000_1767738441352.png",
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
        synopsis: "Les familles Cissé et Bazongo, ont toujours entretenu de bonnes relations de voisinage jusqu’au jour où Ladji Cissé, désormais respectueux des préceptes d’un nouveau guide spirituel, s’oppose farouchement à la grande amitié qui existe entre sa fille Habiba Cissé et Esther, la fille des Bazongo. Ladji Cissé, en plus d’interdire l’accès à sa cour à la famille Bazongo, les harcèle quotidiennement. Une histoire de tolérance religieuse et d'amitié par-delà les barrières.",
        year: 2024,
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
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
}
