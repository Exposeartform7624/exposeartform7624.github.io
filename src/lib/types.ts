export interface Colour {
  name: string;
  hex: string;
}

export type Category = 'oversized' | 'custom-print';

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  compare_at_price: number | null;
  images: string[];
  colours: Colour[];
  sizes: string[];
  is_new: boolean;
  is_bestseller: boolean;
  is_featured: boolean;
  stock: number;
  rating: number;
  review_count: number;
  fabric: string;
  fit: string;
  created_at: string;
}

export interface Review {
  id: number;
  product_id: number;
  name: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  created_at: string;
  product?: { id: number; name: string; slug: string } | null;
}

export interface CartItem {
  key: string;
  product_id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  colour: string;
  qty: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  image: string | null;
  size: string;
  colour: string;
  qty: number;
  unit_price: number;
  line_total: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string;
  payment_method: 'cod' | 'bank' | 'whatsapp';
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  created_at: string;
  items: OrderItem[];
}
