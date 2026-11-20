export type Kind = "plane" | "car" | "drive" | "spot" | "food" | "coffee" | "shop" | "hotel" | "walk";

export type Place = {
  name: string;
  /** 구글맵 검색어 (일본어 이름이 가장 정확) */
  q: string;
  /** 구글맵 링크를 직접 지정할 때 */
  url?: string;
  meta: string;
  /** 동선 지도에 쓰는 짧은 이름 */
  short?: string;
  /** 렌터카 내비용 맵코드 */
  mapcode?: string;
  tel?: string;
  /** 대안으로 갈 때 동선 영향 (대안 식당에만) */
  fit?: string;
  /** 여분 주차장 · 대안 식당 키 */
  alt?: string[];
};

export type Item = {
  time: string;
  title: string;
  note?: string;
  kind: Kind;
  place: string;
  /** 펼치면 함께 보이는 가게 */
  extra?: string[];
  pick?: boolean;
  warn?: string;
};

export type Day = { date: string; iso: string; title: string; goal: string; notes?: string[]; route: string[]; /** 예보를 볼 곳 (weatherSpots의 place) */ wx: string; items: Item[] };

export const FLIGHT_OUT = "17:05";

export const places: Record<string, Place> = {
  airport: { short: "공항", name: "후쿠오카공항 국제선", q: "福岡空港 国際線旅客ターミナル", meta: "입국 · 출국" },
  rentPick: { short: "렌터카",
    name: "토요타 렌터카 공항 국제선점",
    q: "トヨタレンタカー 福岡空港国際線店",
    meta: "08:00–20:00 · 예약 영업소가 다르면 수정",
    mapcode: "13 293 345*35",
    tel: "092-778-0100",
  },
  dzPark: {
    name: "다자이후 텐만구 주차장",
    q: "太宰府天満宮 第二駐車場",
    meta: "08:00–17:00 · 신사까지 도보 7분",
    mapcode: "55 333 801*67",
    alt: ["dzPark2"],
  },
  dzPark2: { name: "다자이후 주차장 (사이후 2초메)", q: "太宰府駐車場 宰府2丁目", meta: "참배길 입구 쪽", mapcode: "55 334 723*68" },
  dazaifu: { short: "다자이후", name: "다자이후 텐만구", q: "太宰府天満宮", meta: "학문의 신 · 참배길 기념품 거리" },
  kasanoya: { name: "가사노야", q: "かさの家 太宰府", meta: "갓 구운 우메가에모치" },
  oishi: {
    name: "오이시차야",
    q: "お石茶屋 太宰府",
    meta: "11:00–16:30 · 텐만구 경내 찻집",
    mapcode: "55 364 318*28",
    tel: "092-922-4045",
  },
  yfPark: { short: "유후인",
    name: "NPC24H 유노츠보가도 주차장",
    q: "NPC24H湯布院湯の坪街道パーキング",
    meta: "24시간 · 유노츠보 거리 중간",
    mapcode: "269 358 500*74",
    alt: ["yfPark2"],
  },
  yfPark2: { name: "NPC24H 유후인 역앞 주차장", q: "NPC24H由布院駅前パーキング", meta: "24시간", mapcode: "269 328 870*46" },
  floral: { name: "유후인 플로랄빌리지", q: "湯布院フローラルヴィレッジ", meta: "09:30–17:30" },
  yunotsubo: { name: "유노츠보 거리", q: "湯の坪街道", meta: "역 → 긴린코 디저트·기념품 거리" },
  bspeak: {
    name: "비스피크 (P롤 롤케이크)",
    q: "B-speak 湯布院",
    meta: "10:00–17:00 · 주차장 옆",
    mapcode: "269 358 402*06",
    tel: "0977-28-2166",
  },
  milch: {
    name: "미르히 (푸딩·치즈케이크)",
    q: "ミルヒ 湯布院 川上3015-1",
    meta: "10:30–17:30 · 주차장 옆",
    mapcode: "269 358 500*00",
    tel: "0977-28-2800",
  },
  kinsho: {
    name: "금상고로케 본점",
    q: "湯布院金賞コロッケ 本店",
    meta: "09:00–18:00(일) · 주차장에서 도보 8분",
    mapcode: "269 359 635*54",
    tel: "0977-85-3053",
  },
  kinrin: { short: "긴린코", name: "긴린코 호수", q: "金鱗湖", meta: "겨울 아침 물안개", mapcode: "269 359 552*47" },
  ryokan: { short: "료칸",
    name: "료칸 여명 (ひすいの里 黎明)",
    q: "ひすいの里 黎明 湯布院",
    url: "https://www.google.com/maps/place/%EB%A3%8C%EC%B9%B8+%EC%97%AC%EB%AA%85/@33.256967,131.3664221,17z/data=!4m9!3m8!1s0x3546ae71048ede0b:0xd47721dd5d4dc1ca!5m2!4m1!1i2!8m2!3d33.2559297!4d131.3679645!16s%2Fg%2F1vxvfnvz",
    meta: "유후인초 가와카미 2212-35",
    mapcode: "269 329 283*05",
  },
  umi: { short: "지옥순례", name: "우미지고쿠", q: "海地獄 別府", meta: "08:00–17:00 · 무료 주차", mapcode: "46 521 556*83" },
  mushi: { short: "지옥찜",
    name: "지옥찜공방 간나와",
    q: "地獄蒸し工房 鉄輪",
    meta: "10:00–18:00 · 번호표 대기",
    mapcode: "46 522 403*20",
    tel: "0977-66-3775",
    alt: ["hyotan", "toyotsune"],
  },
  hyotan: { fit: "동선 OK · 반납까지 이동 +2분", name: "효탄온천 식당", q: "ひょうたん温泉 別府", meta: "차로 3분 · 지옥찜 정식", mapcode: "46 522 294*24", tel: "0977-66-0527" },
  toyotsune: { fit: "반납까지 이동 +20분 · 치노이케 지옥을 빼면 반납 시간 그대로",
    name: "토요츠네 본점",
    q: "とよ常 本店 別府",
    meta: "11:00–20:00 · 튀김덮밥 · 벳푸 시내",
    mapcode: "46 406 154*50",
    tel: "0977-22-3274",
  },
  chinoike: { name: "치노이케 지옥", q: "血の池地獄 別府", meta: "붉은 온천 · 차로 10분", mapcode: "46 552 770*20" },
  stay: { short: "숙소", name: "스테이 에어포트", q: "Stay Airport 福岡 空港前2-11-15", meta: "구코마에 2-11-15 · 국내선 근처" },
  hakata: { short: "하카타역", name: "하카타역 (JR 하카타시티)", q: "JR博多シティ", meta: "아뮤플라자 · 한큐 · 데이토스" },
  ooyama: {
    name: "모츠나베 오오야마 KITTE점",
    q: "もつ鍋おおやま KITTE博多店",
    meta: "11:00–23:00 · KITTE 9층 · 예약 권장",
    tel: "092-260-6303",
    alt: ["hanamidori", "uogashi"],
  },
  hanamidori: { fit: "동선 OK · KITTE에서 도보 약 4분 · 마루이·북오프 일정 그대로", name: "하나미도리 (미즈타키)", q: "博多華味鳥 博多駅前店", meta: "17:00–23:00 · 맑은 닭백숙 전골", tel: "092-432-1801" },
  uogashi: { fit: "동선 OK · 하카타역 지하 · 마루이까지 도보 약 3분", name: "스시 우오가시 1번가점", q: "寿司 博多魚がし 博多1番街店", meta: "하카타역 지하 · 시장 직영 초밥" },
  wgc: { name: "화이트글래스커피", q: "WHITE GLASS COFFEE 福岡", meta: "08:00–20:00 · 하카타역 앞", tel: "092-483-1559" },
  canal: { short: "캐널시티", name: "캐널시티 하카타", q: "キャナルシティ博多", meta: "캐릭터숍 · 분수쇼" },
  muji: { name: "무인양품 캐널시티점", q: "無印良品 キャナルシティ博多", meta: "생활잡화·과자" },
  ichiran: { short: "이치란",
    name: "이치란 본사총본점",
    q: "一蘭 本社総本店",
    meta: "24시간 · 나카스",
    tel: "050-3733-2600",
    alt: ["mentaiju", "hyotanSushi"],
  },
  mentaiju: { fit: "이치란에서 도보 약 4분 · 대기 20분 넘으면 포기", name: "원조 하카타 멘타이쥬", q: "元祖博多めんたい重", meta: "07:00–22:30 · 명란덮밥 · 대기 김", tel: "092-725-7220" },
  hyotanSushi: { fit: "돈키호테에서 도보 14분 · 이 경우 돈키호테 먼저 → 효탄스시, 린트는 생략 · 13:50엔 텐진역으로",
    name: "효탄스시 (텐진)",
    q: "ひょうたん寿司 天神2-10-20",
    meta: "점심 11:30–15:00 · 린트 근처 · 갈 거면 돈키호테 다음 텐진에서 점심",
    tel: "092-711-1951",
  },
  hankyu: { name: "하카타 한큐 백화점", q: "博多阪急", meta: "하카타역 직결 · 10시 개점" },
  yodobashi: {
    name: "요도바시카메라 하카타",
    q: "ヨドバシカメラ マルチメディア博多",
    meta: "09:30–22:00 · 하카타역 지쿠시 출구 · 피규어·프라모델·장난감·화장품 · 안에 GU",
  },
  pokemon: {
    name: "포켓몬센터 후쿠오카 (하카타 마루이 2층)",
    q: "ポケモンセンターフクオカ 博多マルイ",
    meta: "10:00–21:00 · 하카타역 하카타 출구에서 도보 3분",
  },
  gu: { name: "GU 요도바시점", q: "ジーユー ヨドバシ博多店", meta: "요도바시 건물 안" },
  fernanda: { name: "페르난다 아뮤에스트점", q: "フェルナンダ アミュエスト博多店", meta: "하카타역 지하 · 향수·바디미스트" },
  donki: { short: "돈키호테", name: "돈키호테 나카스점", q: "ドン・キホーテ 中洲店", meta: "24시간 · 면세" },
  marui: {
    short: "마루이",
    name: "하카타 마루이 (KITTE 하카타 건물)",
    q: "博多マルイ",
    meta: "10:00–21:00 · 7층 애니·카드숍 · 6층 스루가야(중고 피규어)·캡슐토이 · 3층 키라키라돈키 · 2층 포켓몬센터",
  },
  surugaya: {
    name: "스루가야 하카타 마루이점 (6층)",
    q: "駿河屋 博多マルイ店",
    meta: "10:00–21:00 · 중고 피규어·프라모델·게임",
  },
  kirakira: {
    name: "키라키라돈키 (3층)",
    q: "キラキラドンキ 博多マルイ店",
    meta: "SNS 인기 과자·한국 화장품·소품",
  },
  bookoff: {
    short: "북오프",
    name: "북오프 후쿠오카 하카타구치점",
    q: "BOOKOFF 福岡博多口店",
    meta: "10:00–22:00 · 마루이 맞은편 1층 · 중고 피규어·게임·애니 굿즈",
    tel: "092-436-2285",
  },
  lindt: { short: "텐진",
    name: "린트 텐진지하상가점",
    q: "リンツ ショコラ ブティック 天神地下街店",
    meta: "10:00–20:00 · 돈키호테에서 도보 12분",
    tel: "092-406-2024",
  },
};

