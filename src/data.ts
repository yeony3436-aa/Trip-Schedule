export type Kind =
  | "plane"
  | "car"
  | "drive"
  | "park"
  | "spot"
  | "food"
  | "coffee"
  | "shop"
  | "hotel"
  | "walk";

export type Place = {
  name: string;
  /** 구글맵 검색어 (일본어 이름이 가장 정확) */
  q: string;
  /** 구글맵 링크를 직접 지정할 때 */
  url?: string;
  meta: string;
  /** 렌터카 내비용 맵코드 */
  mapcode?: string;
  tel?: string;
  /** 대안(여분) 장소 키 */
  alt?: string | string[];
};

export type Item = {
  time: string;
  title: string;
  note: string;
  kind: Kind;
  place: string;
  /** 함께 들를 가게들 (펼치면 같이 표시) */
  extra?: string[];
  /** 맛집 표시 */
  pick?: boolean;
  /** 강조 경고 문구 */
  warn?: string;
};

export type Day = {
  date: string;
  title: string;
  sub: string;
  goal: string;
  weather: string;
  tip: string;
  items: Item[];
};

export const FLIGHT_OUT = "17:05";

export const places: Record<string, Place> = {
  airport: {
    name: "후쿠오카공항 국제선 터미널",
    q: "福岡空港 国際線旅客ターミナル",
    meta: "입국 · 출국",
  },
  rentPick: {
    name: "토요타 렌터카 후쿠오카공항 국제선점",
    q: "トヨタレンタカー 福岡空港国際線店",
    meta: "08:00–20:00 · 예약한 영업소가 다르면 수정",
    mapcode: "13 293 345*35",
    tel: "092-778-0100",
  },
  dzPark: {
    name: "다자이후 텐만구 주차장 (고조)",
    q: "太宰府天満宮 第二駐車場",
    meta: "08:00–17:00 · 신사까지 도보 약 7분",
    mapcode: "55 333 801*67",
    alt: "dzPark2",
  },
  dzPark2: {
    name: "[여분] 다자이후 주차장 (사이후 2초메)",
    q: "太宰府駐車場 宰府2丁目",
    meta: "참배길 입구 쪽 · 메인 주차장이 만차일 때",
    mapcode: "55 334 723*68",
  },
  dazaifu: {
    name: "다자이후 텐만구",
    q: "太宰府天満宮",
    meta: "학문의 신 · 참배길 기념품 거리",
  },
  kasanoya: {
    name: "가사노야 (우메가에모치)",
    q: "かさの家 太宰府",
    meta: "참배길 대표 떡집 · 갓 구운 우메가에모치",
  },
  starbucks: {
    name: "스타벅스 다자이후 오모테산도점",
    q: "スターバックス 太宰府天満宮表参道店",
    meta: "구마 겐고 설계 · 나무 격자 인테리어",
  },
  oishi: {
    name: "오이시차야 お石茶屋",
    q: "お石茶屋 太宰府",
    meta: "11:00–16:30 · 텐만구 경내 찻집",
    mapcode: "55 364 318*28",
    tel: "092-922-4045",
  },
  yfPark: {
    name: "NPC24H 유후인 유노츠보가도 주차장",
    q: "NPC24H湯布院湯の坪街道パーキング",
    meta: "24시간 · 유노츠보 거리 중간",
    mapcode: "269 358 500*74",
    alt: "yfPark2",
  },
  yfPark2: {
    name: "[여분] NPC24H 유후인 역앞 주차장",
    q: "NPC24H由布院駅前パーキング",
    meta: "24시간 · 역에서 유노츠보 거리 시작점까지 도보",
    mapcode: "269 328 870*46",
  },
  floral: {
    name: "유후인 플로랄빌리지",
    q: "湯布院フローラルヴィレッジ",
    meta: "09:30–17:30 · 영국 코츠월드풍 마을",
  },
  yunotsubo: {
    name: "유노츠보 거리",
    q: "湯の坪街道",
    meta: "역에서 긴린코까지 이어지는 디저트·기념품 거리",
  },
  bspeak: {
    name: "비스피크 B-speak (P롤 롤케이크)",
    q: "B-speak 湯布院",
    meta: "10:00–17:00 · 주차장 바로 옆 · 오후엔 품절 잦음",
    mapcode: "269 358 402*06",
    tel: "0977-28-2166",
  },
  milch: {
    name: "미르히 Milch (푸딩·반숙 치즈케이크)",
    q: "ミルヒ 湯布院 川上3015-1",
    meta: "10:30–17:30 · 주차장 바로 옆",
    mapcode: "269 358 500*00",
    tel: "0977-28-2800",
  },
  kinsho: {
    name: "금상고로케 본점",
    q: "湯布院金賞コロッケ 本店",
    meta: "09:00–17:30 (토·일 18:00) · 긴린코 쪽 끝, 주차장에서 도보 약 8분",
    mapcode: "269 359 635*54",
    tel: "0977-85-3053",
  },
  kinrin: {
    name: "긴린코 호수",
    q: "金鱗湖",
    meta: "겨울 아침 물안개 명소",
    mapcode: "269 359 552*47",
  },
  ryokan: {
    name: "료칸 여명 (ひすいの里 黎明)",
    q: "ひすいの里 黎明 湯布院",
    url: "https://www.google.com/maps/place/%EB%A3%8C%EC%B9%B8+%EC%97%AC%EB%AA%85/@33.256967,131.3664221,17z/data=!4m9!3m8!1s0x3546ae71048ede0b:0xd47721dd5d4dc1ca!5m2!4m1!1i2!8m2!3d33.2559297!4d131.3679645!16s%2Fg%2F1vxvfnvz",
    meta: "유후시 유후인초 가와카미 2212-35 · 18:00 석식",
    mapcode: "269 329 283*05",
  },
  umi: {
    name: "우미지고쿠 (바다 지옥)",
    q: "海地獄 別府",
    meta: "08:00–17:00 · 무료 주차 · 지옥순례 시작점",
    mapcode: "46 521 556*83",
  },
  mushi: {
    name: "지옥찜공방 간나와",
    q: "地獄蒸し工房 鉄輪",
    meta: "10:00–18:00 · 번호표 받고 대기 · 소규모 주차장",
    mapcode: "46 522 403*20",
    tel: "0977-66-3775",
    alt: ["hyotan", "okamotoya", "toyotsune"],
  },
  hyotan: {
    name: "[대안] 효탄온천 식당",
    q: "ひょうたん温泉 別府",
    meta: "간나와 · 지옥찜공방에서 차로 약 3분 · 온천 시설 안 식당에서 지옥찜 정식",
    mapcode: "46 522 294*24",
    tel: "0977-66-0527",
  },
  okamotoya: {
    name: "[대안] 오카모토야 매점 (묘반)",
    q: "岡本屋売店 明礬",
    meta: "08:30–18:30 · 지옥찜 푸딩 원조 · 달걀샌드·카레 · 고속도로 가는 산길 쪽",
    mapcode: "46 519 708*56",
    tel: "0977-66-6115",
  },
  toyotsune: {
    name: "[대안] 토요츠네 본점 (튀김덮밥)",
    q: "とよ常 本店 別府",
    meta: "11:00–20:00 · 화·수 휴무 (28일 월요일 영업) · 벳푸 시내라 왕복 약 30분 우회 · 전용 주차장 46 406 183*08",
    mapcode: "46 406 154*50",
    tel: "0977-22-3274",
  },
  chinoike: {
    name: "치노이케 지고쿠 (피의 연못 지옥)",
    q: "血の池地獄 別府",
    meta: "붉은 온천 · 간나와에서 차로 약 10분",
    mapcode: "46 552 770*20",
  },
  stay: {
    name: "스테이 에어포트",
    q: "Stay Airport 福岡 空港前2-11-15",
    meta: "하카타구 구코마에 2-11-15 · 국내선 터미널 근처",
  },
  hakata: {
    name: "JR 하카타시티 (하카타역)",
    q: "JR博多シティ",
    meta: "아뮤플라자 · 하카타 한큐 · 데이토스",
  },
  ooyama: {
    name: "모츠나베 오오야마 KITTE 하카타점",
    q: "もつ鍋おおやま KITTE博多店",
    meta: "11:00–23:00 · KITTE 하카타 9층 · 예약 권장",
    tel: "092-260-6303",
    alt: ["hanamidori", "uogashi"],
  },
  hanamidori: {
    name: "[대안] 하카타 하나미도리 하카타역앞점 (미즈타키)",
    q: "博多華味鳥 博多駅前店",
    meta: "점심 11:30–15:00 · 저녁 17:00–23:00 · 맑은 닭백숙 전골 · 예약 권장",
    tel: "092-432-1801",
  },
  uogashi: {
    name: "[대안] 스시 하카타 우오가시 1번가점",
    q: "寿司 博多魚がし 博多1番街店",
    meta: "하카타역 지하 1번가 · 시장 직영 초밥",
  },
  wgc: {
    name: "WHITE GLASS COFFEE 후쿠오카",
    q: "WHITE GLASS COFFEE 福岡",
    meta: "08:00–20:00 · 하카타역 앞 3-16-3",
    tel: "092-483-1559",
  },
  canal: {
    name: "캐널시티 하카타",
    q: "キャナルシティ博多",
    meta: "무인양품 · 캐릭터숍 · 분수쇼",
  },
  ichiran: {
    name: "이치란 본사총본점 (나카스)",
    q: "一蘭 本社総本店",
    meta: "24시간 · 돈키호테 나카스점 근처",
    tel: "050-3733-2600",
    alt: ["mentaiju", "taira"],
  },
  taira: {
    name: "[대안] 우동 다이라 (うどん平)",
    q: "うどん平 住吉",
    meta: "11:00–15:00 · 일요일 휴무 · 캐널시티에서 도보 약 12분 · 줄 서는 우엉튀김 우동 · 연말 휴무 확인",
  },
  hankyu: {
    name: "하카타 한큐 백화점",
    q: "博多阪急",
    meta: "하카타역 직결 · 면세 카운터에서 환급 업체 확인",
  },
  yodobashi: {
    name: "요도바시카메라 멀티미디어 하카타",
    q: "ヨドバシカメラ マルチメディア博多",
    meta: "하카타역 지쿠시 출구 쪽 · 전자제품·장난감·화장품 · 건물 안에 GU",
  },
  fernanda: {
    name: "페르난다 FERNANDA 아뮤에스트 하카타점",
    q: "フェルナンダ アミュエスト博多店",
    meta: "하카타역 지하 아뮤에스트 · 향수·바디·헤어 미스트 직영점",
  },
  lindt: {
    name: "린트 쇼콜라 부티크 텐진지하상가점",
    q: "リンツ ショコラ ブティック 天神地下街店",
    meta: "10:00–20:00 · 텐진지하상가 215 · 돈키호테 나카스에서 도보 약 12분",
    tel: "092-406-2024",
  },
  gu: {
    name: "GU 요도바시 하카타점",
    q: "ジーユー ヨドバシ博多店",
    meta: "요도바시카메라 건물 안",
  },
  muji: {
    name: "무인양품 캐널시티 하카타",
    q: "無印良品 キャナルシティ博多",
    meta: "대형 매장 · 생활잡화·과자·화장품",
  },
  mentaiju: {
    name: "[대안] 원조 하카타 멘타이쥬",
    q: "元祖博多めんたい重",
    meta: "07:00–22:30 · 명란덮밥 · 대기 김",
    tel: "092-725-7220",
  },
  donki: {
    name: "돈키호테 나카스점",
    q: "ドン・キホーテ 中洲店",
    meta: "24시간 · 면세 (여권 원본)",
  },
};

