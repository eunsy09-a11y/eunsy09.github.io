/* =========================================================
 *  대학 입시 지도 — 앱 로직
 * ========================================================= */

const TIER_COLOR = {
  "최상위": "#ff6b7a",
  "상위":   "#ffb454",
  "중상위": "#4f8cff",
  "중위":   "#37c2a3",
  "중하위": "#a78bfa",
};
const TIER_SIZE = { "최상위": 7.2, "상위": 6.4, "중상위": 5.8, "중위": 5.2, "중하위": 4.6 };

// ── 9등급제 ↔ 5등급제 변환 데이터 (누적 상위 % 경계 기준) ──
const GRADE9 = [
  { g: 1, cum: 4 },   { g: 2, cum: 11 },  { g: 3, cum: 23 },
  { g: 4, cum: 40 },  { g: 5, cum: 60 },  { g: 6, cum: 77 },
  { g: 7, cum: 89 },  { g: 8, cum: 96 },  { g: 9, cum: 100 },
];
const GRADE5 = [
  { g: 1, cum: 10 },  { g: 2, cum: 34 },  { g: 3, cum: 66 },
  { g: 4, cum: 90 },  { g: 5, cum: 100 },
];
function pctToGrade5(pct) { for (const row of GRADE5) if (pct <= row.cum) return row.g; return 5; }
function grade9to5(g9) { return pctToGrade5(GRADE9.find(r => r.g === g9).cum); }

/* ---------------- 즐겨찾기 (localStorage) ---------------- */
const FAV_KEY = "univmap_favorites";
function getFavorites() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]")); }
  catch { return new Set(); }
}
function saveFavorites(set) { localStorage.setItem(FAV_KEY, JSON.stringify([...set])); }
let favorites = getFavorites();
function isFavorite(id) { return favorites.has(id); }
function toggleFavorite(id) {
  if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
  saveFavorites(favorites);
  map.setFavorite(id, favorites.has(id));
  renderList();
  if (activeId === id) renderDetail(UNIVERSITIES.find(u => u.id === id));
}

/* ---------------- 비교하기 (localStorage) ---------------- */
const CMP_KEY = "univmap_compare";
let compareIds = [];
try { compareIds = JSON.parse(localStorage.getItem(CMP_KEY) || "[]"); } catch { compareIds = []; }
const CMP_MAX = 3;
function saveCompare() { localStorage.setItem(CMP_KEY, JSON.stringify(compareIds)); }
function isComparing(id) { return compareIds.includes(id); }
function toggleCompare(id) {
  if (compareIds.includes(id)) {
    compareIds = compareIds.filter(x => x !== id);
  } else {
    if (compareIds.length >= CMP_MAX) {
      alert(`비교는 최대 ${CMP_MAX}개까지 선택할 수 있습니다.`);
      return;
    }
    compareIds.push(id);
  }
  saveCompare();
  renderCompareBar();
  if (activeId) renderDetail(UNIVERSITIES.find(u => u.id === activeId));
}

/* ---------------- 지도 초기화 ---------------- */
const map = KoreaMap("map");
map.addMarkers(UNIVERSITIES, {
  id: u => u.id,
  getColor: u => TIER_COLOR[u.tier] || "#4f8cff",
  getRadius: u => TIER_SIZE[u.tier] || 5.5,
  onClick: u => selectUni(u.id),
});
UNIVERSITIES.forEach(u => { if (isFavorite(u.id)) map.setFavorite(u.id, true); });

/* ---------------- 사이드바 목록 ---------------- */
const listEl = document.getElementById("uniList");
const searchEl = document.getElementById("search");
let activeRegion = "전체";
let favoritesOnly = false;
let activeId = null;

function badgeChar(name) { return name.trim().charAt(0); }

