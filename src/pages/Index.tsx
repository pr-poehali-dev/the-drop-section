import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  pendant: "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/files/6235f49d-ad1c-48df-96ff-aaa9c40875fb.jpg",
  medallion: "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/files/e6b62972-0661-42bf-b9e5-0e85b8079321.jpg",
  ring: "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/files/a82e2240-b2d6-4858-bb1b-3c040db2d35b.jpg",
  clothing: "https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/files/3902b134-68d0-4932-b0b4-4a14e9926303.jpg",
};

const ARTIFACTS = [
  {
    id: 1,
    name: "Туарегский Крест",
    subtitle: "Кулон",
    price: "8 900 ₽",
    priceNum: 8900,
    desc: "Серебро 925°, ручная чеканка. Символ защиты кочевников Сахары.",
    img: IMAGES.pendant,
    category: "jewelry",
    rating: 4.8,
    reviews: 24,
    sizes: ["XS", "S", "M"],
    material: "Серебро 925°",
  },
  {
    id: 2,
    name: "Маска Предков",
    subtitle: "Медальон-брелок",
    price: "5 400 ₽",
    priceNum: 5400,
    desc: "Бронза, патинирование. Хранитель памяти и рода.",
    img: IMAGES.medallion,
    category: "jewelry",
    rating: 4.9,
    reviews: 37,
    sizes: ["Один размер"],
    material: "Бронза",
  },
  {
    id: 3,
    name: "Mani ire gbogbo",
    subtitle: "Разомкнутое кольцо",
    price: "6 200 ₽",
    priceNum: 6200,
    desc: "Вороненая сталь. «Всё хорошее — мне» — йоруба.",
    img: IMAGES.ring,
    category: "jewelry",
    rating: 5.0,
    reviews: 18,
    sizes: ["16", "17", "18", "19", "20"],
    material: "Вороненая сталь",
  },
];

const CLOTHING = [
  {
    id: 4,
    name: "Куртка «Ориша»",
    subtitle: "Верхняя одежда",
    price: "24 500 ₽",
    priceNum: 24500,
    desc: "Натуральная кожа, этническая вышивка. Лимитированная серия.",
    img: IMAGES.clothing,
    category: "clothing",
    rating: 4.7,
    reviews: 11,
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Натуральная кожа",
  },
  {
    id: 5,
    name: "Рубашка «Kente»",
    subtitle: "Верхняя одежда",
    price: "12 800 ₽",
    priceNum: 12800,
    desc: "Хлопок с ганской вышивкой кенте. Этника без компромиссов.",
    img: IMAGES.clothing,
    category: "clothing",
    rating: 4.6,
    reviews: 8,
    sizes: ["S", "M", "L", "XL"],
    material: "Хлопок 100%",
  },
  {
    id: 6,
    name: "Плащ «Sahara»",
    subtitle: "Верхняя одежда",
    price: "31 000 ₽",
    priceNum: 31000,
    desc: "Шерсть меланж, туарегские мотивы. Тепло пустыни.",
    img: IMAGES.clothing,
    category: "clothing",
    rating: 4.9,
    reviews: 5,
    sizes: ["M", "L", "XL"],
    material: "Шерсть 90%",
  },
];

const SIZE_GUIDE_CLOTHING = [
  { size: "XS", chest: "84–88", waist: "64–68", hip: "90–94" },
  { size: "S",  chest: "88–92", waist: "68–72", hip: "94–98" },
  { size: "M",  chest: "92–96", waist: "72–76", hip: "98–102" },
  { size: "L",  chest: "96–100", waist: "76–80", hip: "102–106" },
  { size: "XL", chest: "100–104", waist: "80–84", hip: "106–110" },
];

const SIZE_GUIDE_JEWELRY = [
  { size: "XS", wrist: "14–15 см", neck: "38–40 см" },
  { size: "S",  wrist: "15–16 см", neck: "40–42 см" },
  { size: "M",  wrist: "16–17 см", neck: "42–45 см" },
];

