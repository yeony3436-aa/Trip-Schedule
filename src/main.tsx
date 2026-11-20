import React, { useEffect, useRef, useState } from "react";
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
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  TrainFront,
  Bus,
  ArrowRight,
  Plus,
  Trash2,
  Navigation2,
  Map as MapIcon,
  Flag,
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
  weatherSpots,
  legs,
  transitPay,
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

/** 지금 위치에서 그곳까지 길찾기 (구글맵이 이동 수단을 고르게 둠) */
const dirUrl = (p: Place) =>
  "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(p.q);

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
        <a className="btn iconOnly" href={"tel:" + p.tel} aria-label="전화">
          <Phone size={13} />
        </a>
      )}
      <a className="btn iconOnly" href={mapUrl(p)} target="_blank" rel="noreferrer" aria-label="지도" title="지도">
        <MapPin size={14} />
      </a>
      <a className="btn primary" href={dirUrl(p)} target="_blank" rel="noreferrer">
        <Navigation2 size={13} />
        길찾기
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
        {label && p.fit && (
          <span className={"fitNote" + (p.fit.startsWith("동선 OK") ? " ok" : "")}>
            <Route size={12} />
            {p.fit}
          </span>
        )}
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

/* ---------------- API: 날씨 · 환율 ---------------- */

/** 응답을 localStorage에 캐시해서 오프라인에서도 마지막 값을 보여줌 */
function useCachedFetch<T>(url: string, ttlMs: number) {
  const key = "api:" + url;
  const [data, setData] = useState<T | null>(() => store.get<{ t: number; v: T } | null>(key, null)?.v ?? null);
  useEffect(() => {
    if (!url) return; // 아직 부를 필요 없음
    const cached = store.get<{ t: number; v: T } | null>(key, null);
    if (cached && Date.now() - cached.t < ttlMs) {
      setData(cached.v);
      return;
    }
    let alive = true;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((v: T) => {
        store.set(key, { t: Date.now(), v });
        if (alive) setData(v);
      })
      .catch(() => {
        /* 네트워크 실패 시 캐시 값 유지 */
      });
    return () => {
      alive = false;
    };
  }, [url, key, ttlMs]);
  return data;
}

const wmo = (c: number): [React.ReactNode, string] =>
  c === 0
    ? [<Sun />, "맑음"]
    : c <= 2
      ? [<CloudSun />, "구름 조금"]
      : c === 3
        ? [<Cloud />, "흐림"]
        : c <= 48
          ? [<CloudFog />, "안개"]
          : c <= 57
            ? [<CloudDrizzle />, "이슬비"]
            : c <= 67 || (c >= 80 && c <= 82)
              ? [<CloudRain />, "비"]
              : c <= 77 || c === 85 || c === 86
                ? [<CloudSnow />, "눈"]
                : [<CloudLightning />, "뇌우"];

type Live = {
  current?: { temperature_2m: number; weather_code: number; time: string };
  daily?: { temperature_2m_max: number[]; temperature_2m_min: number[] };
};

