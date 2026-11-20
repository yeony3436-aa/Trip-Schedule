import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Plane,
  Car,
  Route,
  MapPin,
  Utensils,
  Coffee,
  ShoppingBag,
  Hotel,
  Footprints,
  Copy,
  Check,
  Navigation,
  SquareParking,
  Snowflake,
  Phone,
  Star,
  ExternalLink,
  CalendarDays,
  ClipboardCheck,
  Wifi,
  FileText,
  ShieldCheck,
  CreditCard,
  CircleCheck,
  TriangleAlert,
  Sunset,
  ChevronDown,
  CarFront,
  UtensilsCrossed,
} from "lucide-react";
import {
  days,
  drive,
  foods,
  places,
  prep,
  refunders,
  shops,
  taxSteps,
  buys,
  cards,
  coupons,
  type Deal,
  FLIGHT_OUT,
  type Kind,
  type Place,
} from "./data";
import "./styles.css";

const kindIcon: Record<Kind, React.ReactNode> = {
  plane: <Plane />,
  car: <CarFront />,
  drive: <Route />,
  park: <SquareParking />,
  spot: <MapPin />,
  food: <Utensils />,
  coffee: <Coffee />,
  shop: <ShoppingBag />,
  hotel: <Hotel />,
  walk: <Footprints />,
};

const prepIcon: Record<string, React.ReactNode> = {
  clipboard: <ClipboardCheck />,
  wifi: <Wifi />,
  car: <Car />,
  snow: <Snowflake />,
  route: <Route />,
  shield: <ShieldCheck />,
  file: <FileText />,
  card: <CreditCard />,
  food: <Utensils />,
};

const mapUrl = (p: Place) =>
  p.url ?? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.q);

const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* 저장 불가 환경 무시 */
    }
  },
};

