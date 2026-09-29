// GET /api/building?slug=<buildingId>
//
// Returns one building's guest-facing data, selected by (in priority order):
//   1. The session cookie's grant, if valid (so a guest can't read another
//      building's codes by editing the URL).
//   2. The `slug` query param — how the multi-property sub-URLs (/:buildingSlug/*)
//      pick their building.
//   3. DEFAULT_BUILDING_ID, if neither of the above applies.
// The magic-link requirement is temporarily disabled (REQUIRE_GRANT = false) so
// each building's booklet is reachable from its own URL with no link at all.
// Flip REQUIRE_GRANT back to true to re-enforce it once ready.
import buildings from "./_data/buildings.json";
import { COOKIE_NAME, getCookie, getGrant, isGrantValid, json } from "./_lib/grants";

const REQUIRE_GRANT = false;
const DEFAULT_BUILDING_ID = "lamartine";

export default async (req: Request) => {
  const token = getCookie(req, COOKIE_NAME);
  const grant = token ? await getGrant(token) : null;
  const slug = new URL(req.url).searchParams.get("slug");

  let buildingId = slug || DEFAULT_BUILDING_ID;
  let validUntil: number | undefined;

  if (isGrantValid(grant)) {
    buildingId = grant!.buildingId;
    // Include validUntil so the client can hide values once the stay ends,
    // even while offline (cached).
    validUntil = grant!.validUntil;
  } else if (REQUIRE_GRANT) {
    return json(401, { error: token ? "invalid_or_expired" : "no_session" });
  }

  const data = (buildings as Record<string, unknown>)[buildingId];
  if (!data) return json(404, { error: "building_not_found" });

  return json(200, { ...(data as object), ...(validUntil ? { validUntil } : {}) });
};