const INIT_REVIEWS = [
  { author: "Амара Д.", rating: 5, text: "Кулон Туарегский Крест — это произведение искусства. Ношу каждый день, получаю комплименты.", product: "Туарегский Крест", date: "15 мая 2026" },
  { author: "Игорь М.", rating: 5, text: "Кольцо сидит идеально, металл приятный на ощупь. Упаковка — отдельный ритуал.", product: "Mani ire gbogbo", date: "2 июня 2026" },
  { author: "Светлана К.", rating: 4, text: "Медальон тяжелее, чем ожидала — это плюс. Качество бронзы на уровне.", product: "Маска Предков", date: "28 апреля 2026" },
];

type Section = "home" | "jewelry" | "clothing" | "about" | "contacts";
type Product = typeof ARTIFACTS[0];
interface CartItem { id: number; name: string; price: number; qty: number; size?: string; }

const Stars = ({ rating, interactive, onSet }: { rating: number; interactive?: boolean; onSet?: (n: number) => void }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        onClick={() => interactive && onSet?.(i)}
        style={{
          color: i <= Math.round(rating) ? "var(--gold)" : "#333",
          cursor: interactive ? "pointer" : "default",
          fontSize: interactive ? "1.4rem" : "1rem",
        }}
      >★</span>
    ))}
  </div>
);

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const navTo = (s: Section) => { setSection(s); setMobileMenu(false); window.scrollTo({ top: 0 }); };

  const addToCart = (p: Product, size: string) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id && i.size === size);
      if (ex) return prev.map(i => i.id === p.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.priceNum, qty: 1, size }];
    });
    setSelectedProduct(null);
  };

  const toggleWish = (id: number) => setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const openProduct = (p: Product) => { setSelectedProduct(p); setSelectedSize(""); };

  const ProductCard = ({ p }: { p: Product }) => (
    <div className="product-card" onClick={() => openProduct(p)}>
      <div className="aspect-[3/4] relative overflow-hidden">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
        <button
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center transition-all"
          style={{ color: wishlist.includes(p.id) ? "var(--gold)" : "var(--parchment)", opacity: 0.9 }}
          onClick={e => { e.stopPropagation(); toggleWish(p.id); }}
        >
          <Icon name="Heart" size={18} />
        </button>
        <div className="card-overlay">
          <p className="font-sans text-xs tracking-widest uppercase mb-1 opacity-50">{p.subtitle}</p>
          <div className="flex items-center gap-2 mb-3">
            <Stars rating={p.rating} />
            <span className="font-sans text-xs opacity-40">({p.reviews})</span>
          </div>
          <button className="btn-arsenal w-full">[ Добавить в арсенал ]</button>
        </div>
      </div>
      <div className="p-4 border-t border-white/5">
        <h3 className="font-gothic text-sm" style={{ color: "var(--gold)" }}>{p.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="font-serif text-lg" style={{ color: "var(--parchment)" }}>{p.price}</span>
          <span className="font-sans text-xs opacity-30">{p.material}</span>
        </div>
      </div>
    </div>
  );

  const NAV_ITEMS: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "jewelry", label: "Украшения" },
    { key: "clothing", label: "Одежда" },
    { key: "about", label: "О бренде" },
    { key: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ink)", color: "var(--parchment)" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.97), transparent)" }}>
        <button onClick={() => navTo("home")} className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/5449559e-6a9e-450a-a9b5-d006c9cd1338.jpg"
            alt="ALAJE"
            className="h-10 w-auto select-none"
            style={{ filter: "brightness(1.2) contrast(1.1) drop-shadow(0 0 6px rgba(201,151,58,0.4))", mixBlendMode: "screen" }}
            draggable={false}
          />
        </button>
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map(n => (
            <button key={n.key} onClick={() => navTo(n.key)} className={`nav-link ${section === n.key ? "active" : ""}`}>{n.label}</button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => setCartOpen(true)} className="relative" style={{ color: "var(--parchment)" }}>
            <Icon name="ShoppingBag" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-xs flex items-center justify-center font-sans font-bold"
                style={{ background: "var(--gold)", color: "var(--ink)" }}>{cartCount}</span>
            )}
          </button>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ color: "var(--parchment)" }}>
            <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
          style={{ background: "rgba(10,10,10,0.99)" }}>
          {NAV_ITEMS.map(n => (
            <button key={n.key} onClick={() => navTo(n.key)}
              className="font-gothic text-3xl tracking-widest"
              style={{ color: section === n.key ? "var(--gold)" : "var(--parchment)", opacity: section === n.key ? 1 : 0.6 }}>
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
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 60%, #1f0e00 0%, #0A0A0A 65%)" }} />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,151,58,0.8) 79px, rgba(201,151,58,0.8) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,151,58,0.8) 79px, rgba(201,151,58,0.8) 80px)" }} />
            <div className="relative z-10 animate-fade-up px-6">
              <p className="hero-subtitle mb-8" style={{ color: "var(--gold)" }}>Этническая роскошь · Африканские корни</p>
              <div className="flex justify-center mb-6">
                <img
                  src="https://cdn.poehali.dev/projects/227c56ad-d401-470a-a922-6b6712379247/bucket/5449559e-6a9e-450a-a9b5-d006c9cd1338.jpg"
                  alt="ALAJE"
                  className="w-64 md:w-96 select-none"
                  style={{ filter: "brightness(1.1) contrast(1.05) drop-shadow(0 0 80px rgba(201,151,58,0.25))", mixBlendMode: "screen" }}
                  draggable={false}
                />
              </div>
              <p className="font-serif text-xl md:text-2xl italic opacity-60 mb-10 max-w-md mx-auto" style={{ letterSpacing: "0.04em" }}>
                Каждый артефакт — история силы
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => navTo("jewelry")} className="btn-arsenal">[ Украшения ]</button>
                <button onClick={() => navTo("clothing")}
                  className="font-sans text-xs font-semibold tracking-widest uppercase px-6 py-2.5"
                  style={{ background: "var(--gold)", color: "var(--ink)" }}>
                  Одежда →
                </button>
              </div>
            </div>
            <div className="absolute bottom-8 flex justify-center w-full animate-bounce opacity-30">
              <Icon name="ChevronDown" size={22} />
            </div>
          </section>

          {/* Ticker */}
          <div className="overflow-hidden py-3.5 border-y" style={{ borderColor: "rgba(201,151,58,0.4)", background: "#0c0c0c" }}>
            <div className="ticker-inner">
              {Array(10).fill(null).map((_, i) => (
                <span key={i} className="font-gothic text-xs mr-8 opacity-50" style={{ color: "var(--gold)" }}>
                  ALAJE · ТУАРЕГСКИЙ КРЕСТ · МАСКА ПРЕДКОВ · MANI IRE GBOGBO · АФРИКАНСКАЯ РОСКОШЬ ·&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Split Screen — 3 Артефакта */}
          <section className="flex" style={{ minHeight: "100vh" }}>
            {ARTIFACTS.map((art, i) => (
              <div key={art.id} className="split-col" onClick={() => openProduct(art)}>
                <img src={art.img} alt={art.name} className="split-img" />
                <div className="split-content">
                  <p className="hero-subtitle mb-2" style={{ color: "var(--gold)", opacity: 0.5 }}>{String(i + 1).padStart(2, "0")} / 03</p>
                  <h2 className="font-gothic text-xl md:text-2xl leading-tight" style={{ color: "var(--gold)" }}>{art.name}</h2>
                  <p className="font-serif italic text-sm mt-1 opacity-50">{art.subtitle}</p>
                  <div className="split-overlay-info mt-4">
                    <div style={{ height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)", marginBottom: "1rem" }} />
                    <p className="font-serif text-2xl mb-4" style={{ color: "var(--gold-light)" }}>{art.price}</p>
                    <button className="btn-arsenal text-xs">[ Добавить в арсенал ]</button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Clothing Teaser */}
          <section className="relative h-[55vh] overflow-hidden flex items-center">
            <img src={IMAGES.clothing} alt="Одежда" className="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.3) 100%)" }} />
            <div className="relative z-10 px-10 md:px-20 max-w-md">
              <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>Новая коллекция</p>
              <h2 className="font-gothic text-4xl md:text-5xl mb-4" style={{ color: "var(--parchment)" }}>Одежда<br />ALAJE</h2>
              <p className="font-serif italic opacity-55 mb-7 text-lg">Этника в каждом шве.<br />Сила в каждом силуэте.</p>
              <button onClick={() => navTo("clothing")} className="btn-arsenal">[ Смотреть коллекцию ]</button>
            </div>
          </section>

          {/* Reviews */}
          <section className="py-24 px-6 md:px-16" style={{ background: "#0d0d0d" }}>
            <div className="text-center mb-14">
              <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>Голоса арсенала</p>
              <h2 className="font-gothic text-3xl" style={{ color: "var(--parchment)" }}>Отзывы</h2>
              <div className="gold-divider mt-5" />
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="p-6 border" style={{ borderColor: "rgba(201,151,58,0.2)", background: "#111" }}>
                  <Stars rating={r.rating} />
                  <p className="font-serif italic mt-4 mb-5 opacity-75 leading-relaxed text-base">«{r.text}»</p>
                  <div className="gold-divider mb-3" style={{ width: "100%", margin: "0 0 0.75rem 0" }} />
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs font-semibold" style={{ color: "var(--gold)" }}>{r.author}</span>
                    <span className="font-sans text-xs opacity-35">{r.date}</span>
                  </div>
                  <p className="font-sans text-xs opacity-25 mt-1">{r.product}</p>
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
            <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>The Drop</p>
            <h1 className="font-gothic text-5xl" style={{ color: "var(--parchment)" }}>Украшения</h1>
            <div className="gold-divider mt-5" />
          </div>

          {/* Split screen */}
          <div className="flex mb-14 border" style={{ minHeight: "65vh", borderColor: "rgba(201,151,58,0.12)" }}>
            {ARTIFACTS.map((art, i) => (
              <div key={art.id} className="split-col" style={{ minHeight: "65vh" }} onClick={() => openProduct(art)}>
                <img src={art.img} alt={art.name} className="split-img" />
                <div className="split-content">
                  <p className="hero-subtitle mb-1 opacity-40" style={{ color: "var(--gold)" }}>0{i + 1}</p>
                  <h2 className="font-gothic text-lg" style={{ color: "var(--gold)" }}>{art.name}</h2>
                  <div className="split-overlay-info mt-3">
                    <p className="font-serif text-xl mb-3" style={{ color: "var(--gold-light)" }}>{art.price}</p>
                    <button className="btn-arsenal text-xs">[ В арсенал ]</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ARTIFACTS.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      )}

      {/* ══ CLOTHING ══ */}
      {section === "clothing" && (
        <div className="pt-24 px-6 md:px-12 pb-20">
          <div className="text-center mb-14">
            <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>Коллекция</p>
            <h1 className="font-gothic text-5xl" style={{ color: "var(--parchment)" }}>Одежда</h1>
            <div className="gold-divider mt-5" />
          </div>

          <div className="flex justify-end mb-6">
            <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-2 nav-link opacity-70 hover:opacity-100">
              <Icon name="Ruler" size={14} />
              Таблица размеров
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CLOTHING.map(p => <ProductCard key={p.id} p={p} />)}
          </div>

          {showSizeGuide && (
            <div className="modal-backdrop" onClick={() => setShowSizeGuide(false)}>
              <div className="max-w-lg w-full p-8 border" style={{ background: "#111", borderColor: "var(--gold-dark)" }} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-gothic text-xl" style={{ color: "var(--gold)" }}>Таблица размеров</h3>
                  <button onClick={() => setShowSizeGuide(false)} className="opacity-60 hover:opacity-100"><Icon name="X" size={20} /></button>
                </div>
                <p className="hero-subtitle mb-4" style={{ color: "var(--gold)" }}>Одежда (см)</p>
                <table className="w-full font-sans text-sm mb-8">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--gold-dark)" }}>
                      {["Размер", "Грудь", "Талия", "Бёдра"].map(h => (
                        <th key={h} className="text-left pb-2 font-normal opacity-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE_CLOTHING.map(r => (
                      <tr key={r.size} className="border-b border-white/5">
                        <td className="py-2 font-semibold" style={{ color: "var(--gold)" }}>{r.size}</td>
                        <td className="py-2 opacity-75">{r.chest}</td>
                        <td className="py-2 opacity-75">{r.waist}</td>
                        <td className="py-2 opacity-75">{r.hip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="hero-subtitle mb-4" style={{ color: "var(--gold)" }}>Украшения (см)</p>
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--gold-dark)" }}>
                      {["Размер", "Запястье", "Шея"].map(h => (
                        <th key={h} className="text-left pb-2 font-normal opacity-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_GUIDE_JEWELRY.map(r => (
                      <tr key={r.size} className="border-b border-white/5">
                        <td className="py-2 font-semibold" style={{ color: "var(--gold)" }}>{r.size}</td>
                        <td className="py-2 opacity-75">{r.wrist}</td>
                        <td className="py-2 opacity-75">{r.neck}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ ABOUT ══ */}
      {section === "about" && (
        <div className="pt-24 pb-20">
          <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
            <img src={IMAGES.pendant} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0A0A0A 80%)" }} />
            <div className="relative z-10 text-center px-6">
              <p className="hero-subtitle mb-4" style={{ color: "var(--gold)" }}>История</p>
              <h1 className="font-gothic text-6xl md:text-8xl" style={{ color: "var(--gold)" }}>ALAJE</h1>
              <p className="font-serif italic text-xl mt-3 opacity-55">Тот, кто приходит с миссией</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="gold-divider mb-14" />
            <div className="grid md:grid-cols-2 gap-14 mb-16">
              <div>
                <h2 className="font-gothic text-xl mb-5" style={{ color: "var(--gold)" }}>Манифест</h2>
                <p className="font-serif text-lg italic leading-relaxed opacity-75 mb-5">
                  ALAJE — это не бренд. Это архив. Каждое украшение — шифр, который хранит память поколений.
                </p>
                <p className="font-sans text-sm leading-relaxed opacity-50">
                  Мы работаем с мастерами из Мали, Нигерии и Марокко, сохраняя техники ручной чеканки,
                  которым сотни лет. Каждый артефакт проходит путь от руды до кожи за 6–8 недель.
                </p>
              </div>
              <div>
                <h2 className="font-gothic text-xl mb-5" style={{ color: "var(--gold)" }}>Принципы</h2>
                {["Ручная работа без исключений", "Аутентичные этнические мотивы", "Ограниченные тиражи", "Прямое партнёрство с мастерами"].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 mb-4">
                    <span className="font-gothic text-xs w-6 flex-shrink-0" style={{ color: "var(--gold)" }}>0{i + 1}</span>
                    <span className="font-sans text-sm opacity-65">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="gold-divider mb-14" />

            {/* Reviews */}
            <h2 className="font-gothic text-2xl mb-10 text-center" style={{ color: "var(--gold)" }}>Отзывы покупателей</h2>
            <div className="space-y-5 mb-10">
              {reviews.map((r, i) => (
                <div key={i} className="p-5 border border-white/5" style={{ background: "#111" }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-sans text-sm font-semibold" style={{ color: "var(--gold)" }}>{r.author}</span>
                      <span className="font-sans text-xs opacity-35 ml-3">{r.product} · {r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="font-serif italic opacity-65 leading-relaxed">«{r.text}»</p>
                </div>
              ))}
            </div>

            {/* Leave review */}
            <div className="p-7 border" style={{ borderColor: "rgba(201,151,58,0.25)", background: "#0d0d0d" }}>
              <h3 className="font-gothic text-lg mb-5" style={{ color: "var(--gold)" }}>Оставить отзыв</h3>
              <Stars rating={reviewRating} interactive onSet={setReviewRating} />
              <textarea
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Расскажите о вашем опыте..."
                className="w-full mt-4 bg-transparent border p-3 font-sans text-sm resize-none h-28 outline-none mb-5"
                style={{ borderColor: "#2a2a2a", color: "var(--parchment)" }}
              />
              <button
                onClick={() => {
                  if (!reviewText.trim()) return;
                  setReviews(prev => [{ author: "Вы", rating: reviewRating, text: reviewText, product: "ALAJE", date: "Только что" }, ...prev]);
                  setReviewText("");
                  setReviewRating(5);
                }}
                className="btn-arsenal">[ Отправить отзыв ]</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONTACTS ══ */}
      {section === "contacts" && (
        <div className="pt-24 pb-20 min-h-screen flex items-center">
          <div className="max-w-2xl mx-auto px-6 w-full">
            <div className="text-center mb-14">
              <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>Связь</p>
              <h1 className="font-gothic text-5xl" style={{ color: "var(--parchment)" }}>Контакты</h1>
              <div className="gold-divider mt-5" />
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-12">
              {[
                { icon: "Mail", label: "Email", value: "info@alaje.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
                { icon: "Instagram", label: "Instagram", value: "@alaje.ritual" },
                { icon: "MapPin", label: "Адрес", value: "Москва, по записи" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-5 border border-white/5" style={{ background: "#111" }}>
                  <Icon name={c.icon} size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <div>
                    <p className="hero-subtitle mb-0.5" style={{ color: "var(--gold)" }}>{c.label}</p>
                    <p className="font-sans text-sm opacity-75">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 border" style={{ borderColor: "rgba(201,151,58,0.25)", background: "#0d0d0d" }}>
              <h3 className="font-gothic text-xl mb-7" style={{ color: "var(--gold)" }}>Написать нам</h3>
              <div className="space-y-4">
                <input placeholder="Ваше имя"
                  className="w-full bg-transparent border p-3 font-sans text-sm outline-none"
                  style={{ borderColor: "#2a2a2a", color: "var(--parchment)" }} />
                <input placeholder="Email"
                  className="w-full bg-transparent border p-3 font-sans text-sm outline-none"
                  style={{ borderColor: "#2a2a2a", color: "var(--parchment)" }} />
                <textarea placeholder="Сообщение..."
                  className="w-full bg-transparent border p-3 font-sans text-sm resize-none h-32 outline-none"
                  style={{ borderColor: "#2a2a2a", color: "var(--parchment)" }} />
                <button className="btn-arsenal w-full">[ Отправить сообщение ]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PRODUCT MODAL ══ */}
      {selectedProduct && (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div className="max-w-3xl w-full border overflow-hidden flex flex-col md:flex-row"
            style={{ background: "#111", borderColor: "rgba(201,151,58,0.3)" }}
            onClick={e => e.stopPropagation()}>
            <div className="relative md:w-1/2 overflow-hidden" style={{ minHeight: "300px" }}>
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" style={{ minHeight: "300px" }} />
              <button
                onClick={() => toggleWish(selectedProduct.id)}
                className="absolute top-4 right-4 w-9 h-9 border flex items-center justify-center"
                style={{ borderColor: wishlist.includes(selectedProduct.id) ? "var(--gold)" : "#444",
                  background: "rgba(0,0,0,0.65)",
                  color: wishlist.includes(selectedProduct.id) ? "var(--gold)" : "var(--parchment)" }}>
                <Icon name="Heart" size={16} />
              </button>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col">
              <button onClick={() => setSelectedProduct(null)} className="self-end mb-3 opacity-40 hover:opacity-100">
                <Icon name="X" size={20} />
              </button>
              <p className="hero-subtitle mb-2" style={{ color: "var(--gold)" }}>{selectedProduct.subtitle}</p>
              <h2 className="font-gothic text-2xl mb-3" style={{ color: "var(--gold)" }}>{selectedProduct.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <Stars rating={selectedProduct.rating} />
                <span className="font-sans text-xs opacity-40">{selectedProduct.rating} · {selectedProduct.reviews} отзывов</span>
              </div>
              <p className="font-serif italic opacity-65 text-sm leading-relaxed mb-3">{selectedProduct.desc}</p>
              <p className="font-sans text-xs opacity-35 mb-5">Материал: {selectedProduct.material}</p>

              <div style={{ height: "1px", background: "linear-gradient(90deg, var(--gold-dark), transparent)", marginBottom: "1rem" }} />

              <p className="hero-subtitle mb-3" style={{ color: "var(--gold)" }}>Выбрать размер</p>
              <div className="flex flex-wrap gap-2 mb-7">
                {selectedProduct.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className={`size-btn ${selectedSize === s ? "active" : ""}`}>{s}</button>
                ))}
              </div>
              <div className="mt-auto">
                <p className="font-serif text-3xl mb-5" style={{ color: "var(--gold-light)" }}>{selectedProduct.price}</p>
                <button
                  onClick={() => addToCart(selectedProduct, selectedSize || selectedProduct.sizes[0])}
                  className="btn-arsenal w-full text-center">[ Добавить в арсенал ]</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CART ══ */}
      {cartOpen && (
        <div className="modal-backdrop" onClick={() => setCartOpen(false)}>
          <div className="max-w-md w-full border flex flex-col" style={{ background: "#111", borderColor: "rgba(201,151,58,0.3)", maxHeight: "85vh" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: "rgba(201,151,58,0.2)" }}>
              <h3 className="font-gothic text-xl" style={{ color: "var(--gold)" }}>Арсенал</h3>
              <button onClick={() => setCartOpen(false)} className="opacity-50 hover:opacity-100"><Icon name="X" size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <Icon name="ShoppingBag" size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="font-serif italic opacity-35 mt-4">Арсенал пуст</p>
                </div>
              ) : cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                  <div>
                    <p className="font-gothic text-sm" style={{ color: "var(--gold)" }}>{item.name}</p>
                    {item.size && <p className="font-sans text-xs opacity-35 mt-0.5">Размер: {item.size}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button className="opacity-50 hover:opacity-100 w-5 text-center"
                        onClick={() => setCart(prev => prev.map(c => c.id === item.id && c.size === item.size ? { ...c, qty: Math.max(1, c.qty - 1) } : c))}>−</button>
                      <span className="font-sans text-sm w-4 text-center">{item.qty}</span>
                      <button className="opacity-50 hover:opacity-100 w-5 text-center"
                        onClick={() => setCart(prev => prev.map(c => c.id === item.id && c.size === item.size ? { ...c, qty: c.qty + 1 } : c))}>+</button>
                    </div>
                    <p className="font-sans text-sm w-24 text-right" style={{ color: "var(--gold-light)" }}>{(item.price * item.qty).toLocaleString()} ₽</p>
                    <button className="opacity-30 hover:opacity-80"
                      onClick={() => setCart(prev => prev.filter(c => !(c.id === item.id && c.size === item.size)))}>
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t" style={{ borderColor: "rgba(201,151,58,0.2)" }}>
                <div className="flex justify-between mb-5">
                  <span className="font-sans text-sm opacity-55">Итого</span>
                  <span className="font-serif text-2xl" style={{ color: "var(--gold-light)" }}>{cartTotal.toLocaleString()} ₽</span>
                </div>
                <button className="btn-arsenal w-full">[ Оформить заказ ]</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t py-10 px-6 text-center" style={{ borderColor: "rgba(201,151,58,0.15)" }}>
        <p className="font-gothic text-xl mb-2" style={{ color: "var(--gold)" }}>ALAJE</p>
        <p className="hero-subtitle opacity-35">Этническая роскошь · Африканские корни · Ручная работа</p>
      </footer>
    </div>
  );
}