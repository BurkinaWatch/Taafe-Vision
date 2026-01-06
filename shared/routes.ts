import { z } from 'zod';
import { 
  insertUserSchema, 
  insertProjectSchema, 
  insertFilmSchema, 
  insertArticleSchema, 
  insertPartnerSchema, 
  insertContactSchema,
  users, projects, films, articles, partners, contacts,
  User, Project, Film, Article, Partner, Contact
} from './schema';

// Export types for client usage
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertFilm = z.infer<typeof insertFilmSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type { User, Project, Film, Article, Partner, Contact };

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({ username: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.internal,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.null(),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: { 200: z.array(z.custom<typeof projects.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects',
      input: insertProjectSchema,
      responses: { 201: z.custom<typeof projects.$inferSelect>() },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/projects/:id',
      responses: { 204: z.void() },
    },
  },
  films: {
    list: {
      method: 'GET' as const,
      path: '/api/films',
      responses: { 200: z.array(z.custom<typeof films.$inferSelect>()) },
    },
    get: {
      method: 'GET' as const,
      path: '/api/films/:id',
      responses: { 
        200: z.custom<typeof films.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/films',
      input: insertFilmSchema,
      responses: { 201: z.custom<typeof films.$inferSelect>() },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/films/:id',
      responses: { 204: z.void() },
    },
  },
  articles: {
    list: {
      method: 'GET' as const,
      path: '/api/articles',
      responses: { 200: z.array(z.custom<typeof articles.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/articles',
      input: insertArticleSchema,
      responses: { 201: z.custom<typeof articles.$inferSelect>() },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/articles/:id',
      responses: { 204: z.void() },
    },
  },
  partners: {
    list: {
      method: 'GET' as const,
      path: '/api/partners',
      responses: { 200: z.array(z.custom<typeof partners.$inferSelect>()) },
    },
    create: {
      method: 'POST' as const,
      path: '/api/partners',
      input: insertPartnerSchema,
      responses: { 201: z.custom<typeof partners.$inferSelect>() },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/partners/:id',
      responses: { 204: z.void() },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: { 201: z.custom<typeof contacts.$inferSelect>() },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
