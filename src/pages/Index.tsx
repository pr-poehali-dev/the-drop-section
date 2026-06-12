import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO = "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/5449559e-6a9e-450a-a9b5-d006c9cd1338.jpg";

const IMAGES = {
  pendant:   "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/12546374-81f8-4f6e-a5be-f5371f862c66.jpg",
  medallion: "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/8220429e-0ea6-4eda-91c2-99192e824437.jpg",
  ring:      "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/4865d085-a347-4efa-aadc-87af9a4243cb.jpg",
  clothing:  "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/files/3902b134-68d0-4932-b0b4-4a14e9926303.jpg",
};

const S = {
  silver:    "var(--silver)",
  silverDim: "var(--silver-dim)",
  white:     "var(--white)",
  ink:       "#000",
  stone:     "var(--stone)",
  concrete:  "var(--concrete)",
  border:    "var(--border-line)",
};

const ARTIFACTS = [
  { id: 1, name: "Туарегский Крест",  subtitle: "Кулон",             price: "8 900 ₽",  priceNum: 8900,  desc: "Серебро 925°, ручная чеканка. Символ защиты кочевников Сахары.", img: IMAGES.pendant,   rating: 4.8, reviews: 24, sizes: ["XS","S","M"],              material: "Серебро 925°" },
  { id: 2, name: "Защитный Медальон", subtitle: "Медальон-брелок",   price: "5 400 ₽",  priceNum: 5400,  desc: "Бронза, патинирование. Хранитель памяти и рода.",              img: IMAGES.medallion, rating: 4.9, reviews: 37, sizes: ["Один размер"],            material: "Бронза" },
  { id: 3, name: "Браслет",            subtitle: "Браслет",           price: "6 200 ₽",  priceNum: 6200,  desc: "Матовая сталь с гравировкой. «Всё хорошее — мне» — йоруба.", img: IMAGES.ring,      rating: 5.0, reviews: 18, sizes: ["XS","S","M","L"],          material: "Матовая сталь" },
];

const CLOTHING = [
  { id: 4, name: "Куртка «Ориша»",  subtitle: "Верхняя одежда", price: "24 500 ₽", priceNum: 24500, desc: "Натуральная кожа, этническая вышивка. Лимитированная серия.", img: IMAGES.clothing, rating: 4.7, reviews: 11, sizes: ["XS","S","M","L","XL"], material: "Натуральная кожа" },
  { id: 5, name: "Рубашка «Kente»", subtitle: "Верхняя одежда", price: "12 800 ₽", priceNum: 12800, desc: "Хлопок с ганской вышивкой кенте. Этника без компромиссов.",    img: IMAGES.clothing, rating: 4.6, reviews: 8,  sizes: ["S","M","L","XL"],    material: "Хлопок 100%" },
  { id: 6, name: "Плащ «Sahara»",   subtitle: "Верхняя одежда", price: "31 000 ₽", priceNum: 31000, desc: "Шерсть меланж, туарегские мотивы. Тепло пустыни.",             img: IMAGES.clothing, rating: 4.9, reviews: 5,  sizes: ["M","L","XL"],        material: "Шерсть 90%" },
];

const SIZE_GUIDE_CLOTHING = [
  { size: "XS", chest: "84–88",   waist: "64–68", hip: "90–94"   },
  { size: "S",  chest: "88–92",   waist: "68–72", hip: "94–98"   },
  { size: "M",  chest: "92–96",   waist: "72–76", hip: "98–102"  },
  { size: "L",  chest: "96–100",  waist: "76–80", hip: "102–106" },
  { size: "XL", chest: "100–104", waist: "80–84", hip: "106–110" },
];
const SIZE_GUIDE_JEWELRY = [
  { size: "XS", wrist: "14–15 см", neck: "38–40 см" },
  { size: "S",  wrist: "15–16 см", neck: "40–42 см" },
  { size: "M",  wrist: "16–17 см", neck: "42–45 см" },
];