function renderList() {
  const q = searchEl.value.trim().toLowerCase();
  const items = UNIVERSITIES.filter(u => {
    const okRegion = activeRegion === "전체" || u.region === activeRegion;
    const okQuery = !q || u.name.toLowerCase().includes(q) ||
      u.majors.some(mj => mj.name.toLowerCase().includes(q));
    const okFav = !favoritesOnly || isFavorite(u.id);
    return okRegion && okQuery && okFav;
  });

  if (!items.length) {
    listEl.innerHTML = `<div class="list-empty">검색 결과가 없습니다.</div>`;
    return;
  }
  listEl.innerHTML = items.map(u => `
    <div class="uni-item ${u.id === activeId ? "active" : ""}" data-id="${u.id}">
      <div class="badge-sm" style="background:${TIER_COLOR[u.tier]}">${badgeChar(u.name)}</div>
      <div class="meta">
        <div class="nm">${u.name}</div>
        <div class="sub">${u.region} · ${u.type} · ${u.tier}</div>
      </div>
      <button class="icon-btn star ${isFavorite(u.id) ? "on" : ""}" data-fav="${u.id}" title="즐겨찾기">${isFavorite(u.id) ? "★" : "☆"}</button>
    </div>`).join("");

  listEl.querySelectorAll(".uni-item").forEach(elItem =>
    elItem.addEventListener("click", (e) => {
      if (e.target.closest(".star")) return;
      selectUni(elItem.dataset.id);
    }));
  listEl.querySelectorAll(".star").forEach(btn =>
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.fav); }));
}

// 지역 필터 칩 (+ 즐겨찾기 토글)
const regions = ["전체", ...new Set(UNIVERSITIES.map(u => u.region))];
const filterRow = document.getElementById("filterRow");
filterRow.innerHTML =
  `<button class="chip fav-chip" data-fav-toggle="1">⭐ 즐겨찾기</button>` +
  regions.map(r => `<button class="chip ${r === "전체" ? "active" : ""}" data-region="${r}">${r}</button>`).join("");

filterRow.querySelector("[data-fav-toggle]").addEventListener("click", (e) => {
  favoritesOnly = !favoritesOnly;
  e.target.classList.toggle("active", favoritesOnly);
  renderList();
});
filterRow.querySelectorAll("[data-region]").forEach(c =>
  c.addEventListener("click", () => {
    activeRegion = c.dataset.region;
    filterRow.querySelectorAll("[data-region]").forEach(x => x.classList.toggle("active", x === c));
    renderList();
  }));

searchEl.addEventListener("input", renderList);

/* ---------------- 대학 선택 → 상세 패널 ---------------- */
function selectUni(id) {
  const u = UNIVERSITIES.find(x => x.id === id);
  if (!u) return;
  activeId = id;
  renderList();
  map.flyTo(u.lat, u.lng, 2.6);
  map.setSelected(id);
  renderDetail(u);
  document.getElementById("detail").classList.add("open");
}

document.getElementById("detailClose").addEventListener("click", () => {
  document.getElementById("detail").classList.remove("open");
  activeId = null;
  map.setSelected(null);
  renderList();
});

function renderDetail(u) {
  document.getElementById("dBadge").textContent = badgeChar(u.name);
  document.getElementById("dBadge").style.background = TIER_COLOR[u.tier];
  document.getElementById("dName").textContent = u.name;
  document.getElementById("dTags").innerHTML = `
    <span class="tag type-${u.type}">${u.type}</span>
    <span class="tag">${u.region}</span>
    <span class="tag">${u.tier}</span>`;

  const fav = isFavorite(u.id), cmp = isComparing(u.id);
  document.getElementById("dActions").innerHTML = `
    <button class="action-btn ${fav ? "on" : ""}" id="dFavBtn">${fav ? "★ 즐겨찾기됨" : "☆ 즐겨찾기"}</button>
    <button class="action-btn ${cmp ? "on" : ""}" id="dCmpBtn">${cmp ? "✓ 비교중" : "＋ 비교 추가"}</button>`;
  document.getElementById("dFavBtn").addEventListener("click", () => toggleFavorite(u.id));
  document.getElementById("dCmpBtn").addEventListener("click", () => toggleCompare(u.id));

  // 탭 1: 입시전형
  document.getElementById("pane-admission").innerHTML = `
    <div class="section-title">수시 · 정시 모집 비율</div>
    <div class="admission-vis">
      <div class="donut" style="--p:${u.admission.susi}">
        <div class="lbl"><b>${u.admission.susi}%</b><small>수시</small></div>
      </div>
      <div class="admission-legend">
        <div class="row"><span class="sw" style="background:var(--accent)"></span>수시 ${u.admission.susi}%</div>
        <div class="row"><span class="sw" style="background:var(--accent-2)"></span>정시 ${u.admission.jeongsi}%</div>
      </div>
    </div>
    <div class="note-box">📌 ${u.admission.note}</div>`;

  // 탭 2: 학과
  document.getElementById("pane-majors").innerHTML =
    `<div class="section-title">대표 학과 · 경쟁률</div>` +
    u.majors.map(mj => `
      <div class="major-card">
        <div class="mc-head">
          <b>${mj.name}</b>
          <span class="comp-badge">경쟁률 ${mj.comp}:1</span>
        </div>
        <div class="cut-hint">최근 입결(등급) · 낮을수록 우수</div>
      </div>`).join("");

  // 탭 3: 등급컷
  document.getElementById("pane-cuts").innerHTML =
    `<div class="section-title">학과별 등급컷 (50% · 70%)</div>` +
    u.majors.map(mj => `
      <div class="major-card">
        <div class="mc-head"><b>${mj.name}</b></div>
        ${cutBar("50%컷", mj.cut50, "c50")}
        ${cutBar("70%컷", mj.cut70, "c70")}
      </div>`).join("") +
    `<div class="cut-hint" style="margin-top:8px">
       * 값은 내신/수능 환산 <b>평균 등급</b> 기준 예시입니다. 1등급에 가까울수록(막대가 짧을수록) 우수.
     </div>`;

  renderConverter(u);
}

