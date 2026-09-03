import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found — ECLIPSE CLOTHING 4.0" />
      <div className="wrap pt-48 pb-32 text-center relative">
        <div className="glow-orb w-[400px] h-[400px] left-1/2 -translate-x-1/2 top-20 opacity-40" />
        <p className="relative font-display text-[clamp(4rem,15vw,10rem)] font-black leading-none gold-text">404</p>
        <h1 className="relative mt-2 font-display font-bold text-xl uppercase tracking-widest">Lost in the dark</h1>
        <p className="relative text-ash mt-3">This page doesn’t exist. Let’s get you back to the collection.</p>
        <Link to="/" className="btn btn-gold mt-8 relative">
          Back Home
        </Link>
      </div>
    </>
  );
}
