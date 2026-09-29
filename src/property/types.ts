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
};
