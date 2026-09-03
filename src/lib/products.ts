import type { Product } from './types';

const colours = {
  black: { name: 'Black', hex: '#0a0a0a' },
  charcoal: { name: 'Charcoal', hex: '#3a3a3a' },
  washed: { name: 'Washed Black', hex: '#2b2b2b' },
  bone: { name: 'Bone', hex: '#e9e2d0' },
  sand: { name: 'Sand', hex: '#c9b48f' },
  oxblood: { name: 'Oxblood', hex: '#4a0f14' },
  forest: { name: 'Forest', hex: '#1e3a2a' },
  midnight: { name: 'Midnight', hex: '#141c33' },
};

export const PRODUCTS: Product[] = [
  {
    id: 1, slug: 'void-black', name: 'Void Black', category: 'oversized',
    description: 'A heavyweight oversized essential with a clean Eclipse silhouette and premium 240+ GSM cotton.',
    price: 2650, compare_at_price: null, images: ['/images/products/void-black.jpg'],
    colours: [colours.black, colours.charcoal], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: true, is_featured: true,
    stock: 18, rating: 4.8, review_count: 12, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-28T00:00:00Z'
  },
  {
    id: 2, slug: 'acid-wash', name: 'Acid Wash', category: 'oversized',
    description: 'Washed heavyweight cotton with a worn-in finish and relaxed streetwear fit.',
    price: 2950, compare_at_price: 3250, images: ['/images/products/acid-wash.jpg'],
    colours: [colours.washed, colours.charcoal], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: false, is_featured: true,
    stock: 12, rating: 4.7, review_count: 8, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 3, slug: 'ash-grey', name: 'Ash Grey', category: 'oversized',
    description: 'A muted everyday heavyweight tee designed for effortless layering.',
    price: 2750, compare_at_price: null, images: ['/images/products/ash-grey.jpg'],
    colours: [colours.charcoal, colours.bone], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: true, is_featured: true,
    stock: 20, rating: 4.9, review_count: 15, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-25T00:00:00Z'
  },
  {
    id: 4, slug: 'bone-white', name: 'Bone White', category: 'oversized',
    description: 'Soft bone-toned heavyweight cotton with a structured oversized drape.',
    price: 2750, compare_at_price: null, images: ['/images/products/bone-white.jpg'],
    colours: [colours.bone, colours.sand], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: false, is_featured: false,
    stock: 16, rating: 4.6, review_count: 6, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-30T00:00:00Z'
  },
  {
    id: 5, slug: 'eclipse-crest', name: 'Eclipse Crest', category: 'custom-print',
    description: 'Signature Eclipse crest print on a premium oversized heavyweight base.',
    price: 3250, compare_at_price: null, images: ['/images/products/eclipse-crest.jpg'],
    colours: [colours.black, colours.bone], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: true, is_featured: true,
    stock: 14, rating: 4.9, review_count: 11, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-09-02T00:00:00Z'
  },
  {
    id: 6, slug: 'forest', name: 'Forest', category: 'oversized',
    description: 'Deep forest heavyweight tee with a clean minimal finish.',
    price: 2850, compare_at_price: null, images: ['/images/products/forest.jpg'],
    colours: [colours.forest, colours.black], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: false, is_featured: false,
    stock: 10, rating: 4.7, review_count: 5, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-22T00:00:00Z'
  },
  {
    id: 7, slug: 'gilded-graphic', name: 'Gilded Graphic', category: 'custom-print',
    description: 'Statement graphic artwork finished with a restrained metallic-inspired Eclipse aesthetic.',
    price: 3450, compare_at_price: 3750, images: ['/images/products/gilded-graphic.jpg'],
    colours: [colours.black, colours.midnight], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: true, is_featured: true,
    stock: 9, rating: 4.8, review_count: 9, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-09-01T00:00:00Z'
  },
  {
    id: 8, slug: 'midnight-print', name: 'Midnight Print', category: 'custom-print',
    description: 'Dark-toned graphic print built for the night, on a substantial oversized tee.',
    price: 3350, compare_at_price: null, images: ['/images/products/midnight-print.jpg'],
    colours: [colours.midnight, colours.black], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: false, is_featured: false,
    stock: 13, rating: 4.6, review_count: 4, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-20T00:00:00Z'
  },
  {
    id: 9, slug: 'monolith-back', name: 'Monolith Back', category: 'custom-print',
    description: 'Bold back graphic paired with a minimal front for a strong streetwear silhouette.',
    price: 3550, compare_at_price: null, images: ['/images/products/monolith-back.jpg'],
    colours: [colours.black, colours.washed], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: false, is_featured: true,
    stock: 8, rating: 4.8, review_count: 7, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-31T00:00:00Z'
  },
  {
    id: 10, slug: 'oxblood', name: 'Oxblood', category: 'oversized',
    description: 'Rich oxblood heavyweight cotton for a deeper alternative to black.',
    price: 2850, compare_at_price: null, images: ['/images/products/oxblood.jpg'],
    colours: [colours.oxblood, colours.black], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: false, is_featured: false,
    stock: 11, rating: 4.7, review_count: 5, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-18T00:00:00Z'
  },
  {
    id: 11, slug: 'sand-lineart', name: 'Sand Lineart', category: 'custom-print',
    description: 'Fine line artwork on a warm sand base for an understated custom-print look.',
    price: 3350, compare_at_price: null, images: ['/images/products/sand-lineart.jpg'],
    colours: [colours.sand, colours.bone], sizes: ['S','M','L','XL','XXL'], is_new: false, is_bestseller: true, is_featured: false,
    stock: 7, rating: 4.9, review_count: 10, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-08-24T00:00:00Z'
  },
  {
    id: 12, slug: 'solar-embroidered', name: 'Solar Embroidered', category: 'custom-print',
    description: 'Minimal solar-inspired artwork with an embroidered finish and premium heavyweight base.',
    price: 4500, compare_at_price: null, images: ['/images/products/solar-embroidered.jpg'],
    colours: [colours.black, colours.bone], sizes: ['S','M','L','XL','XXL'], is_new: true, is_bestseller: true, is_featured: true,
    stock: 6, rating: 5, review_count: 3, fabric: '240+ GSM cotton', fit: 'Oversized', created_at: '2026-09-02T00:00:00Z'
  },
];