/** 여행지 3곳의 지금 날씨 (Open-Meteo, 10분마다 갱신) */
function LiveWeather() {
  const lat = weatherSpots.map((s) => s.lat).join(",");
  const lon = weatherSpots.map((s) => s.lon).join(",");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=Asia%2FTokyo`;
  const data = useCachedFetch<Live[] | Live>(url, 10 * 60e3);
  const list = Array.isArray(data) ? data : data ? [data] : [];
  return (
    <div className="heroWeather">
      {weatherSpots.map((s, i) => {
        const w = list[i];
        const [icon, label] = w?.current ? wmo(w.current.weather_code) : [<Cloud />, ""];
        return (
          <div className="hw" key={s.place} title={label}>
            <span className="hwIcon">{icon}</span>
            <span className="hwText">
              <small>{s.place}</small>
              <b>{w?.current ? Math.round(w.current.temperature_2m) + "°" : "–"}</b>
            </span>
          </div>
        );
      })}
    </div>
  );
}

type DayForecast = { code: number; max: number; min: number; pop: number } | null;

type Daily16 = {
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

/** 여행 날짜 예보: 16일 안으로 들어오면 날짜별로, 아니면 전부 null */
function useTripForecast(): DayForecast[] {
  const daysLeft = Math.floor((new Date(days[0].iso + "T00:00:00+09:00").getTime() - Date.now()) / 864e5);
  const inRange = daysLeft <= 15;
  const lat = weatherSpots.map((s) => s.lat).join(",");
  const lon = weatherSpots.map((s) => s.lon).join(",");
  const url = inRange
    ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=16&timezone=Asia%2FTokyo`
    : "";
  const data = useCachedFetch<Daily16[] | Daily16>(url, 3 * 3600e3);
  const list = Array.isArray(data) ? data : data ? [data] : [];
  return days.map((d) => {
    if (!inRange) return null;
    const spot = weatherSpots.findIndex((s) => s.place === d.wx);
    const daily = list[spot]?.daily;
    const i = daily?.time.indexOf(d.iso) ?? -1;
    if (!daily || i < 0) return null;
    return {
      code: daily.weather_code[i],
      max: Math.round(daily.temperature_2m_max[i]),
      min: Math.round(daily.temperature_2m_min[i]),
      pop: daily.precipitation_probability_max[i] ?? 0,
    };
  });
}

type Rates = { rates?: { KRW?: number }; time_last_update_unix?: number };

function YenConverter() {
  const data = useCachedFetch<Rates>("https://open.er-api.com/v6/latest/JPY", 6 * 3600e3);
  const [yen, setYen] = usePersist("yen", 1000);
  const rate = data?.rates?.KRW;
  return (
    <div className="fx">
      <div className="fxRow">
        <label>
          <input
            type="number"
            inputMode="numeric"
            value={yen || ""}
            onChange={(e) => setYen(Number(e.target.value))}
            placeholder="0"
          />
          <span>엔</span>
        </label>
        <ArrowRight size={16} />
        <b>{rate ? "₩" + Math.round(yen * rate).toLocaleString("ko-KR") : "…"}</b>
      </div>
      <div className="fxQuick">
        {[1000, 5000, 10000, 30000].map((v) => (
          <button key={v} onClick={() => setYen(v)} className={yen === v ? "on" : ""}>
            {v.toLocaleString()}
          </button>
        ))}
        {rate && <small>100엔 = ₩{Math.round(rate * 100).toLocaleString("ko-KR")}</small>}
      </div>
    </div>
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

/** 현재 일본 시간 (분 단위로 갱신) */
function useJstNow() {
  const calc = () => {
    const d = new Date(Date.now() + 9 * 3600e3).toISOString();
    return { iso: d.slice(0, 10), hm: d.slice(11, 16) };
  };
  const [now, setNow] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setNow(calc()), 60e3);
    return () => clearInterval(t);
  }, []);
  return now;
}

/** 그날 동선 전체를 지도 한 장으로 (키 없는 구글맵 임베드) */
function DayMap({ route }: { route: string[] }) {
  const [show, setShow] = useState(false);
  const qs = route.map((k) => places[k].q);
  const embed =
    "https://maps.google.com/maps?saddr=" +
    encodeURIComponent(qs[0]) +
    "&daddr=" +
    qs.slice(1).map(encodeURIComponent).join("+to:") +
    "&output=embed";
  const open =
    "https://www.google.com/maps/dir/?api=1&origin=" +
    encodeURIComponent(qs[0]) +
    "&destination=" +
    encodeURIComponent(qs[qs.length - 1]) +
    (qs.length > 2 ? "&waypoints=" + qs.slice(1, -1).map(encodeURIComponent).join("%7C") : "");
  return (
    <section className="dayMap">
      <button className="dayMapHead" onClick={() => setShow(!show)}>
        <MapIcon size={15} />
        <span className="route">
          {route.map((k, i) => (
            <React.Fragment key={k + i}>
              {i > 0 && <ArrowRight size={11} />}
              {places[k].short ?? places[k].name}
            </React.Fragment>
          ))}
        </span>
        <ChevronDown size={16} className={"chev" + (show ? " flip" : "")} />
      </button>
      {show && (
        <>
          <iframe title="그날 동선 지도" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a className="btn primary mapOpen" href={open} target="_blank" rel="noreferrer">
            <Navigation2 size={13} />
            구글맵에서 전체 경로 열기
          </a>
        </>
      )}
    </section>
  );
}

