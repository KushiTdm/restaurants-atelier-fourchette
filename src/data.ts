import {
  Users,
  Wine,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react';

export type MenuItem = { name: string; desc: string; price: string };

// ─── Navigation ───
// `type: 'anchor'` → in-page section on the home route (smooth scroll).
// `type: 'page'`   → a dedicated route.
export type NavLink =
  | { label: string; type: 'anchor'; hash: string }
  | { label: string; type: 'page'; to: string };

export const NAV_LINKS: NavLink[] = [
  { label: 'Accueil', type: 'anchor', hash: 'accueil' },
  { label: 'Le restaurant', type: 'anchor', hash: 'concept' },
  { label: 'Menu', type: 'page', to: '/menu' },
  { label: 'Galerie', type: 'anchor', hash: 'galerie' },
  { label: 'Réserver', type: 'anchor', hash: 'reserver' },
  { label: 'Privatisations', type: 'page', to: '/privatisation' },
  { label: 'Contact', type: 'anchor', hash: 'contact' },
];

// ─── Menu (home preview) ───
export const ENTREES: MenuItem[] = [
  { name: 'Oeuf parfait', desc: 'Crème de parmesan\net noisettes torréfiées', price: '9€' },
  { name: 'Velouté du marché', desc: 'Légumes de saison\net huile d\'herbes', price: '8€' },
];

export const PLATS: MenuItem[] = [
  { name: 'Poulet fermier rôti', desc: 'Purée maison\net jus réduit', price: '18€' },
  { name: 'Risotto crémeux', desc: 'Champignons,\nparmesan affiné', price: '17€' },
];

export const DESSERTS: MenuItem[] = [
  { name: 'Cookie chaud', desc: 'Glace vanille\nartisanale', price: '7€' },
  { name: 'Tarte du jour', desc: 'Selon l\'inspiration\ndu chef', price: '6€' },
];

// ─── Menu (full page) ───
export type MenuCategory = { title: string; items: MenuItem[] };

export const FULL_MENU: MenuCategory[] = [
  {
    title: 'Pour commencer',
    items: [
      { name: 'Oeuf parfait', desc: 'Crème de parmesan et noisettes torréfiées', price: '9€' },
      { name: 'Velouté du marché', desc: 'Légumes de saison et huile d\'herbes', price: '8€' },
      { name: 'Burrata des Pouilles', desc: 'Tomates anciennes, basilic, huile d\'olive', price: '11€' },
      { name: 'Tartare de betterave', desc: 'Pomme verte, raifort et aneth', price: '9€' },
    ],
  },
  {
    title: 'Nos plats',
    items: [
      { name: 'Poulet fermier rôti', desc: 'Purée maison et jus réduit', price: '18€' },
      { name: 'Risotto crémeux', desc: 'Champignons et parmesan affiné', price: '17€' },
      { name: 'Cabillaud nacré', desc: 'Fenouil braisé et beurre blanc citronné', price: '22€' },
      { name: 'Pavé de boeuf', desc: 'Frites maison et sauce au poivre', price: '24€' },
      { name: 'Gnocchi de saison', desc: 'Courge rôtie, sauge et noisettes', price: '16€' },
    ],
  },
  {
    title: 'Desserts',
    items: [
      { name: 'Cookie chaud', desc: 'Glace vanille artisanale', price: '7€' },
      { name: 'Tarte du jour', desc: 'Selon l\'inspiration du chef', price: '6€' },
      { name: 'Mousse au chocolat', desc: 'Chocolat noir 70% et fleur de sel', price: '7€' },
      { name: 'Pavlova aux fruits', desc: 'Meringue, crème vanillée et fruits frais', price: '8€' },
    ],
  },
  {
    title: 'Boissons & café',
    items: [
      { name: 'Café de spécialité', desc: 'Torréfaction artisanale, origine du mois', price: '3€' },
      { name: 'Chocolat chaud maison', desc: 'Lait entier ou boisson végétale', price: '5€' },
      { name: 'Vins nature', desc: 'Sélection au verre de nos vignerons', price: '6€' },
      { name: 'Limonade artisanale', desc: 'Citron, gingembre et menthe fraîche', price: '5€' },
    ],
  },
];

// ─── Gallery ───
export const INSTAGRAM_PHOTOS = [
  '/banquette-table.webp',
  '/enseigne.webp',
  '/grande-table.webp',
  '/plat-carotte.webp',
  '/plat-vegan.webp',
  '/table-bouquet.webp',
];

// ─── Testimonials ───
export type Testimonial = { text: string; name: string; avatar: string; stars: number };

export const TESTIMONIALS: Testimonial[] = [
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
  {
    text: 'Nous avons privatisé la salle pour un anniversaire : organisation parfaite et menu sur mesure délicieux.',
    name: 'Sophie R.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
  {
    text: 'Produits frais et de saison, on sent le travail des producteurs locaux dans chaque assiette.',
    name: 'Antoine B.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
  {
    text: 'Un café de spécialité comme on en trouve peu à Paris. L\'accueil est toujours adorable.',
    name: 'Léa P.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    stars: 5,
  },
];

// ─── Privatisation ───
export type PrivOffer = {
  icon: LucideIcon;
  title: string;
  capacity: string;
  desc: string;
  features: string[];
  price: string;
  featured?: boolean;
};

export const PRIVATISATION_OFFERS: PrivOffer[] = [
  {
    icon: Wine,
    title: 'Cocktail dînatoire',
    capacity: 'Jusqu\'à 60 personnes',
    desc: 'Espace debout, bouchées chaudes et froides, vins nature et cocktails maison.',
    features: ['Buffet de saison', 'Bar & sommelier dédié', 'Espace privatisé en soirée'],
    price: 'à partir de 45€ / pers.',
  },
  {
    icon: Users,
    title: 'Repas assis',
    capacity: 'Jusqu\'à 35 personnes',
    desc: 'Menu en 3 ou 4 services pensé avec le chef, dans la grande salle ou la mezzanine.',
    features: ['Menu sur mesure', 'Accords mets & vins', 'Salle entière ou semi-privée'],
    price: 'à partir de 58€ / pers.',
    featured: true,
  },
  {
    icon: PartyPopper,
    title: 'Événement complet',
    capacity: 'Jusqu\'à 90 personnes',
    desc: 'Privatisation totale du lieu : brunchs, lancements de marque, mariages intimes.',
    features: ['Lieu entièrement privatisé', 'Décoration & playlist', 'Coordination événementielle'],
    price: 'sur devis',
  },
];

export const PRIVATISATION_EVENTS = [
  'Anniversaire',
  'Repas d\'entreprise',
  'Lancement de produit',
  'Cocktail privé',
  'Mariage / fiançailles',
  'Autre',
];
