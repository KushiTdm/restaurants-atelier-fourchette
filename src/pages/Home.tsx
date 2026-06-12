import { useState, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, UtensilsCrossed, Sun } from 'lucide-react';
import { ENTREES, PLATS, DESSERTS, INSTAGRAM_PHOTOS } from '../data';
import MenuColumn from '../components/MenuColumn';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

gsap.registerPlugin(ScrollTrigger);
// Disable lag smoothing so animations keep frame-accurate timing even after
// the tab regains focus (otherwise hidden-tab pauses can produce big jumps).
gsap.ticker.lagSmoothing(0);

export default function Home() {
  const [form, setForm] = useState({ guests: '2', date: '', time: '19:30' });
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    type StVars = NonNullable<gsap.TweenVars['scrollTrigger']>;
    const reveal = (
      target: gsap.TweenTarget,
      from: gsap.TweenVars,
      scrollTrigger: StVars,
      extra: gsap.TweenVars = {}
    ) =>
      gsap.fromTo(
        target,
        { autoAlpha: 0, ...from },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          ...extra,
          scrollTrigger,
        }
      );

    const ctx = gsap.context(() => {
      // Hero — staggered entrance on load
      gsap.fromTo(
        '.hero-content > *',
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.15 }
      );
      gsap.fromTo('.hero-image', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' });

      // Hero parallax
      gsap.fromTo(
        '.hero-image img',
        { y: 0 },
        {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: '#accueil',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Concept parallax
      gsap.fromTo(
        '.concept-image img',
        { y: -40, scale: 1.08 },
        {
          y: 40,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        '.botanical-svg',
        { y: 40, rotate: -2 },
        {
          y: -40,
          rotate: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '#concept',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      gsap.fromTo(
        '.concept-content .section-label, .concept-content h2, .concept-content > p, .concept-content > div',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.concept-content', start: 'top 80%' },
        }
      );

      // Menu
      reveal('#menu .section-label', { y: 24 }, { trigger: '#menu', start: 'top 80%' }, { duration: 0.7 });
      reveal('.menu-column', { y: 40 }, { trigger: '#menu', start: 'top 70%' }, { stagger: 0.15 });

      // Values
      reveal('.value-card', { y: 30 }, { trigger: '.values-section', start: 'top 80%' }, { stagger: 0.12, duration: 0.7 });

      // Instagram
      reveal(
        '.insta-item',
        { y: 30, scale: 0.94 },
        { trigger: '#galerie', start: 'top 75%' },
        { stagger: 0.07, duration: 0.6, ease: 'power2.out' }
      );

      // Reservation
      reveal('.reservation-block > *', { y: 32 }, { trigger: '#reserver', start: 'top 85%' }, { stagger: 0.12 });

      // Contact
      reveal('.contact-head > *', { y: 30 }, { trigger: '#contact', start: 'top 80%' }, { stagger: 0.1 });
      reveal(
        '.contact-form, .contact-info',
        { y: 30 },
        { trigger: '.contact-form', start: 'top 85%' },
        { stagger: 0.12, duration: 0.7 }
      );

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      const refreshTimer = window.setTimeout(refresh, 800);
      return () => {
        window.removeEventListener('load', refresh);
        window.clearTimeout(refreshTimer);
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      {/* ─── HERO ─── */}
      <section id="accueil" className="scroll-mt-16 pt-16 min-h-screen flex">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          <div className="hero-content flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-cream-100">
            <p className="section-label mb-4">Cantine de saison</p>
            <h1 className="font-serif text-[2.25rem] sm:text-5xl lg:text-[54px] font-medium text-bark-900 leading-[1.1] tracking-tight mb-6">
              Cuisine de saison &amp;<br />
              café de spécialité<br />
              <em>au cœur du quartier</em>
            </h1>
            <p className="font-sans text-bark-700 text-[15px] leading-relaxed mb-10 max-w-sm opacity-80">
              Des assiettes généreuses, des produits frais
              et une ambiance chaleureuse du matin au soir.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a href="#reserver" className="btn-primary">Réserver une table</a>
              <Link to="/menu" className="btn-outline">Voir le menu</Link>
            </div>
          </div>

          <div className="hero-image relative min-h-[50vh] lg:min-h-0 overflow-hidden">
            <img
              src="/tables-bibliotheque.webp"
              alt="Intérieur du restaurant Atelier & Fourchette"
              className="parallax-img w-full h-[115%] object-cover"
            />
            <div className="absolute inset-0 bg-bark-900/10" />
          </div>
        </div>
      </section>

      {/* ─── CONCEPT ─── */}
      <section id="concept" className="scroll-mt-16 grid grid-cols-1 lg:grid-cols-2">
        <div className="concept-image relative min-h-[360px] sm:min-h-[420px] overflow-hidden">
          <img src="/table-murnoir.webp" alt="Chef en cuisine" className="parallax-img w-full h-full object-cover" />
        </div>

        <div className="concept-content relative bg-cream-50 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 overflow-hidden">
          <svg
            className="botanical-svg absolute right-0 bottom-0 w-64 sm:w-80 opacity-[0.09] pointer-events-none"
            viewBox="0 0 320 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M230 30 Q280 120 270 220 Q260 320 200 390 Q160 320 155 220 Q150 120 230 30Z" stroke="#2c2416" strokeWidth="1.5" fill="none" />
            <path d="M230 30 Q220 150 200 390" stroke="#2c2416" strokeWidth="1" fill="none" />
            <path d="M215 80 Q245 100 265 130" stroke="#2c2416" strokeWidth="0.7" fill="none" />
            <path d="M205 140 Q235 160 255 190" stroke="#2c2416" strokeWidth="0.7" fill="none" />
            <path d="M200 200 Q225 220 240 250" stroke="#2c2416" strokeWidth="0.7" fill="none" />
            <path d="M198 260 Q215 285 220 310" stroke="#2c2416" strokeWidth="0.6" fill="none" />
            <path d="M130 80 Q70 160 80 280 Q90 370 130 400 Q170 360 170 260 Q170 150 130 80Z" stroke="#2c2416" strokeWidth="1.5" fill="none" />
            <path d="M130 80 Q135 230 130 400" stroke="#2c2416" strokeWidth="1" fill="none" />
            <path d="M120 130 Q95 155 80 185" stroke="#2c2416" strokeWidth="0.7" fill="none" />
            <path d="M124 190 Q100 215 85 245" stroke="#2c2416" strokeWidth="0.7" fill="none" />
            <path d="M127 250 Q110 272 106 298" stroke="#2c2416" strokeWidth="0.6" fill="none" />
            <path d="M185 150 Q220 200 215 300 Q210 360 185 390 Q162 355 160 285 Q158 210 185 150Z" stroke="#2c2416" strokeWidth="1.2" fill="none" />
            <path d="M185 150 Q183 270 185 390" stroke="#2c2416" strokeWidth="0.8" fill="none" />
            <path d="M192 200 Q210 220 215 250" stroke="#2c2416" strokeWidth="0.6" fill="none" />
            <path d="M188 260 Q200 278 202 305" stroke="#2c2416" strokeWidth="0.5" fill="none" />
          </svg>

          <p className="section-label mb-4">Notre concept</p>
          <h2 className="font-serif text-[2rem] sm:text-4xl md:text-[44px] font-medium text-bark-900 leading-[1.1] tracking-tight mb-6">
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

      {/* ─── MENU PREVIEW ─── */}
      <section id="menu" className="scroll-mt-16 bg-cream-100 py-16 sm:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-center mb-3">Notre carte</p>
          <h2 className="sr-only">Notre carte</h2>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 mt-10">
            <MenuColumn title="Entrées" items={ENTREES} />
            <div className="hidden lg:block w-px bg-bark-900 opacity-10" />
            <MenuColumn title="Plats" items={PLATS} />
            <div className="hidden lg:block w-px bg-bark-900 opacity-10" />
            <MenuColumn title="Desserts" items={DESSERTS} />
          </div>
          <div className="flex justify-center mt-12">
            <Link
              to="/menu"
              className="bg-forest-500 text-white font-sans font-medium text-sm px-8 py-3 hover:bg-forest-600 transition-colors duration-200 tracking-wide"
            >
              Découvrir la carte complète
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="values-section bg-cream-200 py-12 sm:py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: Leaf, title: 'Produits locaux', text: 'Des fournisseurs sélectionnés à moins de 100 km.' },
            { Icon: UtensilsCrossed, title: 'Fait maison', text: 'Préparations réalisées chaque jour sur place.' },
            { Icon: Sun, title: 'Cuisine de saison', text: 'Une carte qui évolue au rythme des récoltes.' },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="value-card flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 border border-bark-900/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-bark-800" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans font-semibold text-bark-900 text-[13px] tracking-widest uppercase mb-1">
                  {title}
                </p>
                <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALERIE ─── */}
      <section id="galerie" className="scroll-mt-16 py-14 sm:py-16 px-6 bg-cream-50">
        <p className="section-label text-center mb-10">Suivez-nous sur Instagram</p>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {INSTAGRAM_PHOTOS.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-item aspect-square overflow-hidden group"
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
      <Testimonials />

      {/* ─── RESERVATION ─── */}
      <section id="reserver" className="scroll-mt-16 bg-terracotta-500 py-12 sm:py-14 px-6">
        <div className="reservation-block max-w-5xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-10">
          <div className="flex-shrink-0 text-white">
            <div className="flex items-center gap-3 mb-2">
              <UtensilsCrossed className="w-8 h-8 opacity-70" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight tracking-tight">
              Réservez<br />votre table
            </h2>
          </div>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:flex-wrap lg:items-end gap-4 flex-1 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1 flex-1 lg:min-w-[140px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">Nombre de personnes</label>
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

            <div className="flex flex-col gap-1 flex-1 lg:min-w-[140px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-white border-0 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1 lg:min-w-[120px]">
              <label className="font-sans text-white/80 text-xs font-medium tracking-wide">Heure</label>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="bg-white border-0 text-bark-900 font-sans text-sm px-4 py-2.5 appearance-none cursor-pointer focus:outline-none w-full"
              >
                {['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-white text-terracotta-500 font-sans font-semibold text-sm px-7 py-3 hover:bg-cream-100 transition-colors duration-200 whitespace-nowrap sm:col-span-2 lg:col-span-1"
            >
              Réserver
            </button>
          </form>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <Contact />
    </div>
  );
}
