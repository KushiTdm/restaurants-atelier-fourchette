import { useState, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Music2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
  Leaf,
  UtensilsCrossed,
  Sun,
  Menu,
  X,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Le restaurant', href: '#concept' },
  { label: 'Menu', href: '#menu' },
  { label: 'Réserver', href: '#reserver' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Privatisations', href: '#privatisations' },
  { label: 'Contact', href: '#contact' },
];

const ENTREES = [
  { name: 'Oeuf parfait', desc: 'Crème de parmesan\net noisettes torréfiées', price: '9€' },
  { name: 'Velouté du marché', desc: 'Légumes de saison\net huile d\'herbes', price: '8€' },
];

const PLATS = [
  { name: 'Poulet fermier rôti', desc: 'Purée maison\net jus réduit', price: '18€' },
  { name: 'Risotto crémeux', desc: 'Champignons,\nparmesan affiné', price: '17€' },
];

const DESSERTS = [
  { name: 'Cookie chaud', desc: 'Glace vanille\nartisanale', price: '7€' },
  { name: 'Tarte du jour', desc: 'Selon l\'inspiration\ndu chef', price: '6€' },
];

const INSTAGRAM_PHOTOS = [
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1998920/pexels-photo-1998920.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
];

const TESTIMONIALS = [
  {
    text: 'Une des meilleures adresses du quartier. Produits excellents et ambiance parfaite.',
    name: 'Camille D.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
  {
    text: 'Le brunch du dimanche est devenu un rituel. On adore l\'ambiance et la cuisine !',
    name: 'Thomas L.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
  {
    text: 'Service au top, lieu chaleureux et cuisine créative. On revient toujours avec plaisir.',
    name: 'Julie M.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-terracotta-500 text-terracotta-500" />
      ))}
    </div>
  );
}

