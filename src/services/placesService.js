const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1";

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.rating",
  "places.userRatingCount",
  "places.photos",
  "places.googleMapsUri",
  "places.websiteUri",
].join(",");

// ── SEARCH CAFES BY CITY (Text Search) ───────────────
export async function searchCafes(city) {
  const response = await fetch(`${BASE_URL}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery: `cafes in ${city}`,
      languageCode: "en",
    }),
  });

  if (!response.ok) throw new Error(`Places API error: ${response.status}`);

  const data = await response.json();

  if (!data.places || data.places.length === 0) {
    throw new Error(`No cafes found in ${city}. Try another city.`);
  }

  return data.places;
}

// ── SEARCH CAFES BY LOCATION (Nearby Search) ─────────
// lat, lng — from browser GPS
// radius   — in metres (1000, 2000, 5000, 10000)
export async function searchCafesByLocation(lat, lng, radius) {
  const response = await fetch(`${BASE_URL}/places:searchNearby`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({
      includedTypes: ["cafe"],
      maxResultCount: 20,
      rankPreference: "DISTANCE", // add this — ranks by closest first
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius: radius,
        },
      },
    }),
  });

  if (!response.ok) throw new Error(`Places API error: ${response.status}`);

  const data = await response.json();

  if (!data.places || data.places.length === 0) {
    throw new Error(
      radius >= 50000
        ? "No cafes found nearby. Try a different location."
        : `No cafes found within ${radius / 1000}km. Try increasing the radius.`,
    );
  }

  return data.places;
}

// ── PICK A RANDOM CAFE ────────────────────────────────
export function pickRandomCafe(places) {
  const index = Math.floor(Math.random() * places.length);
  return places[index];
}

// ── GET PHOTO URL ─────────────────────────────────────
export function getPhotoUrl(place, maxWidth = 600) {
  if (!place.photos || place.photos.length === 0) return null;
  const photoName = place.photos[0].name;
  return `${BASE_URL}/${photoName}/media?maxWidthPx=${maxWidth}&skipHttpRedirect=false&key=${API_KEY}`;
}

// ── FORMAT CAFE DATA ──────────────────────────────────
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

// ── GET RANDOM CAFE BY CITY ───────────────────────────
// Used by CitySearch
export async function getRandomCafe(city) {
  const places = await searchCafes(city);
  const picked = pickRandomCafe(places);
  return formatCafe(picked);
}

// ── GET RANDOM CAFE BY LOCATION ───────────────────────
// Used by LocationSearch
export async function getRandomCafeByLocation(lat, lng, radius) {
  const places = await searchCafesByLocation(lat, lng, radius);
  const picked = pickRandomCafe(places);
  return formatCafe(picked);
}
