const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1";

// ── SEARCH CAFES BY CITY ──────────────────────────────
// Takes a city string, returns an array of cafe objects
export async function searchCafes(city) {
  const response = await fetch(`${BASE_URL}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.rating",
        "places.userRatingCount",
        "places.photos",
        "places.googleMapsUri",
        "places.websiteUri",
      ].join(","),
    },
    body: JSON.stringify({
      textQuery: `cafes in ${city}`,
      languageCode: "en",
    }),
  });

  if (!response.ok) {
    throw new Error(`Places API error: ${response.status}`);
  }

  const data = await response.json();

  if (!data.places || data.places.length === 0) {
    throw new Error(`No cafes found in ${city}. Try another city.`);
  }

  return data.places;
}

// ── PICK A RANDOM CAFE ────────────────────────────────
// Takes the places array, returns one random cafe
export function pickRandomCafe(places) {
  const index = Math.floor(Math.random() * places.length);
  return places[index];
}

// ── GET PHOTO URL ─────────────────────────────────────
// Takes a place object, returns the first photo URL or null
export function getPhotoUrl(place, maxWidth = 600) {
  if (!place.photos || place.photos.length === 0) return null;

  const photoName = place.photos[0].name;
  return `${BASE_URL}/${photoName}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}

// ── FORMAT CAFE DATA ──────────────────────────────────
// Normalises a raw place object into what CafeResult needs
export function formatCafe(place) {
  return {
    name: place.displayName?.text || "Unknown Cafe",
    address: place.formattedAddress || "Address unavailable",
    rating: place.rating ?? null,
    ratingCount: place.userRatingCount ?? null,
    photoUrl: getPhotoUrl(place),
    googleUrl: `https://www.google.com/search?q=${encodeURIComponent(
      (place.displayName?.text || "") + " " + (place.formattedAddress || ""),
    )}`,
    mapsUrl: place.googleMapsUri || null,
  };
}

// ── MAIN FUNCTION ─────────────────────────────────────
// The one function CitySearch will call — does everything
export async function getRandomCafe(city) {
  const places = await searchCafes(city);
  const picked = pickRandomCafe(places);
  return formatCafe(picked);
}