function CopyCode({ code }: { code: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.replace(/\s/g, " "));
    } catch {
      const t = document.createElement("textarea");
      t.value = code;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setOk(true);
    setTimeout(() => setOk(false), 1400);
  };
  return (
    <button className={"mapcode" + (ok ? " ok" : "")} onClick={copy} title="맵코드 복사">
      <Navigation size={13} />
      <span>{code}</span>
      {ok ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function PlaceCard({ k, compact }: { k: string; compact?: boolean }) {
  const p = places[k];
  const alts = (p.alt ? ([] as string[]).concat(p.alt) : []).map((a) => places[a]);
  return (
    <div className={"place" + (compact ? " compact" : "")}>
      <div className="placeHead">
        <b>{p.name}</b>
        <small>{p.meta}</small>
      </div>
      <div className="placeActions">
        {p.mapcode && <CopyCode code={p.mapcode} />}
        {p.tel && (
          <a className="ghost" href={"tel:" + p.tel}>
            <Phone size={13} />
            전화
          </a>
        )}
        <a className="primary" href={mapUrl(p)} target="_blank" rel="noreferrer">
          <MapPin size={13} />
          지도
          <ExternalLink size={12} />
        </a>
      </div>
      {!compact && alts.map((alt) => (
        <div className="alt" key={alt.name}>
          <span className="altLabel">{alt.name.startsWith("[대안]") ? "대안" : "여분"}</span>
          <div className="altBody">
            <b>{alt.name.replace(/^\[.*?\]\s*/, "")}</b>
            <small>{alt.meta}</small>
          </div>
          <div className="placeActions">
            {alt.mapcode && <CopyCode code={alt.mapcode} />}
            <a className="ghost" href={mapUrl(alt)} target="_blank" rel="noreferrer">
              <MapPin size={13} />
              지도
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

type Tab = "days" | "drive" | "food" | "shop" | "prep";
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "days", label: "일정", icon: <CalendarDays /> },
  { id: "drive", label: "운전", icon: <Car /> },
  { id: "food", label: "맛집", icon: <UtensilsCrossed /> },
  { id: "shop", label: "쇼핑", icon: <ShoppingBag /> },
  { id: "prep", label: "준비물", icon: <ClipboardCheck /> },
];

function Days() {
  const [day, setDay] = useState(() => store.get("day", 0));
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => store.set("day", day), [day]);
  const d = days[day];
  return (
    <>
      <div className="dayPicker">
        {days.map((x, i) => (
          <button
            key={x.date}
            className={day === i ? "on" : ""}
            onClick={() => {
              setDay(i);
              setOpen(null);
            }}
          >
            <span>DAY {i + 1}</span>
            <b>{x.date}</b>
            <small>{x.title}</small>
          </button>
        ))}
      </div>

      <section className="dayHero">
        <div>
          <h2>{d.title}</h2>
          <p>{d.sub}</p>
          <div className="chips">
            <span className="chip">
              <Sunset size={13} />
              {d.weather}
            </span>
          </div>
        </div>
        <div className="goal">
          <small>오늘의 목표</small>
          <b>{d.goal}</b>
        </div>
      </section>

      <div className="tip">
        <Star size={16} />
        <p>{d.tip}</p>
      </div>

      <ol className="timeline">
        {d.items.map((x, i) => {
          const isOpen = open === i;
          return (
            <li key={x.time + x.title} className={"k-" + x.kind + (isOpen ? " open" : "")}>
              <time>{x.time}</time>
              <div className="node">{kindIcon[x.kind]}</div>
              <div className="card">
                <button className="cardMain" onClick={() => setOpen(isOpen ? null : i)}>
                  <span>
                    <b>
                      {x.title}
                      {x.pick && <em className="pick">맛집</em>}
                    </b>
                    <small>{x.note}</small>
                    {x.warn && (
                      <span className="warn">
                        <TriangleAlert size={12} />
                        {x.warn}
                      </span>
                    )}
                  </span>
                  <ChevronDown className="chev" />
                </button>
                {isOpen && <PlaceCard k={x.place} />}
                {isOpen && x.extra?.map((k) => <PlaceCard key={k} k={k} />)}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

function Drive() {
  return (
    <section className="panel">
      <div className="panelIntro">
        <h2>운전 · 맵코드</h2>
        <p>
          렌터카 내비에서 <b>マップコード(맵코드)</b> 메뉴를 고르고 숫자를 입력하세요. 코드를 누르면 복사돼요.
        </p>
      </div>
      {drive.map((g) => (
        <div className="driveGroup" key={g.day}>
          <h3>{g.day}</h3>
          {g.keys.map((k, i) => (
            <div className="driveRow" key={k}>
              <span className={"step" + (places[k].name.startsWith("[여분]") ? " spare" : "")}>
                {places[k].name.startsWith("[여분]") ? "P" : i + 1}
              </span>
              <PlaceCard k={k} compact />
            </div>
          ))}
        </div>
      ))}
      <div className="note">
        <Snowflake size={16} />
        <p>
          12월 유후인은 아침에 길이 얼 수 있어요. 겨울 타이어를 확인하고, 다리 위와 그늘진 커브에서는 천천히 달리세요.
          일본은 <b>좌측통행</b>, 우회전할 때 맞은편 차량을 조심하세요.
        </p>
      </div>
    </section>
  );
}

function Food() {
  return (
    <section className="panel">
      <div className="panelIntro">
        <h2>맛집</h2>
        <p>일정에 넣은 식당과, 줄이 길거나 문을 닫았을 때 갈 대안이에요. 연말이라 출발 전에 영업 여부를 꼭 확인하세요.</p>
      </div>
      <div className="foodGrid">
        {foods.map((f) => {
          const p = places[f.key];
          const isAlt = f.day.includes("대안");
          return (
            <article className={"food" + (isAlt ? " isAlt" : "")} key={f.key}>
              <div className="foodTop">
                <span className="foodDay">{f.day}</span>
                <span className="foodTag">{f.tag}</span>
              </div>
              <h3>{p.name.replace(/^\[.*?\]\s*/, "")}</h3>
              <p className="menu">{f.menu}</p>
              <p className="why">{f.why}</p>
              <small>{p.meta}</small>
              <div className="placeActions">
                {p.tel && (
                  <a className="ghost" href={"tel:" + p.tel}>
                    <Phone size={13} />
                    전화
                  </a>
                )}
                <a className="primary" href={mapUrl(p)} target="_blank" rel="noreferrer">
                  <MapPin size={13} />
                  지도
                  <ExternalLink size={12} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const cats = ["내 리스트", "후쿠오카 명물", "과자·간식", "드럭스토어", "규슈 여행지"] as const;

function BuyList() {
  const [got, setGot] = useState<string[]>(() => store.get("bought", [] as string[]));
  useEffect(() => store.set("bought", got), [got]);
  const toggle = (n: string) => setGot(got.includes(n) ? got.filter((x) => x !== n) : [...got, n]);
  return (
    <section className="panel">
      <div className="panelIntro">
        <h2>쇼핑 리스트</h2>
        <p>산 물건은 체크하세요. 체크는 이 기기에 저장돼요. 매장에서는 일본어 이름을 보여주면 찾기 쉬워요.</p>
      </div>
      {cats.map((c) => (
        <div className="buyGroup" key={c}>
          <h3>{c === "내 리스트" ? "★ " + c : c}</h3>
          {buys
            .filter((b) => b.cat === c)
            .map((b) => {
              const on = got.includes(b.name);
              const p = b.place ? places[b.place] : undefined;
              return (
                <div className={"buyRow" + (on ? " checked" : "") + (b.mine ? " mine" : "")} key={b.name}>
                  <button className="check" onClick={() => toggle(b.name)} aria-label="샀어요">
                    {on ? <CircleCheck /> : <span />}
                  </button>
                  <div className="buyText">
                    <b>{b.name}</b>
                    <span className="jp">{b.jp}</span>
                    <p className="where">
                      <MapPin size={12} />
                      {b.where}
                    </p>
                    <p className="buyNote">{b.note}</p>
                  </div>
                  {p && (
                    <a className="ghost" href={mapUrl(p)} target="_blank" rel="noreferrer">
                      지도
                    </a>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </section>
  );
}

const fitLabel = { good: "여행 기간 OK", maybe: "조건 확인", check: "확인 필요" } as const;

function DealCard({ d }: { d: Deal }) {
  return (
    <article className={"deal fit-" + d.fit}>
      <div className="dealTop">
        <b>{d.title}</b>
        <span className="fit">{fitLabel[d.fit]}</span>
      </div>
      <small>{d.who}</small>
      <p className="benefit">{d.benefit}</p>
      <p className="when">
        <CalendarDays size={12} />
        {d.when}
      </p>
      <p className="how">{d.how}</p>
      {d.url && (
        <a className="ghost" href={d.url} target="_blank" rel="noreferrer">
          자세히
          <ExternalLink size={12} />
        </a>
      )}
    </article>
  );
}

function Deals() {
  return (
    <section className="panel">
      <div className="panelIntro">
        <h2>카드 · 쿠폰</h2>
        <p>2026년 11월 20일에 찾은 정보예요. 이벤트는 자주 바뀌니 출발 전에 카드사 앱과 쿠폰 화면에서 다시 확인하세요.</p>
      </div>
      <div className="tip">
        <Star size={16} />
        <p>
          <b>추천 조합:</b> JCB 카드를 하나 준비해서 돈키호테·하카타 한큐에 미리 응모 → 돈키호테에서는 면세 + 관광객 쿠폰 +
          JCB 캐시백. 편의점·소액은 트래블카드로.
        </p>
      </div>
      <h3 className="subhead first">카드 혜택</h3>
      <div className="deals">
        {cards.map((d) => (
          <DealCard d={d} key={d.title} />
        ))}
      </div>
      <h3 className="subhead">쿠폰 · 매장 이벤트</h3>
      <div className="deals">
        {coupons.map((d) => (
          <DealCard d={d} key={d.title} />
        ))}
      </div>
    </section>
  );
}

function Shop() {
  const [view, setView] = useState<"list" | "deal">(() => store.get("shopView", "list" as "list" | "deal"));
  useEffect(() => store.set("shopView", view), [view]);
  return (
    <>
      <div className="seg">
        <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>
          쇼핑 리스트
        </button>
        <button className={view === "deal" ? "on" : ""} onClick={() => setView("deal")}>
          카드·쿠폰
        </button>
      </div>
      {view === "list" ? <BuyList /> : <Deals />}
    </>
  );
}

function TaxGuide() {
  return (
    <section className="panel tax">
      <div className="panelIntro">
        <h2>면세 가이드</h2>
        <p>
          2026년 11월부터 일본 면세는 <b>세금 포함 결제 → 출국 때 세관 확인 → 환급</b> 방식이에요. 순서대로 따라 하세요.
        </p>
      </div>

      <ol className="steps">
        {taxSteps.map((s, i) => (
          <li key={s.title}>
            <span className="stepNo">{i + 1}</span>
            <div>
              <small>{s.when}</small>
              <b>{s.title}</b>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="subhead">DAY 3 동선 쇼핑 매장 · 환급 업체</h3>
      <p className="subnote">
        <b className="sure">확인</b>은 가게 공식 안내 기준, <b className="unsure">확인 필요</b>는 보도나 추정이라 계산할 때 영수증으로 꼭 확인하세요.
      </p>
      <div className="shopList">
        {shops.map((s) => {
          const p = places[s.key];
          return (
            <div className="shopRow" key={s.key}>
              <div className="shopMain">
                <small>{s.area}</small>
                <b>{p.name}</b>
                <span className={"refunder" + (s.sure ? " sure" : " unsure")}>
                  {s.refunder}
                  <em>{s.sure ? "확인" : "확인 필요"}</em>
                </span>
                <p>{s.tip}</p>
              </div>
              <a className="ghost" href={mapUrl(p)} target="_blank" rel="noreferrer">
                <MapPin size={13} />
                지도
              </a>
            </div>
          );
        })}
      </div>

      <h3 className="subhead">환급 업체</h3>
      <div className="refunders">
        {refunders.map((r) => (
          <div className="refunderCard" key={r.name}>
            <b>{r.name}</b>
            <small>{r.stores}</small>
            <p>{r.how}</p>
            <a className="ghost" href={r.url} target="_blank" rel="noreferrer">
              사이트
              <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
      <div className="note">
        <TriangleAlert size={16} />
        <p>
          환급 업체 사이트는 검색하지 말고 <b>영수증의 QR</b>로 들어가세요. 업체·수수료·입금 기간은 가게마다 달라요. J-TaxRefund는
          공식 사이트 주소를 확인하지 못해서 돈키호테 면세 안내 페이지로 연결해 뒀어요.
        </p>
      </div>
    </section>
  );
}

function Prep() {
  const [view, setView] = useState<"list" | "tax">(() => store.get("prepView", "list" as "list" | "tax"));
  useEffect(() => store.set("prepView", view), [view]);
  return (
    <>
      <div className="seg">
        <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>
          체크리스트
        </button>
        <button className={view === "tax" ? "on" : ""} onClick={() => setView("tax")}>
          면세 가이드
        </button>
      </div>
      {view === "list" ? <Checklist /> : <TaxGuide />}
    </>
  );
}

function Checklist() {
  const [done, setDone] = useState<string[]>(() => store.get("prep", [] as string[]));
  useEffect(() => store.set("prep", done), [done]);
  const toggle = (t: string) => setDone(done.includes(t) ? done.filter((x) => x !== t) : [...done, t]);
  const pct = Math.round((done.length / prep.length) * 100);
  return (
    <section className="panel">
      <div className="panelIntro">
        <h2>출발 전 준비</h2>
        <p>하나씩 끝내고 체크하세요. 체크한 항목은 이 기기에 저장돼요.</p>
        <div className="progress">
          <div style={{ width: pct + "%" }} />
        </div>
        <small className="progressLabel">
          {done.length} / {prep.length} 완료
        </small>
      </div>
      {prep.map((x) => {
        const on = done.includes(x.title);
        return (
          <div className={"prepRow" + (on ? " checked" : "")} key={x.title}>
            <button className="check" onClick={() => toggle(x.title)} aria-label="완료 표시">
              {on ? <CircleCheck /> : <span />}
            </button>
            <div className="prepIcon">{prepIcon[x.icon]}</div>
            <div className="prepText">
              <b>{x.title}</b>
              <p>{x.desc}</p>
            </div>
            <a className="ghost" href={x.url} target="_blank" rel="noreferrer">
              {x.cta}
              <ExternalLink size={12} />
            </a>
          </div>
        );
      })}
    </section>
  );
}

function App() {
  const [tab, setTab] = useState<Tab>(() => store.get("tab", "days" as Tab));
  useEffect(() => {
    store.set("tab", tab);
    window.scrollTo({ top: 0 });
  }, [tab]);
  return (
    <div className="app">
      <header className="hero">
        <div className="heroInner">
          <span className="kicker">FUKUOKA · YUFUIN · BEPPU</span>
          <h1>
            후쿠오카
            <br />
            가족여행
          </h1>
          <p>2026.12.27 – 12.29 · 3인</p>
          <div className="flights">
            <span>
              <Plane size={14} /> 도착 12.27 09:30
            </span>
            <span>
              <Plane size={14} className="flip" /> 출발 12.29 {FLIGHT_OUT}
            </span>
          </div>
        </div>
        <div className="sun" aria-hidden />
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <main>
        {tab === "days" && <Days />}
        {tab === "drive" && <Drive />}
        {tab === "food" && <Food />}
        {tab === "shop" && <Shop />}
        {tab === "prep" && <Prep />}
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