export const days: Day[] = [
  {
    date: "12.27 일",
    iso: "2026-12-27",
    wx: "유후인",
    route: ["rentPick", "dazaifu", "yfPark", "ryokan"],
    title: "다자이후 · 유후인",
    goal: "17:35 료칸 도착",
    notes: ["연말이라 입국심사가 오래 걸릴 수 있어요.", "유후인 가게는 17시 전후로 닫아요. 디저트부터 사세요."],
    items: [
      { time: "09:30", title: "후쿠오카공항 도착", note: "입국심사 40~60분", kind: "plane", place: "airport" },
      {
        time: "10:30",
        title: "렌터카 수령",
        note: "셔틀로 영업소 이동 · ETC·면책 확인",
        kind: "car",
        place: "rentPick",
        warn: "겨울 타이어 장착 확인",
      },
      { time: "11:10", title: "다자이후로 이동 · 주차", note: "약 40분", kind: "drive", place: "dzPark" },
      { time: "12:00", title: "참배길 · 우메가에모치", note: "구마 겐고 스타벅스", kind: "walk", place: "kasanoya" },
      { time: "12:40", title: "다자이후 텐만구 참배", kind: "spot", place: "dazaifu" },
      { time: "13:20", title: "점심 · 오이시차야", note: "우동 · 우메가에모치", kind: "food", place: "oishi", pick: true },
      { time: "14:15", title: "유후인으로 이동 · 주차", note: "약 1시간 30분", kind: "drive", place: "yfPark" },
      {
        time: "16:00",
        title: "롤케이크 · 미르히 푸딩",
        note: "둘 다 주차장 옆",
        kind: "food",
        place: "bspeak",
        extra: ["milch"],
        pick: true,
        warn: "비스피크 17시 마감 · 품절 잦음",
      },
      { time: "16:15", title: "플로랄빌리지", kind: "spot", place: "floral" },
      { time: "16:45", title: "유노츠보 거리 · 금상고로케", note: "긴린코 쪽으로 걸으며 구경", kind: "food", place: "kinsho", extra: ["yunotsubo"], pick: true },
      { time: "17:20", title: "료칸으로 이동", note: "주차장 복귀 후 15분", kind: "drive", place: "ryokan" },
      { time: "18:00", title: "료칸 석식 · 온천", kind: "hotel", place: "ryokan" },
    ],
  },
  {
    date: "12.28 월",
    iso: "2026-12-28",
    wx: "벳푸",
    route: ["kinrin", "umi", "mushi", "rentPick", "stay", "marui", "bookoff"],
    title: "긴린코 · 벳푸 · 하카타",
    goal: "15:40 렌터카 반납",
    notes: ["아침에 길이 얼 수 있으니 천천히 출발하세요.", "지옥찜공방은 12시 전에 들어가야 덜 기다려요."],
    items: [
      { time: "07:00", title: "긴린코 물안개 산책", note: "차로 5분 · 방한 필수", kind: "spot", place: "kinrin" },
      { time: "07:45", title: "조식 · 체크아웃", kind: "hotel", place: "ryokan" },
      { time: "09:00", title: "벳푸로 이동", note: "약 40분", kind: "drive", place: "umi" },
      { time: "09:40", title: "지옥순례", note: "우미 → 오니이시보즈 → 가마도 → 오니야마", kind: "spot", place: "umi" },
      {
        time: "11:40",
        title: "점심 · 지옥찜공방",
        note: "온천 증기로 직접 쪄 먹기",
        kind: "food",
        place: "mushi",
        pick: true,
        warn: "대기 40분 넘으면 대안 식당으로",
      },
      { time: "12:40", title: "치노이케 지옥 (선택)", kind: "spot", place: "chinoike" },
      { time: "13:10", title: "공항으로 이동 · 주유", note: "약 2시간 · '레귤러 만땅'", kind: "drive", place: "rentPick" },
      { time: "15:20", title: "렌터카 반납", kind: "car", place: "rentPick" },
      { time: "15:40", title: "스테이 에어포트 체크인", note: "공항에서 택시 5~10분", kind: "hotel", place: "stay" },
      { time: "17:00", title: "하카타역으로 이동", note: "지하철 5분", kind: "drive", place: "hakata" },
      { time: "17:30", title: "저녁 · 모츠나베 오오야마", note: "예약 권장", kind: "food", place: "ooyama", pick: true },
      {
        time: "19:00",
        title: "하카타 마루이 구경",
        kind: "shop",
        place: "marui",
        extra: ["surugaya", "kirakira", "pokemon"],
        warn: "마루이 매장은 21시에 닫아요",
      },
      { time: "20:20", title: "북오프 하카타구치점", note: "마루이 맞은편 · 22시까지", kind: "shop", place: "bookoff" },
      { time: "21:00", title: "숙소로 · 내일 면세 준비", note: "지하철 5분 · 환급 업체 가입 · 영수증별 정리", kind: "hotel", place: "stay" },
    ],
  },
  {
    date: "12.29 화",
    iso: "2026-12-29",
    wx: "후쿠오카",
    route: ["stay", "hakata", "canal", "ichiran", "donki", "lindt", "airport"],
    title: "하카타 쇼핑 · 귀국",
    goal: "14:40 공항 도착",
    notes: ["면세품은 영수증별로 모아 기내 가방에 넣으세요.", "공항에선 짐을 부치기 전에 세관 확인부터 하세요."],
    items: [
      { time: "08:00", title: "체크아웃 · 짐 맡기기", note: "편의점 명란 오니기리", kind: "hotel", place: "stay" },
      { time: "08:40", title: "하카타역으로 이동", note: "지하철 5분", kind: "drive", place: "hakata" },
      { time: "09:10", title: "화이트글래스커피", kind: "coffee", place: "wgc" },
      { time: "09:40", title: "하카타역 쇼핑", note: "요도바시 피규어층 · 페르난다 · 한큐", kind: "shop", place: "yodobashi", extra: ["fernanda", "hankyu", "hakata"] },
      { time: "11:00", title: "캐널시티", note: "나나쿠마선 1정거장", kind: "shop", place: "canal", extra: ["muji"] },
      { time: "12:00", title: "점심 · 이치란 본점", note: "캐널시티에서 도보 10분", kind: "food", place: "ichiran", pick: true },
      {
        time: "12:40",
        title: "돈키호테 나카스",
        note: "여권 + Visit Japan Web 면세 QR",
        kind: "shop",
        place: "donki",
        warn: "먹을 간식은 따로 계산",
      },
      { time: "13:20", title: "린트 초콜릿 (선택)", note: "돈키호테에서 도보 12분 · 13:55엔 출발", kind: "shop", place: "lindt" },
      { time: "13:55", title: "숙소에서 짐 찾기", note: "텐진역 → 공항역 지하철 11분", kind: "hotel", place: "stay" },
      { time: "14:20", title: "국제선 터미널로", note: "택시 5~10분", kind: "drive", place: "airport" },
      { time: "14:40", title: "세관 확인 → 짐 부치기", note: "면세 와이파이 구역에서 Visit Japan Web", kind: "plane", place: "airport", warn: "짐 부치기 전에 세관 확인" },
      { time: FLIGHT_OUT, title: "한국행 출발", kind: "plane", place: "airport" },
    ],
  },
];

