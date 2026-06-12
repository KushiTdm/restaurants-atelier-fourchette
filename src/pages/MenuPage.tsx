import { Link } from 'react-router-dom';
import { FULL_MENU } from '../data';
import MenuColumn from '../components/MenuColumn';

export default function MenuPage() {
  return (
    <div className="pt-16">
      {/* Page header */}
      <header className="bg-cream-100 px-6 py-16 sm:py-20 text-center">
        <p className="section-label mb-4">Atelier &amp; Fourchette</p>
        <h1 className="font-serif text-[2.25rem] sm:text-5xl font-medium text-bark-900 leading-[1.1] tracking-tight mb-5">
          Notre carte complète
        </h1>
        <p className="font-sans text-bark-700 text-[15px] leading-relaxed max-w-md mx-auto opacity-80">
          Une carte qui évolue au rythme des saisons et des producteurs.
          Voici la sélection du moment.
        </p>
      </header>

      {/* Menu categories */}
      <div className="bg-cream-50 px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-14">
          {FULL_MENU.map((category) => (
            <MenuColumn key={category.title} title={category.title} items={category.items} />
          ))}
        </div>

        <p className="text-center font-sans text-bark-700 text-xs opacity-60 mt-16 max-w-lg mx-auto">
          Prix nets, taxes et service compris. Une question sur les allergènes ?
          N'hésitez pas à demander à notre équipe.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Link to="/#reserver" className="btn-primary">Réserver une table</Link>
          <Link to="/" className="btn-outline">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}
