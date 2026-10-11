import productionCrewImage from "@assets/Productions_de_court_métrage_1767878670665.png";

type FilmImageSource = {
  id: number;
  title: string;
  imageUrl?: string | null;
};

const FILM_COVER_OVERRIDES: Record<string, string> = {
  "a tout prix": "/images/films-bg.jpg",
  "le poids du deshonneur": "/images/community-engagement-1.jpg",
  kanu: productionCrewImage,
  "les inseparables": "/images/community-screening.jpg",
};

const LOCAL_FILM_PHOTOS = [
  "/images/films-bg.jpg",
  "/images/community-engagement-1.jpg",
  productionCrewImage,
  "/images/community-screening.jpg",
];

export function getFilmCoverImage(film: FilmImageSource): string | undefined {
  const normalizedTitle = film.title
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const specificCover = FILM_COVER_OVERRIDES[normalizedTitle];

  if (specificCover) return specificCover;

  // Avoid repeating generic stock clapboard photos if a future record uses them.
  if (film.imageUrl?.startsWith("https://images.unsplash.com/")) {
    return LOCAL_FILM_PHOTOS[Math.abs(film.id) % LOCAL_FILM_PHOTOS.length];
  }

  return film.imageUrl || undefined;
}