/** 운전 순서대로 정리한 내비 목적지 (alt는 자동으로 여분 표시) */
export const drive: { day: string; keys: string[] }[] = [
  { day: "DAY 1 · 12.27", keys: ["rentPick", "dzPark", "yfPark", "ryokan"] },
  { day: "DAY 2 · 12.28", keys: ["kinrin", "umi", "mushi", "chinoike", "rentPick"] },
];

/** 맛집: 식사별 메인 + 메뉴. 대안은 places[].alt 에서 가져옴 */
export type Meal = { when: string; key: string; menu: string };

export const meals: Meal[] = [
  { when: "DAY 1 점심", key: "oishi", menu: "우동 · 우메가에모치" },
  { when: "DAY 1 간식", key: "kasanoya", menu: "우메가에모치" },
  { when: "DAY 1 간식", key: "bspeak", menu: "P롤" },
  { when: "DAY 1 간식", key: "milch", menu: "푸딩 · 반숙 치즈케이크" },
  { when: "DAY 1 간식", key: "kinsho", menu: "금상 고로케" },
  { when: "DAY 2 점심", key: "mushi", menu: "지옥찜 · 지옥찜 푸딩" },
  { when: "DAY 2 저녁", key: "ooyama", menu: "모츠나베 (된장맛)" },
  { when: "DAY 3 점심", key: "ichiran", menu: "돈코츠 라멘" },
];