function cutBar(label, grade, cls) {
  const w = Math.min(100, Math.max(4, (grade / 5) * 100));
  return `
    <div class="cut-row">
      <span class="k">${label}</span>
      <span class="cut-track"><span class="cut-fill ${cls}" style="width:${w}%"></span></span>
      <span class="v">${grade.toFixed(2)}</span>
    </div>`;
}

/* ---------------- 등급 변환기 ---------------- */
function renderConverter(u) {
  const presets = u.majors.map(mj =>
    `<option value="${mj.cut50}">${mj.name} (50%컷 ${mj.cut50.toFixed(2)})</option>`).join("");

  document.getElementById("pane-convert").innerHTML = `
    <div class="section-title">9등급제 → 5등급제 변환</div>
    <div class="conv">
      <div class="conv-grid">
        <div class="conv-field">
          <label>9등급 (내신/수능)</label>
          <select id="convGrade9">
            ${[1,2,3,4,5,6,7,8,9].map(g => `<option value="${g}">${g}등급</option>`).join("")}
          </select>
        </div>
        <div class="conv-field">
          <label>또는 이 대학 학과 입결로</label>
          <select id="convPreset">
            <option value="">— 직접 선택 —</option>
            ${presets}
          </select>
        </div>
      </div>

      <div class="conv-result" id="convResult"></div>

      <div class="section-title">등급 체계 비교표</div>
      <table class="conv-table" id="convTable"></table>

      <div class="cut-hint" style="margin-top:10px">
        * 2028학년도 대입부터 내신이 <b>9등급 → 5등급 상대평가</b>로 개편됩니다.<br>
        * 변환은 <b>누적 상위 %(등급 경계)</b> 기준의 근사치이며, 실제 개인 성적의 백분위에 따라 달라질 수 있습니다.
      </div>
    </div>`;

  const sel9 = document.getElementById("convGrade9");
  const selP = document.getElementById("convPreset");

  function update(from) {
    let g9;
    if (from === "preset" && selP.value) {
      g9 = Math.max(1, Math.min(9, Math.round(parseFloat(selP.value))));
      sel9.value = g9;
    } else {
      g9 = parseInt(sel9.value, 10);
      selP.value = "";
    }
    const g5 = grade9to5(g9);
    const cum = GRADE9.find(r => r.g === g9).cum;

    document.getElementById("convResult").innerHTML = `
      <div class="big">${g9}<small style="font-size:16px;color:var(--muted)">등급</small>
        <span class="arrow">→</span>
        <span class="to">${g5}<small style="font-size:16px;color:var(--muted)">등급</small></span>
      </div>
      <div class="desc">9등급제 ${g9}등급(누적 상위 ~${cum}%)은 5등급제로 약 <b>${g5}등급</b>에 해당합니다.</div>`;

    document.getElementById("convTable").innerHTML = `
      <tr><th>9등급</th><th>누적%</th><th>→</th><th>5등급</th><th>누적%</th></tr>
      ${GRADE9.map(r => {
        const to5 = pctToGrade5(r.cum);
        const to5cum = GRADE5.find(x => x.g === to5).cum;
        return `<tr class="${r.g === g9 ? "hl" : ""}">
          <td>${r.g}등급</td><td class="pct">~${r.cum}%</td><td>→</td>
          <td>${to5}등급</td><td class="pct">~${to5cum}%</td></tr>`;
      }).join("")}`;
  }

  sel9.addEventListener("change", () => update("g9"));
  selP.addEventListener("change", () => update("preset"));
  update("g9");
}