export const days: Day[] = [
  {
    date: "12.27 일",
    title: "다자이후 · 유후인",
    sub: "공항에서 렌터카로 출발해 료칸 석식까지",
    goal: "17:35 료칸 도착",
    weather: "일몰 17:20 · 유후인 아침 영하 가능",
    tip: "연말 성수기라 입국심사가 오래 걸릴 수 있어요. 유후인에선 주차장 옆 비스피크·미르히를 먼저 사고, 플로랄빌리지 → 금상고로케 순으로 걸어요. 긴린코는 내일 아침에 가요.",
    items: [
      { time: "09:30", title: "후쿠오카공항 도착", note: "입국심사·수하물 수령 (성수기 40~60분)", kind: "plane", place: "airport" },
      {
        time: "10:30–11:10",
        title: "렌터카 셔틀 · 차량 수령",
        note: "1층 렌터카 카운터 → 셔틀 → 영업소. 겨울 타이어·ETC·면책·내비 맵코드 입력 방법 확인",
        kind: "car",
        place: "rentPick",
        warn: "겨울(스터드리스) 타이어 장착 여부 꼭 확인",
      },
      { time: "11:10–11:50", title: "다자이후로 이동", note: "약 40분 · 내비에 주차장 맵코드 입력", kind: "drive", place: "dzPark" },
      { time: "11:50–12:00", title: "주차", note: "연말 일요일이라 붐벼요 · 만차면 여분 주차장으로", kind: "park", place: "dzPark" },
      { time: "12:00–12:40", title: "참배길 산책 · 우메가에모치", note: "갓 구운 떡 · 구마 겐고 스타벅스 사진", kind: "walk", place: "kasanoya" },
      { time: "12:40–13:20", title: "다자이후 텐만구 참배", note: "다리 3개 건너 본전까지 · 오미쿠지", kind: "spot", place: "dazaifu" },
      { time: "13:20–14:00", title: "점심 · 오이시차야", note: "경내 찻집 · 우동과 우메가에모치 세트", kind: "food", place: "oishi", pick: true },
      { time: "14:00–14:15", title: "기념품 쇼핑 후 출발", note: "주차장 17시 마감 · 쇼핑은 짧게", kind: "shop", place: "dazaifu" },
      { time: "14:15–15:50", title: "유후인으로 이동", note: "다자이후 IC → 유후인 IC 약 1시간 30분 · 휴게소 1회", kind: "drive", place: "yfPark" },
      { time: "15:50–16:00", title: "주차", note: "유노츠보 거리 중간에 있는 24시간 주차장", kind: "park", place: "yfPark" },
      {
        time: "16:00–16:15",
        title: "롤케이크 · 미르히 푸딩 먼저",
        note: "둘 다 주차장 바로 옆 · 문 닫기 전에 먼저 사두기",
        kind: "food",
        place: "bspeak",
        extra: ["milch"],
        pick: true,
        warn: "비스피크는 17:00 마감이고 오후엔 자주 품절돼요",
      },
      { time: "16:15–16:45", title: "플로랄빌리지", note: "17:30 마감 · 해 지기 전에", kind: "spot", place: "floral" },
      {
        time: "16:45–17:10",
        title: "유노츠보 거리 산책 · 금상고로케",
        note: "긴린코 방향으로 걸으며 구경 · 끝에서 갓 튀긴 고로케",
        kind: "food",
        place: "kinsho",
        extra: ["yunotsubo"],
        pick: true,
        warn: "일반 가게는 17:00~17:30에 닫아요",
      },
      { time: "17:10–17:20", title: "주차장으로 복귀", note: "왔던 길로 도보 약 8분", kind: "walk", place: "yfPark" },
      { time: "17:20–17:35", title: "료칸 여명으로 이동", note: "내비 맵코드 269 329 283*05", kind: "drive", place: "ryokan" },
      { time: "18:00", title: "료칸 석식 · 온천", note: "가이세키 후 온천 · 일찍 쉬기", kind: "hotel", place: "ryokan" },
    ],
  },
  {
    date: "12.28 월",
    title: "긴린코 아침 · 벳푸 · 하카타",
    sub: "물안개 산책 후 벳푸 지옥순례, 공항에서 반납",
    goal: "15:40 렌터카 반납",
    weather: "아침 노면 결빙 주의 · 천천히 출발",
    tip: "지옥찜공방은 12시가 넘으면 대기가 길어져요. 지옥순례를 4곳으로 끊고 11:40 전에 들어가세요.",
    items: [
      { time: "07:00–07:40", title: "긴린코 아침 물안개 산책", note: "료칸에서 약 1.3km · 차로 5분 또는 도보 15분 · 방한 필수", kind: "spot", place: "kinrin" },
      { time: "07:45–08:45", title: "료칸 조식", note: "짐 정리", kind: "food", place: "ryokan" },
      { time: "08:45–09:00", title: "체크아웃 · 출발", note: "짐을 차에 싣고 출발", kind: "hotel", place: "ryokan" },
      { time: "09:00–09:40", title: "벳푸 간나와로 이동", note: "약 40분 · 우미지고쿠 무료 주차장", kind: "drive", place: "umi" },
      { time: "09:40–11:40", title: "벳푸 지옥순례", note: "우미 → 오니이시보즈 → 가마도 → 오니야마 (모두 도보권)", kind: "spot", place: "umi" },
      {
        time: "11:40–12:40",
        title: "점심 · 지옥찜공방 간나와",
        note: "온천 증기로 해산물·채소·달걀을 직접 쪄 먹기 · 도착하면 먼저 번호표",
        kind: "food",
        place: "mushi",
        pick: true,
        warn: "대기 40분 이상이면 아래 대안 식당으로",
      },
      { time: "12:40–13:10", title: "(선택) 치노이케 지옥", note: "붉은 온천 · 피곤하면 생략하고 바로 출발", kind: "spot", place: "chinoike" },
      {
        time: "13:10–15:20",
        title: "후쿠오카공항 방면 이동",
        note: "약 2시간 · 반납 전 영업소 근처 주유소에서 가득 주유",
        kind: "drive",
        place: "rentPick",
        warn: "주유소에서는 '레귤러 만땅(満タン)'이라고 하면 돼요",
      },
      { time: "15:20–15:40", title: "렌터카 반납", note: "ETC 정산 · 차량 확인 · 셔틀로 공항 이동", kind: "car", place: "rentPick" },
      { time: "15:40–16:30", title: "스테이 에어포트 체크인", note: "공항에서 택시 5~10분 · 체크인 후 휴식", kind: "hotel", place: "stay" },
      { time: "17:00–17:30", title: "하카타역으로 이동", note: "지하철 후쿠오카공항역 → 하카타역 5분 또는 택시 15분", kind: "drive", place: "hakata" },
      { time: "17:30–19:00", title: "저녁 · 모츠나베 오오야마", note: "후쿠오카 대표 곱창전골 · 연말이라 미리 예약", kind: "food", place: "ooyama", pick: true },
      { time: "19:00–20:30", title: "하카타역 산책", note: "아뮤플라자 옥상정원 · 데이토스 기념품", kind: "walk", place: "hakata" },
      {
        time: "21:00",
        title: "숙소 · 내일 면세 준비",
        note: "Visit Japan Web 면세 QR 확인 · 영수증 QR로 환급 업체 가입·환급 수단 등록 · 영수증별로 물건 정리",
        kind: "hotel",
        place: "stay",
        warn: "자세한 방법은 준비물 탭 '면세 가이드'",
      },
    ],
  },
  {
    date: "12.29 화",
    title: "하카타 쇼핑 · 귀국",
    sub: "하카타역 → 캐널시티 → 나카스 → 텐진, 14:40 공항 도착",
    goal: "14:40 국제선 도착",
    weather: `${FLIGHT_OUT} 출발 · 연말 출국 피크`,
    tip: "2026년 11월부터 면세는 '세금 포함 결제 → 출국 때 세관 확인 → 환급' 방식이에요. 면세품은 영수증별로 모아 기내용 가방에 두고, 공항에선 짐 부치기 전에 세관 확인부터 하세요.",
    items: [
      { time: "08:00–08:40", title: "체크아웃 · 짐 보관", note: "캐리어는 숙소에 맡기기 · 편의점 명란 오니기리로 가볍게 아침", kind: "hotel", place: "stay" },
      { time: "08:40–09:10", title: "하카타역으로 이동", note: "지하철 5분 또는 택시", kind: "drive", place: "hakata" },
      { time: "09:10–09:40", title: "화이트글래스커피", note: "하카타역 앞 아침 커피·디저트", kind: "coffee", place: "wgc" },
      {
        time: "09:40–10:50",
        title: "하카타역 쇼핑",
        note: "페르난다(아뮤에스트) · 한큐 백화점(10시 개점) · 요도바시(GU 포함) · 데이토스 명란·기념품",
        kind: "shop",
        place: "hakata",
        extra: ["fernanda", "hankyu", "yodobashi"],
        warn: "면세는 같은 가게·같은 날 세전 5,000엔 이상부터",
      },
      { time: "10:50–11:00", title: "캐널시티로 이동", note: "택시 5분 또는 도보 15분", kind: "drive", place: "canal" },
      { time: "11:00–11:50", title: "캐널시티 하카타", note: "무인양품 · 캐릭터숍 · 분수쇼", kind: "shop", place: "canal", extra: ["muji"] },
      { time: "12:00–12:40", title: "점심 · 이치란 본사총본점", note: "캐널시티에서 도보 10분 · 12시 전후라 줄이 짧은 편", kind: "food", place: "ichiran", pick: true },
      {
        time: "12:40–13:20",
        title: "돈키호테 나카스",
        note: "의약품 · 화장품 · 과자 · 계산할 때 여권 원본 + Visit Japan Web 면세 QR",
        kind: "shop",
        place: "donki",
        warn: "가서 먹을 간식은 면세품과 따로 계산하기",
      },
      {
        time: "13:20–13:55",
        title: "린트 초콜릿 · 텐진지하상가",
        note: "돈키호테에서 강 건너 도보 약 12분 · 시간이 빠듯하면 생략",
        kind: "shop",
        place: "lindt",
        warn: "13:55에는 출발해야 공항 일정이 맞아요",
      },
      { time: "13:55–14:20", title: "숙소에서 짐 찾기", note: "텐진역 → 후쿠오카공항역 지하철 약 11분, 또는 택시 약 20분", kind: "hotel", place: "stay" },
      { time: "14:20–14:40", title: "국제선 터미널로 이동", note: "택시 5~10분 또는 무료 셔틀버스", kind: "drive", place: "airport" },
      {
        time: "14:40",
        title: "세관 면세 확인 → 짐 부치기 → 출국심사",
        note: "출국 로비 면세 절차 와이파이 구역에서 Visit Japan Web으로 확인 (또는 키오스크) · 그린이면 끝, 레드면 세관 카운터에서 물건 확인",
        kind: "plane",
        place: "airport",
        warn: "짐을 부치기 전에 세관 확인부터",
      },
      { time: FLIGHT_OUT, title: "한국행 출발", note: "여행 끝! 수고하셨어요", kind: "plane", place: "airport" },
    ],
  },
];

