export const WHATSAPP_NUMBER = '94760471162';
export const WHATSAPP_DISPLAY = '+94 76 047 1162';
export const FREE_SHIPPING_THRESHOLD = 8000;
export const SHIPPING_FEE = 350;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/eclipseclothing4.0',
  tiktok: 'https://www.tiktok.com/@eclipseclothing4.0',
  facebook: 'https://www.facebook.com/eclipseclothing4.0',
};

export function formatLKR(amount: number): string {
  return `LKR ${Math.round(Number(amount)).toLocaleString('en-LK')}`;
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function categoryLabel(category: string): string {
  switch (category) {
    case 'oversized':
      return 'Oversized T-Shirts';
    case 'custom-print':
      return 'Custom Print T-Shirts';
    case 'new-arrivals':
      return 'New Arrivals';
    case 'best-sellers':
      return 'Best Sellers';
    default:
      return 'All Products';
  }
}

export const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'oversized', label: 'Oversized T-Shirts' },
  { key: 'custom-print', label: 'Custom Print T-Shirts' },
  { key: 'new-arrivals', label: 'New Arrivals' },
  { key: 'best-sellers', label: 'Best Sellers' },
];

export const TEE_COLOURS = [
  { name: 'Black', hex: '#0a0a0a' },
  { name: 'Charcoal', hex: '#3a3a3a' },
  { name: 'Washed Black', hex: '#2b2b2b' },
  { name: 'Bone', hex: '#e9e2d0' },
  { name: 'Sand', hex: '#c9b48f' },
  { name: 'Oxblood', hex: '#4a0f14' },
  { name: 'Forest', hex: '#1e3a2a' },
  { name: 'Midnight', hex: '#141c33' },
];

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
