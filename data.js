/*
 * 대학 입시 데이터
 * ------------------------------------------------------------------
 * ⚠️ 안내: 아래 등급컷(50%/70%)·경쟁률·전형 비율 등 수치는
 *    실제 공식 발표값이 아닌 "참고용 예시 데이터"입니다.
 *    실제 입시 자료(대학 입학처, 대교협 어디가 등)로 교체해서 사용하세요.
 *    좌표(lat/lng)는 각 대학 대표 캠퍼스의 대략적 위치입니다.
 * ------------------------------------------------------------------
 * 새 대학을 추가하려면 UNIVERSITIES 배열에 같은 형식으로 객체를 넣으면
 * 지도·목록·상세 패널에 자동 반영됩니다.
 */

const UNIVERSITIES = [
  // ─────────────── 서울 ───────────────
  {
    id: "snu", name: "서울대학교", region: "서울", type: "국립",
    lat: 37.4590, lng: 126.9520, tier: "최상위",
    admission: { susi: 75, jeongsi: 25, note: "지역균형·일반전형 중심, 정시 수능위주" },
    majors: [
      { name: "경영대학", cut50: 1.05, cut70: 1.15, comp: 4.8 },
      { name: "컴퓨터공학부", cut50: 1.10, cut70: 1.20, comp: 6.2 },
      { name: "의예과", cut50: 1.00, cut70: 1.03, comp: 8.5 },
      { name: "사회과학대학", cut50: 1.20, cut70: 1.35, comp: 4.1 },
    ],
  },
  {
    id: "yonsei", name: "연세대학교", region: "서울", type: "사립",
    lat: 37.5665, lng: 126.9388, tier: "최상위",
    admission: { susi: 60, jeongsi: 40, note: "활동우수형·정시 확대" },
    majors: [
      { name: "경영학과", cut50: 1.20, cut70: 1.35, comp: 5.5 },
      { name: "컴퓨터과학과", cut50: 1.25, cut70: 1.40, comp: 7.1 },
      { name: "의예과", cut50: 1.02, cut70: 1.05, comp: 9.0 },
      { name: "언더우드국제학부", cut50: 1.40, cut70: 1.60, comp: 4.3 },
    ],
  },
  {
    id: "korea", name: "고려대학교", region: "서울", type: "사립",
    lat: 37.5894, lng: 127.0323, tier: "최상위",
    admission: { susi: 62, jeongsi: 38, note: "학업우수형·계열적합형" },
    majors: [
      { name: "경영대학", cut50: 1.22, cut70: 1.38, comp: 5.9 },
      { name: "컴퓨터학과", cut50: 1.28, cut70: 1.45, comp: 6.8 },
      { name: "정치외교학과", cut50: 1.30, cut70: 1.50, comp: 4.6 },
      { name: "미디어학부", cut50: 1.35, cut70: 1.55, comp: 5.2 },
    ],
  },
  {
    id: "sogang", name: "서강대학교", region: "서울", type: "사립",
    lat: 37.5510, lng: 126.9410, tier: "상위",
    admission: { susi: 58, jeongsi: 42, note: "일반전형(학생부종합)·논술" },
    majors: [
      { name: "경영학부", cut50: 1.45, cut70: 1.65, comp: 6.1 },
      { name: "컴퓨터공학과", cut50: 1.50, cut70: 1.70, comp: 7.5 },
      { name: "경제학과", cut50: 1.48, cut70: 1.68, comp: 4.9 },
    ],
  },
  {
    id: "skku", name: "성균관대학교", region: "서울", type: "사립",
    lat: 37.5877, lng: 126.9938, tier: "상위",
    admission: { susi: 60, jeongsi: 40, note: "학과모집·계열모집, 논술 병행" },
    majors: [
      { name: "글로벌경영학과", cut50: 1.38, cut70: 1.55, comp: 6.4 },
      { name: "소프트웨어학과", cut50: 1.42, cut70: 1.60, comp: 8.0 },
      { name: "반도체시스템공학과", cut50: 1.35, cut70: 1.52, comp: 9.2 },
    ],
  },
  {
    id: "hanyang", name: "한양대학교", region: "서울", type: "사립",
    lat: 37.5573, lng: 127.0453, tier: "상위",
    admission: { susi: 57, jeongsi: 43, note: "학생부종합(일반)·정시 수능" },
    majors: [
      { name: "융합전자공학부", cut50: 1.45, cut70: 1.62, comp: 7.8 },
      { name: "경영학부", cut50: 1.48, cut70: 1.66, comp: 5.6 },
      { name: "미래자동차공학과", cut50: 1.50, cut70: 1.70, comp: 6.9 },
    ],
  },
  {
    id: "cau", name: "중앙대학교", region: "서울", type: "사립",
    lat: 37.5049, lng: 126.9573, tier: "상위",
    admission: { susi: 55, jeongsi: 45, note: "다빈치형·탐구형 인재, 논술" },
    majors: [
      { name: "경영학부", cut50: 1.60, cut70: 1.80, comp: 5.3 },
      { name: "소프트웨어학부", cut50: 1.62, cut70: 1.82, comp: 7.0 },
      { name: "미디어커뮤니케이션학부", cut50: 1.58, cut70: 1.78, comp: 5.8 },
    ],
  },
  {
    id: "khu", name: "경희대학교", region: "서울", type: "사립",
    lat: 37.5967, lng: 127.0519, tier: "상위",
    admission: { susi: 58, jeongsi: 42, note: "네오르네상스전형·논술" },
    majors: [
      { name: "경영학과", cut50: 1.65, cut70: 1.85, comp: 5.1 },
      { name: "컴퓨터공학과", cut50: 1.68, cut70: 1.88, comp: 6.7 },
      { name: "한의예과", cut50: 1.05, cut70: 1.12, comp: 12.0 },
    ],
  },
  {
    id: "hufs", name: "한국외국어대학교", region: "서울", type: "사립",
    lat: 37.5975, lng: 127.0587, tier: "상위",
    admission: { susi: 56, jeongsi: 44, note: "학생부종합·어학특기" },
    majors: [
      { name: "LD학부", cut50: 1.55, cut70: 1.75, comp: 6.0 },
      { name: "영어통번역학부", cut50: 1.70, cut70: 1.92, comp: 4.7 },
      { name: "컴퓨터공학부", cut50: 1.80, cut70: 2.00, comp: 5.5 },
    ],
  },
  {
    id: "uos", name: "서울시립대학교", region: "서울", type: "국립",
    lat: 37.5834, lng: 127.0587, tier: "상위",
    admission: { susi: 55, jeongsi: 45, note: "학생부종합·저렴한 등록금" },
    majors: [
      { name: "세무학과", cut50: 1.62, cut70: 1.82, comp: 4.5 },
      { name: "전자전기컴퓨터공학부", cut50: 1.70, cut70: 1.90, comp: 6.3 },
      { name: "건축학부", cut50: 1.75, cut70: 1.95, comp: 5.0 },
    ],
  },
  {
    id: "ewha", name: "이화여자대학교", region: "서울", type: "사립",
    lat: 37.5620, lng: 126.9469, tier: "상위",
    admission: { susi: 60, jeongsi: 40, note: "미래인재전형(여학생)" },
    majors: [
      { name: "의예과", cut50: 1.08, cut70: 1.15, comp: 8.0 },
      { name: "경영학부", cut50: 1.75, cut70: 1.95, comp: 4.6 },
      { name: "컴퓨터공학과", cut50: 1.85, cut70: 2.05, comp: 5.2 },
    ],
  },
  {
    id: "hongik", name: "홍익대학교", region: "서울", type: "사립",
    lat: 37.5510, lng: 126.9250, tier: "중상위",
    admission: { susi: 55, jeongsi: 45, note: "미술 실기·학생부종합" },
    majors: [
      { name: "시각디자인과", cut50: 1.80, cut70: 2.10, comp: 9.5 },
      { name: "건축학부", cut50: 1.90, cut70: 2.15, comp: 5.4 },
      { name: "컴퓨터공학과", cut50: 2.00, cut70: 2.25, comp: 5.0 },
    ],
  },
  {
    id: "konkuk", name: "건국대학교", region: "서울", type: "사립",
    lat: 37.5403, lng: 127.0793, tier: "중상위",
    admission: { susi: 56, jeongsi: 44, note: "KU자기추천전형·논술" },
    majors: [
      { name: "경영학과", cut50: 1.95, cut70: 2.15, comp: 4.8 },
      { name: "컴퓨터공학부", cut50: 2.00, cut70: 2.20, comp: 6.0 },
      { name: "수의예과", cut50: 1.10, cut70: 1.20, comp: 10.5 },
    ],
  },
  {
    id: "dongguk", name: "동국대학교", region: "서울", type: "사립",
    lat: 37.5580, lng: 127.0000, tier: "중상위",
    admission: { susi: 57, jeongsi: 43, note: "두드림전형·논술" },
    majors: [
      { name: "경영학과", cut50: 2.00, cut70: 2.20, comp: 4.5 },
      { name: "컴퓨터공학전공", cut50: 2.05, cut70: 2.28, comp: 5.6 },
      { name: "경찰행정학부", cut50: 1.85, cut70: 2.05, comp: 7.2 },
    ],
  },
  {
    id: "sookmyung", name: "숙명여자대학교", region: "서울", type: "사립",
    lat: 37.5460, lng: 126.9648, tier: "중상위",
    admission: { susi: 55, jeongsi: 45, note: "숙명인재전형(여학생)" },
    majors: [
      { name: "경영학부", cut50: 2.10, cut70: 2.30, comp: 4.2 },
      { name: "소프트웨어학부", cut50: 2.15, cut70: 2.38, comp: 5.0 },
    ],
  },
  {
    id: "kookmin", name: "국민대학교", region: "서울", type: "사립",
    lat: 37.6109, lng: 126.9975, tier: "중상위",
    admission: { susi: 58, jeongsi: 42, note: "국민프런티어전형" },
    majors: [
      { name: "자동차공학과", cut50: 2.20, cut70: 2.45, comp: 5.1 },
      { name: "소프트웨어학부", cut50: 2.25, cut70: 2.48, comp: 5.4 },
    ],
  },
  {
    id: "soongsil", name: "숭실대학교", region: "서울", type: "사립",
    lat: 37.4963, lng: 126.9573, tier: "중상위",
    admission: { susi: 56, jeongsi: 44, note: "SSU미래인재전형" },
    majors: [
      { name: "컴퓨터학부", cut50: 2.25, cut70: 2.50, comp: 5.3 },
      { name: "경영학부", cut50: 2.30, cut70: 2.52, comp: 4.4 },
    ],
  },
  {
    id: "sejong", name: "세종대학교", region: "서울", type: "사립",
    lat: 37.5502, lng: 127.0738, tier: "중상위",
    admission: { susi: 54, jeongsi: 46, note: "창의인재전형·논술" },
    majors: [
      { name: "소프트웨어학과", cut50: 2.20, cut70: 2.45, comp: 5.7 },
      { name: "호텔관광경영학부", cut50: 2.35, cut70: 2.58, comp: 4.6 },
    ],
  },

  // ─────────────── 경기 · 인천 ───────────────
  {
    id: "ajou", name: "아주대학교", region: "경기", type: "사립",
    lat: 37.2830, lng: 127.0450, tier: "중상위",
    admission: { susi: 60, jeongsi: 40, note: "ACE전형·다산인재전형" },
    majors: [
      { name: "소프트웨어학과", cut50: 2.05, cut70: 2.30, comp: 6.1 },
      { name: "의학과", cut50: 1.05, cut70: 1.12, comp: 9.5 },
      { name: "기계공학과", cut50: 2.15, cut70: 2.40, comp: 5.0 },
    ],
  },
  {
    id: "inha", name: "인하대학교", region: "인천", type: "사립",
    lat: 37.4500, lng: 126.6540, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "인하미래인재전형·논술" },
    majors: [
      { name: "기계공학과", cut50: 2.20, cut70: 2.45, comp: 5.2 },
      { name: "컴퓨터공학과", cut50: 2.15, cut70: 2.40, comp: 6.0 },
      { name: "의예과", cut50: 1.08, cut70: 1.15, comp: 9.0 },
    ],
  },
  {
    id: "gachon", name: "가천대학교", region: "경기", type: "사립",
    lat: 37.4500, lng: 127.1270, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "가천바람개비전형" },
    majors: [
      { name: "의예과", cut50: 1.10, cut70: 1.20, comp: 11.0 },
      { name: "컴퓨터공학과", cut50: 2.60, cut70: 2.85, comp: 5.5 },
    ],
  },
  {
    id: "kyonggi", name: "경기대학교", region: "경기", type: "사립",
    lat: 37.3010, lng: 127.0350, tier: "중위",
    admission: { susi: 58, jeongsi: 42, note: "KGU학생부종합전형" },
    majors: [
      { name: "경찰행정학과", cut50: 2.30, cut70: 2.55, comp: 6.5 },
      { name: "전자공학과", cut50: 2.80, cut70: 3.05, comp: 4.5 },
    ],
  },

  // ─────────────── 대전 · 충청 ───────────────
  {
    id: "kaist", name: "KAIST", region: "대전", type: "국립",
    lat: 36.3720, lng: 127.3600, tier: "최상위",
    admission: { susi: 100, jeongsi: 0, note: "수시 100%(일반·특기자), 과학인재 중심" },
    majors: [
      { name: "무학과(자유전공)", cut50: 1.05, cut70: 1.15, comp: 7.0 },
      { name: "전산학부", cut50: 1.08, cut70: 1.18, comp: 8.0 },
    ],
  },
  {
    id: "cnu", name: "충남대학교", region: "대전", type: "국립",
    lat: 36.3660, lng: 127.3450, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "PRISM인재전형·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.12, cut70: 1.22, comp: 8.5 },
      { name: "컴퓨터융합학부", cut50: 2.40, cut70: 2.65, comp: 5.0 },
      { name: "경영학부", cut50: 2.50, cut70: 2.75, comp: 4.3 },
    ],
  },
  {
    id: "cbnu", name: "충북대학교", region: "충북", type: "국립",
    lat: 36.6280, lng: 127.4570, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합·지역인재전형" },
    majors: [
      { name: "수의예과", cut50: 1.20, cut70: 1.32, comp: 9.0 },
      { name: "소프트웨어학부", cut50: 2.70, cut70: 2.95, comp: 4.8 },
    ],
  },
  {
    id: "kongju", name: "공주대학교", region: "충남", type: "국립",
    lat: 36.4700, lng: 127.1350, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합·지역인재" },
    majors: [
      { name: "기계공학부", cut50: 3.00, cut70: 3.25, comp: 4.0 },
      { name: "사범대학 교육학과", cut50: 2.40, cut70: 2.65, comp: 5.5 },
    ],
  },

  // ─────────────── 부산 · 경남 · 대구 ───────────────
  {
    id: "pnu", name: "부산대학교", region: "부산", type: "국립",
    lat: 35.2330, lng: 129.0790, tier: "중상위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합·지역인재전형" },
    majors: [
      { name: "의예과", cut50: 1.10, cut70: 1.18, comp: 8.8 },
      { name: "전기공학과", cut50: 2.30, cut70: 2.55, comp: 5.0 },
      { name: "경영학과", cut50: 2.40, cut70: 2.62, comp: 4.5 },
    ],
  },
  {
    id: "knu", name: "경북대학교", region: "대구", type: "국립",
    lat: 35.8890, lng: 128.6100, tier: "중상위",
    admission: { susi: 61, jeongsi: 39, note: "학생부종합·지역인재전형" },
    majors: [
      { name: "의예과", cut50: 1.10, cut70: 1.19, comp: 8.7 },
      { name: "전자공학부", cut50: 2.35, cut70: 2.58, comp: 5.2 },
      { name: "경영학부", cut50: 2.45, cut70: 2.68, comp: 4.4 },
    ],
  },
  {
    id: "pknu", name: "부경대학교", region: "부산", type: "국립",
    lat: 35.1340, lng: 129.1050, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "학생부종합·지역인재" },
    majors: [
      { name: "기계공학부", cut50: 3.10, cut70: 3.35, comp: 4.0 },
      { name: "수산과학대학", cut50: 3.30, cut70: 3.55, comp: 3.6 },
    ],
  },
  {
    id: "dau", name: "동아대학교", region: "부산", type: "사립",
    lat: 35.1160, lng: 128.9660, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.18, cut70: 1.28, comp: 8.0 },
      { name: "경영학과", cut50: 3.20, cut70: 3.45, comp: 3.8 },
    ],
  },
  {
    id: "gnu", name: "경상국립대학교", region: "경남", type: "국립",
    lat: 35.1530, lng: 128.0980, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합·지역인재전형" },
    majors: [
      { name: "의예과", cut50: 1.15, cut70: 1.25, comp: 8.2 },
      { name: "기계항공공학부", cut50: 3.00, cut70: 3.25, comp: 4.1 },
    ],
  },
  {
    id: "ulsan", name: "울산대학교", region: "울산", type: "사립",
    lat: 35.5430, lng: 129.2570, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.05, cut70: 1.12, comp: 10.0 },
      { name: "기계공학부", cut50: 3.10, cut70: 3.35, comp: 3.9 },
    ],
  },

  // ─────────────── 광주 · 전라 ───────────────
  {
    id: "jnu", name: "전남대학교", region: "광주", type: "국립",
    lat: 35.1760, lng: 126.9060, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "학생부종합·지역인재전형" },
    majors: [
      { name: "의예과", cut50: 1.12, cut70: 1.20, comp: 8.4 },
      { name: "전자컴퓨터공학부", cut50: 2.60, cut70: 2.85, comp: 4.6 },
    ],
  },
  {
    id: "jbnu", name: "전북대학교", region: "전북", type: "국립",
    lat: 35.8460, lng: 127.1290, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "큰사람전형·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.13, cut70: 1.22, comp: 8.3 },
      { name: "컴퓨터공학부", cut50: 2.65, cut70: 2.90, comp: 4.5 },
    ],
  },
  {
    id: "chosun", name: "조선대학교", region: "광주", type: "사립",
    lat: 35.1400, lng: 126.9250, tier: "중위",
    admission: { susi: 61, jeongsi: 39, note: "학생부종합·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.20, cut70: 1.30, comp: 7.8 },
      { name: "경영학부", cut50: 3.30, cut70: 3.55, comp: 3.7 },
    ],
  },

  // ─────────────── 강원 · 제주 · 포항 ───────────────
  {
    id: "kangwon", name: "강원대학교", region: "강원", type: "국립",
    lat: 37.8690, lng: 127.7380, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "미래인재전형·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.15, cut70: 1.25, comp: 8.0 },
      { name: "컴퓨터공학과", cut50: 2.90, cut70: 3.15, comp: 4.2 },
    ],
  },
  {
    id: "jejunu", name: "제주대학교", region: "제주", type: "국립",
    lat: 33.4560, lng: 126.5610, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "학생부종합·지역인재" },
    majors: [
      { name: "의예과", cut50: 1.18, cut70: 1.28, comp: 7.6 },
      { name: "해양과학대학", cut50: 3.40, cut70: 3.65, comp: 3.4 },
    ],
  },
  {
    id: "postech", name: "POSTECH", region: "경북", type: "사립",
    lat: 36.0100, lng: 129.3220, tier: "최상위",
    admission: { susi: 100, jeongsi: 0, note: "수시 100%(무학과 단일계열), 과학인재 중심" },
    majors: [
      { name: "단일계열(무학과)", cut50: 1.05, cut70: 1.15, comp: 6.5 },
    ],
  },
  {
    id: "gist", name: "GIST(광주과학기술원)", region: "광주", type: "국립",
    lat: 35.2280, lng: 126.8435, tier: "최상위",
    admission: { susi: 100, jeongsi: 0, note: "수시 100%(무학과), 과학인재 중심" },
    majors: [{ name: "융합기술학제학부(무학과)", cut50: 1.10, cut70: 1.20, comp: 5.8 }],
  },
  {
    id: "unist", name: "UNIST", region: "울산", type: "국립",
    lat: 35.5768, lng: 129.1873, tier: "최상위",
    admission: { susi: 100, jeongsi: 0, note: "수시 100%(무학과), 과학인재 중심" },
    majors: [{ name: "기초무학과", cut50: 1.10, cut70: 1.20, comp: 5.6 }],
  },
  {
    id: "dgist", name: "DGIST", region: "대구", type: "국립",
    lat: 35.6217, lng: 128.5983, tier: "최상위",
    admission: { susi: 100, jeongsi: 0, note: "수시 100%(무학과), 과학인재 중심" },
    majors: [{ name: "기초학부(무학과)", cut50: 1.10, cut70: 1.20, comp: 5.4 }],
  },

  // ─────────────── 서울(추가) ───────────────
  {
    id: "seoultech", name: "서울과학기술대학교", region: "서울", type: "국립",
    lat: 37.6313, lng: 127.0770, tier: "중상위",
    admission: { susi: 58, jeongsi: 42, note: "학생부종합(학교생활우수자)·논술" },
    majors: [
      { name: "컴퓨터공학과", cut50: 2.10, cut70: 2.35, comp: 6.0 },
      { name: "기계시스템디자인공학과", cut50: 2.30, cut70: 2.55, comp: 4.6 },
    ],
  },
  {
    id: "kw", name: "광운대학교", region: "서울", type: "사립",
    lat: 37.6191, lng: 127.0601, tier: "중상위",
    admission: { susi: 57, jeongsi: 43, note: "광운참빛인재전형·논술" },
    majors: [
      { name: "소프트웨어학부", cut50: 2.35, cut70: 2.58, comp: 5.5 },
      { name: "전자공학과", cut50: 2.40, cut70: 2.62, comp: 4.9 },
    ],
  },
  {
    id: "mju", name: "명지대학교", region: "서울", type: "사립",
    lat: 37.5820, lng: 126.9218, tier: "중상위",
    admission: { susi: 58, jeongsi: 42, note: "학생부종합(명지인재전형)" },
    majors: [
      { name: "융합소프트웨어학부", cut50: 2.40, cut70: 2.65, comp: 5.0 },
      { name: "경영학과", cut50: 2.50, cut70: 2.75, comp: 4.2 },
    ],
  },
  {
    id: "duksung", name: "덕성여자대학교", region: "서울", type: "사립",
    lat: 37.6478, lng: 127.0163, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "덕성인재전형(여학생)" },
    majors: [{ name: "컴퓨터공학전공", cut50: 2.80, cut70: 3.05, comp: 4.3 }],
  },
  {
    id: "dongduk", name: "동덕여자대학교", region: "서울", type: "사립",
    lat: 37.6072, lng: 127.0409, tier: "중위",
    admission: { susi: 59, jeongsi: 41, note: "동덕창의리더전형(여학생)" },
    majors: [{ name: "커뮤니케이션학과", cut50: 2.85, cut70: 3.10, comp: 4.5 }],
  },
  {
    id: "sangmyung", name: "상명대학교", region: "서울", type: "사립",
    lat: 37.6046, lng: 126.9538, tier: "중위",
    admission: { susi: 58, jeongsi: 42, note: "상명인재전형" },
    majors: [{ name: "소프트웨어학과", cut50: 2.65, cut70: 2.90, comp: 4.8 }],
  },
  {
    id: "sungshin", name: "성신여자대학교", region: "서울", type: "사립",
    lat: 37.5926, lng: 127.0165, tier: "중위",
    admission: { susi: 59, jeongsi: 41, note: "학교생활우수자전형(여학생)" },
    majors: [{ name: "AI융합학부", cut50: 2.60, cut70: 2.85, comp: 5.1 }],
  },
  {
    id: "swu", name: "서울여자대학교", region: "서울", type: "사립",
    lat: 37.6255, lng: 127.0938, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "바롬인재전형(여학생)" },
    majors: [{ name: "소프트웨어융합학과", cut50: 2.65, cut70: 2.90, comp: 4.6 }],
  },
  {
    id: "hansung", name: "한성대학교", region: "서울", type: "사립",
    lat: 37.5823, lng: 127.0094, tier: "중위",
    admission: { susi: 58, jeongsi: 42, note: "한성인재전형" },
    majors: [{ name: "IT융합공학부", cut50: 2.85, cut70: 3.10, comp: 4.4 }],
  },
  {
    id: "seokyung", name: "서경대학교", region: "서울", type: "사립",
    lat: 37.6035, lng: 127.0022, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "서경미래인재전형" },
    majors: [{ name: "컴퓨터공학과", cut50: 2.95, cut70: 3.20, comp: 4.0 }],
  },
  {
    id: "samyook", name: "삼육대학교", region: "서울", type: "사립",
    lat: 37.6438, lng: 127.1057, tier: "중위",
    admission: { susi: 60, jeongsi: 40, note: "SU자기추천전형" },
    majors: [{ name: "간호학과", cut50: 1.90, cut70: 2.10, comp: 7.5 }],
  },
  {
    id: "chongshin", name: "총신대학교", region: "서울", type: "사립",
    lat: 37.4967, lng: 126.9587, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "신학·기독교교육 특화전형" },
    majors: [{ name: "신학과", cut50: 3.00, cut70: 3.25, comp: 3.5 }],
  },

  // ─────────────── 경기 · 인천(추가) ───────────────
  {
    id: "cuk", name: "가톨릭대학교", region: "경기", type: "사립",
    lat: 37.4879, lng: 126.7854, tier: "상위",
    admission: { susi: 60, jeongsi: 40, note: "잠재능력우수자전형·논술" },
    majors: [
      { name: "의예과", cut50: 1.06, cut70: 1.13, comp: 9.3 },
      { name: "컴퓨터정보공학부", cut50: 2.15, cut70: 2.40, comp: 5.4 },
    ],
  },
  {
    id: "dankook", name: "단국대학교(죽전)", region: "경기", type: "사립",
    lat: 37.3223, lng: 127.1265, tier: "중상위",
    admission: { susi: 59, jeongsi: 41, note: "DKU인재전형·논술" },
    majors: [
      { name: "소프트웨어학과", cut50: 2.20, cut70: 2.45, comp: 5.8 },
      { name: "치의예과", cut50: 1.15, cut70: 1.25, comp: 8.9 },
    ],
  },
  {
    id: "inu", name: "인천대학교", region: "인천", type: "국립",
    lat: 37.3759, lng: 126.6329, tier: "중상위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합(자기추천전형)" },
    majors: [
      { name: "임베디드시스템공학과", cut50: 2.35, cut70: 2.58, comp: 5.0 },
      { name: "동북아국제통상학부", cut50: 2.45, cut70: 2.68, comp: 4.3 },
    ],
  },
  {
    id: "hyu_erica", name: "한양대학교 ERICA", region: "경기", type: "사립",
    lat: 37.3005, lng: 126.8362, tier: "중상위",
    admission: { susi: 58, jeongsi: 42, note: "학생부종합(일반)·논술" },
    majors: [{ name: "소프트웨어학부", cut50: 2.40, cut70: 2.65, comp: 5.6 }],
  },
  {
    id: "kau", name: "한국항공대학교", region: "경기", type: "사립",
    lat: 37.6135, lng: 126.8709, tier: "중상위",
    admission: { susi: 57, jeongsi: 43, note: "미래인재전형(항공특화)" },
    majors: [{ name: "항공우주및기계공학부", cut50: 2.30, cut70: 2.55, comp: 5.9 }],
  },
  {
    id: "suwon", name: "수원대학교", region: "경기", type: "사립",
    lat: 37.2064, lng: 126.9738, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "SW인재전형" },
    majors: [{ name: "컴퓨터학부", cut50: 2.90, cut70: 3.15, comp: 4.2 }],
  },
  {
    id: "hanshin", name: "한신대학교", region: "경기", type: "사립",
    lat: 37.1435, lng: 127.0625, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합전형" },
    majors: [{ name: "컴퓨터공학부", cut50: 3.10, cut70: 3.35, comp: 3.6 }],
  },
  {
    id: "hyupsung", name: "협성대학교", region: "경기", type: "사립",
    lat: 37.1996, lng: 127.0367, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "IT융합학과", cut50: 3.30, cut70: 3.55, comp: 3.2 }],
  },
  {
    id: "shinhan", name: "신한대학교", region: "경기", type: "사립",
    lat: 37.7480, lng: 127.0730, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "간호학과", cut50: 2.20, cut70: 2.45, comp: 6.0 }],
  },
  {
    id: "daejin", name: "대진대학교", region: "경기", type: "사립",
    lat: 37.9006, lng: 127.2109, tier: "중하위",
    admission: { susi: 64, jeongsi: 36, note: "DJU미래인재전형" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.35, cut70: 3.60, comp: 3.1 }],
  },
  {
    id: "ptu", name: "평택대학교", region: "경기", type: "사립",
    lat: 36.9921, lng: 127.0862, tier: "중하위",
    admission: { susi: 66, jeongsi: 34, note: "학생부교과전형 중심" },
    majors: [{ name: "사회복지학과", cut50: 3.40, cut70: 3.65, comp: 3.0 }],
  },
  {
    id: "anyang", name: "안양대학교", region: "경기", type: "사립",
    lat: 37.3872, lng: 126.9269, tier: "중하위",
    admission: { susi: 64, jeongsi: 36, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.35, cut70: 3.58, comp: 3.1 }],
  },
  {
    id: "sungkyul", name: "성결대학교", region: "경기", type: "사립",
    lat: 37.3945, lng: 126.9310, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "미디어소프트웨어학부", cut50: 3.30, cut70: 3.55, comp: 3.2 }],
  },

  // ─────────────── 전국 교육대학교(교대) ───────────────
  {
    id: "nue_seoul", name: "서울교육대학교", region: "서울", type: "국립",
    lat: 37.4894, lng: 127.0143, tier: "상위",
    admission: { susi: 70, jeongsi: 30, note: "교직인성우수자전형, 임용 연계" },
    majors: [{ name: "초등교육과", cut50: 1.85, cut70: 2.05, comp: 4.9 }],
  },
  {
    id: "nue_gyeongin", name: "경인교육대학교", region: "경기", type: "국립",
    lat: 37.3892, lng: 126.9520, tier: "중상위",
    admission: { susi: 70, jeongsi: 30, note: "교직인성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.10, cut70: 2.32, comp: 4.5 }],
  },
  {
    id: "nue_chuncheon", name: "춘천교육대학교", region: "강원", type: "국립",
    lat: 37.8730, lng: 127.7250, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형·지역인재" },
    majors: [{ name: "초등교육과", cut50: 2.30, cut70: 2.52, comp: 4.0 }],
  },
  {
    id: "nue_cheongju", name: "청주교육대학교", region: "충북", type: "국립",
    lat: 36.6360, lng: 127.4970, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.25, cut70: 2.48, comp: 4.1 }],
  },
  {
    id: "nue_gongju", name: "공주교육대학교", region: "충남", type: "국립",
    lat: 36.4595, lng: 127.1189, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.28, cut70: 2.50, comp: 4.0 }],
  },
  {
    id: "nue_jeonju", name: "전주교육대학교", region: "전북", type: "국립",
    lat: 35.8231, lng: 127.1480, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.30, cut70: 2.52, comp: 3.9 }],
  },
  {
    id: "nue_gwangju", name: "광주교육대학교", region: "광주", type: "국립",
    lat: 35.1367, lng: 126.9142, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.28, cut70: 2.50, comp: 4.0 }],
  },
  {
    id: "nue_daegu", name: "대구교육대학교", region: "대구", type: "국립",
    lat: 35.8714, lng: 128.5946, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.20, cut70: 2.42, comp: 4.2 }],
  },
  {
    id: "nue_busan", name: "부산교육대학교", region: "부산", type: "국립",
    lat: 35.1808, lng: 129.0756, tier: "중상위",
    admission: { susi: 72, jeongsi: 28, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.20, cut70: 2.42, comp: 4.2 }],
  },
  {
    id: "nue_jinju", name: "진주교육대학교", region: "경남", type: "국립",
    lat: 35.1912, lng: 128.0925, tier: "중위",
    admission: { susi: 73, jeongsi: 27, note: "교직적성우수자전형" },
    majors: [{ name: "초등교육과", cut50: 2.40, cut70: 2.62, comp: 3.7 }],
  },
  {
    id: "knue", name: "한국교원대학교", region: "충북", type: "국립",
    lat: 36.6069, lng: 127.4457, tier: "상위",
    admission: { susi: 75, jeongsi: 25, note: "교직적성전형(중등 교사양성 특화)" },
    majors: [{ name: "교육학과", cut50: 1.90, cut70: 2.10, comp: 5.0 }],
  },

  // ─────────────── 대전 · 충청(추가) ───────────────
  {
    id: "hanbat", name: "한밭대학교", region: "대전", type: "국립",
    lat: 36.3504, lng: 127.4090, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "학생부종합(한밭인재전형)" },
    majors: [{ name: "컴퓨터공학과", cut50: 2.80, cut70: 3.05, comp: 4.3 }],
  },
  {
    id: "mokwon", name: "목원대학교", region: "대전", type: "사립",
    lat: 36.3218, lng: 127.3410, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터소프트웨어공학과", cut50: 3.30, cut70: 3.55, comp: 3.2 }],
  },
  {
    id: "paichai", name: "배재대학교", region: "대전", type: "사립",
    lat: 36.3496, lng: 127.4256, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "PU자기추천전형" },
    majors: [{ name: "IT공학부", cut50: 3.25, cut70: 3.50, comp: 3.3 }],
  },
  {
    id: "woosong", name: "우송대학교", region: "대전", type: "사립",
    lat: 36.3016, lng: 127.3810, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "우송인재전형(외식·철도 특화)" },
    majors: [{ name: "철도건설시스템학부", cut50: 3.00, cut70: 3.25, comp: 4.0 }],
  },
  {
    id: "hannam", name: "한남대학교", region: "대전", type: "사립",
    lat: 36.3406, lng: 127.4171, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "한남인재전형" },
    majors: [{ name: "컴퓨터공학과", cut50: 2.95, cut70: 3.20, comp: 3.9 }],
  },
  {
    id: "konyang", name: "건양대학교", region: "대전", type: "사립",
    lat: 36.3149, lng: 127.3610, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "논산캠퍼스 의료특화·대전메디컬캠퍼스" },
    majors: [{ name: "간호학과", cut50: 2.00, cut70: 2.20, comp: 7.0 }],
  },
  {
    id: "sch", name: "순천향대학교", region: "충남", type: "사립",
    lat: 36.7702, lng: 127.1174, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "SCH인재전형(의료특화)" },
    majors: [
      { name: "의예과", cut50: 1.20, cut70: 1.30, comp: 8.0 },
      { name: "컴퓨터소프트웨어공학과", cut50: 2.90, cut70: 3.15, comp: 4.0 },
    ],
  },
  {
    id: "dankook_cheonan", name: "단국대학교(천안)", region: "충남", type: "사립",
    lat: 36.8114, lng: 127.1139, tier: "중상위",
    admission: { susi: 61, jeongsi: 39, note: "DKU인재전형(자연계열 특화)" },
    majors: [{ name: "간호학과", cut50: 1.95, cut70: 2.15, comp: 6.8 }],
  },
  {
    id: "hoseo", name: "호서대학교", region: "충남", type: "사립",
    lat: 36.7745, lng: 127.0754, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "창업인재전형" },
    majors: [{ name: "IT융합공학부", cut50: 3.00, cut70: 3.25, comp: 3.8 }],
  },
  {
    id: "cju", name: "청주대학교", region: "충북", type: "사립",
    lat: 36.6152, lng: 127.4645, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "학생부종합(창의인재전형)" },
    majors: [{ name: "소프트웨어학과", cut50: 3.05, cut70: 3.30, comp: 3.6 }],
  },
  {
    id: "semyung", name: "세명대학교", region: "충북", type: "사립",
    lat: 37.1449, lng: 128.2075, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "한의예과", cut50: 1.40, cut70: 1.55, comp: 6.5 }],
  },
  {
    id: "ut_chungju", name: "한국교통대학교", region: "충북", type: "국립",
    lat: 36.9528, lng: 127.9294, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합(교통인재전형)" },
    majors: [{ name: "철도차량시스템공학과", cut50: 3.00, cut70: 3.25, comp: 4.0 }],
  },

  // ─────────────── 강원(추가) ───────────────
  {
    id: "yonsei_wonju", name: "연세대학교 미래캠퍼스", region: "강원", type: "사립",
    lat: 37.3382, lng: 127.9457, tier: "상위",
    admission: { susi: 58, jeongsi: 42, note: "학교생활우수자전형" },
    majors: [
      { name: "의예과", cut50: 1.10, cut70: 1.20, comp: 9.0 },
      { name: "IT융합공학부", cut50: 2.30, cut70: 2.55, comp: 5.0 },
    ],
  },
  {
    id: "gwnu", name: "강릉원주대학교", region: "강원", type: "국립",
    lat: 37.7715, lng: 128.8962, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합·지역인재" },
    majors: [{ name: "치의예과", cut50: 1.25, cut70: 1.35, comp: 7.5 }],
  },
  {
    id: "hallym", name: "한림대학교", region: "강원", type: "사립",
    lat: 37.8622, lng: 127.7361, tier: "중상위",
    admission: { susi: 60, jeongsi: 40, note: "학생부종합(한림인재전형)" },
    majors: [
      { name: "의예과", cut50: 1.13, cut70: 1.22, comp: 8.6 },
      { name: "소프트웨어융합대학", cut50: 2.60, cut70: 2.85, comp: 4.5 },
    ],
  },
  {
    id: "sangji", name: "상지대학교", region: "강원", type: "사립",
    lat: 37.3378, lng: 127.9820, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "한의예과", cut50: 1.50, cut70: 1.65, comp: 6.0 }],
  },
  {
    id: "cku", name: "가톨릭관동대학교", region: "강원", type: "사립",
    lat: 37.7962, lng: 128.8556, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "가톨릭관동인재전형" },
    majors: [{ name: "의예과", cut50: 1.22, cut70: 1.32, comp: 8.0 }],
  },

  // ─────────────── 대구 · 경북(추가) ───────────────
  {
    id: "keimyung", name: "계명대학교", region: "대구", type: "사립",
    lat: 35.8531, lng: 128.4818, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "일반전형(학생부교과)·논술" },
    majors: [
      { name: "의예과", cut50: 1.18, cut70: 1.28, comp: 8.3 },
      { name: "컴퓨터공학전공", cut50: 2.75, cut70: 3.00, comp: 4.3 },
    ],
  },
  {
    id: "cu_daegu", name: "대구가톨릭대학교", region: "경북", type: "사립",
    lat: 35.9124, lng: 128.7938, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "DCU자기추천전형" },
    majors: [{ name: "약학과", cut50: 1.35, cut70: 1.48, comp: 7.0 }],
  },
  {
    id: "daegu_univ", name: "대구대학교", region: "경북", type: "사립",
    lat: 35.9057, lng: 128.7522, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "학생부종합(DU자기추천전형)" },
    majors: [{ name: "컴퓨터공학부", cut50: 3.10, cut70: 3.35, comp: 3.6 }],
  },
  {
    id: "dhu", name: "대구한의대학교", region: "경북", type: "사립",
    lat: 35.8245, lng: 128.7550, tier: "중위",
    admission: { susi: 65, jeongsi: 35, note: "한의학 특화전형" },
    majors: [{ name: "한의예과", cut50: 1.45, cut70: 1.58, comp: 6.5 }],
  },
  {
    id: "yeungnam", name: "영남대학교", region: "경북", type: "사립",
    lat: 35.8377, lng: 128.7530, tier: "중상위",
    admission: { susi: 61, jeongsi: 39, note: "학생부종합(YU자기추천전형)" },
    majors: [
      { name: "의예과", cut50: 1.16, cut70: 1.26, comp: 8.4 },
      { name: "컴퓨터공학과", cut50: 2.70, cut70: 2.95, comp: 4.4 },
    ],
  },
  {
    id: "andong", name: "안동대학교", region: "경북", type: "국립",
    lat: 36.5486, lng: 128.7890, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합·지역인재" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.00, cut70: 3.25, comp: 3.7 }],
  },
  {
    id: "kumoh", name: "금오공과대학교", region: "경북", type: "국립",
    lat: 36.1462, lng: 128.3944, tier: "중상위",
    admission: { susi: 62, jeongsi: 38, note: "학생부종합(공과특화전형)" },
    majors: [{ name: "컴퓨터공학과", cut50: 2.55, cut70: 2.80, comp: 4.9 }],
  },
  {
    id: "handong", name: "한동대학교", region: "경북", type: "사립",
    lat: 36.1071, lng: 129.3877, tier: "상위",
    admission: { susi: 65, jeongsi: 35, note: "무학과 전공자율선택, 학생부종합" },
    majors: [{ name: "무학과(자율전공)", cut50: 1.60, cut70: 1.80, comp: 5.5 }],
  },

  // ─────────────── 부산 · 울산 · 경남(추가) ───────────────
  {
    id: "bufs", name: "부산외국어대학교", region: "부산", type: "사립",
    lat: 35.1595, lng: 129.1078, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "어학특기자·학생부종합" },
    majors: [{ name: "글로벌비즈니스학부", cut50: 3.00, cut70: 3.25, comp: 3.8 }],
  },
  {
    id: "tu_dongmyung", name: "동명대학교", region: "부산", type: "사립",
    lat: 35.0763, lng: 129.0937, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.35, cut70: 3.58, comp: 3.1 }],
  },
  {
    id: "silla", name: "신라대학교", region: "부산", type: "사립",
    lat: 35.1231, lng: 128.9915, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.30, cut70: 3.55, comp: 3.2 }],
  },
  {
    id: "cup", name: "부산가톨릭대학교", region: "부산", type: "사립",
    lat: 35.2385, lng: 129.1104, tier: "중하위",
    admission: { susi: 66, jeongsi: 34, note: "학생부교과전형 중심" },
    majors: [{ name: "방사선학과", cut50: 2.60, cut70: 2.85, comp: 4.5 }],
  },
  {
    id: "kosin", name: "고신대학교", region: "부산", type: "사립",
    lat: 35.0925, lng: 128.9694, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합(의료특화)" },
    majors: [{ name: "의예과", cut50: 1.30, cut70: 1.42, comp: 7.8 }],
  },
  {
    id: "kyungsung", name: "경성대학교", region: "부산", type: "사립",
    lat: 35.1339, lng: 129.0999, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합(경성인재전형)" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.00, cut70: 3.25, comp: 3.7 }],
  },
  {
    id: "inje", name: "인제대학교", region: "경남", type: "사립",
    lat: 35.2280, lng: 128.7970, tier: "중상위",
    admission: { susi: 61, jeongsi: 39, note: "학생부종합(의료특화)" },
    majors: [
      { name: "의예과", cut50: 1.20, cut70: 1.30, comp: 8.2 },
      { name: "컴퓨터공학과", cut50: 2.85, cut70: 3.10, comp: 4.0 },
    ],
  },
  {
    id: "changwon", name: "창원대학교", region: "경남", type: "국립",
    lat: 35.2456, lng: 128.6738, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합·지역인재" },
    majors: [{ name: "메카트로닉스공학과", cut50: 2.90, cut70: 3.15, comp: 4.0 }],
  },
  {
    id: "kyungnam", name: "경남대학교", region: "경남", type: "사립",
    lat: 35.1948, lng: 128.6014, tier: "중하위",
    admission: { susi: 65, jeongsi: 35, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.30, cut70: 3.55, comp: 3.2 }],
  },

  // ─────────────── 광주 · 전라(추가) ───────────────
  {
    id: "honam", name: "호남대학교", region: "광주", type: "사립",
    lat: 35.1214, lng: 126.7936, tier: "중하위",
    admission: { susi: 66, jeongsi: 34, note: "학생부교과전형 중심" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.35, cut70: 3.60, comp: 3.0 }],
  },
  {
    id: "mokpo", name: "목포대학교", region: "전남", type: "국립",
    lat: 34.9122, lng: 126.4362, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "학생부종합·지역인재" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.10, cut70: 3.35, comp: 3.5 }],
  },
  {
    id: "sunchon", name: "순천대학교", region: "전남", type: "국립",
    lat: 35.0996, lng: 127.4995, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "학생부종합·지역인재" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.05, cut70: 3.30, comp: 3.6 }],
  },
  {
    id: "mmu", name: "목포해양대학교", region: "전남", type: "국립",
    lat: 34.7736, lng: 126.3253, tier: "중위",
    admission: { susi: 62, jeongsi: 38, note: "해양특성화전형(승선계열)" },
    majors: [{ name: "항해학부", cut50: 3.00, cut70: 3.25, comp: 5.0 }],
  },
  {
    id: "wku", name: "원광대학교", region: "전북", type: "사립",
    lat: 35.9598, lng: 126.9585, tier: "중위",
    admission: { susi: 63, jeongsi: 37, note: "학생부종합(의료·한의학 특화)" },
    majors: [
      { name: "한의예과", cut50: 1.30, cut70: 1.42, comp: 7.5 },
      { name: "컴퓨터소프트웨어공학과", cut50: 3.00, cut70: 3.25, comp: 3.7 },
    ],
  },
  {
    id: "woosuk", name: "우석대학교", region: "전북", type: "사립",
    lat: 35.8474, lng: 127.1078, tier: "중하위",
    admission: { susi: 66, jeongsi: 34, note: "학생부교과전형 중심" },
    majors: [{ name: "물리치료학과", cut50: 2.80, cut70: 3.05, comp: 4.2 }],
  },
  {
    id: "jeonju_univ", name: "전주대학교", region: "전북", type: "사립",
    lat: 35.8064, lng: 127.1284, tier: "중위",
    admission: { susi: 64, jeongsi: 36, note: "학생부종합(전주인재전형)" },
    majors: [{ name: "컴퓨터공학과", cut50: 3.05, cut70: 3.30, comp: 3.6 }],
  },
];
