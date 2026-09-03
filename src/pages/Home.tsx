import Seo from '../components/Seo';
import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import ShopEclipse from '../sections/ShopEclipse';
import YourPrint from '../sections/YourPrint';
import MakeItYours from '../sections/MakeItYours';
import About from '../sections/About';
import WhyEclipse from '../sections/WhyEclipse';
import LatestDrop from '../sections/LatestDrop';
import Testimonials from '../sections/Testimonials';
import PromoBanner from '../sections/PromoBanner';
import Social from '../sections/Social';
import Contact from '../sections/Contact';
import Newsletter from '../sections/Newsletter';

export default function Home() {
  return (
    <>
      <Seo
        title="ECLIPSE CLOTHING 4.0 — Premium Oversized Streetwear & Custom Print T-Shirts | Sri Lanka"
        description="Wear the dark. Define your style. Premium oversized streetwear and custom print T-shirts from Sri Lanka. From LKR 2,650, prices include tax. Order online or via WhatsApp."
      />
      <Hero />
      <Marquee />
      <ShopEclipse />
      <YourPrint />
      <MakeItYours />
      <About />
      <WhyEclipse />
      <LatestDrop />
      <Testimonials />
      <PromoBanner />
      <Social />
      <Contact />
      <Newsletter />
    </>
  );
}