function MenuColumn({
  title,
  items,
}: {
  title: string;
  items: { name: string; desc: string; price: string }[];
}) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-6">
        <span className="divider-line" />
        <h3 className="font-serif text-sm font-medium tracking-[0.15em] uppercase text-bark-900 whitespace-nowrap">
          {title}
        </h3>
        <span className="divider-line" />
      </div>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between gap-4">
            <div>
              <p className="font-serif font-medium text-bark-900 text-[15px]">{item.name}</p>
              <p className="font-sans text-bark-700 text-sm mt-0.5 leading-relaxed whitespace-pre-line opacity-70">
                {item.desc}
              </p>
            </div>
            <span className="font-serif text-terracotta-500 font-medium text-[15px] flex-shrink-0">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [form, setForm] = useState({ guests: '2', date: '', time: '19:30' });

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const ids = ['accueil', 'concept', 'menu', 'galerie', 'reserver', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream-50 shadow-sm' : 'bg-cream-50/95'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex-shrink-0">
            <div className="font-serif font-semibold text-bark-900 leading-tight text-[17px]">
              Atelier &amp;<br />
              <span>Fourchette</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`font-sans text-[13px] transition-colors duration-150 pb-0.5 ${
                      isActive
                        ? 'text-terracotta-500 border-b border-terracotta-500'
                        : 'text-bark-800 hover:text-terracotta-500'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <a
            href="#reserver"
            className="hidden lg:inline-flex bg-forest-500 text-white text-[13px] font-medium px-5 py-2.5 hover:bg-forest-600 transition-colors duration-200"
          >
            Réserver une table
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-bark-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-cream-50 border-t border-cream-300 px-6 py-4">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-[15px] text-bark-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#reserver"
              className="mt-5 inline-flex bg-forest-500 text-white text-[13px] font-medium px-5 py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              Réserver une table
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="accueil" className="pt-16 min-h-screen flex">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          {/* Left content */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 bg-cream-100">
            <p className="section-label mb-4">Cantine de saison</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[54px] font-medium text-bark-900 leading-[1.1] mb-6">
              Cuisine de saison &amp;<br />
              café de spécialité<br />
              <em>au cœur du quartier</em>
            </h1>
            <p className="font-sans text-bark-700 text-[15px] leading-relaxed mb-10 max-w-sm opacity-80">
              Des assiettes généreuses, des produits frais<br />
              et une ambiance chaleureuse du matin au soir.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#reserver" className="btn-primary">
                Réserver une table
              </a>
              <a href="#menu" className="btn-outline">
                Voir le menu
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="relative min-h-[50vh] lg:min-h-0 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=900&h=800&fit=crop"
              alt="Intérieur du restaurant Atelier & Fourchette"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bark-900/10" />
          </div>
        </div>
      </section>

      {/* ─── CONCEPT ─── */}
      <section id="concept" className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left image */}
        <div className="relative min-h-[420px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800&h=700&fit=crop"
            alt="Chef en cuisine"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right content */}
        <div className="relative bg-cream-50 flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20 overflow-hidden">
          {/* Botanical decoration */}
          <svg
            className="absolute right-0 bottom-0 w-80 opacity-[0.09] pointer-events-none"
            viewBox="0 0 320 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Large background leaf */}
            <path d="M230 30 Q280 120 270 220 Q260 320 200 390 Q160 320 155 220 Q150 120 230 30Z" stroke="#2c2416" strokeWidth="1.5" fill="none"/>
            <path d="M230 30 Q220 150 200 390" stroke="#2c2416" strokeWidth="1" fill="none"/>
            <path d="M215 80 Q245 100 265 130" stroke="#2c2416" strokeWidth="0.7" fill="none"/>
            <path d="M205 140 Q235 160 255 190" stroke="#2c2416" strokeWidth="0.7" fill="none"/>
            <path d="M200 200 Q225 220 240 250" stroke="#2c2416" strokeWidth="0.7" fill="none"/>
            <path d="M198 260 Q215 285 220 310" stroke="#2c2416" strokeWidth="0.6" fill="none"/>
            {/* Medium left leaf */}
            <path d="M130 80 Q70 160 80 280 Q90 370 130 400 Q170 360 170 260 Q170 150 130 80Z" stroke="#2c2416" strokeWidth="1.5" fill="none"/>
            <path d="M130 80 Q135 230 130 400" stroke="#2c2416" strokeWidth="1" fill="none"/>
            <path d="M120 130 Q95 155 80 185" stroke="#2c2416" strokeWidth="0.7" fill="none"/>
            <path d="M124 190 Q100 215 85 245" stroke="#2c2416" strokeWidth="0.7" fill="none"/>
            <path d="M127 250 Q110 272 106 298" stroke="#2c2416" strokeWidth="0.6" fill="none"/>
            {/* Small foreground leaf */}
            <path d="M185 150 Q220 200 215 300 Q210 360 185 390 Q162 355 160 285 Q158 210 185 150Z" stroke="#2c2416" strokeWidth="1.2" fill="none"/>
            <path d="M185 150 Q183 270 185 390" stroke="#2c2416" strokeWidth="0.8" fill="none"/>
            <path d="M192 200 Q210 220 215 250" stroke="#2c2416" strokeWidth="0.6" fill="none"/>
            <path d="M188 260 Q200 278 202 305" stroke="#2c2416" strokeWidth="0.5" fill="none"/>
          </svg>

          <p className="section-label mb-4">Notre concept</p>
          <h2 className="font-serif text-4xl md:text-[44px] font-medium text-bark-900 leading-[1.1] mb-6">
            Une cantine pensée<br />
            comme une maison<br />
            de quartier
          </h2>
          <p className="font-sans text-bark-700 text-[15px] leading-relaxed mb-8 max-w-md opacity-80">
            Chez Atelier &amp; Fourchette, nous travaillons chaque semaine
            des produits sélectionnés auprès de producteurs locaux.
            Une cuisine simple, créative et toujours de saison.
          </p>
          <div>
            <p className="font-script text-2xl text-bark-800 mb-1">Paul Martin</p>
            <p className="section-label">Chef &amp; Fondateur</p>
          </div>
        </div>
      </section>

      {/* ─── MENU ─── */}
      <section id="menu" className="bg-cream-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-center mb-3">Notre carte</p>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 mt-10">
            <MenuColumn title="Entrées" items={ENTREES} />
            <div className="hidden lg:block w-px bg-bark-900 opacity-10" />
            <MenuColumn title="Plats" items={PLATS} />
            <div className="hidden lg:block w-px bg-bark-900 opacity-10" />
            <MenuColumn title="Desserts" items={DESSERTS} />
          </div>
          <div className="flex justify-center mt-12">
            <a
              href="#menu"
              className="bg-forest-500 text-white font-sans font-medium text-sm px-8 py-3 hover:bg-forest-600 transition-colors duration-200 tracking-wide"
            >
              Découvrir la carte complète
            </a>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="bg-cream-200 py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 border border-bark-900/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-bark-800" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-sans font-semibold text-bark-900 text-[13px] tracking-widest uppercase mb-1">
                Produits locaux
              </p>
              <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-75">
                Des fournisseurs sélectionnés à moins de 100 km.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 border border-bark-900/20 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-bark-800" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-sans font-semibold text-bark-900 text-[13px] tracking-widest uppercase mb-1">
                Fait maison
              </p>
              <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-75">
                Préparations réalisées chaque jour sur place.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 border border-bark-900/20 flex items-center justify-center">
              <Sun className="w-5 h-5 text-bark-800" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-sans font-semibold text-bark-900 text-[13px] tracking-widest uppercase mb-1">
                Cuisine de saison
              </p>
              <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-75">
                Une carte qui évolue au rythme des récoltes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM ─── */}
      <section id="galerie" className="py-16 px-6 bg-cream-50">
        <p className="section-label text-center mb-10">Suivez-nous sur Instagram</p>
        <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
          {INSTAGRAM_PHOTOS.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square overflow-hidden group"
            >
              <img
                src={src}
                alt={`Photo Instagram ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ))}
        </div>
        <p className="text-center mt-6 font-sans text-terracotta-500 font-medium text-sm tracking-wide">
          @atelieretfourchette
        </p>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 px-6 bg-cream-100">
        <p className="section-label text-center mb-10">Ils parlent de nous</p>
        <div className="max-w-4xl mx-auto relative">
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 w-9 h-9 border border-bark-900/20 flex items-center justify-center hover:bg-cream-200 transition-colors z-10 bg-cream-50"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-4 h-4 text-bark-900" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`bg-cream-50 p-6 border transition-all duration-300 ${
                  i === testimonialIdx
                    ? 'border-terracotta-200 shadow-sm'
                    : 'border-cream-300'
                }`}
              >
                <StarRating count={t.stars} />
                <p className="font-sans text-bark-800 text-sm leading-relaxed mb-5 italic opacity-85">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="font-sans text-bark-700 text-sm font-medium">— {t.name}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 w-9 h-9 border border-bark-900/20 flex items-center justify-center hover:bg-cream-200 transition-colors z-10 bg-cream-50"
            aria-label="Suivant"
          >
            <ChevronRight className="w-4 h-4 text-bark-900" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === testimonialIdx ? 'bg-terracotta-500' : 'bg-bark-900/20'
                }`}
                aria-label={`Avis ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESERVATION ─── */}
      <section id="reserver" className="bg-terracotta-500 py-14 px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-shrink-0 text-white">
            <div className="flex items-center gap-3 mb-2">
              <UtensilsCrossed className="w-8 h-8 opacity-70" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight">
              Réservez<br />votre table
            </h2>
          </div>

          <form
            className="flex flex-col sm:flex-row flex-wrap items-end gap-4 flex-1 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">
                Nombre de personnes
              </label>
              <select
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="bg-white border-0 text-bark-900 font-sans text-sm px-4 py-2.5 appearance-none cursor-pointer focus:outline-none w-full"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} personne{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-white border-0 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">
                Heure
              </label>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="bg-white border-0 text-bark-900 font-sans text-sm px-4 py-2.5 appearance-none cursor-pointer focus:outline-none w-full"
              >
                {['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(
                  (t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              type="submit"
              className="bg-white text-terracotta-500 font-sans font-semibold text-sm px-7 py-2.5 hover:bg-cream-100 transition-colors duration-200 whitespace-nowrap"
            >
              Réserver
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" className="bg-bark-900 text-cream-200 pt-14 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="font-serif font-semibold text-cream-100 text-lg leading-tight mb-1">
                Atelier &amp;<br />Fourchette
              </div>
              <p className="section-label text-cream-400 text-[10px] mb-4">Cantine de Saison</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-cream-400/30 flex items-center justify-center hover:border-cream-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-cream-400/30 flex items-center justify-center hover:border-cream-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-cream-400/30 flex items-center justify-center hover:border-cream-200 transition-colors"
                  aria-label="TikTok"
                >
                  <Music2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-sans font-semibold text-cream-100 text-[11px] tracking-widest uppercase mb-4">
                Adresse
              </h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-60" />
                  <p className="font-sans text-cream-300 text-sm opacity-80">
                    12 rue des Artisans<br />75011 Paris
                  </p>
                </div>
                <a
                  href="#"
                  className="font-sans text-terracotta-400 text-sm hover:text-terracotta-300 transition-colors"
                >
                  Voir sur la carte
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-sans font-semibold text-cream-100 text-[11px] tracking-widest uppercase mb-4">
                Horaires
              </h4>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-60" />
                  <div>
                    <p className="font-sans text-cream-300 text-sm opacity-80">
                      Lun–Ven : 8h00 – 22h00
                    </p>
                    <p className="font-sans text-cream-300 text-sm opacity-80">
                      Sam–Dim : 9h00 – 23h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-sans font-semibold text-cream-100 text-[11px] tracking-widest uppercase mb-4">
                Contact
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  <a
                    href="tel:+33142334455"
                    className="font-sans text-cream-300 text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    01 42 33 44 55
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  <a
                    href="mailto:bonjour@atelieretfourchette.fr"
                    className="font-sans text-cream-300 text-sm opacity-80 hover:opacity-100 transition-opacity break-all"
                  >
                    bonjour@atelieretfourchette.fr
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-cream-400/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-cream-400 text-xs opacity-60">
              © 2024 Atelier &amp; Fourchette — Tous droits réservés
            </p>
            <div className="flex gap-6">
              {['Mentions légales', 'Politique de confidentialité', 'Plan du site'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-cream-400 text-xs opacity-60 hover:opacity-100 transition-opacity"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