const INIT_REVIEWS = [
  { author: "Амара Д.",    rating: 5, text: "Кулон Туарегский Крест — это произведение искусства. Ношу каждый день, получаю комплименты.", product: "Туарегский Крест", date: "15 мая 2026" },
  { author: "Игорь М.",   rating: 5, text: "Кольцо сидит идеально, металл приятный на ощупь. Упаковка — отдельный ритуал.",              product: "Mani ire gbogbo", date: "2 июня 2026" },
  { author: "Светлана К.", rating: 4, text: "Медальон тяжелее, чем ожидала — это плюс. Качество бронзы на уровне.",                       product: "Маска Предков",   date: "28 апреля 2026" },
];

type Section = "home" | "jewelry" | "clothing" | "about" | "contacts";
type Product = typeof ARTIFACTS[0];
interface CartItem { id: number; name: string; price: number; qty: number; size?: string; }

const Divider = () => (
  <div className="silver-divider" />
);

const Stars = ({ rating, interactive, onSet }: { rating: number; interactive?: boolean; onSet?: (n: number) => void }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span key={i} onClick={() => interactive && onSet?.(i)} style={{
        color: i <= Math.round(rating) ? S.silver : "#2a2a2a",
        cursor: interactive ? "pointer" : "default",
        fontSize: interactive ? "1.3rem" : "0.95rem",
      }}>★</span>
    ))}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="hero-subtitle">{children}</p>
);

