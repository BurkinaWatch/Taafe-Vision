import { db } from "./db";
import { 
  users, projects, films, articles, partners, contacts
} from "@shared/schema";
import { 
  type User, type Project, type Film, type Article, type Partner, type Contact,
  type InsertUser, type InsertProject, type InsertFilm, type InsertArticle, type InsertPartner, type InsertContact
} from "@shared/routes";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Films
  getFilms(): Promise<Film[]>;
  getFilm(id: number): Promise<Film | undefined>;
  createFilm(film: InsertFilm): Promise<Film>;
  deleteFilm(id: number): Promise<void>;

  // Articles
  getArticles(): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  deleteArticle(id: number): Promise<void>;

  // Partners
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  deletePartner(id: number): Promise<void>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Films
  async getFilms(): Promise<Film[]> {
    return await db.select().from(films);
  }
  async getFilm(id: number): Promise<Film | undefined> {
    const [film] = await db.select().from(films).where(eq(films.id, id));
    return film;
  }
  async createFilm(insertFilm: InsertFilm): Promise<Film> {
    const [film] = await db.insert(films).values(insertFilm).returning();
    return film;
  }
  async deleteFilm(id: number): Promise<void> {
    await db.delete(films).where(eq(films.id, id));
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }
  async deleteArticle(id: number): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  // Partners
  async getPartners(): Promise<Partner[]> {
    return await db.select().from(partners);
  }
  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const [partner] = await db.insert(partners).values(insertPartner).returning();
    return partner;
  }
  async deletePartner(id: number): Promise<void> {
    await db.delete(partners).where(eq(partners.id, id));
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
}

export const storage = new DatabaseStorage();
