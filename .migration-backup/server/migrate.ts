import { pool } from "./db";

export async function ensureTables() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        date TEXT,
        is_hidden BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS films (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        director TEXT NOT NULL,
        synopsis TEXT NOT NULL,
        year INTEGER NOT NULL,
        image_url TEXT NOT NULL,
        video_url TEXT,
        is_hidden BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        category TEXT NOT NULL,
        source_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        is_hidden BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS partners (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        logo_url TEXT NOT NULL,
        website TEXT
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS admin_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER REFERENCES users(id),
        action TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS organization_profiles (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        founded_year INTEGER NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        story TEXT NOT NULL,
        mission TEXT NOT NULL,
        vision TEXT NOT NULL,
        meaning TEXT NOT NULL,
        website TEXT NOT NULL,
        email TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS impact_metrics (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        value INTEGER NOT NULL,
        suffix TEXT NOT NULL,
        description TEXT NOT NULL,
        source_name TEXT NOT NULL,
        source_url TEXT NOT NULL,
        source_date TEXT,
        display_order INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS research_sources (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        source_name TEXT NOT NULL,
        source_url TEXT NOT NULL UNIQUE,
        source_type TEXT NOT NULL,
        published_at TEXT,
        topic TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS social_links (
        id SERIAL PRIMARY KEY,
        platform TEXT NOT NULL,
        label TEXT NOT NULL,
        url TEXT NOT NULL UNIQUE,
        source_url TEXT,
        verification_note TEXT,
        display_order INTEGER NOT NULL DEFAULT 0,
        is_visible BOOLEAN NOT NULL DEFAULT true
      );
    `);
    console.log("Database tables ensured.");
  } finally {
    client.release();
  }
}
