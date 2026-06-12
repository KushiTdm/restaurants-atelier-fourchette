import { useState } from 'react';
import { Check, CalendarHeart } from 'lucide-react';
import { PRIVATISATION_OFFERS, PRIVATISATION_EVENTS } from '../data';

export default function PrivatisationPage() {
  const [privForm, setPrivForm] = useState({
    name: '',
    email: '',
    phone: '',
    event: PRIVATISATION_EVENTS[0],
    guests: '20',
    date: '',
    message: '',
  });
  const [privSent, setPrivSent] = useState(false);

  return (
    <div className="pt-16 bg-cream-50">
      {/* Page header */}
      <header className="bg-cream-100 px-6 py-16 sm:py-24 text-center">
        <p className="section-label mb-4">Privatisations &amp; événements</p>
        <h1 className="font-serif text-[2rem] sm:text-5xl font-medium text-bark-900 leading-[1.12] tracking-tight mb-6">
          Privatisez l'Atelier<br />
          <em>pour vos grands moments</em>
        </h1>
        <p className="font-sans text-bark-700 text-[15px] leading-relaxed max-w-2xl mx-auto opacity-80">
          Anniversaires, repas d'entreprise, lancements ou mariages intimes :
          nous composons avec vous un menu de saison et habillons le lieu
          à votre image. Trois formules pour vous accompagner.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20">
        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {PRIVATISATION_OFFERS.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.title}
                className={`relative flex flex-col p-7 border transition-all duration-300 ${
                  offer.featured
                    ? 'bg-cream-100 border-terracotta-200 shadow-sm md:-translate-y-2'
                    : 'bg-white border-cream-300 hover:border-terracotta-200'
                }`}
              >
                {offer.featured && (
                  <span className="absolute top-0 right-0 bg-terracotta-500 text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1">
                    Le plus demandé
                  </span>
                )}
                <div className="w-12 h-12 border border-bark-900/15 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-terracotta-500" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-medium text-bark-900 mb-1">{offer.title}</h3>
                <p className="section-label text-terracotta-500 mb-4">{offer.capacity}</p>
                <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-80 mb-5">{offer.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {offer.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-forest-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <span className="font-sans text-bark-800 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto font-serif text-bark-900 font-medium pt-4 border-t border-cream-300">
                  {offer.price}
                </p>
              </div>
            );
          })}
        </div>

        {/* Request form */}
        <div className="bg-cream-100 border border-cream-300 max-w-3xl mx-auto">
          {privSent ? (
            <div className="px-8 py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-forest-500/10 flex items-center justify-center mx-auto mb-5">
                <CalendarHeart className="w-7 h-7 text-forest-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-medium text-bark-900 mb-3">
                Merci {privForm.name.split(' ')[0]} !
              </h3>
              <p className="font-sans text-bark-700 text-sm leading-relaxed opacity-80 max-w-md mx-auto mb-7">
                Votre demande de privatisation a bien été enregistrée. Notre équipe
                événementielle vous recontacte sous 24h pour construire votre projet.
              </p>
              <button onClick={() => setPrivSent(false)} className="btn-outline">
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form
              className="px-6 sm:px-10 py-10"
              onSubmit={(e) => {
                e.preventDefault();
                setPrivSent(true);
              }}
            >
              <h3 className="font-serif text-2xl font-medium text-bark-900 mb-1">Demande de privatisation</h3>
              <p className="font-sans text-bark-700 text-sm opacity-75 mb-8">
                Décrivez votre événement, nous revenons vers vous sous 24h.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={privForm.name}
                    onChange={(e) => setPrivForm({ ...privForm, name: e.target.value })}
                    placeholder="Jeanne Dupont"
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Email</label>
                  <input
                    type="email"
                    required
                    value={privForm.email}
                    onChange={(e) => setPrivForm({ ...privForm, email: e.target.value })}
                    placeholder="jeanne@email.com"
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Téléphone</label>
                  <input
                    type="tel"
                    value={privForm.phone}
                    onChange={(e) => setPrivForm({ ...privForm, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Type d'événement</label>
                  <select
                    value={privForm.event}
                    onChange={(e) => setPrivForm({ ...privForm, event: e.target.value })}
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 appearance-none cursor-pointer focus:outline-none focus:border-terracotta-500 transition-colors"
                  >
                    {PRIVATISATION_EVENTS.map((ev) => (
                      <option key={ev} value={ev}>{ev}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Nombre d'invités</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={privForm.guests}
                    onChange={(e) => setPrivForm({ ...privForm, guests: e.target.value })}
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="section-label text-bark-700">Date souhaitée</label>
                  <input
                    type="date"
                    value={privForm.date}
                    onChange={(e) => setPrivForm({ ...privForm, date: e.target.value })}
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="section-label text-bark-700">Votre projet</label>
                  <textarea
                    rows={4}
                    value={privForm.message}
                    onChange={(e) => setPrivForm({ ...privForm, message: e.target.value })}
                    placeholder="Parlez-nous de l'ambiance, du budget, de vos envies de menu…"
                    className="bg-white border border-cream-300 text-bark-900 font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-terracotta-500 transition-colors resize-none"
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-7 w-full sm:w-auto">
                Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
