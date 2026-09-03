import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UIProvider } from './contexts/UIContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import ScrollManager from './components/ScrollManager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchOverlay from './components/SearchOverlay';
import Toaster from './components/Toaster';
import Home from './pages/Home';

const Shop = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CustomPrint = lazy(() => import('./pages/CustomPrint'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32">
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollManager />
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/custom-print" element={<CustomPrint />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order/:number" element={<OrderConfirmation />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <CartDrawer />
            <QuickViewModal />
            <SearchOverlay />
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </HashRouter>
  );
}
