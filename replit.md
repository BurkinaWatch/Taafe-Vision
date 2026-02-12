# Taafé Vision - Suivi de Projet

## Objectif
Développer une application web complète pour l'association Taafé Vision, mettant en avant le cinéma burkinabè et les droits des femmes.

## État Actuel
- Serveur et base de données opérationnels.
- Navigation et pages principales créées.
- Bugs TypeScript corrigés.
- Images réelles de l'organisation intégrées.

## Préférences Utilisateur
- Utiliser des photos réelles de l'organisation.
- Visibilité du texte sur fond hero (ajusté avec blanc).
- Typage TypeScript strict respecté.

## Architecture
- React + Vite (Port 5000)
- Express + PostgreSQL (Drizzle ORM)
- Tailwind CSS / Shadcn UI

## Déploiement Railway

### Variables d'environnement requises sur Railway
- `DATABASE_URL` : URL de connexion PostgreSQL (fournie automatiquement par le plugin PostgreSQL de Railway)
- `SESSION_SECRET` : Clé secrète pour les sessions (générer une chaîne aléatoire)
- `PORT` : Défini automatiquement par Railway
- `NODE_ENV` : Défini à `production` automatiquement

### Étapes de déploiement
1. Créer un projet sur Railway
2. Ajouter un service PostgreSQL
3. Connecter le dépôt Git
4. Railway détecte automatiquement `railway.toml` pour la configuration
5. Ajouter `SESSION_SECRET` dans les variables d'environnement
6. Déployer

### Build & Start
- Build : `npm ci && npm run build && npx drizzle-kit push --force`
- Start : `node dist/index.cjs`
- Le serveur écoute sur le port défini par `PORT`

## Changements Récents
- Préparation au déploiement Railway (Février 2026) : railway.toml, build optimisé, trust proxy, cookies sécurisés.
- Remplacement de l'image du projet par une équipe de femmes africaines en tournage (Janvier 2026).
- Correction globale des types TypeScript.
