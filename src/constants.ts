import { Provider, Space, BlogArticle, Route } from './types';

export const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Peluquería Belén',
    category: 'Belleza',
    location: 'Armilla, Granada',
    rating: 5,
    reviews: 120,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
    isPremium: true,
  },
  {
    id: '2',
    name: 'Classic Wedding Cars',
    category: 'Transporte',
    location: 'Centro, Granada',
    rating: 4.8,
    reviews: 85,
    imageUrl: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=800',
    isPremium: true,
  },
  {
    id: '3',
    name: 'Hotel Palace Granada',
    category: 'Hotel',
    location: 'Realejo, Granada',
    rating: 4.9,
    reviews: 210,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    isPremium: true,
  },
];

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Carmen de los Mártires',
    description: 'Vistas a Sierra Nevada y jardines románticos franceses e ingleses.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Palacio de los Córdova',
    description: 'Elegancia nazarí a los pies de la Alhambra con jardines andalusíes únicos.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Hacienda El Encinar',
    description: 'Ambiente rústico andaluz rodeado de olivares centenarios y patios clásicos.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: '1',
    title: 'Preparativos: Antes de la boda',
    category: 'ARTÍCULOS',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'El gran momento: Votos y música',
    category: 'ARTÍCULOS',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Celebración: Menús y fiesta',
    category: 'ARTÍCULOS',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
  },
];

export const ROUTES: Route[] = [
  {
    id: '1',
    title: 'Ruta Generalife',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    title: 'Paseo del Albaicín',
    imageUrl: 'https://images.unsplash.com/photo-1564659907532-6b5f98c8e70f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    title: 'Sacromonte Mágico',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    title: 'Mirador San Nicolás',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800',
  },
];