/** 운전 순서대로 정리한 내비 목적지 */
export const drive: { day: string; keys: string[] }[] = [
  { day: "DAY 1 · 12.27", keys: ["rentPick", "dzPark", "dzPark2", "yfPark", "yfPark2", "ryokan"] },
  { day: "DAY 2 · 12.28", keys: ["kinrin", "umi", "mushi", "chinoike", "rentPick"] },
];

export type Food = { key: string; day: string; menu: string; why: string; tag: string };

export const foods: Food[] = [
  { key: "oishi", day: "DAY 1 점심", menu: "우동 · 우메가에모치 · 말차", why: "텐만구 경내라 참배하고 바로 들르기 좋은 찻집", tag: "다자이후" },
  { key: "kasanoya", day: "DAY 1 간식", menu: "갓 구운 우메가에모치", why: "참배길에서 가장 유명한 떡집", tag: "다자이후" },
  { key: "bspeak", day: "DAY 1 간식", menu: "P롤 (롤케이크)", why: "유후인 대표 디저트 · 품절 전에 먼저", tag: "유후인" },
  { key: "milch", day: "DAY 1 간식", menu: "푸딩 · 반숙 치즈케이크", why: "유후인 우유로 만든 디저트 · 한국인 필수 코스", tag: "유후인" },
  { key: "kinsho", day: "DAY 1 간식", menu: "금상 고로케", why: "고로케 대회 금상 · 갓 튀겨 걸으며 먹기", tag: "유후인" },
  { key: "mushi", day: "DAY 2 점심", menu: "지옥찜 세트 · 지옥찜 푸딩", why: "온천 증기로 직접 쪄 먹는 벳푸만의 경험", tag: "벳푸" },
  { key: "hyotan", day: "DAY 2 대안", menu: "지옥찜 정식", why: "지옥찜공방에서 가장 가까운 플랜 B · 직원이 쪄서 내줘요", tag: "벳푸" },
  { key: "okamotoya", day: "DAY 2 대안", menu: "지옥찜 푸딩 · 달걀샌드 · 카레", why: "가볍게 먹고 고속도로로 바로 가기 좋은 곳", tag: "벳푸" },
  { key: "toyotsune", day: "DAY 2 대안", menu: "튀김덮밥 · 토리텐", why: "한국인에게 인기 많은 벳푸 맛집 · 시내 우회 필요", tag: "벳푸" },
  { key: "ooyama", day: "DAY 2 저녁", menu: "모츠나베 (된장맛 추천)", why: "한국인에게 가장 유명한 모츠나베 집 · 하카타역 직결", tag: "하카타" },
  { key: "hanamidori", day: "DAY 2 대안", menu: "미즈타키 (닭백숙 전골)", why: "맑고 순한 국물이라 부모님 입맛에 잘 맞는 후쿠오카 명물 · 하카타역 도보권", tag: "하카타" },
  { key: "uogashi", day: "DAY 2 대안", menu: "초밥 세트", why: "수산시장 직영 · 하카타역 지하", tag: "하카타" },
  { key: "ichiran", day: "DAY 3 점심", menu: "돈코츠 라멘", why: "이치란 1호 본점 · 24시간이라 연말에도 안심", tag: "나카스" },
  { key: "mentaiju", day: "DAY 3 대안", menu: "명란덮밥 멘타이쥬", why: "후쿠오카 명물 명란 · 대기가 길어 여유 있을 때만", tag: "나카스" },
  { key: "taira", day: "DAY 3 대안", menu: "우엉튀김 우동 (고보텐 우동)", why: "현지인 줄 서는 하카타 우동 · 라멘이 부담스러울 때 · 캐널시티 남쪽", tag: "스미요시" },
];

