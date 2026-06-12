import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data';

const SECTION_IDS = ['accueil', 'concept', 'galerie', 'reserver', 'contact'];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Track the visible section — only relevant on the home route.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAnchor = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onHome) {
      scrollToId(hash);
      window.history.replaceState(null, '', hash === 'accueil' ? '/' : `/#${hash}`);
    } else {
      navigate(`/#${hash}`);
    }
  };

  const handlePage = (e: React.MouseEvent, to: string) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate(to);
  };

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
    link.type === 'page'
      ? location.pathname === link.to
      : onHome && activeSection === link.hash;

  const linkHref = (link: (typeof NAV_LINKS)[number]) =>
    link.type === 'page' ? link.to : link.hash === 'accueil' ? '/' : `/#${link.hash}`;

  const onLinkClick = (e: React.MouseEvent, link: (typeof NAV_LINKS)[number]) =>
    link.type === 'page' ? handlePage(e, link.to) : handleAnchor(e, link.hash);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream-50/95 backdrop-blur-sm shadow-sm' : 'bg-cream-50/95'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={(e) => handleAnchor(e, 'accueil')} className="flex-shrink-0">
          <div className="font-serif font-semibold text-bark-900 leading-tight text-[17px]">
            Atelier &amp;<br />
            <span>Fourchette</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={linkHref(link)}
                onClick={(e) => onLinkClick(e, link)}
                className={`font-sans text-[13px] transition-colors duration-150 pb-0.5 ${
                  isActive(link)
                    ? 'text-terracotta-500 border-b border-terracotta-500'
                    : 'text-bark-800 hover:text-terracotta-500'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#reserver"
          onClick={(e) => handleAnchor(e, 'reserver')}
          className="hidden lg:inline-flex bg-forest-500 text-white text-[13px] font-medium px-5 py-2.5 hover:bg-forest-600 transition-colors duration-200"
        >
          Réserver une table
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-bark-900 p-1"
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
                  href={linkHref(link)}
                  onClick={(e) => onLinkClick(e, link)}
                  className={`font-sans text-[15px] ${
                    isActive(link) ? 'text-terracotta-500' : 'text-bark-800'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/#reserver"
            onClick={(e) => handleAnchor(e, 'reserver')}
            className="mt-5 inline-flex bg-forest-500 text-white text-[13px] font-medium px-5 py-2.5"
          >
            Réserver une table
          </a>
        </div>
      )}
    </header>
  );
}