function Days({ day, todayIdx, nowHm, fc }: { day: number; todayIdx: number; nowHm: string; fc: DayForecast }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => setOpen(null), [day]);
  const d = days[day];
  // 오늘이면 지금 시간에 해당하는 일정 (시작 시간이 지난 마지막 항목)
  const nowIdx = day === todayIdx ? d.items.reduce((acc, x, i) => (x.time <= nowHm ? i : acc), -1) : -1;
  return (
    <>
      <section className="dayHead">
        <h2>{d.title}</h2>
        <p className="goalLine">
          <Flag size={13} />
          {d.goal}
        </p>
        {fc && (
          <p className="fcLine">
            <span className="fcIcon">{wmo(fc.code)[0]}</span>
            {d.wx} 예보 · {wmo(fc.code)[1]} {fc.max}°/{fc.min}° · 비 {fc.pop}%
          </p>
        )}
      </section>

      <DayMap route={d.route} />

      <ol className="timeline">
        {d.items.map((x, i) => {
          const isOpen = open === i;
          return (
            <li
              key={x.time + x.title}
              className={"k-" + x.kind + (isOpen ? " open" : "") + (i === nowIdx ? " now" : "") + (nowIdx > i ? " past" : "")}
            >
              <div className="node">{kindIcon[x.kind]}</div>
              <div className="card">
                <button className="cardMain" onClick={() => setOpen(isOpen ? null : i)}>
                  <time>{x.time}</time>
                  <span className="cardText">
                    <b>
                      {x.title}
                      {x.pick && <em className="pick">맛집</em>}
                      {i === nowIdx && <em className="nowBadge">지금</em>}
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

      {d.notes && (
        <section className="dayNotes">
          <h3>
            <Lightbulb size={14} />
            참고
          </h3>
          <ul>
            {d.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/* ---------------- 운전 ---------------- */

const modeIcon = { subway: <TrainFront size={14} />, walk: <Footprints size={14} />, bus: <Bus size={14} /> };

function Transit() {
  const groups = [...new Set(legs.map((l) => l.day))];
  return (
    <section className="panel">
      <div className="payBox">
        {transitPay.map((p) => (
          <div key={p.title}>
            <b>{p.title}</b>
            <small>{p.text}</small>
          </div>
        ))}
      </div>
      {groups.map((g) => (
        <div className="group" key={g}>
          <h3>{g}</h3>
          {legs
            .filter((l) => l.day === g)
            .map((l) => (
              <div className="leg" key={l.time + l.to} style={{ "--lc": l.color ?? "var(--teal)" } as React.CSSProperties}>
                <div className="legHead">
                  <time>{l.time}</time>
                  <b>
                    {l.from} <ArrowRight size={13} /> {l.to}
                  </b>
                </div>
                <div className="legLine">
                  <span className="lineChip">
                    {modeIcon[l.mode]}
                    {l.line ?? "도보"}
                  </span>
                  {l.dir && <span className="dirChip">{l.dir}</span>}
                  {l.fare && <span className="fare">{l.fare}</span>}
                </div>
                {l.ride && <small className="ride">{l.ride}</small>}
                <ul>
                  {l.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </section>
  );
}

function Move() {
  const [view, setView] = usePersist<"car" | "transit">("moveView", "car");
  return (
    <>
      <Seg value={view} set={setView} items={[["car", "렌터카"], ["transit", "대중교통"]]} />
      {view === "car" ? <Drive /> : <Transit />}
    </>
  );
}

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
                    <b>{b.name}</b>
                    <span className="jp">{b.jp}</span>
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

type Expense = { id: number; day: string; memo: string; yen: number };

const won = (n: number) => "₩" + Math.round(n).toLocaleString("ko-KR");

function Expenses() {
  const rates = useCachedFetch<Rates>("https://open.er-api.com/v6/latest/JPY", 6 * 3600e3);
  const rate = rates?.rates?.KRW ?? 0;
  const now = useJstNow();
  const [list, setList] = usePersist<Expense[]>("expenses", []);
  const defaultDay = days.find((d) => d.iso === now.iso)?.iso ?? days[0].iso;
  const [day, setDay] = useState(defaultDay);
  const [memo, setMemo] = useState("");
  const [yen, setYen] = useState("");
  const add = () => {
    const n = Number(yen);
    if (!n) return;
    setList([...list, { id: Date.now(), day, memo: memo.trim() || "지출", yen: n }]);
    setMemo("");
    setYen("");
  };
  const total = list.reduce((s, e) => s + e.yen, 0);
  return (
    <section className="panel">
      <div className="expTotal">
        <small>총 지출</small>
        <b>¥{total.toLocaleString()}</b>
        {rate > 0 && <span>{won(total * rate)}</span>}
      </div>

      <div className="expForm">
        <select value={day} onChange={(e) => setDay(e.target.value)} aria-label="날짜">
          {days.map((d) => (
            <option key={d.iso} value={d.iso}>
              {d.date}
            </option>
          ))}
        </select>
        <input value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="어디에 썼나요" />
        <input
          value={yen}
          onChange={(e) => setYen(e.target.value.replace(/[^0-9]/g, ""))}
          inputMode="numeric"
          placeholder="엔"
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className="btn primary" onClick={add} aria-label="추가">
          <Plus size={15} />
        </button>
      </div>

      {days.map((d) => {
        const items = list.filter((e) => e.day === d.iso);
        if (!items.length) return null;
        const sum = items.reduce((s, e) => s + e.yen, 0);
        return (
          <div className="group" key={d.iso}>
            <h3 className="expDay">
              {d.date}
              <span>
                ¥{sum.toLocaleString()}
                {rate > 0 && ` · ${won(sum * rate)}`}
              </span>
            </h3>
            {items.map((e) => (
              <div className="expRow" key={e.id}>
                <span className="expMemo">{e.memo}</span>
                <span className="expYen">
                  ¥{e.yen.toLocaleString()}
                  {rate > 0 && <small>{won(e.yen * rate)}</small>}
                </span>
                <button
                  className="btn ghostIcon"
                  onClick={() => setList(list.filter((x) => x.id !== e.id))}
                  aria-label="삭제"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {!list.length && <p className="fine">아직 기록이 없어요. 쓴 금액을 엔화로 적으면 원화로 바꿔 보여줘요.</p>}
    </section>
  );
}

function Shop() {
  const [view, setView] = usePersist<"list" | "money" | "deal">("shopView", "list");
  return (
    <>
      <YenConverter />
      <Seg
        value={view}
        set={setView}
        items={[
          ["list", "쇼핑 리스트"],
          ["money", "가계부"],
          ["deal", "카드·쿠폰"],
        ]}
      />
      {view === "list" ? <BuyList /> : view === "money" ? <Expenses /> : <Deals />}
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
  const [guide, setGuide] = useState<string | null>(null);
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
        const showGuide = guide === x.title;
        return (
          <React.Fragment key={x.title}>
            <div className={"checkRow" + (on ? " checked" : "")}>
              <button className="check" onClick={() => toggle(x.title)} aria-label="완료 표시">
                {on ? <CircleCheck /> : <span />}
              </button>
              <span className="prepIcon">{prepIcon[x.icon]}</span>
              <div className="checkText">
                <b>{x.title}</b>
                <small>{x.desc}</small>
              </div>
              {x.guide && (
                <button className={"btn" + (showGuide ? " primary" : "")} onClick={() => setGuide(showGuide ? null : x.title)}>
                  방법
                  <ChevronDown size={13} className={showGuide ? "flip" : ""} />
                </button>
              )}
              {x.url && (
                <a className="btn" href={x.url} target="_blank" rel="noreferrer" aria-label="열기">
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
            {showGuide && (
              <ol className="guide">
                {x.guide!.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ol>
            )}
          </React.Fragment>
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
  { id: "drive", label: "이동", icon: <Car /> },
  { id: "food", label: "맛집", icon: <UtensilsCrossed /> },
  { id: "shop", label: "쇼핑", icon: <ShoppingBag /> },
  { id: "prep", label: "준비물", icon: <ClipboardCheck /> },
];

function App() {
  const [tab, setTab] = usePersist<Tab>("tab", "days");
  const now = useJstNow();
  const todayIdx = days.findIndex((x) => x.iso === now.iso);
  const [day, setDay] = usePersist("day", 0);
  const forecast = useTripForecast();
  // 여행 기간에는 열 때마다 오늘 날짜로
  useEffect(() => {
    if (todayIdx >= 0) setDay(todayIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayIdx]);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [tab, day]);
  return (
    <div className="app">
      <div className="scroll" ref={scroller}>
      {isKakao && <KakaoBanner />}
      <header className="hero">
        <div className="heroInner">
          <div className="heroTop">
            <h1>후쿠오카 가족여행</h1>
            <LiveWeather />
          </div>
          {tab === "days" && (
            <div className="dayTabs">
              {days.map((x, i) => (
                <button key={x.date} className={day === i ? "on" : ""} onClick={() => setDay(i)}>
                  <small>{i === todayIdx ? "TODAY" : `DAY ${i + 1}`}</small>
                  <b>{x.date}</b>
                  {forecast[i] && (
                    <span className="tabWx">
                      {wmo(forecast[i]!.code)[0]}
                      {forecast[i]!.max}°/{forecast[i]!.min}°
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="sun" aria-hidden />
      </header>

      <main>
        {tab === "days" && <Days day={day} todayIdx={todayIdx} nowHm={now.hm} fc={forecast[day]} />}
        {tab === "drive" && <Move />}
        {tab === "food" && <Food />}
        {tab === "shop" && <Shop />}
        {tab === "prep" && <Prep />}
      </main>
      </div>

      {/* 고정(fixed) 대신 화면 맨 아래 일반 블록: 카카오톡 인앱 브라우저에서도 안 흔들림 */}
      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ---------------- 카카오톡 인앱 브라우저 안내 ---------------- */

const isKakao = typeof navigator !== "undefined" && /KAKAOTALK/i.test(navigator.userAgent);

function KakaoBanner() {
  const [hide, setHide] = usePersist("kakaoBannerHidden", false);
  if (hide) return null;
  // 카카오톡이 지원하는 '외부 브라우저로 열기' 주소
  const external = "kakaotalk://web/openExternal?url=" + encodeURIComponent(location.href);
  return (
    <div className="kakaoBanner">
      <span>사파리·크롬에서 열면 더 부드럽고, 홈 화면에 추가할 수 있어요.</span>
      <a className="btn primary" href={external}>
        브라우저로 열기
      </a>
      <button className="btn iconOnly" onClick={() => setHide(true)} aria-label="닫기">
        ×
      </button>
    </div>
  );
}

// 배포 버전에서만 오프라인 지원 켜기 (개발 중에는 캐시 때문에 헷갈리지 않게)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* 지원 안 하는 브라우저는 그냥 온라인으로 동작 */
    });
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