/* ---------------- 면세 (2026.11~ 환급 방식) ---------------- */

export type TaxStep = { when: string; title: string; points: string[] };

export const taxSteps: TaxStep[] = [
  {
    when: "출발 전 · 한국",
    title: "Visit Japan Web 준비",
    points: [
      "3인 모두 Visit Japan Web 계정을 만들고 여권 정보를 등록해요.",
      "입국심사·세관 신고 QR도 같이 만들어 두세요.",
    ],
  },
  {
    when: "DAY 1 · 입국 후",
    title: "면세 QR 만들기",
    points: [
      "Visit Japan Web에서 '면세 QR'을 만들어요. 입국 정보(여권의 상륙허가 스티커)를 등록하라고 나오면 이때 해요.",
      "마지막 날 밤에 해도 되지만, 돈키호테 등에서 계산할 때 필요하니 입국 직후에 해두면 마음이 편해요.",
    ],
  },
  {
    when: "쇼핑할 때",
    title: "세금 포함 가격으로 결제",
    points: [
      "계산 전에 '택스프리(免税)'라고 말하고 여권 원본 또는 Visit Japan Web 면세 QR을 보여줘요. 돈키호테는 면세 QR 제시를 안내하고 있어요.",
      "같은 가게에서 같은 날 세전 5,000엔 이상이어야 대상이에요. 여러 가게에서 조금씩 사기보다 한 곳에 몰아 사는 게 유리해요.",
      "영수증에 있는 QR(환급 업체 안내)을 꼭 챙기세요. 환급 업체는 가게마다 달라요.",
      "가서 먹을 간식·음료는 면세품과 따로 계산하세요. 한 영수증에서 하나라도 먹거나 없으면 그 영수증 전체가 환급 대상에서 빠져요.",
    ],
  },
  {
    when: "DAY 2 · 마지막 날 밤",
    title: "환급 업체 가입·내역 확인",
    points: [
      "영수증 QR로 각 환급 업체 사이트에 들어가 가입하고, 여권 인증 후 환급 받을 카드·계좌를 등록해요. (검색으로 찾은 사이트 말고 영수증 QR로 접속하세요)",
      "업체 사이트와 Visit Japan Web에서 구매 내역이 잘 들어왔는지 확인해요.",
      "면세품을 영수증별로 모아 기내용 가방에 넣어요. 화장품 등 100ml 넘는 액체는 세관 확인 뒤 부칠 짐으로 옮기면 돼요.",
    ],
  },
  {
    when: "DAY 3 · 후쿠오카공항",
    title: "짐 부치기 전에 세관 확인",
    points: [
      "후쿠오카공항은 Visit Japan Web 온라인 세관 확인 공항이에요. 출국 로비의 '면세 절차 와이파이 구역'에서 Wi-Fi에 접속하고 Visit Japan Web에 로그인해 신청해요. 보안검색대 전까지 가능해요.",
      "또는 출국 로비의 면세 키오스크에 여권을 읽혀도 돼요.",
      "그린 판정이면 끝이에요. 레드 판정이면 세관 카운터에서 물건을 보여줘요.",
      "그 다음에 항공사 카운터에서 짐을 부쳐요. 짐을 먼저 부치면 다시 꺼낼 수 없어서 환급을 못 받아요.",
    ],
  },
  {
    when: "귀국 후",
    title: "환급 입금 확인",
    points: [
      "세관 확인이 끝나면 가게나 환급 업체가 등록한 카드·계좌로 돌려줘요. 업체마다 며칠에서 몇 주 걸리고, 수수료를 떼는 곳도 있어요.",
      "환급 수단을 등록하지 않으면 세관 확인을 받아도 돈이 안 들어와요.",
    ],
  },
];