/* ---------------- 면세 (2026.11~ 환급 방식) ---------------- */

export type TaxStep = { when: string; title: string; points: string[] };

export const taxSteps: TaxStep[] = [
  {
    when: "입국 후",
    title: "Visit Japan Web 면세 QR 만들기",
    points: ["3인 모두. 입국 정보(상륙허가 스티커) 등록을 요구하면 이때 해요."],
  },
  {
    when: "쇼핑할 때",
    title: "세금 포함 가격으로 결제",
    points: [
      "여권 원본 또는 면세 QR을 보여줘요.",
      "같은 가게·같은 날 세전 5,000엔 이상만 대상이에요.",
      "영수증 QR을 챙기고, 먹을 간식은 따로 계산해요. 한 영수증에서 하나라도 먹으면 그 영수증 전체가 환급에서 빠져요.",
    ],
  },
  {
    when: "DAY 2 밤",
    title: "환급 업체 가입",
    points: [
      "영수증 QR로 접속해 가입 → 여권 인증 → 환급 카드 등록.",
      "면세품은 영수증별로 모아 기내 가방에.",
    ],
  },
  {
    when: "DAY 3 공항",
    title: "짐 부치기 전에 세관 확인",
    points: [
      "출국 로비 면세 와이파이 구역에서 Visit Japan Web으로 신청 (또는 키오스크).",
      "그린이면 끝, 레드면 세관 카운터에서 물건 확인.",
      "그 다음에 짐을 부쳐요.",
    ],
  },
  {
    when: "귀국 후",
    title: "환급 입금 확인",
    points: ["업체마다 며칠~몇 주. 수수료를 떼는 곳도 있어요."],
  },
];

