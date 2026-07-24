import json, math, sys

IN = r"C:\Users\user\Desktop\eunsy09\eunsy09.github.io\_tools\skorea.geojson"
OUT_JS = r"C:\Users\user\Desktop\eunsy09\eunsy09.github.io\korea-geo.js"

def perp_dist(pt, a, b):
    (x, y), (ax, ay), (bx, by) = pt, a, b
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return math.hypot(x - ax, y - ay)
    t = ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)
    t = max(0, min(1, t))
    px, py = ax + t * dx, ay + t * dy
    return math.hypot(x - px, y - py)

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    dmax, idx = 0, 0
    for i in range(1, len(points) - 1):
        d = perp_dist(points[i], points[0], points[-1])
        if d > dmax:
            dmax, idx = d, i
    if dmax > epsilon:
        left = rdp(points[:idx + 1], epsilon)
        right = rdp(points[idx:], epsilon)
        return left[:-1] + right
    else:
        return [points[0], points[-1]]

def ring_bbox_diag(ring):
    lons = [p[0] for p in ring]; lats = [p[1] for p in ring]
    return math.hypot(max(lons) - min(lons), max(lats) - min(lats))

def ring_area(ring):
    a = 0
    for i in range(len(ring) - 1):
        x1, y1 = ring[i]; x2, y2 = ring[i + 1]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2

print("loading...")
data = json.load(open(IN, encoding="utf-8"))
feat = data["features"][0]
geom = feat["geometry"]
polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
print("polygon count:", len(polys))

rings = []
for poly in polys:
    exterior = poly[0]  # skip holes
    rings.append(exterior)

print("total rings:", len(rings))
sized = [(ring_bbox_diag(r), ring_area(r), r) for r in rings]
sized.sort(key=lambda t: -t[1])

# keep rings that are reasonably sized islands; drop tiny islets
kept = [t for t in sized if t[0] > 0.02]  # bbox diagonal > ~0.02 deg (~2km)
print("kept rings (area filter):", len(kept), "of", len(sized))

EPS = 0.006  # degrees, ~600m simplification tolerance
out_rings = []
total_pts = 0
for diag, area, ring in kept:
    pts = [(lon, lat) for lon, lat in ring]
    simplified = rdp(pts, EPS)
    if len(simplified) < 4:
        continue
    out_rings.append(simplified)
    total_pts += len(simplified)

print("output rings:", len(out_rings), "total points:", total_pts)

# sort by size desc, cap number of small islands to keep file reasonable
out_rings.sort(key=lambda r: -len(r))
MAX_RINGS = 60
out_rings = out_rings[:MAX_RINGS]
total_pts = sum(len(r) for r in out_rings)
print("after cap:", len(out_rings), "rings,", total_pts, "points")

# emit as [lat, lng] to match existing convention
js_rings = []
for ring in out_rings:
    pts = [[round(lat, 4), round(lon, 4)] for lon, lat in ring]
    js_rings.append(pts)

with open(OUT_JS, "w", encoding="utf-8") as f:
    f.write("// 자동 생성: 대한민국 실제 해안선 (GADM 경계 데이터를 Douglas-Peucker로 단순화)\n")
    f.write("// 각 원소는 폐곡선 하나(육지 또는 섬)를 이루는 [lat, lng] 점 배열입니다.\n")
    f.write("const KOREA_LAND_RINGS = ")
    f.write(json.dumps(js_rings, ensure_ascii=False, separators=(",", ":")))
    f.write(";\n")

print("wrote", OUT_JS)

# 소스 데이터 재취득 방법:
# curl -sL -o skorea.geojson https://raw.githubusercontent.com/southkorea/southkorea-maps/master/gadm/json/skorea-geo.json
