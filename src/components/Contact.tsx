import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

const COORDS = [
  {
    Icon: MapPin,
    label: 'Adresse',
    lines: ['12 rue des Artisans', '75011 Paris'],
  },
  {
    Icon: Phone,
    label: 'Téléphone',
    lines: ['01 42 33 44 55'],
    href: 'tel:+33142334455',
  },
  {
    Icon: Mail,
    label: 'Email',
    lines: ['bonjour@atelieretfourchette.fr'],
    href: 'mailto:bonjour@atelieretfourchette.fr',
  },
  {
    Icon: Clock,
    label: 'Horaires',
    lines: ['Lun–Ven : 8h00 – 22h00', 'Sam–Dim : 9h00 – 23h00'],
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="scroll-mt-16 bg-cream-50 py-16 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="contact-head text-center max-w-2xl mx-auto mb-14">
          <p className="section-label mb-4">Contact</p>
          <h2 className="font-serif text-[2rem] sm:text-4xl md:text-[44px] font-medium text-bark-900 leading-[1.12] tracking-tight mb-6">
            Une question ?<br />
            <em>Écrivez-nous</em>
          </h2>
          <p className="font-sans text-bark-700 text-[15px] leading-relaxed opacity-80">
            Réservation de groupe, allergènes, presse ou simple bonjour :
            notre équipe vous répond avec plaisir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Form */}
          <div className="contact-form bg-cream-100 border border-cream-300">
            {sent ? (
              <div className="px-8 py-16 text-center h-full flex flex-col justify-center">
                <div className="w-14 h-14 rounded-full bg-forest-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-forest-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-bark-900 mb-3">
                  Message envoyé !
                </h3>
                <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-80 max-w-sm mx-auto mb-7">
                  Merci {form.name.split(' ')[0] || ''}, nous revenons vers vous au plus vite,
                  généralement sous 24h.
                </p>
                <button onClick={() => setSent(false)} className="btn-outline self-center">
                  Nouveau message
                </button>
              </div>
            ) : (
              <form
                className="px-6 sm:px-8 py-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="section-label text-bark-700">Nom</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jeanne Dupont"
                      className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="section-label text-bark-700">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jeanne@email.com"
                      className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="section-label text-bark-700">Sujet</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Réservation de groupe, presse…"
                      className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="section-label text-bark-700">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Votre message…"
                      className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors resize-none"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-6 w-full sm:w-auto gap-2">
                  <Send className="w-4 h-4" strokeWidth={2} />
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

          {/* Coordinates + map */}
          <div className="contact-info flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
              {COORDS.map(({ Icon, label, lines, href }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <div className="flex-shrink-0 w-10 h-10 border border-bark-900/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-terracotta-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="section-label text-bark-700 mb-1.5">{label}</p>
                    {lines.map((line) =>
                      href ? (
                        <a
                          key={line}
                          href={href}
                          className="block font-sans text-bark-800 text-sm hover:text-terracotta-500 transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="font-sans text-bark-800 text-sm opacity-85">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1 min-h-[240px] border border-cream-300 overflow-hidden">
              <iframe
                title="Carte — Atelier & Fourchette, 12 rue des Artisans, 75011 Paris"
                src="https://www.google.com/maps?q=12+rue+des+Artisans+75011+Paris&output=embed"
                className="w-full h-full min-h-[240px] grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
