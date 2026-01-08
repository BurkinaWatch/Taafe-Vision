import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users (Admin)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(true).notNull(),
});

// Projects (e.g., "Elles se réalisent")
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  date: text("date"), // e.g., "2023-2024"
  isHidden: boolean("is_hidden").default(false).notNull(),
});

// Films
export const films = pgTable("films", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  director: text("director").notNull(),
  synopsis: text("synopsis").notNull(),
  year: integer("year").notNull(),
  imageUrl: text("image_url").notNull(),
  videoUrl: text("video_url"),
  isHidden: boolean("is_hidden").default(false).notNull(),
});

// Articles (News & Events)
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // 'news', 'event', 'training'
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at").defaultNow(),
  isHidden: boolean("is_hidden").default(false).notNull(),
});

// Partners
export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  website: text("website"),
});

// Contacts (Messages from contact form)
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Admin Settings
export const adminSettings = pgTable("admin_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin Logs
export const adminLogs = pgTable("admin_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id),
  action: text("action").notNull(),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users);
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertFilmSchema = createInsertSchema(films).omit({ id: true });
export const insertArticleSchema = createInsertSchema(articles).omit({ id: true, createdAt: true });
export const insertPartnerSchema = createInsertSchema(partners).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
export const insertAdminSettingSchema = createInsertSchema(adminSettings).omit({ id: true, updatedAt: true });
export const insertAdminLogSchema = createInsertSchema(adminLogs).omit({ id: true, createdAt: true });

// Insert Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertFilm = z.infer<typeof insertFilmSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertAdminSetting = z.infer<typeof insertAdminSettingSchema>;
export type InsertAdminLog = z.infer<typeof insertAdminLogSchema>;

// Types
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Film = typeof films.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type AdminSetting = typeof adminSettings.$inferSelect;
export type AdminLog = typeof adminLogs.$inferSelect;
