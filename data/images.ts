// KONFIGURATION DER BILDER
// =========================
//
// WICHTIG: 
// Bitte stellen Sie sicher, dass die folgenden Dateien im Ordner `public/images` liegen:
// - restaurant1.jpg
// - restaurant2.jpg
// - restaurant3.jpg
// - restaurant4.jpg
// - restaurant5.jpg
// - essen1.jpg
// - reserviert.jpg

export const IMAGES = {
  // Das große Bild auf der Startseite oben
  HOME_HERO: "/images/restaurant1.jpg",
  
  // Das Bild auf der Kontaktseite (als Hintergrund für den Karten-Link)
  CONTACT_MAP: "/images/restaurant2.jpg",

  // Die Bilder für die Galerie
  GALLERY: [
    "/images/essen1.jpg",      // Fokus auf das Essen
    "/images/restaurant3.jpg", // Interieur / Atmosphäre
    "/images/reserviert.jpg",  // Detailaufnahme Tisch
    "/images/restaurant4.jpg", // Weiterer Raum
    "/images/restaurant5.jpg", // Details
    "/images/restaurant1.jpg", // Wiederholung des Hero-Motivs
  ]
};