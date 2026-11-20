import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  MapPin,
  Car,
  Plane,
  Utensils,
  Coffee,
  ShoppingBag,
  Hotel,
  Route,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CalendarDays,
  ClipboardCheck,
  Wifi,
  FileText,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import "./styles.css";
type Place = { name: string; search: string; meta: string };
type Item = [string, string, string, string, string];
const places: Record<string, Place> = {
  airport: {
    name: "후쿠오카공항 국제선",
    search: "Fukuoka Airport International Terminal",
    meta: "렌터카 수령·반납",
  },
  dp: {
    name: "다자이후 텐만구 주차센터",
    search: "Dazaifu Tenmangu Parking Center",
    meta: "신사까지 도보 약 7분",
  },
  d: {
    name: "다자이후 텐만구",
    search: "Dazaifu Tenmangu",
    meta: "참배·우메가에모치",
  },
  o: { name: "오이시차야", search: "O-Ishi Chaya Dazaifu", meta: "우동·말차" },
  yp: {
    name: "NPC24H 유후인 유노츠보가도 주차장",
    search: "NPC24H Yufuin Yunotsubo Street Parking",
    meta: "유료 주차장",
  },
  f: {
    name: "유후인 플로랄빌리지",
    search: "Yufuin Floral Village",
    meta: "09:30~17:30",
  },
  y: {
    name: "유노츠보 거리",
    search: "Yunotsubo Street Yufuin",
    meta: "디저트·기념품",
  },
  k: { name: "긴린코 호수", search: "Lake Kinrin Yufuin", meta: "짧은 산책" },
  r: { name: "료칸 여명", search: "Ryokan Reimei Yufuin", meta: "18:00 석식" },
  b: { name: "우미지고쿠", search: "Umi Jigoku Beppu", meta: "벳푸 지옥순례" },
  j: {
    name: "간나와 지옥찜",
    search: "Kannawa Beppu Jigoku Mushi",
    meta: "온천 증기찜",
  },
  h: {
    name: "하카타역 JR 하카타시티",
    search: "JR Hakata City",
    meta: "아뮤·한큐·데이토스",
  },
  w: {
    name: "WHITE GLASS COFFEE FUKUOKA",
    search: "WHITE GLASS COFFEE FUKUOKA",
    meta: "08:00~20:00",
  },
  c: {
    name: "캐널시티 하카타",
    search: "Canal City Hakata",
    meta: "쇼핑·라멘 스타디움",
  },
  q: {
    name: "돈키호테 나카스점",
    search: "Don Quijote Nakasu Store",
    meta: "24시간·TAX FREE",
  },
  u: {
    name: "博多魚がし 하카타점",
    search: "Hakata Uogashi",
    meta: "하카타역 지하 초밥",
  },
  s: {
    name: "스테이 에어포트",
    search: "Stay Airport Fukuoka",
    meta: "짐 보관·체크인",
  },
};
const days = [
  [
    "12.27 SUN",
    "다자이후 · 유후인",
    "공항에서 료칸 석식까지, 걷고 먹는 첫날",
    "17:40 료칸 여명 도착",
    [
      [
        "09:30",
        "후쿠오카공항 도착",
        "입국·수하물 수령 후 렌터카 셔틀",
        "plane",
        "airport",
      ],
      [
        "10:30–11:20",
        "렌터카 수령",
        "ETC·면책보상·내비 확인",
        "car",
        "airport",
      ],
      [
        "11:20–12:00",
        "다자이후로 이동",
        "공항 → 다자이후 약 40분",
        "route",
        "dp",
      ],
      [
        "12:00–12:30",
        "주차·참배길 산책",
        "주차센터에서 신사까지 도보 약 7분",
        "walk",
        "dp",
      ],
      ["12:30–13:00", "우메가에모치", "가사노야 또는 야스다케", "food", "d"],
      ["13:00–13:40", "다자이후 텐만구", "본전과 경내 산책", "spot", "d"],
      [
        "13:40–14:20",
        "점심: 오이시차야",
        "우메노카오 우동·오카메 우동",
        "food",
        "o",
      ],
      ["14:20–14:30", "기념품 쇼핑 후 출발", "쇼핑은 30분 이내", "shop", "d"],
      ["14:30–16:20", "유후인으로 이동", "교통·휴게 포함", "route", "yp"],
      ["16:20–16:50", "플로랄빌리지", "17:30 마감 전 먼저 방문", "spot", "f"],
      ["16:50–17:10", "유노츠보 거리", "미르히·금상고로케·기념품", "shop", "y"],
      [
        "17:10–17:20",
        "긴린코 짧은 산책",
        "시간 부족 시 다음 날 아침",
        "spot",
        "k",
      ],
      ["17:20–17:40", "료칸 여명 이동", "18:00 석식 전 도착", "route", "r"],
      ["18:00", "료칸 석식·온천", "가이세키 후 온천", "food", "r"],
    ],
  ],
  [
    "12.28 MON",
    "벳푸 · 공항 반납 · 하카타 저녁",
    "렌터카로 벳푸를 보고 공항에서 반납",
    "16:00 렌터카 반납",
    [
      [
        "07:30–08:30",
        "료칸 조식·체크아웃",
        "짐을 차량에 싣고 출발",
        "food",
        "r",
      ],
      ["08:30–09:20", "벳푸로 이동", "료칸 → 간나와 약 50분", "route", "b"],
      [
        "09:20–12:20",
        "벳푸 지옥순례",
        "우미·오니이시보즈·가마도·오니야마",
        "spot",
        "b",
      ],
      ["12:20–13:20", "점심: 지옥찜", "간나와 지역 온천 증기찜", "food", "j"],
      [
        "13:20–15:40",
        "후쿠오카공항 이동",
        "주유·교통 포함 여유 확보",
        "route",
        "airport",
      ],
      ["15:40–16:00", "렌터카 반납", "ETC 정산·차량 확인", "car", "airport"],
      ["16:00–17:00", "스테이 에어포트", "체크인·휴식", "hotel", "s"],
      ["17:00–18:00", "하카타역 이동", "짐 없이 택시 권장", "route", "h"],
      ["18:00–19:30", "저녁: 우오가시", "초밥 또는 모츠나베", "food", "u"],
      ["19:30–20:30", "하카타역 산책", "아뮤플라자 후 복귀", "walk", "h"],
    ],
  ],
  [
    "12.29 TUE",
    "하카타 쇼핑 · 돈키호테 · 귀국",
    "짐을 맡기고 공항 반대 방향으로 되돌아오지 않는 루트",
    "14:50 공항 이동 시작",
    [
      [
        "08:00–09:00",
        "체크아웃·짐 보관",
        "숙소에 캐리어를 맡기기",
        "hotel",
        "s",
      ],
      ["09:00–09:20", "하카타역 이동", "숙소에서 택시 권장", "route", "h"],
      [
        "09:20–10:10",
        "화이트글래스커피",
        "늦은 오전 커피·디저트",
        "coffee",
        "w",
      ],
      [
        "10:10–11:30",
        "하카타역 쇼핑",
        "아뮤·하카타 한큐·데이토스",
        "shop",
        "h",
      ],
      ["11:30–11:50", "캐널시티 이동", "도보 또는 택시", "route", "c"],
      [
        "11:50–13:00",
        "캐널시티 하카타",
        "무인양품·캐릭터숍·생활잡화",
        "shop",
        "c",
      ],
      ["13:00–13:40", "캐널시티 점심", "라멘 스타디움 또는 정식", "food", "c"],
      [
        "13:40–14:20",
        "돈키호테 나카스",
        "의약품·화장품·과자·면세",
        "shop",
        "q",
      ],
      ["14:20–14:50", "숙소에서 짐 수령", "택시 이동", "hotel", "s"],
      [
        "14:50–15:20",
        "후쿠오카공항 국제선",
        "출국·면세품 반출 확인",
        "plane",
        "airport",
      ],
      ["17:05", "한국행 비행기", "여행 종료", "plane", "airport"],
    ],
  ],
] as const;
const icons: any = {
  plane: <Plane />,
  car: <Car />,
  route: <Route />,
  walk: <MapPin />,
  food: <Utensils />,
  coffee: <Coffee />,
  shop: <ShoppingBag />,
  hotel: <Hotel />,
  spot: <MapPin />,
};
const maps = (k: string) =>
  window.open(
    "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(places[k].search),
    "_blank",
  );