/** DAY 3 동선 매장 → 환급 업체 */
export type Shop = { key: string; refunder: string; sure: boolean };

export const shops: Shop[] = [
  { key: "donki", refunder: "J-TaxRefund", sure: true },
  { key: "gu", refunder: "J-TaxRefund", sure: true },
  { key: "yodobashi", refunder: "Global Blue", sure: false },
  { key: "hankyu", refunder: "면세 카운터에서 확인", sure: false },
  { key: "muji", refunder: "J-TaxRefund (보도)", sure: false },
  { key: "hakata", refunder: "매장마다 다름", sure: false },
];

export type Refunder = { name: string; url: string };

export const refunders: Refunder[] = [
  { name: "J-TaxRefund", url: "https://www.donki.com/en/tax_free/" },
  { name: "Global Blue", url: "https://www.globalblue.com/" },
  { name: "PIE VAT", url: "https://pievat.com/japan" },
  { name: "JPrefund", url: "https://jprefund.com/" },
];

/* ---------------- 준비물 ---------------- */

export type Prep = { title: string; desc: string; url?: string; icon: string; guide?: string[] };

export const prep: Prep[] = [
  { title: "Visit Japan Web", desc: "3인 모두 · 입국 QR + 면세 QR", url: "https://www.vjw.digital.go.jp/", icon: "clipboard" },
  { title: "국제운전면허증", desc: "한국 면허증·여권 원본도 함께", url: "https://www.safedriving.or.kr/", icon: "file" },
  { title: "렌터카 옵션", desc: "겨울 타이어 · ETC 카드 · 면책(CDW+NOC)", url: "https://rent.toyota.co.jp/eng/", icon: "snow" },
  {
    title: "eSIM (데이터)",
    desc: "통신사 로밍보다 훨씬 저렴 · 1인 1개",
    icon: "wifi",
    guide: [
      "내 폰이 eSIM 되는지 확인: 아이폰은 설정 → 일반 → 정보에 'EID'가 있으면 OK (XS 이후). 갤럭시는 설정 → 연결 → SIM 관리자에 'eSIM 추가'가 있으면 OK.",
      "가격 비교: 통신사 로밍은 3일 약 6~7만 원(1인), eSIM은 3일 무제한 약 1~2만 원.",
      "구매: 유심사·말톡·도시락eSIM·Holafly·Airalo 중 하나에서 '일본 3일(또는 4일) 무제한' 구매 → 이메일로 QR 코드 도착.",
      "설치는 한국에서 출발 전에 (와이파이 필요): QR 스캔 → 회선 이름을 '일본'으로.",
      "일본 도착 후: 모바일 데이터를 '일본' 회선으로 바꾸고, 그 회선의 데이터 로밍을 켜기. 한국 회선의 데이터 로밍은 끄기.",
      "한국 번호 문자는 계속 받을 수 있어요 (인증 문자용). 전화가 꼭 필요하면 통신사 로밍을 따로 생각하세요.",
    ],
  },
  { title: "여행자보험", desc: "의료비 · 항공 지연 · 휴대품", icon: "shield" },
  {
    title: "모츠나베 예약",
    desc: "12/28 17:30 · 3인 · 그루나비 무료 온라인 예약",
    url: "https://gurunavi.com/en/f158507/rst",
    icon: "food",
  },
  { title: "JCB 캐시백 응모", desc: "돈키호테 · 한큐한신백화점", url: "https://www.specialoffers.jcb/kr/campaign/detail/2026JCBig/92971/", icon: "card" },
  { title: "결제 준비", desc: "해외결제 카드 2장 · 엔화 현금 · 동전지갑", icon: "card" },
];

