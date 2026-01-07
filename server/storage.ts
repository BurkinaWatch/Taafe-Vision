import { db } from "./db";
import { 
  users, projects, films, articles, partners, contacts, adminSettings, adminLogs,
  type User, type Project, type Film, type Article, type Partner, type Contact, type AdminSetting, type AdminLog,
  type InsertUser, type InsertProject, type InsertFilm, type InsertArticle, type InsertPartner, type InsertContact, type InsertAdminSetting, type InsertAdminLog
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Films
  getFilms(): Promise<Film[]>;
  getFilm(id: number): Promise<Film | undefined>;
  createFilm(film: InsertFilm): Promise<Film>;
  updateFilm(id: number, film: Partial<InsertFilm>): Promise<Film>;
  deleteFilm(id: number): Promise<void>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: number): Promise<void>;

  // Partners
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  deletePartner(id: number): Promise<void>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Admin Settings
  getAdminSettings(): Promise<AdminSetting[]>;
  updateAdminSetting(key: string, value: string): Promise<AdminSetting>;

  // Admin Logs
  getAdminLogs(): Promise<AdminLog[]>;
  createAdminLog(log: InsertAdminLog): Promise<AdminLog>;
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
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const [updated] = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return updated;
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
  async updateFilm(id: number, film: Partial<InsertFilm>): Promise<Film> {
    const [updated] = await db.update(films).set(film).where(eq(films.id, id)).returning();
    return updated;
  }
  async deleteFilm(id: number): Promise<void> {
    await db.delete(films).where(eq(films.id, id));
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }
  async getArticle(id: number): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }
  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db.insert(articles).values(insertArticle).returning();
    return article;
  }
  async updateArticle(id: number, article: Partial<InsertArticle>): Promise<Article> {
    const [updated] = await db.update(articles).set(article).where(eq(articles.id, id)).returning();
    return updated;
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
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  // Admin Settings
  async getAdminSettings(): Promise<AdminSetting[]> {
    return await db.select().from(adminSettings);
  }
  async updateAdminSetting(key: string, value: string): Promise<AdminSetting> {
    const [setting] = await db
      .insert(adminSettings)
      .values({ key, value })
      .onConflictDoUpdate({ target: adminSettings.key, set: { value, updatedAt: new Date() } })
      .returning();
    return setting;
  }

  // Admin Logs
  async getAdminLogs(): Promise<AdminLog[]> {
    return await db.select().from(adminLogs);
  }
  async createAdminLog(insertLog: InsertAdminLog): Promise<AdminLog> {
    const [log] = await db.insert(adminLogs).values(insertLog).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();
