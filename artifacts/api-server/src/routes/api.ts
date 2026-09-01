const endpoint = (path: string, method: string) => ({ path, method });

export const api = {
  auth: {
    login: endpoint("/api/auth/login", "POST"),
    logout: endpoint("/api/auth/logout", "POST"),
    me: endpoint("/api/auth/me", "GET"),
  },
  projects: {
    list: endpoint("/api/projects", "GET"),
    create: endpoint("/api/projects", "POST"),
    update: endpoint("/api/projects/:id", "PATCH"),
    delete: endpoint("/api/projects/:id", "DELETE"),
  },
  films: {
    list: endpoint("/api/films", "GET"),
    get: endpoint("/api/films/:id", "GET"),
    create: endpoint("/api/films", "POST"),
    update: endpoint("/api/films/:id", "PATCH"),
    delete: endpoint("/api/films/:id", "DELETE"),
  },
  articles: {
    list: endpoint("/api/articles", "GET"),
    create: endpoint("/api/articles", "POST"),
    update: endpoint("/api/articles/:id", "PATCH"),
    delete: endpoint("/api/articles/:id", "DELETE"),
  },
  partners: {
    list: endpoint("/api/partners", "GET"),
    create: endpoint("/api/partners", "POST"),
    delete: endpoint("/api/partners/:id", "DELETE"),
  },
  contact: {
    submit: endpoint("/api/contacts", "POST"),
  },
  knowledge: {
    profile: endpoint("/api/knowledge/profile", "GET"),
    metrics: endpoint("/api/knowledge/metrics", "GET"),
    sources: endpoint("/api/knowledge/sources", "GET"),
    socials: endpoint("/api/knowledge/socials", "GET"),
  },
};