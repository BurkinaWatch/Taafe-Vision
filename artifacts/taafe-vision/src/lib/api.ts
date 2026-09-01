import {
  articleSchema,
  contactSchema,
  filmSchema,
  insertArticleSchema,
  insertContactSchema,
  insertFilmSchema,
  insertPartnerSchema,
  insertProjectSchema,
  partnerSchema,
  projectSchema,
  userSchema,
} from "./types";
import { z } from "zod";

const endpoint = (
  path: string,
  method: string,
  input = z.object({}),
  responses: Record<number, z.ZodTypeAny> = {},
) => ({ path, method, input, responses });

export const api = {
  auth: {
    login: endpoint(
      "/api/auth/login",
      "POST",
      z.object({ username: z.string(), password: z.string() }),
      { 200: userSchema },
    ),
    logout: endpoint("/api/auth/logout", "POST"),
    me: endpoint("/api/auth/me", "GET", z.object({}), { 200: userSchema }),
  },
  projects: {
    list: endpoint("/api/projects", "GET", z.object({}), {
      200: z.array(projectSchema),
    }),
    create: endpoint("/api/projects", "POST", insertProjectSchema, {
      201: projectSchema,
    }),
    update: endpoint("/api/projects/:id", "PATCH"),
    delete: endpoint("/api/projects/:id", "DELETE"),
  },
  films: {
    list: endpoint("/api/films", "GET", z.object({}), {
      200: z.array(filmSchema),
    }),
    get: endpoint("/api/films/:id", "GET"),
    create: endpoint("/api/films", "POST", insertFilmSchema, {
      201: filmSchema,
    }),
    update: endpoint("/api/films/:id", "PATCH"),
    delete: endpoint("/api/films/:id", "DELETE"),
  },
  articles: {
    list: endpoint("/api/articles", "GET", z.object({}), {
      200: z.array(articleSchema),
    }),
    create: endpoint("/api/articles", "POST", insertArticleSchema, {
      201: articleSchema,
    }),
    update: endpoint("/api/articles/:id", "PATCH"),
    delete: endpoint("/api/articles/:id", "DELETE"),
  },
  partners: {
    list: endpoint("/api/partners", "GET", z.object({}), {
      200: z.array(partnerSchema),
    }),
    create: endpoint("/api/partners", "POST", insertPartnerSchema, {
      201: partnerSchema,
    }),
    delete: endpoint("/api/partners/:id", "DELETE"),
  },
  contact: {
    submit: endpoint("/api/contacts", "POST", insertContactSchema, {
      201: contactSchema,
    }),
  },
  knowledge: {
    profile: endpoint("/api/knowledge/profile", "GET"),
    metrics: endpoint("/api/knowledge/metrics", "GET"),
    sources: endpoint("/api/knowledge/sources", "GET"),
    socials: endpoint("/api/knowledge/socials", "GET"),
  },
};

export * from "./types";