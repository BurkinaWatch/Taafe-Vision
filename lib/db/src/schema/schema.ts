import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

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

// Public organization knowledge gathered from official and editorial sources.
export const organizationProfiles = pgTable("organization_profiles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  foundedYear: integer("founded_year").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  story: text("story").notNull(),
  mission: text("mission").notNull(),
  vision: text("vision").notNull(),
  meaning: text("meaning").notNull(),
  website: text("website").notNull(),
  email: text("email"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const impactMetrics = pgTable("impact_metrics", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: integer("value").notNull(),
  suffix: text("suffix").notNull(),
  description: text("description").notNull(),
  sourceName: text("source_name").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceDate: text("source_date"),
  displayOrder: integer("display_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const researchSources = pgTable("research_sources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  sourceName: text("source_name").notNull(),
  sourceUrl: text("source_url").notNull().unique(),
  sourceType: text("source_type").notNull(),
  publishedAt: text("published_at"),
  topic: text("topic").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),
  label: text("label").notNull(),
  url: text("url").notNull().unique(),
  sourceUrl: text("source_url"),
  verificationNote: text("verification_note"),
  displayOrder: integer("display_order").notNull().default(0),
  isVisible: boolean("is_visible").default(true).notNull(),
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
export const insertOrganizationProfileSchema = createInsertSchema(organizationProfiles).omit({ id: true, updatedAt: true });
export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({ id: true, updatedAt: true });
export const insertResearchSourceSchema = createInsertSchema(researchSources).omit({ id: true, createdAt: true });
export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({ id: true });

// Insert Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertFilm = z.infer<typeof insertFilmSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertAdminSetting = z.infer<typeof insertAdminSettingSchema>;
export type InsertAdminLog = z.infer<typeof insertAdminLogSchema>;
export type InsertOrganizationProfile = z.infer<typeof insertOrganizationProfileSchema>;
export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;
export type InsertResearchSource = z.infer<typeof insertResearchSourceSchema>;
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;

// Types
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Film = typeof films.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type AdminSetting = typeof adminSettings.$inferSelect;
export type AdminLog = typeof adminLogs.$inferSelect;
export type OrganizationProfile = typeof organizationProfiles.$inferSelect;
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type ResearchSource = typeof researchSources.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