/* ---------------- 탭 전환 ---------------- */
document.querySelectorAll(".tab-btn").forEach(btn =>
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".tab-pane").forEach(p =>
      p.classList.toggle("active", p.id === "pane-" + target));
  }));

/* ---------------- 비교하기 바 & 모달 ---------------- */
const compareBar = document.getElementById("compareBar");
const compareModal = document.getElementById("compareModal");

function renderCompareBar() {
  if (compareIds.length === 0) { compareBar.classList.remove("show"); return; }
  compareBar.classList.add("show");
  const names = compareIds.map(id => UNIVERSITIES.find(u => u.id === id)).filter(Boolean);
  compareBar.innerHTML = `
    <div class="cmp-chips">
      ${names.map(u => `<span class="cmp-chip">${u.name}<button data-remove="${u.id}">✕</button></span>`).join("")}
    </div>
    <div class="cmp-actions">
      <button id="cmpViewBtn" ${names.length < 2 ? "disabled" : ""}>비교 보기 (${names.length})</button>
      <button id="cmpClearBtn" class="ghost">전체 해제</button>
    </div>`;
  compareBar.querySelectorAll("[data-remove]").forEach(b =>
    b.addEventListener("click", () => toggleCompare(b.dataset.remove)));
  const viewBtn = document.getElementById("cmpViewBtn");
  if (viewBtn) viewBtn.addEventListener("click", openCompareModal);
  document.getElementById("cmpClearBtn").addEventListener("click", () => {
    compareIds = []; saveCompare(); renderCompareBar();
    if (activeId) renderDetail(UNIVERSITIES.find(u => u.id === activeId));
  });
}

function avg(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

function openCompareModal() {
  const unis = compareIds.map(id => UNIVERSITIES.find(u => u.id === id)).filter(Boolean);
  const rows = [
    { label: "지역 · 설립", get: u => `${u.region} · ${u.type}` },
    { label: "티어", get: u => u.tier },
    { label: "수시 : 정시", get: u => `${u.admission.susi}% : ${u.admission.jeongsi}%` },
    { label: "전형 특징", get: u => u.admission.note },
    { label: "평균 50%컷", get: u => avg(u.majors.map(m => m.cut50)).toFixed(2) },
    { label: "평균 70%컷", get: u => avg(u.majors.map(m => m.cut70)).toFixed(2) },
    { label: "최고 경쟁률", get: u => Math.max(...u.majors.map(m => m.comp)).toFixed(1) + " : 1" },
  ];
  compareModal.innerHTML = `
    <div class="cmp-modal-inner">
      <div class="cmp-modal-head">
        <h3>대학 비교</h3>
        <button id="cmpCloseBtn" class="close">✕</button>
      </div>
      <div class="cmp-table-wrap">
        <table class="cmp-table">
          <thead><tr><th></th>${unis.map(u => `<th><div class="badge-sm" style="background:${TIER_COLOR[u.tier]};margin:0 auto 6px">${badgeChar(u.name)}</div>${u.name}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows.map(r => `<tr><td class="rowlabel">${r.label}</td>${unis.map(u => `<td>${r.get(u)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>`;
  compareModal.classList.add("open");
  document.getElementById("cmpCloseBtn").addEventListener("click", closeCompareModal);
}
function closeCompareModal() { compareModal.classList.remove("open"); }
compareModal.addEventListener("click", (e) => { if (e.target === compareModal) closeCompareModal(); });

/* ---------------- 시작 ---------------- */
renderList();
renderCompareBar();
