import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { PropertyData } from "./types";

/** Building slug used by the "/" → "/:buildingSlug" redirect and dev fallbacks. */
export const DEFAULT_BUILDING_SLUG = "lamartine";

/** Fallback background/logo, used until a building's own data has loaded. */
export const DEFAULT_BACKGROUND_URL = "/buildings/lamartine/hero.jpg";
export const DEFAULT_LOGO_URL = "/buildings/lamartine/logo-photoroom-white.png";

/** Dev-only sample used when running plain `vite dev` (no backend). */
const DEV_BUILDING: PropertyData = {
  id: "dev",
  name: "Dev Building",
  address: "1 rue de Test, 75000 Paris",
  wifi: { network: "Dev_WiFi_5G", password: "dev-password-123" },
  guestWifi: { network: "Dev_WiFi_Guest", password: "dev-guest-123" },
  entryCodes: { buildingDoor: "0000", hallCode: "0000" },
  colors: { primary: "#312B37", secondary: "#FFFBF2" },
  backgroundUrl: DEFAULT_BACKGROUND_URL,
  logoUrl: DEFAULT_LOGO_URL,
};

/**
 * Fetch the guest's building data for the given slug (the `:buildingSlug` route param).
 *
 * A valid session cookie (set at `/access`) overrides the slug server-side, so a
 * guest with a grant always sees their own building even if the URL is edited.
 * A 404 means the slug doesn't match any building and surfaces as `isError`
 * with a "building_not_found" message for AuthGate to show a dedicated screen.
 *
 * Plain `vite dev` has no functions, so a dev sample is returned to keep UI
 * work possible regardless of slug. Under `netlify dev` the real function runs
 * so the "unknown building" flow can be exercised too.
 */
async function fetchBuilding(buildingSlug?: string): Promise<PropertyData> {
  const url = buildingSlug ? `/api/building?slug=${encodeURIComponent(buildingSlug)}` : "/api/building";
  let res: Response;
  try {
    res = await fetch(url, { credentials: "include" });
  } catch {
    if (import.meta.env.DEV) return DEV_BUILDING;
    throw new Error("network_error");
  }
  if (res.ok) return (await res.json()) as PropertyData;
  if (res.status === 404) {
    if (import.meta.env.DEV) return DEV_BUILDING;
    throw new Error("building_not_found");
  }
  throw new Error(`building_unavailable_${res.status}`);
}

export function useProperty() {
  const { buildingSlug } = useParams<{ buildingSlug?: string }>();
  const query = useQuery({
    queryKey: ["building", buildingSlug],
    queryFn: () => fetchBuilding(buildingSlug),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: (query.error as Error) ?? null,
  };
}
