/**
 * A piece of Notion-sourced text, auto-translated to English at sync time
 * (see `scripts/sync-notion.mjs`'s `translateToEnglish`). `en` falls back to
 * the French text when translation wasn't available at sync time.
 */
export type Bilingual = { fr: string; en: string };

/**
 * Shape of a single building's guest-facing data.
 *
 * Served by `GET /api/building` (see `netlify/functions/building.ts`), backed
 * by `netlify/functions/_data/buildings.json`. Keep this in sync with that file.
 */
export type PropertyData = {
  /** Stable building identifier; matches its key in `buildings.json`. */
  id: string;
  /** Public-facing building / property name (shown on the welcome screen). */
  name: string;
  /** Optional until every building sets it. */
  address?: string;
  wifi: {
    network: string;
    password: string;
  };
  /** Guest wifi network, separate from the main one above. Optional until every building sets it. */
  guestWifi?: {
    network: string;
    password: string;
  };
  entryCodes: {
    /** Street door / building entrance keypad code. */
    buildingDoor: string;
    /** Hall access code, entered on the intercom after the street door. */
    hallCode: string;
  };
  /** Brand colors as hex strings. Optional until every building sets them. */
  colors?: {
    primary: string;
    secondary: string;
  };
  /** Hero background photo, served from /buildings/<id>/. Optional until every building sets it. */
  backgroundUrl?: string;
  /** Client logo, served from /buildings/<id>/. Optional until every building sets it. */
  logoUrl?: string;
  /** From the building's Notion "Services" sub-database. Optional until synced. */
  services?: {
    included: { name: Bilingual; icon: string }[];
    quote: { name: Bilingual; icon: string; email?: string }[];
  };
  /**
   * From the building's Notion "Adresses utiles" sub-database, grouped by category id.
   * Optional until synced. `name`/`address` aren't translated (real place names/addresses).
   */
  addresses?: Record<
    string,
    { name: string; address: string; distance?: string; price?: string; description?: Bilingual }[]
  >;
  /**
   * From the building's Notion "Guide de l'espace" sub-databases (equipment + floors),
   * merged into one ordered list of sections. Optional until synced.
   */
  facilities?: {
    sections: {
      id: string;
      title: Bilingual;
      kind: "video" | "info";
      icon?: string;
      /** Shared image for "info" (floor) sections. */
      imageUrl?: string;
      items: {
        name: Bilingual;
        detail?: Bilingual;
        videoUrl?: string;
        /** Per-item image for "video" (equipment) sections. */
        imageUrl?: string;
      }[];
    }[];
  };
};
