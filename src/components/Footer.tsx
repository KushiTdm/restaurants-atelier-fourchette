import { Instagram, Facebook, Music2, MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bark-900 text-cream-200 pt-14 pb-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="footer-col">
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
          <div className="footer-col">
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
          <div className="footer-col">
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
          <div className="footer-col">
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
        <div className="border-t border-cream-400/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-sans text-cream-400 text-xs opacity-60">
            © 2024 Atelier &amp; Fourchette — Tous droits réservés
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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

        {/* Signature agence */}
        <div className="mt-4 text-center">
          <p className="font-sans text-cream-400 text-xs opacity-60">
            Conçu &amp; développé par{' '}
            <a
              href="https://neuraweb.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:text-terracotta-300 transition-colors"
            >
              NeuraWeb
            </a>
            {' '}— agence web, automatisation &amp; intégration IA
          </p>
        </div>
      </div>
    </footer>
  );
}