/* ---------------- 쇼핑 리스트 ---------------- */

export type Buy = {
  name: string;
  jp: string;
  where: string;
  note?: string;
  place?: string;
  cat: "내 리스트" | "후쿠오카 명물" | "과자·간식" | "드럭스토어";
};

export const buys: Buy[] = [
  { name: "사봉 드 사보타 헤어밀크·오일", jp: "サボンドサボタ", where: "마쓰키요 등 드럭스토어, 로프트·핸즈", note: "헤어밀크 약 1,540엔", cat: "내 리스트" },
  { name: "퓨레그미 프리미엄 아마오우", jp: "ピュレグミプレミアム あまおう苺", where: "편의점, 하카타역·공항 기념품점", note: "한정판 · 보이면 바로", cat: "내 리스트" },
  { name: "명란 오니기리", jp: "明太子おにぎり", where: "세븐일레븐·패밀리마트·로손", cat: "내 리스트" },
  { name: "페르난다", jp: "フェルナンダ", where: "하카타역 아뮤에스트", place: "fernanda", cat: "내 리스트" },
  { name: "린트 초콜릿", jp: "リンツ", where: "텐진지하상가", place: "lindt", cat: "내 리스트" },
  { name: "명란젓", jp: "辛子明太子", where: "데이토스 · 한큐 지하 · 공항", note: "냉장 · 마지막 날 구매", place: "hakata", cat: "후쿠오카 명물" },
  { name: "하카타 토리몬", jp: "博多通りもん", where: "하카타역 · 공항", place: "hakata", cat: "후쿠오카 명물" },
  { name: "멘베이", jp: "めんべい", where: "하카타역 · 공항 · 돈키호테", cat: "후쿠오카 명물" },
  { name: "아마오우 딸기 과자", jp: "あまおう スイーツ", where: "데이토스 · 한큐 지하 · 공항", cat: "과자·간식" },
  { name: "이치란 라멘 (봉지)", jp: "一蘭", where: "이치란 본점 · 돈키호테", place: "ichiran", cat: "과자·간식" },
  { name: "지역 한정 킷캣", jp: "キットカット 地域限定", where: "돈키호테 · 공항", place: "donki", cat: "과자·간식" },
  { name: "동전파스 · 휴족시간", jp: "ロイヒつぼ膏 / 休足時間", where: "돈키호테 · 드럭스토어", place: "donki", cat: "드럭스토어" },
  { name: "위장약", jp: "キャベジン / 太田胃散", where: "돈키호테 · 드럭스토어", place: "donki", cat: "드럭스토어" },
];