const prep = [
  [
    "Visit Japan Web",
    "입국심사·세관 신고 사전 등록",
    "https://www.vjw.digital.go.jp/",
    "바로 등록",
    "clipboard",
  ],
  [
    "eSIM",
    "일본 데이터 eSIM 구매·설치",
    "https://www.airalo.com/ja/japan-esim",
    "상품 보기",
    "wifi",
  ],
  [
    "렌터카 예약",
    "후쿠오카공항 국제선 대여·벳푸 관광 후 공항 반납",
    "https://rent.toyota.co.jp/eng/",
    "토요타 예약",
    "car",
  ],
  [
    "ETC 카드",
    "렌터카 예약 시 ETC 카드 대여 옵션 선택",
    "https://rent.toyota.co.jp/global_eng/",
    "확인하기",
    "route",
  ],
  [
    "면책보상",
    "CDW + NOC 면제 옵션 추가",
    "https://rent.toyota.co.jp/global_eng/service/insurance.html",
    "보상 안내",
    "shield",
  ],
  [
    "국제운전면허증",
    "출국 전 경찰서·운전면허시험장에서 발급",
    "https://www.safedriving.or.kr/",
    "발급 안내",
    "file",
  ],
  [
    "여행자보험",
    "해외 의료비·휴대품·항공기 지연·배상책임 확인",
    "https://www.consumer.go.kr/",
    "확인하기",
    "shield",
  ],
  [
    "결제 준비",
    "해외결제 카드 2장·엔화 현금·동전지갑 준비",
    "https://www.japan.travel/en/plan/",
    "준비 체크",
    "card",
  ],
  [
    "면세 쇼핑",
    "여권 원본 지참. 2026년 11월 이후 출국 시 반출 확인·환급 방식 확인",
    "https://www.mlit.go.jp/kankocho/tax-free/",
    "규정 보기",
    "file",
  ],
];
function App() {
  const [tab, setTab] = useState<"days" | "prep">("days"),
    [day, setDay] = useState(0),
    [open, setOpen] = useState<number | null>(null),
    [done, setDone] = useState<number[]>([]);
  const toggle = (i: number) =>
    setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i]);
  return (
    <div className="app">
      <header>
        <span>FUKUOKA FAMILY TRIP · 2026</span>
        <h1>후쿠오카 여행 플래너</h1>
        <p>일정·동선·지도·출발 준비를 한 곳에서 확인하세요.</p>
      </header>
      <main>
        <div className="topnav">
          <button
            className={tab === "days" ? "active" : ""}
            onClick={() => setTab("days")}
          >
            <CalendarDays />
            일정·동선
          </button>
          <button
            className={tab === "prep" ? "active" : ""}
            onClick={() => setTab("prep")}
          >
            <ClipboardCheck />
            준비 체크리스트
          </button>
        </div>
        {tab === "days" ? (
          <>
            <nav>
              {days.map((x, i) => (
                <button
                  className={day === i ? "on" : ""}
                  onClick={() => {
                    setDay(i);
                    setOpen(null);
                  }}
                  key={x[0]}
                >
                  <b>DAY {i + 1}</b>
                  <small>{x[0]}</small>
                </button>
              ))}
            </nav>
            <section className="head">
              <div>
                <label>
                  <CalendarDays size={14} />
                  {days[day][0]}
                </label>
                <h2>{days[day][1]}</h2>
                <p>{days[day][2]}</p>
              </div>
              <div className="goal">
                <small>오늘의 목표</small>
                <b>{days[day][3]}</b>
              </div>
            </section>
            <section className="timeline">
              {days[day][4].map((x, i) => (
                <article key={x[0] + x[1]}>
                  <time>{x[0]}</time>
                  <div className="node">{icons[x[3]]}</div>
                  <div className="activity">
                    <button
                      className="main"
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span>
                        <b>{x[1]}</b>
                        <small>{x[2]}</small>
                      </span>
                      {open === i ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {open === i && (
                      <div className="detail">
                        <span>
                          <b>{places[x[4]].name}</b>
                          <small>{places[x[4]].meta}</small>
                        </span>
                        <button onClick={() => maps(x[4])}>
                          <MapPin size={15} />
                          Google Maps 열기
                          <ExternalLink size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <section className="prep">
            <div className="prepIntro">
              <h2>출발 전 준비</h2>
              <p>여행 전에 하나씩 완료하고 체크하세요.</p>
            </div>
            {prep.map((x, i) => (
              <div
                className={"prepRow " + (done.includes(i) ? "checked" : "")}
                key={x[0]}
              >
                <button className="check" onClick={() => toggle(i)}>
                  {done.includes(i) ? <CheckCircle2 /> : <span />}
                </button>
                <div className="prepIcon">
                  {x[4] === "wifi" ? (
                    <Wifi />
                  ) : x[4] === "car" ? (
                    <Car />
                  ) : x[4] === "shield" ? (
                    <ShieldCheck />
                  ) : x[4] === "file" ? (
                    <FileText />
                  ) : x[4] === "card" ? (
                    <CreditCard />
                  ) : (
                    <ClipboardCheck />
                  )}
                </div>
                <div className="prepText">
                  <b>{x[0]}</b>
                  <p>{x[1]}</p>
                </div>
                <a href={x[2]} target="_blank" rel="noreferrer">
                  {x[3]} <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </section>
        )}
        <aside>
          <b>여행 팁</b>
          <span>
            {tab === "prep"
              ? "국제운전면허증과 여권은 렌터카 수령 때 반드시 원본으로 준비하세요."
              : day === 0
                ? "12월에는 해가 빨리 지므로 유후인에서는 플로랄빌리지를 먼저 방문하세요."
                : day === 1
                  ? "벳푸는 네 곳 중심으로 보고 16시 전 공항 반납을 목표로 하세요."
                  : "면세 쇼핑 후 물품 반출 확인을 고려해 14:50에는 공항으로 출발하세요."}
          </span>
        </aside>
      </main>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
