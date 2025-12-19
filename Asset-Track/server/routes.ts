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
      imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80",
      date: "2023-2024"
    });
    await storage.createProject({
      title: "De l'idée au court métrage",
      description: "Incubation complète de projets filmiques féminins : écriture, production et diffusion de films sans stéréotypes abordant les violences basées sur le genre.",
      imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      date: "2024"
    });
    await storage.createProject({
      title: "Projections communautaires",
      description: "Projections suivies de débats dans les villages, quartiers et écoles pour sensibiliser aux droits des femmes et engager les communautés.",
      imageUrl: "https://images.unsplash.com/photo-1595521624629-13d14a85e51d?auto=format&fit=crop&q=80",
      date: "2024"
    });
  }

  const films = await storage.getFilms();
  if (films.length === 0) {
    console.log("Seeding films...");
    await storage.createFilm({
      title: "La Voix des Femmes",
      director: "Collective Taafé Vision",
      synopsis: "Un documentaire poignant sur la résilience féminine et la place des femmes dans le cinéma burkinabè. Une méditation sur le pouvoir transformateur du cinéma.",
      year: 2023,
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
      videoUrl: "#"
    });
    await storage.createFilm({
      title: "Au-delà du silence",
      director: "Réalisatrices Taafé Vision",
      synopsis: "Court-métrage abordant les violences basées sur le genre et le chemin vers l'autonomisation. Une histoire de courage et de transformation.",
      year: 2023,
      imageUrl: "https://images.unsplash.com/photo-1595521622529-d54ddd4d12b5?auto=format&fit=crop&q=80",
      videoUrl: "#"
    });
  }

  const partners = await storage.getPartners();
  if (partners.length === 0) {
    console.log("Seeding partners...");
    await storage.createPartner({
      name: "FESPACO",
      logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80",
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
