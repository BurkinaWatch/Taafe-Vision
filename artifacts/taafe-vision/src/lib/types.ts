import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  isAdmin: z.boolean().optional(),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  date: z.string().nullable().optional(),
  isHidden: z.boolean().optional(),
});

export const insertFilmSchema = z.object({
  title: z.string(),
  director: z.string(),
  synopsis: z.string(),
  year: z.coerce.number(),
  imageUrl: z.string(),
  videoUrl: z.string().nullable().optional(),
  isHidden: z.boolean().optional(),
});

export const insertArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().nullable().optional(),
  category: z.string(),
  sourceUrl: z.string().nullable().optional(),
  isHidden: z.boolean().optional(),
});

export const insertPartnerSchema = z.object({
  name: z.string(),
  logoUrl: z.string(),
  website: z.string().nullable().optional(),
});

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertFilm = z.infer<typeof insertFilmSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type User = InsertUser & { id: number };
export type Project = InsertProject & { id: number; isHidden: boolean };
export type Film = InsertFilm & { id: number; isHidden: boolean };
export type Article = InsertArticle & {
  id: number;
  createdAt: string | Date | null;
  isHidden: boolean;
};
export type Partner = InsertPartner & { id: number };
export type Contact = InsertContact & { id: number; createdAt: string | Date | null };

export type OrganizationProfile = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  foundedYear: number;
  city: string;
  country: string;
  story: string;
  mission: string;
  vision: string;
  meaning: string;
  website: string;
  email: string | null;
  updatedAt: string | Date | null;
};

export type ImpactMetric = {
  id: number;
  label: string;
  value: number;
  suffix: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  sourceDate: string | null;
  displayOrder: number;
  updatedAt: string | Date | null;
};

export type ResearchSource = {
  id: number;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: string;
  publishedAt: string | null;
  topic: string;
  createdAt: string | Date | null;
};

export type SocialLink = {
  id: number;
  platform: string;
  label: string;
  url: string;
  sourceUrl: string | null;
  verificationNote: string | null;
  displayOrder: number;
  isVisible: boolean;
};

export const userSchema = insertUserSchema.extend({
  id: z.number(),
});
export const projectSchema = insertProjectSchema.extend({
  id: z.number(),
  isHidden: z.boolean(),
});
export const filmSchema = insertFilmSchema.extend({
  id: z.number(),
  isHidden: z.boolean(),
});
export const articleSchema = insertArticleSchema.extend({
  id: z.number(),
  createdAt: z.union([z.string(), z.date()]).nullable(),
  isHidden: z.boolean(),
});
export const partnerSchema = insertPartnerSchema.extend({
  id: z.number(),
});
export const contactSchema = insertContactSchema.extend({
  id: z.number(),
  createdAt: z.union([z.string(), z.date()]).nullable(),
});