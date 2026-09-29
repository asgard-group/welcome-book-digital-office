// GET /api/building?slug=<buildingId>
//
// Returns one building's guest-facing data, selected by the `slug` query
// param — how the multi-property sub-URLs (/:buildingSlug/*) pick their
// building. Each building's booklet is a fixed, public URL: no login, no link.
import buildings from "./_data/buildings.json";

const DEFAULT_BUILDING_ID = "lamartine";

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default async (req: Request) => {
  const slug = new URL(req.url).searchParams.get("slug");
  const buildingId = slug || DEFAULT_BUILDING_ID;

  const data = (buildings as Record<string, unknown>)[buildingId];
  if (!data) return json(404, { error: "building_not_found" });

  return json(200, data as object);
};