/* ---------------- 카드·쿠폰 ---------------- */

export type Deal = { title: string; benefit: string; when: string; how: string; best?: boolean; url?: string };

export const cards: Deal[] = [
  {
    title: "JCB 카드",
    benefit: "돈키호테·하카타 한큐 15,000엔 이상 20% (각 최대 3,000엔)",
    when: "~12/31",
    how: "가맹점별 사전 응모 · 실물카드 엔화 결제",
    best: true,
    url: "https://www.specialoffers.jcb/kr/campaign/detail/2026JCBig/92971/",
  },
  {
    title: "하나 트래블로그+ 신용",
    benefit: "돈키호테·유니클로 10만 원↑ 1만 원 · 편의점 2만 원↑ 5천 원",
    when: "~2027.4.14",
    how: "월 최대 5만 원",
  },
  {
    title: "신한 SOL트래블J 체크",
    benefit: "돈키호테 50% (반기 2만 원) · 편의점 5%",
    when: "상시",
    how: "전월 국내 30만 원 이용 조건",
    url: "https://www.shinhancard.com/pconts/company/html/promotion/press/1233252_3999.html",
  },
  {
    title: "네이버페이 해외 QR",
    benefit: "유니온페이 QR 최대 10% 랜덤 할인 (총 1만 엔)",
    when: "~12/31",
    how: "유니온페이 QR 가맹점만 · 일본여행 페이백은 종료",
    url: "https://m.blog.naver.com/nv_npay/224390780479",
  },
];

export const coupons: Deal[] = [
  {
    title: "돈키호테 관광객 쿠폰",
    benefit: "11,000엔↑ 5% · 33,000엔↑ 7%",
    when: "종료일 미정",
    how: "면세 결제 시 · 계산 전 화면 제시 · 카드사 쿠폰과 중복 불가",
    best: true,
    url: "https://japanportal.donki-global.com/coupon/cp001_en.html",
  },
  {
    title: "캐널시티 Alipay+",
    benefit: "1만 엔↑ 1,200엔 할인",
    when: "~2027.1.15",
    how: "네이버·카카오·토스페이",
    url: "https://canalcity.co.jp/event/detail/150",
  },
  {
    title: "텐진지하상가 Alipay+",
    benefit: "5,000엔↑ 600엔 할인",
    when: "~2027.1.15",
    how: "네이버·카카오·토스페이",
  },
  {
    title: "JR 하카타시티 Alipay+",
    benefit: "결제 할인 쿠폰",
    when: "~2027.1.15",
    how: "일부 매장 제외",
    url: "https://www.jrhakatacity.com/translation/coupon/",
  },
];

