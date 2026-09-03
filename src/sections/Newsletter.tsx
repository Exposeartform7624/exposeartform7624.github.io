import Reveal from '../components/Reveal';
import NewsletterForm from '../components/NewsletterForm';

export default function Newsletter() {
  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 grid-lines" />
      <div className="glow-orb w-[500px] h-[500px] left-1/2 -translate-x-1/2 -top-40 opacity-40" />
      <div className="wrap relative">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Newsletter</span>
          <h2 className="mt-5 font-display font-bold uppercase leading-[1.05] text-[clamp(1.75rem,4vw,3rem)]">
            Join the <span className="gold-text">inner circle.</span>
          </h2>
          <p className="mt-4 text-ash">Be first to every drop, custom print offer and exclusive release. No noise — only the dark.</p>
          <div className="mt-8 max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