export type Refunder = { name: string; stores: string; how: string; url: string };

export const refunders: Refunder[] = [
  {
    name: "J-TaxRefund (J&J Tax Free)",
    stores: "돈키호테 (공식), GU (공식), 빅카메라·유니클로·마쓰모토키요시 (보도)",
    how: "웹사이트 · 영수증 QR로 접속 → 가입 → 여권 인증 → 환급 수단 등록 · 구매일부터 180일 안에 신청",
    url: "https://www.donki.com/en/tax_free/",
  },
  {
    name: "Global Blue",
    stores: "요도바시카메라, 백화점(다카시마야·이세탄·다이마루·한큐한신 등)",
    how: "앱 또는 웹 'My Purchases'에 환급 수단 등록 · 세관 확인 후 보통 3~5일",
    url: "https://www.globalblue.com/",
  },
  {
    name: "PIE VAT",
    stores: "아웃렛, 대형 쇼핑몰(미쓰이 아웃렛·라라포트), 몽벨 일부",
    how: "앱 가입 → 영수증 QR로 구매 추가 → 세관 확인 후 앱 지갑에서 출금 · 수수료 1.5~3%",
    url: "https://pievat.com/japan",
  },
  {
    name: "JPrefund (Smart Detax)",
    stores: "3COINS, 시마무라 등 (보도)",
    how: "웹 가입 → 영수증 QR 또는 20자리 거래번호 입력 → 카드·알리페이 등 · 구매일부터 200일 안에",
    url: "https://jprefund.com/",
  },
];