/* ---------------- 날씨 (Open-Meteo) ---------------- */

export type WeatherSpot = { place: string; lat: number; lon: number };

/** 여행지 실시간 날씨 (Open-Meteo) */
export const weatherSpots: WeatherSpot[] = [
  { place: "후쿠오카", lat: 33.59, lon: 130.401 },
  { place: "유후인", lat: 33.263, lon: 131.356 },
  { place: "벳푸", lat: 33.317, lon: 131.477 },
];

/* ---------------- 대중교통 ---------------- */

export type Leg = {
  day: string;
  time: string;
  from: string;
  to: string;
  mode: "subway" | "walk" | "bus";
  /** 노선 이름과 색 */
  line?: string;
  color?: string;
  /** 타는 방향 (승강장 표지) */
  dir?: string;
  ride?: string;
  fare?: string;
  steps: string[];
};

export const transitPay: { title: string; text: string }[] = [
  { title: "카드 터치로 타기 (추천)", text: "컨택트리스 표시가 있는 비자·마스터·JCB 카드를 개찰구 단말기에 대면 돼요. 1인 1카드 · 하루 최대 640엔" },
  { title: "표 사기", text: "발권기에서 한국어 선택 → 노선도에서 요금 확인 → 금액 버튼 → 현금 넣기" },
  { title: "노선 색", text: "공항선 주황색 · 나나쿠마선 초록색" },
];

export const legs: Leg[] = [
  {
    day: "DAY 2",
    time: "17:00",
    from: "숙소 (공항 근처)",
    to: "하카타역",
    mode: "subway",
    line: "공항선",
    color: "#f08200",
    dir: "博多·天神 방면",
    ride: "2정거장 · 5분",
    fare: "260엔",
    steps: ["후쿠오카공항역(국내선 터미널 지하)에서 탑승", "博多(하카타)에서 내려 하카타 출구(博多口) → KITTE 9층"],
  },
  {
    day: "DAY 2",
    time: "21:00",
    from: "하카타역",
    to: "숙소",
    mode: "subway",
    line: "공항선",
    color: "#f08200",
    dir: "福岡空港 방면",
    ride: "2정거장 · 5분",
    fare: "260엔",
    steps: ["종점 福岡空港(후쿠오카공항)에서 하차"],
  },
  {
    day: "DAY 3",
    time: "08:40",
    from: "숙소",
    to: "하카타역",
    mode: "subway",
    line: "공항선",
    color: "#f08200",
    dir: "博多·天神 방면",
    ride: "2정거장 · 5분",
    fare: "260엔",
    steps: ["캐리어는 숙소에 맡기고 출발"],
  },
  {
    day: "DAY 3",
    time: "10:50",
    from: "하카타역",
    to: "캐널시티",
    mode: "subway",
    line: "나나쿠마선",
    color: "#00a33e",
    dir: "橋本 방면",
    ride: "1정거장 · 3분",
    fare: "210엔",
    steps: ["역 안에서 초록색 표지 따라 나나쿠마선으로", "櫛田神社前(구시다진자마에)에서 내려 도보 2분", "걸어가도 15분이에요"],
  },
  {
    day: "DAY 3",
    time: "11:50",
    from: "캐널시티",
    to: "이치란 → 돈키호테 → 린트",
    mode: "walk",
    ride: "도보 10분 → 3분 → 12분",
    steps: ["나카스 강변을 따라 걷는 길", "린트는 텐진지하상가 안이라 비가 와도 괜찮아요"],
  },
  {
    day: "DAY 3",
    time: "13:55",
    from: "텐진",
    to: "후쿠오카공항 (숙소)",
    mode: "subway",
    line: "공항선",
    color: "#f08200",
    dir: "福岡空港 방면",
    ride: "5정거장 · 11분",
    fare: "260엔",
    steps: ["텐진지하상가에서 바로 天神(텐진)역으로", "종점 福岡空港에서 하차 → 숙소에서 짐 찾기"],
  },
  {
    day: "DAY 3",
    time: "14:20",
    from: "국내선 터미널",
    to: "국제선 터미널",
    mode: "bus",
    line: "무료 연결버스",
    color: "#2f5683",
    ride: "약 10~15분 · 10~15분 간격",
    fare: "무료",
    steps: ["국내선 터미널 1층 연결버스 승차장에서 탑승", "짐이 많으면 택시(5~10분)가 편해요"],
  },
];
