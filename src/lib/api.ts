import { PRODUCTS } from './products';
import type { Order, Review } from './types';

const ORDERS_KEY = 'eclipse-local-orders-v1';
const WISHLIST_KEY = 'eclipse-wishlist-v1';
const REVIEWS_KEY = 'eclipse-local-reviews-v1';
const NEWSLETTER_KEY = 'eclipse-newsletter-v1';

function readJSON<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
}
function writeJSON<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

function productMatches(p: (typeof PRODUCTS)[number], params: URLSearchParams) {
  const category = params.get('category');
  const search = params.get('search')?.trim().toLowerCase();
  const colour = params.get('colour')?.toLowerCase();
  const size = params.get('size');
  const min = Number(params.get('min') || 0);
  const max = Number(params.get('max') || Infinity);

  if (category === 'oversized' || category === 'custom-print') if (p.category !== category) return false;
  if (category === 'new-arrivals' && !p.is_new) return false;
  if (category === 'best-sellers' && !p.is_bestseller) return false;
  if (params.get('featured') === '1' && !p.is_featured) return false;
  if (params.get('exclude') && p.id === Number(params.get('exclude'))) return false;
  if (search && !`${p.name} ${p.description} ${p.category} ${p.fabric}`.toLowerCase().includes(search)) return false;
  if (colour && !p.colours.some((c) => c.name.toLowerCase() === colour)) return false;
  if (size && !p.sizes.includes(size)) return false;
  if (p.price < min || p.price > max) return false;
  return true;
}

function getProducts(params: URLSearchParams) {
  let list = PRODUCTS.filter((p) => productMatches(p, params));
  switch (params.get('sort')) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'popular': list.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller) || b.review_count - a.review_count); break;
    case 'newest': list.sort((a, b) => b.created_at.localeCompare(a.created_at)); break;
    default: list.sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || b.created_at.localeCompare(a.created_at));
  }
  const limit = Number(params.get('limit') || 0);
  if (limit > 0) list = list.slice(0, Math.min(limit, 100));
  return list;
}

function getReviews(productId?: number): Review[] {
  const stored = readJSON<Review[]>(REVIEWS_KEY, []);
  return stored.filter((r) => productId == null || r.product_id === productId);
}

function makeOrder(body: any): Order {
  const items = Array.isArray(body.items) ? body.items : [];
  const orderItems = items.map((item: any, index: number) => {
    const product = PRODUCTS.find((p) => p.id === Number(item.product_id));
    const qty = Math.max(1, Number(item.qty) || 1);
    const unit = product?.price || 0;
    return { id: index + 1, order_id: Date.now(), product_id: Number(item.product_id), product_name: product?.name || 'Eclipse Product', image: product?.images[0] || null, size: String(item.size || 'M'), colour: String(item.colour || 'Black'), qty, unit_price: unit, line_total: unit * qty };
  });
  const subtotal = orderItems.reduce((sum: number, i: any) => sum + i.line_total, 0);
  const shipping = subtotal >= 8000 || subtotal === 0 ? 0 : 350;
  const orderNumber = `ECL-${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const order: Order = {
    id: Date.now(), order_number: orderNumber, customer_name: String(body.customer?.name || ''), email: String(body.customer?.email || ''), phone: String(body.customer?.phone || ''),
    address: String(body.customer?.address || ''), city: String(body.customer?.city || ''), postal_code: String(body.customer?.postal_code || ''), notes: String(body.customer?.notes || ''),
    payment_method: body.payment_method || 'whatsapp', status: 'pending', subtotal, shipping, total: subtotal + shipping, created_at: new Date().toISOString(), items: orderItems,
  };
  const orders = readJSON<Order[]>(ORDERS_KEY, []); orders.unshift(order); writeJSON(ORDERS_KEY, orders);
  return order;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const url = new URL(path, window.location.origin);
  const pathname = url.pathname;
  const params = url.searchParams;
  const method = (init?.method || 'GET').toUpperCase();
  const body = init?.body ? JSON.parse(String(init.body)) : {};

  await Promise.resolve();

  if (pathname === '/api/products') {
    if (params.get('slug')) {
      const p = PRODUCTS.find((x) => x.slug === params.get('slug'));
      if (!p) throw new Error('Product not found');
      return p as T;
    }
    if (params.get('ids')) {
      const ids = params.get('ids')!.split(',').map(Number);
      return PRODUCTS.filter((p) => ids.includes(p.id)) as T;
    }
    return getProducts(params) as T;
  }

  if (pathname === '/api/wishlist') {
    let ids = readJSON<number[]>(WISHLIST_KEY, []);
    if (method === 'GET') return ids.map((product_id) => ({ product_id })) as T;
    if (method === 'POST') {
      const id = Number(body.product_id); const saved = ids.includes(id);
      ids = saved ? ids.filter((x) => x !== id) : [id, ...ids]; writeJSON(WISHLIST_KEY, ids);
      return { saved: !saved } as T;
    }
    if (method === 'DELETE') { writeJSON(WISHLIST_KEY, []); return { ok: true } as T; }
  }

  if (pathname === '/api/reviews') {
    if (method === 'GET') return getReviews(params.get('product_id') ? Number(params.get('product_id')) : undefined) as T;
    if (method === 'POST') {
      const reviews = readJSON<Review[]>(REVIEWS_KEY, []);
      const review: Review = { id: Date.now(), product_id: Number(body.product_id), name: String(body.name || 'Customer'), rating: Number(body.rating || 5), title: String(body.title || ''), body: String(body.body || ''), verified: false, created_at: new Date().toISOString() };
      reviews.unshift(review); writeJSON(REVIEWS_KEY, reviews); return review as T;
    }
  }

  if (pathname === '/api/orders') {
    if (method === 'POST') return makeOrder(body) as T;
    if (method === 'GET') {
      const number = params.get('number'); const order = readJSON<Order[]>(ORDERS_KEY, []).find((o) => o.order_number === number);
      if (!order) throw new Error('Order not found'); return order as T;
    }
  }

  if (pathname === '/api/newsletter' && method === 'POST') {
    const emails = readJSON<string[]>(NEWSLETTER_KEY, []); const email = String(body.email || '').trim().toLowerCase(); const already = emails.includes(email);
    if (email && !already) { emails.push(email); writeJSON(NEWSLETTER_KEY, emails); }
    return { ok: true, already } as T;
  }

  if (pathname === '/api/contact' || pathname === '/api/custom-orders') {
    return { ok: true, id: Date.now() } as T;
  }

  throw new Error(`Unsupported local request: ${pathname}`);
}
