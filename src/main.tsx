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
  Snowflake,
  Phone,
  ExternalLink,
  CalendarDays,
  ClipboardCheck,
  Wifi,
  FileText,
  ShieldCheck,
  CreditCard,
  CircleCheck,
  TriangleAlert,
  ChevronDown,
  CarFront,
  UtensilsCrossed,
  Lightbulb,
} from "lucide-react";
import {
  days,
  drive,
  meals,
  places,
  prep,
  refunders,
  shops,
  taxSteps,
  buys,
  cards,
  coupons,
  FLIGHT_OUT,
  type Deal,
  type Kind,
  type Place,
} from "./data";
import "./styles.css";

const kindIcon: Record<Kind, React.ReactNode> = {
  plane: <Plane />,
  car: <CarFront />,
  drive: <Route />,
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
  snow: <Snowflake />,
  shield: <ShieldCheck />,
  file: <FileText />,
  card: <CreditCard />,
  food: <Utensils />,
};

const mapUrl = (p: Place) =>
  p.url ?? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.q);

const altLabel = (key: string) => (key.includes("Park") ? "여분" : "대안");

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

function usePersist<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => store.get(key, init));
  useEffect(() => {
    store.set(key, v);
  }, [key, v]);
  return [v, setV] as const;
}

function CopyCode({ code }: { code: string }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
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
      <Navigation size={12} />
      <span>{code}</span>
      {ok ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

function Actions({ p }: { p: Place }) {
  return (
    <div className="actions">
      {p.mapcode && <CopyCode code={p.mapcode} />}
      {p.tel && (
        <a className="btn" href={"tel:" + p.tel} aria-label="전화">
          <Phone size={13} />
        </a>
      )}
      <a className="btn primary" href={mapUrl(p)} target="_blank" rel="noreferrer">
        <MapPin size={13} />
        지도
      </a>
    </div>
  );
}

/** 장소 한 줄: 이름·설명 + 버튼 */
function PlaceRow({ k, label }: { k: string; label?: string }) {
  const p = places[k];
  return (
    <div className="placeRow">
      <div className="placeText">
        {label && <span className="tag">{label}</span>}
        <b>{p.name}</b>
        <small>{p.meta}</small>
      </div>
      <Actions p={p} />
    </div>
  );
}

/** 장소 + 대안/여분 */
function PlaceBlock({ k }: { k: string }) {
  return (
    <>
      <PlaceRow k={k} />
      {places[k].alt?.map((a) => (
        <PlaceRow key={a} k={a} label={altLabel(a)} />
      ))}
    </>
  );
}

function Seg<T extends string>({ value, set, items }: { value: T; set: (v: T) => void; items: [T, string][] }) {
  return (
    <div className="seg">
      {items.map(([id, label]) => (
        <button key={id} className={value === id ? "on" : ""} onClick={() => set(id)}>
          {label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- 일정 ---------------- */

function Days() {
  const [day, setDay] = usePersist("day", 0);
  const [open, setOpen] = useState<number | null>(null);
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
          </button>
        ))}
      </div>

      <section className="dayHead">
        <h2>{d.title}</h2>
        <span className="goal">{d.goal}</span>
      </section>
      <p className="dayTip">
        <Lightbulb size={14} />
        {d.tip}
      </p>

      <ol className="timeline">
        {d.items.map((x, i) => {
          const isOpen = open === i;
          return (
            <li key={x.time + x.title} className={"k-" + x.kind + (isOpen ? " open" : "")}>
              <div className="node">{kindIcon[x.kind]}</div>
              <div className="card">
                <button className="cardMain" onClick={() => setOpen(isOpen ? null : i)}>
                  <time>{x.time}</time>
                  <span className="cardText">
                    <b>
                      {x.title}
                      {x.pick && <em className="pick">맛집</em>}
                    </b>
                    {x.note && <small>{x.note}</small>}
                    {x.warn && (
                      <span className="warn">
                        <TriangleAlert size={12} />
                        {x.warn}
                      </span>
                    )}
                  </span>
                  <ChevronDown className="chev" />
                </button>
                {isOpen && (
                  <div className="detail">
                    <PlaceBlock k={x.place} />
                    {x.extra?.map((k) => (
                      <PlaceRow key={k} k={k} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

/* ---------------- 운전 ---------------- */

function Drive() {
  return (
    <section className="panel">
      <p className="lead">
        내비에서 <b>マップコード</b>를 고르고 입력하세요. 코드를 누르면 복사돼요.
      </p>
      {drive.map((g) => (
        <div className="group" key={g.day}>
          <h3>{g.day}</h3>
          {g.keys.map((k, i) => (
            <div className="driveRow" key={k + i}>
              <span className="step">{i + 1}</span>
              <div className="driveBody">
                <PlaceBlock k={k} />
              </div>
            </div>
          ))}
        </div>
      ))}
      <p className="note">
        <Snowflake size={14} />
        좌측통행 · 아침 결빙 주의 · 반납 전 가득 주유
      </p>
    </section>
  );
}

/* ---------------- 맛집 ---------------- */

function Food() {
  const groups = [...new Set(meals.map((m) => m.when))];
  return (
    <section className="panel">
      <p className="lead">연말이라 출발 전에 영업 여부를 확인하세요.</p>
      {groups.map((g) => (
        <div className="group" key={g}>
          <h3>{g}</h3>
          {meals
            .filter((m) => m.when === g)
            .map((m) => {
              const p = places[m.key];
              return (
                <div className="meal" key={m.key}>
                  <div className="placeRow">
                    <div className="placeText">
                      <b>{p.name}</b>
                      <span className="menu">{m.menu}</span>
                      <small>{p.meta}</small>
                    </div>
                    <Actions p={p} />
                  </div>
                  {p.alt?.map((a) => (
                    <PlaceRow key={a} k={a} label="대안" />
                  ))}
                </div>
              );
            })}
        </div>
      ))}
    </section>
  );
}

/* ---------------- 쇼핑 ---------------- */

const cats = ["내 리스트", "후쿠오카 명물", "과자·간식", "드럭스토어"] as const;

function BuyList() {
  const [got, setGot] = usePersist<string[]>("bought", []);
  const toggle = (n: string) => setGot(got.includes(n) ? got.filter((x) => x !== n) : [...got, n]);
  return (
    <section className="panel">
      {cats.map((c) => (
        <div className="group" key={c}>
          <h3>{c === "내 리스트" ? "★ 내 리스트" : c}</h3>
          {buys
            .filter((b) => b.cat === c)
            .map((b) => {
              const on = got.includes(b.name);
              const p = b.place ? places[b.place] : undefined;
              return (
                <div className={"checkRow" + (on ? " checked" : "")} key={b.name}>
                  <button className="check" onClick={() => toggle(b.name)} aria-label="샀어요">
                    {on ? <CircleCheck /> : <span />}
                  </button>
                  <div className="checkText">
                    <b>
                      {b.name} <span className="jp">{b.jp}</span>
                    </b>
                    <small>
                      {b.where}
                      {b.note && " · " + b.note}
                    </small>
                  </div>
                  {p && (
                    <a className="btn" href={mapUrl(p)} target="_blank" rel="noreferrer" aria-label="지도">
                      <MapPin size={13} />
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

function DealRow({ d }: { d: Deal }) {
  return (
    <div className={"deal" + (d.best ? " best" : "")}>
      <div className="dealText">
        <b>
          {d.title}
          {d.best && <em className="pick">추천</em>}
        </b>
        <p>{d.benefit}</p>
        <small>
          {d.when} · {d.how}
        </small>
      </div>
      {d.url && (
        <a className="btn" href={d.url} target="_blank" rel="noreferrer" aria-label="자세히">
          <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}

function Deals() {
  return (
    <section className="panel">
      <p className="lead">
        <b>추천:</b> JCB 카드로 돈키호테에서 면세 + 관광객 쿠폰 + 20% 캐시백. 출발 전 조건 재확인.
      </p>
      <div className="group">
        <h3>카드</h3>
        {cards.map((d) => (
          <DealRow d={d} key={d.title} />
        ))}
      </div>
      <div className="group">
        <h3>쿠폰</h3>
        {coupons.map((d) => (
          <DealRow d={d} key={d.title} />
        ))}
      </div>
    </section>
  );
}

function Shop() {
  const [view, setView] = usePersist<"list" | "deal">("shopView", "list");
  return (
    <>
      <Seg value={view} set={setView} items={[["list", "쇼핑 리스트"], ["deal", "카드·쿠폰"]]} />
      {view === "list" ? <BuyList /> : <Deals />}
    </>
  );
}

/* ---------------- 준비물 ---------------- */

function TaxGuide() {
  return (
    <section className="panel">
      <p className="lead">
        세금 포함 결제 → 출국 때 세관 확인 → 환급
      </p>
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

      <div className="group">
        <h3>DAY 3 매장별 환급 업체</h3>
        {shops.map((s) => (
          <div className="shopRow" key={s.key}>
            <b>{places[s.key].name}</b>
            <span className={"refunder " + (s.sure ? "sure" : "unsure")}>{s.refunder}</span>
          </div>
        ))}
        <p className="fine">초록색은 가게 공식 안내, 노란색은 계산할 때 영수증으로 확인하세요.</p>
      </div>

      <div className="group">
        <h3>환급 업체 사이트</h3>
        <div className="chipLinks">
          {refunders.map((r) => (
            <a key={r.name} className="btn" href={r.url} target="_blank" rel="noreferrer">
              {r.name}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
        <p className="fine">가입은 검색 말고 영수증 QR로 들어가세요.</p>
      </div>
    </section>
  );
}

function Checklist() {
  const [done, setDone] = usePersist<string[]>("prep", []);
  const toggle = (t: string) => setDone(done.includes(t) ? done.filter((x) => x !== t) : [...done, t]);
  const n = prep.filter((p) => done.includes(p.title)).length;
  return (
    <section className="panel">
      <div className="progressWrap">
        <div className="progress">
          <div style={{ width: (n / prep.length) * 100 + "%" }} />
        </div>
        <small>
          {n} / {prep.length}
        </small>
      </div>
      {prep.map((x) => {
        const on = done.includes(x.title);
        return (
          <div className={"checkRow" + (on ? " checked" : "")} key={x.title}>
            <button className="check" onClick={() => toggle(x.title)} aria-label="완료 표시">
              {on ? <CircleCheck /> : <span />}
            </button>
            <span className="prepIcon">{prepIcon[x.icon]}</span>
            <div className="checkText">
              <b>{x.title}</b>
              <small>{x.desc}</small>
            </div>
            {x.url && (
              <a className="btn" href={x.url} target="_blank" rel="noreferrer" aria-label="열기">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        );
      })}
    </section>
  );
}

function Prep() {
  const [view, setView] = usePersist<"list" | "tax">("prepView", "list");
  return (
    <>
      <Seg value={view} set={setView} items={[["list", "체크리스트"], ["tax", "면세 가이드"]]} />
      {view === "list" ? <Checklist /> : <TaxGuide />}
    </>
  );
}

/* ---------------- 앱 ---------------- */

type Tab = "days" | "drive" | "food" | "shop" | "prep";
const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "days", label: "일정", icon: <CalendarDays /> },
  { id: "drive", label: "운전", icon: <Car /> },
  { id: "food", label: "맛집", icon: <UtensilsCrossed /> },
  { id: "shop", label: "쇼핑", icon: <ShoppingBag /> },
  { id: "prep", label: "준비물", icon: <ClipboardCheck /> },
];

function App() {
  const [tab, setTab] = usePersist<Tab>("tab", "days");
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);
  return (
    <div className="app">
      <header className="hero">
        <div className="heroInner">
          <h1>후쿠오카 가족여행</h1>
          <p>
            12.27 09:30 도착 · 12.29 {FLIGHT_OUT} 출발
          </p>
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
