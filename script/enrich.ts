/**
 * Script d'enrichissement de la base de données Taafé Vision
 * Sources : taafevision.org, burkina24.com, feminaction.fr, artistesbf.org, moussonews.com
 * Exécution : npx tsx script/enrich.ts
 */

import { db } from "../server/db";
import {
  articles,
  projects,
  films,
  partners,
  impactMetrics,
  researchSources,
  organizationProfiles,
} from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🚀 Début de l'enrichissement de la base de données...\n");

  // ─────────────────────────────────────────────
  // 1. PROFIL ORGANISATION (mise à jour enrichie)
  // ─────────────────────────────────────────────
  console.log("📝 Mise à jour du profil organisation...");
  await db
    .update(organizationProfiles)
    .set({
      story: `Taafé Vision est une association burkinabè créée le 9 janvier 2017 à Ouagadougou. Elle est née de la volonté de professionnelles et de passionné·es du cinéma de formaliser un engagement commun pour une meilleure représentativité des femmes dans l'industrie cinématographique. « Taafé » signifie pagne en bambara — le pagne symbolisant la femme au Burkina Faso, Taafé Vision signifie littéralement « vision de femmes ».

L'association intervient aux niveaux régional et international. Ses thématiques d'intervention couvrent les droits et la santé sexuels et reproductifs, le renforcement du pouvoir économique des femmes, et la lutte contre toutes les formes de violences basées sur le genre. Elle agit par la production, la formation, la diffusion et le débat communautaire, utilisant le 7e art comme un levier puissant pour le changement social.

Depuis 2017, Taafé Vision a formé plus de 33 femmes cinéastes, produit plus de 10 films engagés et sensibilisé plus de 6 000 personnes à travers ses projections-débats dans les quartiers, villages et écoles. En 2026, sa sixième promotion a présenté 10 nouveaux projets de courts métrages à l'ABCA (Agence Burkinabè de la Cinématographie et de l'Audiovisuel) devant des professionnels du secteur.

La présidente Azaratou Bancé explique : « Il n'est pas rare que lors des diffusions des films, nous soyons approchées par des femmes qui nous confient leur vécu en rapport avec la situation présentée dans le film. Pour elles, voir un personnage prendre son destin en main leur donne l'espoir de faire pareil. »`,
      mission:
        "Produire et diffuser des films exempts de stéréotypes de genre, soutenir l'abandon des violences basées sur le genre (excision, mariage forcé, violences conjugales, harcèlement sexuel) et contribuer à la promotion des femmes dans un monde plus juste et égalitaire — en mettant le cinéma au service du changement social.",
      vision:
        "À l'horizon 2030, devenir une association leader de la lutte pour un monde plus égalitaire, juste et exempt de violences envers les femmes, au moyen du film. Taafé Vision aspire à être la référence du cinéma féministe en Afrique de l'Ouest et à voir ses productions utilisées comme outils de politique publique pour l'égalité de genre.",
    })
    .where(eq(organizationProfiles.slug, "taafe-vision"));
  console.log("  ✓ Profil organisation mis à jour.\n");

  // ─────────────────────────────────────────────
  // 2. MÉTRIQUES D'IMPACT (mise à jour 2026)
  // ─────────────────────────────────────────────
  console.log("📊 Mise à jour des métriques d'impact...");
  await db.delete(impactMetrics);
  const metricsData = [
    {
      label: "Femmes formées",
      value: 33,
      suffix: "+",
      description:
        "Depuis 2017, plus de 33 femmes ont bénéficié d'un accompagnement technique et artistique complet en écriture de scénario, réalisation et production de courts métrages.",
      sourceName: "Taafé Vision — site officiel",
      sourceUrl: "https://taafevision.org/",
      sourceDate: "2026",
      displayOrder: 1,
    },
    {
      label: "Films produits",
      value: 10,
      suffix: "+",
      description:
        "Courts métrages de fiction et documentaires engagés contre les violences basées sur le genre : excision, mariage forcé, violences conjugales, harcèlement sexuel, extrémisme violent.",
      sourceName: "Taafé Vision — site officiel",
      sourceUrl: "https://taafevision.org/",
      sourceDate: "2026",
      displayOrder: 2,
    },
    {
      label: "Personnes sensibilisées",
      value: 6000,
      suffix: "+",
      description:
        "Public touché par les projections-débats communautaires dans les quartiers, villages, écoles et organisations de Ouagadougou et des provinces du Burkina Faso.",
      sourceName: "Taafé Vision — site officiel",
      sourceUrl: "https://taafevision.org/",
      sourceDate: "2026",
      displayOrder: 3,
    },
    {
      label: "Promotions formées",
      value: 6,
      suffix: "",
      description:
        "Six promotions de femmes cinéastes incubées depuis 2017. La 6e promotion a présenté 10 projets de courts métrages à l'ABCA en mai 2026 devant des professionnels du cinéma.",
      sourceName: "Burkina24",
      sourceUrl:
        "https://burkina24.com/2026/05/30/cinema-au-feminin-avec-taafe-vision-10-projets-de-films-pour-briser-les-silences/",
      sourceDate: "30 mai 2026",
      displayOrder: 4,
    },
    {
      label: "Années d'existence",
      value: 9,
      suffix: "",
      description:
        "Fondée le 9 janvier 2017 à Ouagadougou, Taafé Vision œuvre depuis près d'une décennie pour l'égalité de genre par le cinéma.",
      sourceName: "Feminaction — annuaire des OSC féministes",
      sourceUrl: "https://feminaction.fr/osc/taafe-vision/",
      sourceDate: "2026",
      displayOrder: 5,
    },
  ];
  for (const m of metricsData) await db.insert(impactMetrics).values(m);
  console.log(`  ✓ ${metricsData.length} métriques enregistrées.\n`);

  // ─────────────────────────────────────────────
  // 3. PROJETS (mise à jour + ajout)
  // ─────────────────────────────────────────────
  console.log("🎯 Mise à jour des projets...");
  await db.delete(projects);
  const projectsData = [
    {
      title: "De l'idée au court métrage",
      description: `Programme phare de Taafé Vision, cofinancé par le Fonds de Développement Culturel et Touristique (FDCT) dans le cadre du Programme d'Appui aux Industries Créatives et à la Gouvernance de la Culture (PAIC-GC), avec l'appui de l'Union Européenne.

Ce projet accompagne dix femmes de l'idée initiale jusqu'à la production d'un court métrage : formation aux techniques théoriques et pratiques d'écriture de scénario, ateliers de réalisation, tournage, post-production et diffusion publique. Les films produits abordent les violences basées sur le genre et sont utilisés comme outils de sensibilisation communautaire.

La première promotion (2022) a abouti à la réalisation de deux courts métrages. La deuxième promotion (2023-2024) a produit quatre films : « Terminus » (harcèlement sexuel), « Le poids du déshonneur » (violences conjugales), « Kanu » (femmes et lutte contre l'extrémisme) et « Incomprise » (mariage forcé).`,
      imageUrl: "/images/community-screening.jpg",
      date: "2022 — en cours",
      isHidden: false,
    },
    {
      title: "Elles se réalisent",
      description: `Continuité du programme « De l'idée au court métrage », ce projet renforce les capacités de dix femmes en réécriture de scénario de court métrage (~26 minutes) suivie d'une formation en réalisation.

Lancé en 2023, le projet a permis la projection publique de quatre courts métrages le 15 février 2024 à Ouagadougou devant des partenaires et la presse. Ces films féministes sont ensuite utilisés pour des campagnes de sensibilisation et d'actions sociales, mobilisant les communautés locales, les ONG et les responsables politiques.

Azaratou Bancé, présidente de Taafé Vision : « Ces films deviennent des outils de mobilisation pour le changement social, favorisant la mise en place de politiques et de programmes en faveur de l'égalité des sexes. »`,
      imageUrl: "/images/community-engagement-1.jpg",
      date: "2023-2024",
      isHidden: false,
    },
    {
      title: "Le genre s'invite au FESPACO",
      description: `Projet annuel de Taafé Vision en marge du Festival Panafricain du Cinéma et de la Télévision de Ouagadougou (FESPACO). Pour la 2e année consécutive en 2025, l'association a mené plusieurs activités dédiées à la représentativité des femmes dans le 7e art :

• **Stand Genre au MICA** (Marché International du Cinéma et de l'Audiovisuel) du 23 février au 1er mars 2025 — espace d'échange autour du genre dans le cinéma
• **Panel** « La représentation de la femme dans les cinémas africains » — le 26 février au chapiteau Yennenga
• **FESPACO ADO** — activités de sensibilisation pour les jeunes
• **Pitch de 10 projets de films de femmes** autour du thème « Droits des femmes »

Ce projet ancre Taafé Vision dans le paysage professionnel du cinéma africain et crée des ponts entre les femmes cinéastes du continent.`,
      imageUrl: "/images/partners-1.jpg",
      date: "2023, 2025",
      isHidden: false,
    },
    {
      title: "Projections communautaires & 16 jours d'activisme",
      description: `Taafé Vision organise des projections-débats itinérantes dans les quartiers, communes et provinces du Burkina Faso pour sensibiliser les populations aux violences basées sur le genre.

En décembre 2025, dans le cadre des **16 jours d'activisme contre les VBG**, l'association a organisé une projection-débat du court métrage « À tout prix » à Ziniaré. L'événement a réuni des femmes, des représentants de l'action sociale et des forces de sécurité. La conférence a révélé que 4 jeunes filles ont été victimes d'excision en 2024 dans la région d'Oubri.

Azaratou Bancé : « Nous avons décidé de miser vraiment sur les dialogues, sur le jeu d'acteurs pour montrer à quel point cette pratique est destructrice. »

Ces projections touchent plus de 6 000 personnes et génèrent des témoignages directs de survivantes qui s'identifient aux personnages des films.`,
      imageUrl: "/images/community-screening.jpg",
      date: "2024 — en cours",
      isHidden: false,
    },
  ];
  for (const p of projectsData) await db.insert(projects).values(p);
  console.log(`  ✓ ${projectsData.length} projets enregistrés.\n`);

  // ─────────────────────────────────────────────
  // 4. FILMS (mise à jour avec videoUrl et enrichissement)
  // ─────────────────────────────────────────────
  console.log("🎬 Mise à jour des films...");
  await db.delete(films);
  const filmsData = [
    {
      title: "À TOUT PRIX",
      director: "Maïmouna OUÉDRAOGO",
      synopsis:
        "Kilayé et Mayô, couple jeune et complice, vivent paisiblement à Ouagadougou avec leur fille de huit ans, Barkima. Un matin, la quiétude du foyer est troublée par la visite inopinée de Yaba, la mère de Kilayé. Mayô surprend alors une discussion alarmante : il est question d'exciser Barkima. Résolue et elle-même survivante de cette pratique dangereuse, elle tente de s'opposer à cette décision. La tension monte, les convictions s'entrechoquent. Arrivera-t-elle à sauver sa fille du couteau de l'exciseuse ? Un film sur l'excision qui mise sur les dialogues et les conséquences psychologiques et sociales plutôt que sur la violence explicite, pour toucher profondément les communautés.",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      videoUrl: "https://www.youtube.com/watch?v=Bu0OBXk7yQk",
      isHidden: false,
    },
    {
      title: "AFFRANCHIE",
      director: "Naïma Maguilatou TRAORÉ",
      synopsis:
        "Après son mariage, Dia, âgée de 23 ans et déléguée des étudiants de son université, est encore sous contraceptif — situation qui déplaît à Maman, sa belle-mère. Elle ambitionne de bâtir une carrière avant d'envisager d'avoir des enfants. La matriarche, offusquée par le choix de Dia, exige d'elle une grossesse avant les 15 jours de confinement traditionnel de la nouvelle mariée. Dia restera-t-elle sur sa position ou cédera-t-elle à la pression de sa belle-mère ? Un film sur l'autonomie corporelle des femmes et la pression familiale.",
      year: 2024,
      imageUrl: "/images/affranchie.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "TERMINUS",
      director: "Salimata OUÉDRAOGO",
      synopsis:
        "Aicha, une adolescente vivant dans une zone à haut défi sécuritaire, se voit imposer par son père un mariage forcé pour assurer sa couverture sociale. Elle s'y oppose farouchement et migre en ville, où elle trouve un emploi d'aide-ménagère. Mais son calvaire est sans fin : le mari de sa patronne la harcèle et tente de la violer. Va-t-elle céder ou être contrainte de fuir à nouveau ? Un film courageux sur le harcèlement sexuel au travail et le mariage forcé, produit dans le cadre du projet « Elles se réalisent ».",
      year: 2024,
      imageUrl: "/images/terminus.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "LE POIDS DU DÉSHONNEUR",
      director: "Maïmouna LENGLENGUE",
      synopsis:
        "Nafi, une jeune mère constamment battue par son mari, décide de quitter le foyer. Elle est renvoyée par sa propre famille auprès de qui elle cherche refuge, et fait face à l'inaction des services sociaux. Elle trouve bientôt un emploi et réorganise sa vie. Cependant, menacée de bannissement, Nafi retourne auprès de son bourreau — qui récidivise. Cette fois, leur voisine, longtemps témoin silencieuse de ces violences, décide d'agir. Parviendra-t-elle à sauver Nafi ? Produit dans le cadre du projet « Elles se réalisent ».",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "KANU",
      director: "Djata OUATTARA",
      synopsis:
        "Désœuvré et obsédé par l'idée d'offrir une meilleure vie à sa mère rongée par un passé douloureux et secret, Sié intègre les rangs d'un groupe terroriste. Sous la direction de Bella, son mentor, il s'apprête à perpétrer son premier attentat. Mais avant, il fait la connaissance de Yé, une jeune citadine rescapée d'une attaque terroriste engagée pour la paix. Kanu montre la puissance de l'amour maternel et l'importance de l'engagement citoyen des femmes pour la préservation de la paix. Produit dans le cadre du projet « Elles se réalisent ».",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "AU PIED DU MUR",
      director: "Délia E. Y. IDO",
      synopsis:
        "Marietou est une jeune fille de 17 ans qui vient d'obtenir une bourse d'études à l'étranger. Mais ses rêves s'effondrent lorsque son père décide de la donner en mariage à son riche ami. Marietou se retrouve face à un dilemme impossible : obéir à son père ou poursuivre ses rêves. Elle décide de s'enfuir. Parviendra-t-elle à échapper à ce destin tracé pour elle ?",
      year: 2024,
      imageUrl: "/images/au-pied-du-mur.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "INCOMPRISE",
      director: "Cathérine GOLO",
      synopsis:
        "Fatim, une jeune fille victime de viol et enceinte, est contrainte d'épouser son bourreau en guise de réparation du déshonneur fait à sa famille. Dans son foyer, elle subit de nombreuses violences psychologiques et physiques. Avec le soutien de sa cousine, Fatim décide de se prendre en main et de briser le silence. Un film sur le mariage forcé et la résilience des survivantes de violences sexuelles. Produit dans le cadre du projet « Elles se réalisent ».",
      year: 2024,
      imageUrl: "/images/incomprise.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "MANIPULATIONS",
      director: "Assita SOMA",
      synopsis:
        "Kadi, jeune femme d'une trentaine d'années et titulaire d'un master II en Droit, vit avec son mari Abdoul et leurs deux enfants. L'homme de sa vie se montre attentionné et très amoureux, si bien qu'il la convainc de limiter ses sorties et se propose de faire toutes ses courses. Kadi est tellement reconnaissante de cet amour qu'elle l'implique dans tout. Mais derrière cet amour se cache une manipulation pernicieuse — le contrôle coercitif. Kadi saura-t-elle se libérer ?",
      year: 2024,
      imageUrl: "/images/manipulations.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "AU-DELÀ DE L'AMOUR",
      director: "Ekua Zinogo BANCÉ",
      synopsis:
        "Fatigué et révolté de l'humiliation que son père lui inflige du fait de sa condition de sans-emploi, Madi saisit la première opportunité de travail qui lui tombe sous la main sans réfléchir. Au fil du temps, sa mère — qui ne reconnaît plus son fils — exprime ses inquiétudes à son mari qui fait la sourde oreille. Quand elle découvre enfin ce que Madi fait réellement, elle décide d'agir pour sauver son fils. Un portrait puissant de la femme burkinabè comme pilier moral de la famille.",
      year: 2024,
      imageUrl: "/images/au-dela-de-lamour.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "LES VOISINS",
      director: "Edith Martine TRAORÉ",
      synopsis:
        "Maya, une jeune femme récemment installée dans un quartier de Ouagadougou avec son mari Marcus et leur fille Maelys (asthmatique), fait face à ses voisins artisans qui ont l'habitude de brûler leurs ordures. Inquiète après l'inefficacité d'une première interpellation par Marcus, Maya tente elle-même de trouver une solution pacifique pour préserver la santé de sa fille et le vivre-ensemble. Un film sur l'engagement civique des femmes.",
      year: 2024,
      imageUrl: "/images/mes-voisins.jpg",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "LES INSÉPARABLES",
      director: "Djeneba LY",
      synopsis:
        "Les familles Cissé et Bazongo ont toujours entretenu de bonnes relations de voisinage jusqu'au jour où Ladji Cissé, désormais respectueux des préceptes d'un nouveau guide spirituel, s'oppose farouchement à la grande amitié entre sa fille Habiba et Esther, la fille des Bazongo. En plus d'interdire l'accès à sa cour à la famille Bazongo, il les harcèle quotidiennement. Une histoire de tolérance religieuse et d'amitié par-delà les barrières.",
      year: 2024,
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      videoUrl: null,
      isHidden: false,
    },
    {
      title: "JUGE T. BLANCHE",
      director: "Barkima Nafissatou LAGUEMPEDO",
      synopsis:
        "Juge T. Blanche, une femme trentenaire, se rend coupable du meurtre du Général Juste TAMALEBO, son père. Tenue par un pacte de silence scellé entre sa défunte mère Aline et elle, Blanche est contrainte de garder secrètes les violences sexuelles incestueuses dont elle a été victime durant son enfance. Un film poignant sur le silence, le traumatisme générationnel et la quête de justice pour les survivantes.",
      year: 2024,
      imageUrl: "/images/juge-blanche.jpg",
      videoUrl: null,
      isHidden: false,
    },
  ];
  for (const f of filmsData) await db.insert(films).values(f);
  console.log(`  ✓ ${filmsData.length} films enregistrés.\n`);

  // ─────────────────────────────────────────────
  // 5. ARTICLES (actualités réelles enrichies)
  // ─────────────────────────────────────────────
  console.log("📰 Mise à jour des articles...");
  await db.delete(articles);
  const articlesData = [
    {
      title: "10 projets de films féminins pour briser les silences — Pitch de la 6e promotion",
      content: `Le vendredi 29 mai 2026, dans la salle de projection de l'ABCA (Agence Burkinabè de la Cinématographie et de l'Audiovisuel), dix jeunes femmes incubées par Taafé Vision ont présenté leurs projets de courts métrages de fiction devant un public de professionnels du cinéma et d'acteurs de la société civile.

Cet exercice de pitch — un moment clé du programme de formation — avait pour but de permettre aux autrices de défendre leurs visions, de confronter leurs récits à un regard critique et de recueillir des conseils pour la suite de leurs créations. Parmi ces dix projets, trois seront sélectionnés pour la production.

Cette 6e promotion illustre l'ancrage solide de Taafé Vision dans la formation de femmes cinéastes au Burkina Faso, avec une démarche qui mêle incubation artistique, renforcement de capacités et engagement social.

Source : Burkina24, 30 mai 2026.`,
      category: "news",
      imageUrl:
        "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80",
      sourceUrl:
        "https://burkina24.com/2026/05/30/cinema-au-feminin-avec-taafe-vision-10-projets-de-films-pour-briser-les-silences/",
      isHidden: false,
    },
    {
      title: "16 jours d'activisme : Taafé Vision mobilise le cinéma contre l'excision à Ziniaré",
      content: `Dans le cadre des 16 jours d'activisme contre les violences basées sur le genre (VBG), Taafé Vision a organisé le 9 décembre 2025 une projection-débat du court métrage « À tout prix » à Ziniaré. Cette initiative vise à sensibiliser les femmes aux différentes formes de VBG, avec un accent particulier sur la pratique de l'excision.

L'événement a réuni des femmes, des représentants de l'action sociale et des forces de sécurité. La conférence animée par des responsables locaux a révélé que, selon la police, 4 jeunes filles ont été victimes d'excision en 2024 dans la région d'Oubri.

Le film « À tout prix », réalisé par Maïmouna Ouédraogo, se distingue par son approche : plutôt que de montrer la violence explicite, il met en lumière les conséquences psychologiques et sociales de l'excision sur les survivantes.

Azaratou Bancé, présidente de Taafé Vision : « Aujourd'hui à Ziniaré, on diffuse le film À tout prix, qui aborde la question de l'excision sous l'angle des survivantes. Nous avons décidé de miser vraiment sur les dialogues, sur le jeu d'acteurs pour montrer à quel point cette pratique est destructrice. »

Source : Burkina24, 10 décembre 2025.`,
      category: "event",
      imageUrl:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80",
      sourceUrl:
        "https://burkina24.com/2025/12/10/16-jours-dactivisme-taafe-vision-utilise-le-cinema-pour-sensibiliser-aux-violences-faites-aux-femmes/",
      isHidden: false,
    },
    {
      title: "FESPACO 2025 : « Le genre s'invite » — Taafé Vision au cœur du cinéma africain",
      content: `L'association Taafé Vision a été présente pour la 2e année consécutive au Festival Panafricain du Cinéma et de la Télévision de Ouagadougou (FESPACO) 2025, avec son projet « Le genre s'invite au FESPACO ».

Du 23 février au 1er mars 2025, trois grandes activités ont marqué cette présence :

**Stand Genre au MICA** — Un espace dédié au genre au Marché International du Cinéma et de l'Audiovisuel, cadre d'échanges autour des thématiques de représentativité des femmes dans le cinéma.

**Panel professionnel** — « La représentation de la femme dans les cinémas africains » le 26 février, au chapiteau Yennenga connexion dans l'enceinte du FESPACO.

**FESPACO ADO & Pitch** — Des activités de sensibilisation pour les jeunes et la présentation de 10 projets de films de femmes autour du thème « Droits des femmes ».

L'annonce avait été faite lors d'une conférence de presse le 20 février à Ouagadougou par la présidente Azaratou Bancé.

Source : ArtistesBF / Mousso News, février 2025.`,
      category: "event",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178f50002c4b?auto=format&fit=crop&q=80",
      sourceUrl:
        "https://www.artistesbf.org/fespaco-2025-le-genre-sinvite-un-projet-de-lassociation-taafe-vision/",
      isHidden: false,
    },
    {
      title: "« Elles se réalisent » : 4 courts métrages présentés à Ouagadougou",
      content: `Le jeudi 15 février 2024 à Ouagadougou, l'association Taafé Vision a présenté à ses partenaires et à la presse quatre courts métrages réalisés dans le cadre du projet « Elles se réalisent » — continuité du programme « De l'idée au court métrage » cofinancé par le FDCT/PAIC-GC avec l'appui de l'Union Européenne.

Ces quatre films, réalisés par de jeunes cinéastes burkinabè formées par Taafé Vision, abordent des thématiques essentielles :

• **« Terminus »** de Salimata Ouédraogo — le harcèlement sexuel au travail
• **« Le poids du déshonneur »** de Maïmouna Lenglengue — les violences conjugales
• **« Kanu »** de Djata Ouattara — le rôle de la femme dans la lutte contre l'extrémisme violent
• **« Incomprise »** de Cathérine Golo — le mariage forcé et les violences sexuelles

Ces courts métrages (13 à 26 minutes) sont utilisés comme outils de mobilisation pour le changement social, favorisant la mise en place de politiques en faveur de l'égalité des sexes.

Source : Burkina24, 16 février 2024.`,
      category: "news",
      imageUrl:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80",
      sourceUrl:
        "https://burkina24.com/2024/02/16/cinema-lassociation-taafe-vision-donne-la-parole-aux-femmes-a-travers-le-projet-elles-se-realisent/",
      isHidden: false,
    },
    {
      title: "Formation de femmes cinéastes : Taafé Vision lance sa prochaine promotion",
      content: `Taafé Vision lance un appel à candidatures pour sa prochaine promotion de formation en réalisation de courts métrages. Ce programme d'incubation complet accompagne dix femmes de l'écriture du scénario jusqu'à la diffusion publique du film.

Le programme comprend :
• Des ateliers d'écriture et de réécriture de scénario
• Une formation aux techniques pratiques de réalisation
• Un encadrement par des professionnels du cinéma burkinabè
• Un accompagnement à la post-production
• Une projection publique finale et des séances de pitching devant des professionnels

Les films produits traitent des violences basées sur le genre et sont utilisés par Taafé Vision dans ses campagnes de sensibilisation communautaire à travers le Burkina Faso.

Pour candidater ou obtenir plus d'informations : info@taafevision.org`,
      category: "training",
      imageUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      sourceUrl: "https://taafevision.org/",
      isHidden: false,
    },
    {
      title: "Réservez votre place : projections-débats communautaires 2026",
      content: `Taafé Vision poursuit ses projections-débats communautaires dans les quartiers et communes du Burkina Faso. Ces événements gratuits et ouverts à tous permettent de visionner les courts métrages de Taafé Vision suivis d'échanges animés sur les droits des femmes et les violences basées sur le genre.

Ces projections sont des espaces de dialogue précieux où les communautés peuvent aborder des sujets souvent tabous — excision, violences conjugales, mariage forcé, harcèlement sexuel — dans un cadre bienveillant et constructif.

Depuis 2017, plus de 6 000 personnes ont participé à ces événements. Lors de chaque projection, des spécialistes (travailleurs sociaux, juristes, représentants de l'action sociale) sont présents pour répondre aux questions du public.

Pour inviter Taafé Vision dans votre commune ou organisation : info@taafevision.org`,
      category: "event",
      imageUrl:
        "https://images.unsplash.com/photo-1517457373614-b7152f800fd1?auto=format&fit=crop&q=80",
      sourceUrl: "https://taafevision.org/",
      isHidden: false,
    },
  ];
  for (const a of articlesData) await db.insert(articles).values(a);
  console.log(`  ✓ ${articlesData.length} articles enregistrés.\n`);

  // ─────────────────────────────────────────────
  // 6. PARTENAIRES (mise à jour avec logos réels)
  // ─────────────────────────────────────────────
  console.log("🤝 Mise à jour des partenaires...");
  await db.delete(partners);
  const partnersData = [
    {
      name: "FESPACO",
      logoUrl: "/images/logo.jpg",
      website: "https://fespaco.org",
    },
    {
      name: "Union Européenne",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png",
      website: "https://europa.eu",
    },
    {
      name: "FDCT — Fonds de Développement Culturel et Touristique",
      logoUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      website: "https://www.culture.gov.bf",
    },
    {
      name: "Equipop",
      logoUrl:
        "https://equipop.org/wp-content/uploads/2019/09/equipop-logo.png",
      website: "https://equipop.org",
    },
    {
      name: "Foundation for a Just Society (FJS)",
      logoUrl:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
      website: "https://www.fjsonline.org",
    },
    {
      name: "ABCA — Agence Burkinabè de la Cinématographie et de l'Audiovisuel",
      logoUrl:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
      website: "https://abca.bf",
    },
    {
      name: "Féministes En Action (Feminaction)",
      logoUrl:
        "https://feminaction.fr/wp-content/uploads/2021/05/feminaction-logo.png",
      website: "https://feminaction.fr",
    },
  ];
  for (const p of partnersData) await db.insert(partners).values(p);
  console.log(`  ✓ ${partnersData.length} partenaires enregistrés.\n`);

  // ─────────────────────────────────────────────
  // 7. SOURCES DE RECHERCHE (mise à jour enrichie)
  // ─────────────────────────────────────────────
  console.log("🔍 Mise à jour des sources de recherche...");
  await db.delete(researchSources);
  const sourcesData = [
    {
      title: "Taafé Vision — site officiel : présentation, productions et chiffres clés",
      summary:
        "Site officiel de l'association présentant l'historique, la mission, la vision, les axes stratégiques, les chiffres clés (33+ femmes formées, 10+ productions, 6 000+ personnes sensibilisées), les films et les partenaires.",
      sourceName: "Taafé Vision",
      sourceUrl: "https://taafevision.org/",
      sourceType: "Site officiel",
      publishedAt: "2026",
      topic: "Présentation générale",
    },
    {
      title: "Fiche institutionnelle — Feminaction, annuaire des OSC féministes",
      summary:
        "Fiche officielle indiquant la création de l'association le 9 janvier 2017, son acronyme ATV, une implantation à Ouagadougou (Burkina Faso) et une intervention aux niveaux régional et international. Thématiques : droits et santé sexuels et reproductifs, renforcement du pouvoir économique des femmes.",
      sourceName: "Feminaction",
      sourceUrl: "https://feminaction.fr/osc/taafe-vision/",
      sourceType: "Fiche institutionnelle",
      publishedAt: "2026",
      topic: "Historique et statut",
    },
    {
      title: "Elles se réalisent : 4 courts métrages présentés le 15 février 2024",
      summary:
        "Burkina24 documente la présentation de quatre courts métrages (Terminus, Le poids du déshonneur, Kanu, Incomprise) réalisés par de jeunes cinéastes burkinabè formées par Taafé Vision dans le cadre du projet « Elles se réalisent », cofinancé par FDCT/PAIC-GC avec l'appui de l'UE.",
      sourceName: "Burkina24",
      sourceUrl:
        "https://burkina24.com/2024/02/16/cinema-lassociation-taafe-vision-donne-la-parole-aux-femmes-a-travers-le-projet-elles-se-realisent/",
      sourceType: "Presse nationale",
      publishedAt: "16 février 2024",
      topic: "Elles se réalisent — production 2024",
    },
    {
      title: "FESPACO 2025 : Taafé Vision et le projet « Le genre s'invite »",
      summary:
        "ArtistesBF couvre l'annonce par Azaratou Bancé de la présence de Taafé Vision au FESPACO 2025 : stand Genre au MICA, panel sur la représentation de la femme dans les cinémas africains (26 février), FESPACO ADO et pitch de 10 projets de films.",
      sourceName: "ArtistesBF",
      sourceUrl:
        "https://www.artistesbf.org/fespaco-2025-le-genre-sinvite-un-projet-de-lassociation-taafe-vision/",
      sourceType: "Presse culturelle",
      publishedAt: "21 février 2025",
      topic: "FESPACO 2025",
    },
    {
      title: "FESPACO 2025 — Mousso News : stand genre, panel et pitch",
      summary:
        "Mousso News revient sur les 3 grandes activités de Taafé Vision au FESPACO 2025 : stand genre au MICA, panel sur la représentation des femmes dans le cinéma africain, et pitch de 10 projets de films féminins.",
      sourceName: "Mousso News",
      sourceUrl:
        "https://www.moussonews.com/cinema-le-genre-sinvite-au-fespaco-avec-taafe-vision/",
      sourceType: "Presse spécialisée",
      publishedAt: "Février 2025",
      topic: "FESPACO 2025",
    },
    {
      title: "16 jours d'activisme 2025 : projection-débat « À tout prix » à Ziniaré",
      summary:
        "Burkina24 documente la projection-débat du film À tout prix à Ziniaré (9 décembre 2025) dans le cadre des 16 jours d'activisme contre les VBG. Révèle que 4 jeunes filles ont été victimes d'excision en 2024 dans la région d'Oubri. Azaratou Bancé explique l'approche du film centrée sur les conséquences psychologiques.",
      sourceName: "Burkina24",
      sourceUrl:
        "https://burkina24.com/2025/12/10/16-jours-dactivisme-taafe-vision-utilise-le-cinema-pour-sensibiliser-aux-violences-faites-aux-femmes/",
      sourceType: "Presse nationale",
      publishedAt: "10 décembre 2025",
      topic: "Sensibilisation — 16 jours d'activisme",
    },
    {
      title: "10 projets de films de la 6e promotion — pitch à l'ABCA (mai 2026)",
      summary:
        "Burkina24 couvre la présentation de 10 projets de courts métrages par la 6e promotion de Taafé Vision à l'ABCA le 29 mai 2026. 3 projets seront sélectionnés pour la production. Cet exercice confronte les autrices à un regard critique de professionnels du cinéma.",
      sourceName: "Burkina24",
      sourceUrl:
        "https://burkina24.com/2026/05/30/cinema-au-feminin-avec-taafe-vision-10-projets-de-films-pour-briser-les-silences/",
      sourceType: "Presse nationale",
      publishedAt: "30 mai 2026",
      topic: "Formation — 6e promotion",
    },
    {
      title: "Equipop — De l'idée au court métrage (partenaire)",
      summary:
        "Equipop, partenaire de Taafé Vision, documente le programme « De l'idée au court métrage » : formation de femmes en écriture et réalisation de courts métrages sur les violences basées sur le genre au Burkina Faso.",
      sourceName: "Equipop",
      sourceUrl: "https://equipop.org/de-lidee-au-court-metrage/",
      sourceType: "Organisation partenaire",
      publishedAt: "2023",
      topic: "Partenariat — De l'idée au court métrage",
    },
  ];
  for (const s of sourcesData) await db.insert(researchSources).values(s);
  console.log(`  ✓ ${sourcesData.length} sources de recherche enregistrées.\n`);

  console.log("✅ Enrichissement terminé avec succès !");
  console.log("\nRécapitulatif :");
  console.log(`  - Profil organisation : mis à jour`);
  console.log(`  - Métriques d'impact : ${metricsData.length}`);
  console.log(`  - Projets : ${projectsData.length}`);
  console.log(`  - Films : ${filmsData.length}`);
  console.log(`  - Articles : ${articlesData.length}`);
  console.log(`  - Partenaires : ${partnersData.length}`);
  console.log(`  - Sources de recherche : ${sourcesData.length}`);
}

main().catch((err) => {
  console.error("❌ Erreur lors de l'enrichissement :", err);
  process.exit(1);
});
