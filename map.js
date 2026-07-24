/* =========================================================
 *  KoreaMap — 순수 SVG 기반 대한민국 지도 엔진 (오프라인 동작)
 *  외부 타일 서버·CDN 의존 없이 좌표(lat/lng)를 직접 투영하여
 *  해안선(근사 스타일라이즈)과 마커를 그리고, 휠 확대/드래그 이동을 지원한다.
 * ========================================================= */
(function (global) {
  "use strict";

  // ── 좌표계 설정 ──
  const LAT_MIN = 32.9, LAT_MAX = 38.75;
  const LNG_MIN = 124.5, LNG_MAX = 129.75;
  const VIEW_W = 620, VIEW_H = 820, PAD = 24;

  const COS_MID = Math.cos(((LAT_MIN + LAT_MAX) / 2) * Math.PI / 180);
  const usableW = VIEW_W - PAD * 2, usableH = VIEW_H - PAD * 2;
  const degW = (LNG_MAX - LNG_MIN) * COS_MID;
  const degH = (LAT_MAX - LAT_MIN);
  const SCALE = Math.min(usableW / degW, usableH / degH);
  const OFFSET_X = PAD + (usableW - degW * SCALE) / 2;
  const OFFSET_Y = PAD + (usableH - degH * SCALE) / 2;

  function project(lat, lng) {
    return [
      OFFSET_X + (lng - LNG_MIN) * COS_MID * SCALE,
      OFFSET_Y + (LAT_MAX - lat) * SCALE,
    ];
  }

  // 남한 해안선 — 실측 경계가 아닌 시각화용 근사(스타일라이즈) 좌표
  const KOREA_OUTLINE = [
    [37.85,126.60],[37.75,126.40],[37.62,126.35],[37.48,126.35],[37.20,126.35],
    [36.98,126.30],[36.80,126.15],[36.75,126.10],[36.60,126.20],[36.40,126.35],
    [36.15,126.45],[35.97,126.60],[35.75,126.45],[35.55,126.45],[35.35,126.35],
    [35.15,126.35],[34.95,126.30],[34.81,126.39],[34.60,126.45],[34.35,126.55],
    [34.45,126.75],[34.55,126.95],[34.60,127.15],[34.48,127.30],[34.60,127.45],
    [34.75,127.50],[34.90,127.65],[34.74,127.75],[34.85,127.85],[34.95,127.95],
    [34.95,128.15],[34.85,128.30],[34.90,128.45],[34.80,128.55],[34.75,128.70],
    [34.85,128.75],[35.00,128.80],[35.10,128.95],[35.05,129.05],[35.18,129.20],
    [35.30,129.25],[35.54,129.42],[35.75,129.45],[35.98,129.42],[36.05,129.40],
    [36.30,129.40],[36.55,129.42],[36.85,129.30],[37.10,129.20],[37.45,129.13],
    [37.75,128.95],[38.00,128.75],[38.20,128.60],[38.35,128.45],[38.30,127.90],
    [38.25,127.30],[38.15,126.95],[37.95,126.70],
  ];
  const JEJU_CENTER = [33.38, 126.55];
  const CITY_LABELS = [
    ["서울", 37.62, 126.98], ["대전", 36.30, 127.20], ["대구", 35.75, 128.48],
    ["광주", 35.05, 126.72], ["부산", 35.02, 128.98], ["제주", 33.30, 126.55],
  ];

  function catmullRom(pts, closed) {
    const n = pts.length;
    const get = i => pts[((i % n) + n) % n];
    let d = `M ${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)} `;
    const count = closed ? n : n - 1;
    for (let i = 0; i < count; i++) {
      const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
      const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += `C ${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} `;
    }
    if (closed) d += "Z";
    return d;
  }

  const SVG_NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs) => {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  function KoreaMap(containerId) {
    const container = document.getElementById(containerId);
    container.classList.add("korea-map-wrap");

    const svg = el("svg", {
      viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
      class: "korea-svg",
      preserveAspectRatio: "xMidYMid meet",
    });
    container.appendChild(svg);

    // 배경 해양 그라데이션
    const defs = el("defs", {});
    defs.innerHTML = `
      <radialGradient id="oceanGrad" cx="50%" cy="35%" r="75%">
        <stop offset="0%" stop-color="#132038"/>
        <stop offset="100%" stop-color="#0b1220"/>
      </radialGradient>
      <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#22304d"/>
        <stop offset="100%" stop-color="#1a2740"/>
      </linearGradient>`;
    svg.appendChild(defs);
    svg.appendChild(el("rect", { x: 0, y: 0, width: VIEW_W, height: VIEW_H, fill: "url(#oceanGrad)" }));

    // 해안선(육지) + 제주
    const outlinePx = KOREA_OUTLINE.map(([la, ln]) => project(la, ln));
    svg.appendChild(el("path", {
      d: catmullRom(outlinePx, true),
      fill: "url(#landGrad)", stroke: "#3b4a6b", "stroke-width": 1.4, "stroke-linejoin": "round",
    }));
    const [jx, jy] = project(JEJU_CENTER[0], JEJU_CENTER[1]);
    svg.appendChild(el("ellipse", {
      cx: jx, cy: jy, rx: 30, ry: 13, transform: `rotate(-7 ${jx} ${jy})`,
      fill: "url(#landGrad)", stroke: "#3b4a6b", "stroke-width": 1.2,
    }));

    // 도시 라벨
    const labelLayer = el("g", { class: "city-labels" });
    CITY_LABELS.forEach(([name, la, ln]) => {
      const [x, y] = project(la, ln);
      const t = el("text", { x, y, class: "city-label" });
      t.textContent = name;
      labelLayer.appendChild(t);
    });
    svg.appendChild(labelLayer);

    const markerLayer = el("g", { class: "marker-layer" });
    svg.appendChild(markerLayer);

    // ── 확대/이동 상태 (viewBox 직접 제어) ──
    const state = { vx: 0, vy: 0, vw: VIEW_W, vh: VIEW_H };
    const markerEls = {}; // id -> circle
    const BASE_R = {};    // id -> base radius
    const BASE_SW = 1.6;

    function applyViewBox() {
      svg.setAttribute("viewBox", `${state.vx} ${state.vy} ${state.vw} ${state.vh}`);
      const factor = state.vw / VIEW_W;
      for (const id in markerEls) {
        const c = markerEls[id];
        c.setAttribute("r", (BASE_R[id] || 6) * factor);
        c.setAttribute("stroke-width", BASE_SW * factor);
      }
      labelLayer.setAttribute("transform", `scale(1)`); // 라벨은 지도와 함께 확대(자연스러움)
    }
    applyViewBox();

    function clientToUser(clientX, clientY) {
      const pt = svg.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const p = pt.matrixTransform(ctm.inverse());
      return { x: p.x, y: p.y };
    }

    function zoomAt(x, y, factor) {
      const curScale = VIEW_W / state.vw;
      const newScale = clamp(curScale * factor, 1, 7);
      const newVw = VIEW_W / newScale, newVh = VIEW_H / newScale;
      const ratioX = (x - state.vx) / state.vw;
      const ratioY = (y - state.vy) / state.vh;
      state.vx = clamp(x - ratioX * newVw, 0, Math.max(0, VIEW_W - newVw));
      state.vy = clamp(y - ratioY * newVh, 0, Math.max(0, VIEW_H - newVh));
      state.vw = newVw; state.vh = newVh;
      applyViewBox();
    }

    svg.addEventListener("wheel", e => {
      e.preventDefault();
      const { x, y } = clientToUser(e.clientX, e.clientY);
      zoomAt(x, y, e.deltaY < 0 ? 1.18 : 1 / 1.18);
    }, { passive: false });

    let dragging = false, moved = false, dragStart = null;
    svg.addEventListener("pointerdown", e => {
      dragging = true; moved = false;
      dragStart = { x: e.clientX, y: e.clientY, vx: state.vx, vy: state.vy };
      svg.setPointerCapture(e.pointerId);
    });
    svg.addEventListener("pointermove", e => {
      if (!dragging) return;
      const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      if (!moved) return;
      const rect = svg.getBoundingClientRect();
      const sx = state.vw / rect.width, sy = state.vh / rect.height;
      state.vx = clamp(dragStart.vx - dx * sx, 0, Math.max(0, VIEW_W - state.vw));
      state.vy = clamp(dragStart.vy - dy * sy, 0, Math.max(0, VIEW_H - state.vh));
      applyViewBox();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(ev =>
      svg.addEventListener(ev, e => { dragging = false; }));

    function animateViewBox(tvx, tvy, tvw, tvh, duration = 450) {
      const start = { ...state };
      const t0 = performance.now();
      function step(now) {
        const t = Math.min(1, (now - t0) / duration);
        const ee = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        state.vx = start.vx + (tvx - start.vx) * ee;
        state.vy = start.vy + (tvy - start.vy) * ee;
        state.vw = start.vw + (tvw - start.vw) * ee;
        state.vh = start.vh + (tvh - start.vh) * ee;
        applyViewBox();
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // ── 줌 컨트롤 버튼 ──
    const controls = document.createElement("div");
    controls.className = "map-zoom-controls";
    controls.innerHTML = `
      <button type="button" data-act="in" title="확대">+</button>
      <button type="button" data-act="out" title="축소">−</button>
      <button type="button" data-act="reset" title="처음으로">⟲</button>`;
    container.appendChild(controls);
    controls.addEventListener("click", e => {
      const act = e.target.dataset.act;
      if (!act) return;
      const cx = state.vx + state.vw / 2, cy = state.vy + state.vh / 2;
      if (act === "in") zoomAt(cx, cy, 1.4);
      else if (act === "out") zoomAt(cx, cy, 1 / 1.4);
      else if (act === "reset") animateViewBox(0, 0, VIEW_W, VIEW_H);
    });

    // ── 공개 API ──
    const api = {
      svgEl: svg,
      addMarkers(items, opts) {
        items.forEach(item => {
          const id = opts.id(item);
          const [x, y] = project(item.lat, item.lng);
          const r = opts.getRadius(item);
          BASE_R[id] = r;
          const g = el("g", { class: "marker", "data-id": id, transform: `translate(${x},${y})` });
          const circle = el("circle", {
            r, fill: opts.getColor(item),
            stroke: "#0b1220", "stroke-width": BASE_SW, class: "marker-circle",
          });
          const title = el("title", {});
          title.textContent = item.name;
          g.appendChild(circle);
          g.appendChild(title);
          g.addEventListener("click", () => opts.onClick(item));
          markerLayer.appendChild(g);
          markerEls[id] = circle;
        });
        applyViewBox();
      },
      setFavorite(id, isFav) {
        const c = markerEls[id];
        if (c) c.classList.toggle("is-favorite", !!isFav);
      },
      setSelected(id) {
        Object.keys(markerEls).forEach(k => markerEls[k].classList.toggle("is-selected", k === id));
      },
      flyTo(lat, lng, targetScale = 2.4) {
        const [x, y] = project(lat, lng);
        const newVw = VIEW_W / targetScale, newVh = VIEW_H / targetScale;
        const newVx = clamp(x - newVw / 2, 0, Math.max(0, VIEW_W - newVw));
        const newVy = clamp(y - newVh / 2, 0, Math.max(0, VIEW_H - newVh));
        animateViewBox(newVx, newVy, newVw, newVh);
      },
      reset() { animateViewBox(0, 0, VIEW_W, VIEW_H); },
    };
    return api;
  }

  global.KoreaMap = KoreaMap;
})(window);