export type Shop = { key: string; area: string; refunder: string; sure: boolean; tip: string };

/** DAY 3 동선의 쇼핑 매장과 환급 업체 */
export const shops: Shop[] = [
  { key: "hankyu", area: "하카타역", refunder: "면세 카운터에서 확인", sure: false, tip: "백화점은 같은 날 여러 매장 구매를 면세 카운터에서 합산해 주는 경우가 있어요" },
  { key: "yodobashi", area: "하카타역 지쿠시 출구", refunder: "Global Blue", sure: false, tip: "전자제품·장난감·화장품 · 계산할 때 업체 확인" },
  { key: "gu", area: "요도바시 건물 안", refunder: "J-TaxRefund", sure: true, tip: "GU 공식 안내 · 환급 시 약 10% 수수료" },
  { key: "hakata", area: "하카타역", refunder: "매장마다 다름", sure: false, tip: "아뮤플라자·데이토스는 입점 매장별로 확인" },
  { key: "muji", area: "캐널시티", refunder: "확인 필요 (J-TaxRefund 보도)", sure: false, tip: "출처마다 달라서 계산할 때 물어보기" },
  { key: "canal", area: "캐널시티", refunder: "매장마다 다름", sure: false, tip: "캐릭터숍·지브리숍 등 입점 매장별로 확인" },
  { key: "donki", area: "나카스", refunder: "J-TaxRefund", sure: true, tip: "돈키호테 공식 · Visit Japan Web 면세 QR + 여권 원본" },
];

export type Prep = { title: string; desc: string; url: string; cta: string; icon: string };

export const prep: Prep[] = [
  { title: "Visit Japan Web", desc: "입국심사·세관 신고 사전 등록 (3인 모두)", url: "https://www.vjw.digital.go.jp/", cta: "등록", icon: "clipboard" },
  { title: "eSIM", desc: "일본 데이터 eSIM 구매·설치", url: "https://www.airalo.com/ja/japan-esim", cta: "보기", icon: "wifi" },
  { title: "렌터카 예약", desc: "공항 국제선점 대여 → 28일 같은 곳 반납", url: "https://rent.toyota.co.jp/eng/", cta: "예약", icon: "car" },
  { title: "겨울 타이어", desc: "12월 유후인·벳푸 산길 대비 스터드리스 타이어 요청 (예약 시 옵션 또는 메모)", url: "https://rent.toyota.co.jp/eng/", cta: "확인", icon: "snow" },
  { title: "ETC 카드", desc: "렌터카 예약 시 ETC 카드 대여 옵션 선택", url: "https://rent.toyota.co.jp/global_eng/", cta: "확인", icon: "route" },
  { title: "면책보상", desc: "CDW + NOC 면제 옵션 추가", url: "https://rent.toyota.co.jp/global_eng/service/insurance.html", cta: "보기", icon: "shield" },
  { title: "국제운전면허증", desc: "운전할 사람 모두 발급 · 한국 면허증·여권 원본도 함께", url: "https://www.safedriving.or.kr/", cta: "안내", icon: "file" },
  { title: "모츠나베 예약", desc: "12/28 17:30 오오야마 KITTE 하카타점 3인 예약", url: "https://motu-ooyama.com/", cta: "예약", icon: "food" },
  { title: "여행자보험", desc: "해외 의료비·휴대품·항공기 지연·배상책임", url: "https://www.consumer.go.kr/", cta: "확인", icon: "shield" },
  { title: "결제 준비", desc: "해외결제 카드 2장 · 엔화 현금 · 동전지갑", url: "https://www.japan.travel/en/plan/", cta: "체크", icon: "card" },
  { title: "Visit Japan Web 면세 QR", desc: "입국 후 3인 모두 면세 QR 생성 (입국 정보 등록 포함)", url: "https://www.vjw.digital.go.jp/", cta: "열기", icon: "clipboard" },
  { title: "환급 업체 가입", desc: "영수증 QR로 업체별 가입·환급 카드 등록 (돈키호테·GU는 J-TaxRefund)", url: "https://zenmenkyo.jp/refund-top/refund-system-2026/", cta: "업체 목록", icon: "card" },
  { title: "면세 규정 확인", desc: "관광청 여행자 안내 · 공항 세관 확인 방법", url: "https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00021.html", cta: "규정", icon: "file" },
];