export default function Index() {
  const [section, setSection]               = useState<Section>("home");
  const [cart, setCart]                     = useState<CartItem[]>([]);
  const [wishlist, setWishlist]             = useState<number[]>([]);
  const [cartOpen, setCartOpen]             = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize]     = useState("");
  const [showSizeGuide, setShowSizeGuide]   = useState(false);
  const [mobileMenu, setMobileMenu]         = useState(false);
  const [reviews, setReviews]               = useState(INIT_REVIEWS);
  const [reviewText, setReviewText]         = useState("");
  const [reviewRating, setReviewRating]     = useState(5);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const navTo = (s: Section) => { setSection(s); setMobileMenu(false); window.scrollTo({ top: 0 }); };
  const openProduct = (p: Product) => { setSelectedProduct(p); setSelectedSize(""); };
  const toggleWish = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const addToCart = (p: Product, size: string) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id && i.size === size);
      if (ex) return prev.map(i => i.id === p.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.priceNum, qty: 1, size }];
    });
    setSelectedProduct(null);
  };

  const ProductCard = ({ p }: { p: Product }) => (
    <div className="product-card" onClick={() => openProduct(p)}>
      <div className="aspect-[3/4] relative overflow-hidden">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center"
          style={{ color: wishlist.includes(p.id) ? S.white : S.silverDim }}
          onClick={e => { e.stopPropagation(); toggleWish(p.id); }}
        >
          <Icon name="Heart" size={17} />
        </button>
        <div className="card-overlay">
          <p className="font-sans text-xs tracking-widest uppercase mb-2 opacity-40">{p.subtitle}</p>
          <div className="flex items-center gap-2 mb-3">
            <Stars rating={p.rating} />
            <span className="font-sans text-xs opacity-30">({p.reviews})</span>
          </div>
          <button className="btn-arsenal w-full">[ Добавить в арсенал ]</button>
        </div>
      </div>
      <div className="p-4" style={{ borderTop: `1px solid ${S.border}`, background: S.stone }}>
        <h3 className="font-gothic text-sm" style={{ color: S.white }}>{p.name}</h3>
        <div className="flex justify-between items-center mt-1.5">
          <span className="font-serif text-lg" style={{ color: S.silver }}>{p.price}</span>
          <span className="font-sans text-xs" style={{ color: S.silverDim }}>{p.material}</span>
        </div>
      </div>
    </div>
  );

  const NAV_ITEMS: { key: Section; label: string }[] = [
    { key: "home",     label: "Главная"   },
    { key: "jewelry",  label: "Украшения" },
    { key: "clothing", label: "Одежда"    },
    { key: "about",    label: "О бренде"  },
    { key: "contacts", label: "Контакты"  },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#000", color: "#e0e0e0" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.98), transparent)" }}>
        <button onClick={() => navTo("home")} className="flex items-center">
          <img src={LOGO} alt="ALAJE" className="h-10 w-auto select-none" draggable={false}
            style={{ filter: "brightness(1.15) contrast(1.05)", mixBlendMode: "screen" }} />
        </button>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(n => (
            <button key={n.key} onClick={() => navTo(n.key)} className={`nav-link ${section === n.key ? "active" : ""}`}>{n.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => setCartOpen(true)} className="relative" style={{ color: S.silverDim }}>
            <Icon name="ShoppingBag" size={19} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: S.white, color: "#000", fontSize: "9px" }}>{cartCount}</span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ color: S.silverDim }}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: "rgba(0,0,0,0.99)" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.key} onClick={() => navTo(n.key)}
              className="font-gothic text-2xl tracking-widest"
              style={{ color: section === n.key ? S.white : S.silverDim }}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* ══ HOME ══ */}
      {section === "home" && (
        <>
          {/* Hero */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0" style={{ background: "#000" }} />
            {/* subtle noise */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
            <div className="relative z-10 animate-fade-up px-6 flex flex-col items-center">
              <Label>Этническая роскошь · Африканские корни</Label>
              <div className="my-8">
                <img src={LOGO} alt="ALAJE" className="w-56 md:w-80 select-none" draggable={false}
                  style={{ filter: "brightness(1.1) contrast(1.05)", mixBlendMode: "screen" }} />
              </div>
              <p className="font-serif text-xl md:text-2xl italic mb-10 max-w-sm mx-auto" style={{ color: S.silverDim, letterSpacing: "0.04em" }}>
                Каждый артефакт — история силы
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => navTo("jewelry")} className="btn-arsenal">[ Украшения ]</button>
                <button onClick={() => navTo("clothing")}
                  className="font-sans text-xs font-medium tracking-widest uppercase px-6 py-2.5 transition-all"
                  style={{ background: "rgba(255,255,255,0.07)", color: S.silver, border: "1px solid rgba(255,255,255,0.12)" }}>
                  Одежда →
                </button>
              </div>
            </div>
            <div className="absolute bottom-8 flex justify-center w-full animate-bounce" style={{ color: S.silverDim, opacity: 0.3 }}>
              <Icon name="ChevronDown" size={20} />
            </div>
          </section>

          {/* Ticker */}
          <div className="overflow-hidden py-3 border-y" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0a0a0a" }}>
            <div className="ticker-inner">
              {Array(10).fill(null).map((_, i) => (
                <span key={i} className="font-sans text-xs mr-10 tracking-widest" style={{ color: S.silverDim, opacity: 0.4 }}>
                  ALAJE · ТУАРЕГСКИЙ КРЕСТ · МАСКА ПРЕДКОВ · MANI IRE GBOGBO · РУЧНАЯ РАБОТА ·&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Split Screen — 3 Артефакта */}
          <section className="flex" style={{ minHeight: "100vh" }}>
            {ARTIFACTS.map((art, i) => (
              <div key={art.id} className="split-col" onClick={() => openProduct(art)}>
                <img src={art.img} alt={art.name} className="split-img" />
                {/* vertical silver line between cols */}
                {i < 2 && (
                  <div className="absolute top-0 right-0 bottom-0 z-10 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                )}
                <div className="split-content">
                  <p className="font-sans text-xs tracking-widest mb-2" style={{ color: S.silverDim, opacity: 0.4 }}>{String(i+1).padStart(2,"0")} / 03</p>
                  <h2 className="font-gothic text-xl md:text-2xl leading-tight" style={{ color: S.white }}>{art.name}</h2>
                  <p className="font-serif italic text-sm mt-1" style={{ color: S.silverDim }}>{art.subtitle}</p>
                  <div className="split-overlay-info mt-5">
                    <div style={{ height: "1px", background: "rgba(200,200,200,0.2)", marginBottom: "1rem" }} />
                    <p className="font-serif text-2xl mb-4" style={{ color: S.silver }}>{art.price}</p>
                    <button className="btn-arsenal text-xs">[ Добавить в арсенал ]</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Clothing Teaser */}
          <section className="relative h-[55vh] overflow-hidden flex items-center" style={{ background: "#000" }}>
            <img src={IMAGES.clothing} alt="Одежда" className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.3, filter: "saturate(0.6)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.2) 100%)" }} />
            <div className="relative z-10 px-10 md:px-20 max-w-md">
              <Label>Новая коллекция</Label>
              <h2 className="font-gothic text-4xl md:text-5xl mt-3 mb-4" style={{ color: S.white }}>Одежда<br />ALAJE</h2>
              <p className="font-serif italic mb-7 text-lg" style={{ color: S.silverDim }}>Этника в каждом шве.<br />Сила в каждом силуэте.</p>
              <button onClick={() => navTo("clothing")} className="btn-arsenal">[ Смотреть коллекцию ]</button>
            </div>
          </section>

          {/* Reviews */}
          <section className="py-24 px-6 md:px-16 bg-concrete">
            <div className="text-center mb-14">
              <Label>Голоса арсенала</Label>
              <h2 className="font-gothic text-3xl mt-3" style={{ color: S.white }}>Отзывы</h2>
              <div className="mt-6"><Divider /></div>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {reviews.slice(0,3).map((r, i) => (
                <div key={i} className="p-6" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Stars rating={r.rating} />
                  <p className="font-serif italic mt-4 mb-5 leading-relaxed text-base" style={{ color: S.silverDim }}>«{r.text}»</p>
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "0.75rem" }} />
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs font-medium" style={{ color: S.silver }}>{r.author}</span>
                    <span className="font-sans text-xs" style={{ color: S.silverDim, opacity: 0.4 }}>{r.date}</span>
                  </div>
                  <p className="font-sans text-xs mt-1" style={{ color: S.silverDim, opacity: 0.25 }}>{r.product}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ══ JEWELRY ══ */}
      {section === "jewelry" && (
        <div className="pt-24 px-6 md:px-12 pb-20">
          <div className="text-center mb-14">
            <Label>The Drop</Label>
            <h1 className="font-gothic text-5xl mt-3" style={{ color: S.white }}>Украшения</h1>
            <div className="mt-6"><Divider /></div>
          </div>
          <div className="flex mb-14" style={{ minHeight: "65vh", border: "1px solid rgba(255,255,255,0.05)" }}>
            {ARTIFACTS.map((art, i) => (
              <div key={art.id} className="split-col" style={{ minHeight: "65vh" }} onClick={() => openProduct(art)}>
                <img src={art.img} alt={art.name} className="split-img" />
                {i < 2 && <div className="absolute top-0 right-0 bottom-0 z-10 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
                <div className="split-content">
                  <p className="font-sans text-xs tracking-widest mb-1" style={{ color: S.silverDim, opacity: 0.4 }}>0{i+1}</p>
                  <h2 className="font-gothic text-lg" style={{ color: S.white }}>{art.name}</h2>
                  <div className="split-overlay-info mt-3">
                    <p className="font-serif text-xl mb-3" style={{ color: S.silver }}>{art.price}</p>
                    <button className="btn-arsenal text-xs">[ В арсенал ]</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {ARTIFACTS.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      )}

      {/* ══ CLOTHING ══ */}
      {section === "clothing" && (
        <div className="pt-24 px-6 md:px-12 pb-20">
          <div className="text-center mb-14">
            <Label>Коллекция</Label>
            <h1 className="font-gothic text-5xl mt-3" style={{ color: S.white }}>Одежда</h1>
            <div className="mt-6"><Divider /></div>
          </div>
          <div className="flex justify-end mb-6">
            <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-2 nav-link">
              <Icon name="Ruler" size={13} /> Таблица размеров
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {CLOTHING.map(p => <ProductCard key={p.id} p={p} />)}
          </div>

          {showSizeGuide && (
            <div className="modal-backdrop" onClick={() => setShowSizeGuide(false)}>
              <div className="max-w-lg w-full p-8" style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-gothic text-lg" style={{ color: S.white }}>Таблица размеров</h3>
                  <button onClick={() => setShowSizeGuide(false)} style={{ color: S.silverDim }}><Icon name="X" size={18} /></button>
                </div>
                <Label>Одежда (см)</Label>
                <table className="w-full font-sans text-sm mt-3 mb-8">
                  <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Размер","Грудь","Талия","Бёдра"].map(h => <th key={h} className="text-left pb-2 font-normal" style={{ color: S.silverDim }}>{h}</th>)}
                  </tr></thead>
                  <tbody>{SIZE_GUIDE_CLOTHING.map(r => (
                    <tr key={r.size} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="py-2 font-medium" style={{ color: S.silver }}>{r.size}</td>
                      <td className="py-2" style={{ color: S.silverDim }}>{r.chest}</td>
                      <td className="py-2" style={{ color: S.silverDim }}>{r.waist}</td>
                      <td className="py-2" style={{ color: S.silverDim }}>{r.hip}</td>
                    </tr>
                  ))}</tbody>
                </table>
                <Label>Украшения (см)</Label>
                <table className="w-full font-sans text-sm mt-3">
                  <thead><tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Размер","Запястье","Шея"].map(h => <th key={h} className="text-left pb-2 font-normal" style={{ color: S.silverDim }}>{h}</th>)}
                  </tr></thead>
                  <tbody>{SIZE_GUIDE_JEWELRY.map(r => (
                    <tr key={r.size} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td className="py-2 font-medium" style={{ color: S.silver }}>{r.size}</td>
                      <td className="py-2" style={{ color: S.silverDim }}>{r.wrist}</td>
                      <td className="py-2" style={{ color: S.silverDim }}>{r.neck}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ ABOUT ══ */}
      {section === "about" && (
        <div className="pt-24 pb-20">
          <div className="relative h-[45vh] flex items-center justify-center overflow-hidden">
            <img src={IMAGES.pendant} alt="" className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.12, filter: "saturate(0)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, #000 80%)" }} />
            <div className="relative z-10 text-center px-6">
              <Label>История</Label>
              <div className="mt-4">
                <img src={LOGO} alt="ALAJE" className="w-40 mx-auto select-none" draggable={false}
                  style={{ filter: "brightness(1.1)", mixBlendMode: "screen" }} />
              </div>
              <p className="font-serif italic text-lg mt-3" style={{ color: S.silverDim }}>Тот, кто приходит с миссией</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-16">
            <Divider />
            <div className="grid md:grid-cols-2 gap-14 my-16">
              <div>
                <h2 className="font-gothic text-xl mb-5" style={{ color: S.white }}>Манифест</h2>
                <p className="font-serif text-lg italic leading-relaxed mb-5" style={{ color: S.silverDim }}>
                  ALAJE — это не бренд. Это архив. Каждое украшение — шифр, который хранит память поколений.
                </p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: S.silverDim, opacity: 0.5 }}>
                  Мы работаем с мастерами из Мали, Нигерии и Марокко, сохраняя техники ручной чеканки, которым сотни лет. Каждый артефакт проходит путь от руды до кожи за 6–8 недель.
                </p>
              </div>
              <div>
                <h2 className="font-gothic text-xl mb-5" style={{ color: S.white }}>Принципы</h2>
                {["Ручная работа без исключений","Аутентичные этнические мотивы","Ограниченные тиражи","Прямое партнёрство с мастерами"].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 mb-4">
                    <span className="font-sans text-xs w-6 flex-shrink-0" style={{ color: S.silverDim }}>0{i+1}</span>
                    <span className="font-sans text-sm" style={{ color: S.silverDim }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <Divider />

            <h2 className="font-gothic text-2xl my-10 text-center" style={{ color: S.white }}>Отзывы покупателей</h2>
            <div className="space-y-4 mb-10">
              {reviews.map((r, i) => (
                <div key={i} className="p-5" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-sans text-sm font-medium" style={{ color: S.silver }}>{r.author}</span>
                      <span className="font-sans text-xs ml-3" style={{ color: S.silverDim, opacity: 0.35 }}>{r.product} · {r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="font-serif italic leading-relaxed" style={{ color: S.silverDim }}>«{r.text}»</p>
                </div>
              ))}
            </div>

            <div className="p-7" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-gothic text-lg mb-5" style={{ color: S.white }}>Оставить отзыв</h3>
              <Stars rating={reviewRating} interactive onSet={setReviewRating} />
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)}
                placeholder="Расскажите о вашем опыте..."
                className="w-full mt-4 bg-transparent border p-3 font-sans text-sm resize-none h-28 outline-none mb-5"
                style={{ borderColor: "rgba(255,255,255,0.07)", color: "#e0e0e0" }} />
              <button onClick={() => {
                if (!reviewText.trim()) return;
                setReviews(prev => [{ author: "Вы", rating: reviewRating, text: reviewText, product: "ALAJE", date: "Только что" }, ...prev]);
                setReviewText(""); setReviewRating(5);
              }} className="btn-arsenal">[ Отправить отзыв ]</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONTACTS ══ */}
      {section === "contacts" && (
        <div className="pt-24 pb-20 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-6 w-full">
            <div className="text-center mb-14">
              <Label>Связь</Label>
              <h1 className="font-gothic text-5xl mt-3" style={{ color: S.white }}>Контакты</h1>
              <div className="mt-6"><Divider /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {[
                { icon: "Mail",    label: "Email",     value: "info@alaje.ru" },
                { icon: "Phone",   label: "Телефон",   value: "+7 (999) 000-00-00" },
                { icon: "Instagram", label: "Instagram", value: "@alaje.ritual" },
                { icon: "MapPin",  label: "Адрес",     value: "Москва, по записи" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-5"
                  style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Icon name={c.icon} size={18} style={{ color: S.silverDim, flexShrink: 0 }} />
                  <div>
                    <p className="hero-subtitle mb-0.5">{c.label}</p>
                    <p className="font-sans text-sm" style={{ color: S.silver }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8" style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-gothic text-xl mb-7" style={{ color: S.white }}>Написать нам</h3>
              <div className="space-y-4">
                <input placeholder="Ваше имя" className="w-full bg-transparent border p-3 font-sans text-sm outline-none"
                  style={{ borderColor: "rgba(255,255,255,0.07)", color: "#e0e0e0" }} />
                <input placeholder="Email" className="w-full bg-transparent border p-3 font-sans text-sm outline-none"
                  style={{ borderColor: "rgba(255,255,255,0.07)", color: "#e0e0e0" }} />
                <textarea placeholder="Сообщение..." className="w-full bg-transparent border p-3 font-sans text-sm resize-none h-32 outline-none"
                  style={{ borderColor: "rgba(255,255,255,0.07)", color: "#e0e0e0" }} />
                <button className="btn-arsenal w-full">[ Отправить сообщение ]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PRODUCT MODAL ══ */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="max-w-3xl w-full flex flex-col md:flex-row overflow-hidden"
            style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={e => e.stopPropagation()}>
            <div className="relative md:w-1/2 overflow-hidden" style={{ minHeight: "300px" }}>
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" style={{ minHeight: "300px", filter: "saturate(0.85)" }} />
              <button onClick={() => toggleWish(selectedProduct.id)}
                className="absolute top-4 right-4 w-9 h-9 border flex items-center justify-center"
                style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.7)",
                  color: wishlist.includes(selectedProduct.id) ? S.white : S.silverDim }}>
                <Icon name="Heart" size={15} />
              </button>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col">
              <button onClick={() => setSelectedProduct(null)} className="self-end mb-3" style={{ color: S.silverDim }}>
                <Icon name="X" size={18} />
              </button>
              <Label>{selectedProduct.subtitle}</Label>
              <h2 className="font-gothic text-2xl mt-2 mb-3" style={{ color: S.white }}>{selectedProduct.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <Stars rating={selectedProduct.rating} />
                <span className="font-sans text-xs" style={{ color: S.silverDim, opacity: 0.4 }}>{selectedProduct.rating} · {selectedProduct.reviews} отзывов</span>
              </div>
              <p className="font-serif italic text-sm leading-relaxed mb-3" style={{ color: S.silverDim }}>{selectedProduct.desc}</p>
              <p className="font-sans text-xs mb-5" style={{ color: S.silverDim, opacity: 0.35 }}>Материал: {selectedProduct.material}</p>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "1rem" }} />
              <Label>Выбрать размер</Label>
              <div className="flex flex-wrap gap-2 mt-3 mb-7">
                {selectedProduct.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`size-btn ${selectedSize === s ? "active" : ""}`}>{s}</button>
                ))}
              </div>
              <div className="mt-auto">
                <p className="font-serif text-3xl mb-5" style={{ color: S.silver }}>{selectedProduct.price}</p>
                <button onClick={() => addToCart(selectedProduct, selectedSize || selectedProduct.sizes[0])} className="btn-arsenal w-full">
                  [ Добавить в арсенал ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CART ══ */}
      {cartOpen && (
        <div className="modal-backdrop" onClick={() => setCartOpen(false)}>
          <div className="max-w-md w-full flex flex-col" style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", maxHeight: "85vh" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-gothic text-xl" style={{ color: S.white }}>Арсенал</h3>
              <button onClick={() => setCartOpen(false)} style={{ color: S.silverDim }}><Icon name="X" size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="ShoppingBag" size={36} className="mx-auto" style={{ color: S.silverDim, opacity: 0.15 }} />
                  <p className="font-serif italic mt-4" style={{ color: S.silverDim, opacity: 0.3 }}>Арсенал пуст</p>
                </div>
              ) : cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div>
                    <p className="font-gothic text-sm" style={{ color: S.white }}>{item.name}</p>
                    {item.size && <p className="font-sans text-xs mt-0.5" style={{ color: S.silverDim, opacity: 0.4 }}>Размер: {item.size}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button className="w-5 text-center" style={{ color: S.silverDim }}
                        onClick={() => setCart(prev => prev.map(c => c.id === item.id && c.size === item.size ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}>−</button>
                      <span className="font-sans text-sm w-4 text-center">{item.qty}</span>
                      <button className="w-5 text-center" style={{ color: S.silverDim }}
                        onClick={() => setCart(prev => prev.map(c => c.id === item.id && c.size === item.size ? { ...c, qty: c.qty + 1 } : c))}>+</button>
                    </div>
                    <p className="font-sans text-sm w-24 text-right" style={{ color: S.silver }}>{(item.price * item.qty).toLocaleString()} ₽</p>
                    <button style={{ color: S.silverDim, opacity: 0.4 }}
                      onClick={() => setCart(prev => prev.filter(c => !(c.id === item.id && c.size === item.size)))}>
                      <Icon name="Trash2" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex justify-between mb-5">
                  <span className="font-sans text-sm" style={{ color: S.silverDim }}>Итого</span>
                  <span className="font-serif text-2xl" style={{ color: S.silver }}>{cartTotal.toLocaleString()} ₽</span>
                </div>
                <button className="btn-arsenal w-full">[ Оформить заказ ]</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <img src={LOGO} alt="ALAJE" className="h-10 mx-auto mb-3 select-none" draggable={false}
          style={{ filter: "brightness(1.0)", mixBlendMode: "screen" }} />
        <p className="hero-subtitle">Этническая роскошь · Африканские корни · Ручная работа</p>
      </footer>
    </div>
  );
}