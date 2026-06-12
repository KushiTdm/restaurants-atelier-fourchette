import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-terracotta-500 text-terracotta-500" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  // The list is duplicated so the marquee can loop seamlessly: the CSS
  // animation translates the track by exactly one full copy, then repeats.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="testimonials-section py-14 sm:py-16 bg-cream-100 overflow-hidden">
      <p className="section-label text-center mb-10 px-6">Ils parlent de nous</p>
      <div className="testi-marquee">
        <div className="testi-track">
          {loop.map((t, i) => (
            <div key={i} className="testi-card" aria-hidden={i >= TESTIMONIALS.length}>
              <div className="h-full bg-cream-50 p-6 border border-cream-300">
                <StarRating count={t.stars} />
                <p className="font-sans text-bark-800 text-sm leading-relaxed mb-5 italic opacity-85">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <span className="font-sans text-bark-700 text-sm font-medium">— {t.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