/* ---------------- 쇼핑 리스트 ---------------- */

export type Buy = {
  name: string;
  jp: string;
  where: string;
  note: string;
  /** 지도로 연결할 장소 키 */
  place?: string;
  /** 직접 고른 위시리스트 */
  mine?: boolean;
  cat: "내 리스트" | "후쿠오카 명물" | "과자·간식" | "드럭스토어" | "규슈 여행지";
};

export const buys: Buy[] = [
  {
    name: "사봉 드 사보타 헤어밀크 · 헤어오일",
    jp: "サボンドサボタ ヘアミルク / ヘアオイル",
    where: "마쓰모토키요시·코코카라파인 등 드럭스토어, 로프트·핸즈",
    note: "헤어밀크 100g 약 1,540엔(세금 포함). 돈키호테 판매는 확인 못 했어요. 매장에서 일본어 이름을 보여주세요.",
    mine: true,
    cat: "내 리스트",
  },
  {
    name: "퓨레그미 프리미엄 아마오우 딸기",
    jp: "ピュレグミプレミアム あまおう苺",
    where: "규슈 지역 편의점, 하카타역·공항 기념품점",
    note: "지역·기간 한정이라 재고가 들쭉날쭉해요. 보이면 바로 사세요.",
    mine: true,
    cat: "내 리스트",
  },
  {
    name: "명란 오니기리 (삼각김밥)",
    jp: "明太子おにぎり / 明太マヨ",
    where: "세븐일레븐·패밀리마트·로손 어디서나",
    note: "'멘타이코' 또는 '멘타이마요'를 찾으세요. 셋째 날 아침 숙소 근처 편의점에서.",
    mine: true,
    cat: "내 리스트",
  },
  {
    name: "페르난다 향수·바디미스트",
    jp: "フェルナンダ",
    where: "하카타역 아뮤에스트 직영점 (셋째 날 하카타역 쇼핑 때)",
    note: "로프트·핸즈·드럭스토어에도 일부 있어요.",
    place: "fernanda",
    mine: true,
    cat: "내 리스트",
  },
  {
    name: "린트 초콜릿",
    jp: "リンツ",
    where: "텐진지하상가점 (셋째 날 돈키호테 다음)",
    note: "녹는 걸 막으려면 기내 가방에 넣으세요.",
    place: "lindt",
    mine: true,
    cat: "내 리스트",
  },
  {
    name: "명란젓 (가라시 멘타이코)",
    jp: "辛子明太子 ふくや / やまや",
    where: "하카타역 데이토스 '미야게몬 이치바', 하카타 한큐 지하, 공항",
    note: "냉장 보관이 필요해요. 마지막 날 사고, 튜브형이나 보냉 포장을 고르세요. 한국 반입 기준은 출발 전에 확인하세요.",
    place: "hakata",
    cat: "후쿠오카 명물",
  },
  {
    name: "하카타 토리몬",
    jp: "博多通りもん",
    where: "하카타역, 데이토스, 후쿠오카공항",
    note: "후쿠오카 대표 만주 기념품. 부모님 지인 선물용으로 좋아요.",
    place: "hakata",
    cat: "후쿠오카 명물",
  },
  {
    name: "멘베이 (명란 센베이)",
    jp: "めんべい",
    where: "하카타역, 공항, 돈키호테",
    note: "가볍고 잘 안 부서져서 나눠주기 좋아요.",
    cat: "후쿠오카 명물",
  },
  {
    name: "아마오우 딸기 과자",
    jp: "あまおう スイーツ",
    where: "하카타역 데이토스, 하카타 한큐 지하, 공항",
    note: "후쿠오카 특산 딸기로 만든 쿠키·모찌·초콜릿.",
    cat: "과자·간식",
  },
  {
    name: "이치란 라멘 (봉지·컵)",
    jp: "一蘭 ラーメン",
    where: "이치란 본사총본점 매장, 돈키호테",
    note: "본점 점심 먹고 바로 사면 동선이 좋아요.",
    place: "ichiran",
    cat: "과자·간식",
  },
  {
    name: "일본 한정 킷캣·과자",
    jp: "キットカット 地域限定",
    where: "돈키호테, 공항",
    note: "규슈 한정 맛이 있는지 찾아보세요.",
    place: "donki",
    cat: "과자·간식",
  },
  {
    name: "동전파스 · 휴족시간",
    jp: "ロイヒつぼ膏 / 休足時間",
    where: "돈키호테, 드럭스토어",
    note: "부모님 선물로 인기. 면세 5,000엔 맞추기 좋아요.",
    place: "donki",
    cat: "드럭스토어",
  },
  {
    name: "소화제·위장약",
    jp: "キャベジン / 太田胃散",
    where: "돈키호테, 드럭스토어",
    note: "약은 개인 사용량만 사세요.",
    place: "donki",
    cat: "드럭스토어",
  },
  {
    name: "지옥찜 푸딩",
    jp: "地獄蒸しプリン",
    where: "벳푸 오카모토야 매점, 지옥찜공방 간나와",
    note: "그 자리에서 먹는 디저트예요. 둘째 날 벳푸에서.",
    place: "okamotoya",
    cat: "규슈 여행지",
  },
  {
    name: "비스피크 P롤 · 미르히 푸딩",
    jp: "B-speak Pロール / ミルヒ",
    where: "유후인 유노츠보 거리 (첫째 날)",
    note: "생크림 디저트라 당일에 먹는 게 좋아요.",
    place: "bspeak",
    cat: "규슈 여행지",
  },
];

/* ---------------- 카드·쿠폰 ---------------- */

export type Deal = {
  title: string;
  who: string;
  benefit: string;
  when: string;
  fit: "good" | "maybe" | "check";
  how: string;
  url?: string;
};

export const cards: Deal[] = [
  {
    title: "JCB 카드 20% 캐시백 (가장 추천)",
    who: "한국에서 발급한 JCB 브랜드 신용·체크카드 (신한·롯데·우리·현대 등 JCB)",
    benefit: "돈키호테 15,000엔 이상 20% (최대 3,000엔) · 하카타 한큐 15,000엔 이상 20% (최대 3,000엔) · 스시로·코메다커피·택시앱 GO도 대상",
    when: "3차 2026.10.1–12.31 → 여행 기간 포함 (12/31 이용분은 제외)",
    fit: "good",
    how: "가맹점별로 미리 응모해야 하고, 응모한 날 결제분부터 적용돼요. 실물카드로 엔화 결제만 대상 · 전월 실적 조건 없음 · 예산 소진 시 조기 종료",
    url: "https://www.specialoffers.jcb/kr/campaign/detail/2026JCBig/92971/",
  },
  {
    title: "하나 트래블로그+ 신용카드",
    who: "하나카드 (일본 특화 시즌1, ~2027.4.14)",
    benefit: "돈키호테·유니클로 10만 원 이상 1만 원 · 3대 편의점 2만 원 이상 5,000원 · 다이소·스타벅스 등 · 월 최대 5만 원 캐시백",
    when: "~2027.4.14 → 여행 기간 포함",
    fit: "good",
    how: "신용결제 기준 (외화 하나머니 결제는 제외). 10만 원 기준이 가맹점별인지 월 합산인지 출처마다 달라서 카드사 앱에서 확인하세요.",
  },
  {
    title: "신한 SOL트래블J 체크카드",
    who: "신한카드 일본 특화 체크카드",
    benefit: "돈키호테 50% 할인 (반기 2만 원, 연 4만 원 한도) · 3대 편의점 5% · 마스터 트래블 리워드",
    when: "편의점 5%는 2026년 12월까지 안내 · 돈키호테 50%는 상시로 알려져 있음",
    fit: "maybe",
    how: "전월 국내 이용 30만 원 이상이 조건이라, 새로 만들면 첫 달 실적을 채워야 해요.",
    url: "https://www.shinhancard.com/pconts/company/html/promotion/press/1233252_3999.html",
  },
  {
    title: "네이버페이 해외 QR결제",
    who: "네이버페이 앱 (유니온페이 QR · Alipay+)",
    benefit: "유니온페이 QR 결제 시 최대 10% 랜덤 즉시할인 (월 10회, 총 1만 엔 한도) · 캐널시티 Alipay+ 1만 엔 이상 1,200엔 할인 · 텐진지하상가 Alipay+ 5,000엔 이상 600엔 할인",
    when: "유니온페이 QR ~2026.12.31 · 캐널시티·텐진지하상가 ~2027.1.15 → 여행 기간 포함",
    fit: "maybe",
    how: "가게가 유니온페이 QR이나 Alipay+를 받아야 써요. 'Npay 머니카드 일본여행 페이백'(최대 20만 원)은 10월 14일에 끝났어요. 예산 소진 시 종료될 수 있어요.",
    url: "https://m.blog.naver.com/nv_npay/224390780479",
  },
];

export const coupons: Deal[] = [
  {
    title: "돈키호테 관광객 쿠폰",
    who: "돈키호테 공식 쿠폰 화면",
    benefit: "세금 포함 11,000엔 이상 5% · 33,000엔 이상 7%",
    when: "종료일 미정 (12월 사용 가능으로 안내)",
    fit: "good",
    how: "면세로 계산할 때만 써요. 계산 전에 쿠폰 화면을 직접 보여줘야 하고 캡처는 안 돼요. 카드사 쿠폰과는 하나만 쓸 수 있어요. 술·담배·게임기 본체 제외",
    url: "https://japanportal.donki-global.com/coupon/cp001_en.html",
  },
  {
    title: "JR 하카타시티 Alipay+ 쿠폰",
    who: "아뮤플라자·데이토스 등 JR 하카타시티",
    benefit: "Alipay+ (네이버페이·카카오페이·토스페이) 결제 할인 쿠폰",
    when: "2026.10.1–2027.1.15 배포",
    fit: "maybe",
    how: "대상이 아닌 매장이 있어요. 외국인 GUEST COUPON은 지금 배포 기간이 아니에요 (다음 배포 2027년 2월).",
    url: "https://www.jrhakatacity.com/translation/coupon/",
  },
  {
    title: "캐널시티 하카타 Alipay+ 할인",
    who: "캐널시티 하카타",
    benefit: "1회 1만 엔 이상 결제 시 1,200엔 즉시할인 (1인 월 5회)",
    when: "2026.10.1–2027.1.15",
    fit: "maybe",
    how: "캐널시티에는 관광객 전용 할인이 따로 없어요. 이 Alipay+ 할인이 사실상 유일해요.",
    url: "https://canalcity.co.jp/event/detail/150",
  },
  {
    title: "하카타 한큐 → JCB 20%",
    who: "하카타 한큐 백화점",
    benefit: "JCB 카드로 15,000엔 이상 결제 시 20% (최대 3,000엔)",
    when: "~2026.12.31",
    fit: "good",
    how: "JCB 캠페인에서 '한큐한신백화점'에 미리 응모해야 해요.",
    url: "https://www.specialoffers.jcb/kr/campaign/detail/2026JCBig/92971/",
  },
];
