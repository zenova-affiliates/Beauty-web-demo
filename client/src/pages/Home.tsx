import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Instagram, Menu, MoveUpRight, Sparkles, X } from "lucide-react";

const looks = [
  {
    index: "01",
    title: "Soft focus",
    description: "Sheer skin, brushed brows, and a whisper of rose for the lightest kind of drama.",
    tone: "look-card--portrait",
  },
  {
    index: "02",
    title: "Night bloom",
    description: "A smoked plum eye balanced with glassy skin and a barely-there nude lip.",
    tone: "look-card--plum",
  },
  {
    index: "03",
    title: "Modern classic",
    description: "Sculpted cheekbones, a precise liner, and the red that stays in the memory.",
    tone: "look-card--olive",
  },
];

const services = [
  { number: "01", title: "Editorial makeup", body: "A considered beauty story for campaigns, editorials, and portraits that need to hold attention." },
  { number: "02", title: "Bridal beauty", body: "Timeless, camera-ready makeup with a calm, personal process from first trial to final touch." },
  { number: "03", title: "Private sessions", body: "One-to-one artistry for events, evenings, or a new ritual built around your own features." },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function Home() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const reducedMotion = useRef(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const readyFrame = window.requestAnimationFrame(() => setPageReady(true));

    const updateHero = () => {
      if (reducedMotion.current) return;
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      const fadeDistance = Math.max(1, heroHeight - window.innerHeight);
      const progress = clamp(window.scrollY / fadeDistance);
      setHeroProgress(progress);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    updateHero();
    window.addEventListener("scroll", updateHero, { passive: true });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.removeEventListener("scroll", updateHero);
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const heroStyle = reducedMotion.current
    ? undefined
    : { transform: `translate3d(0, ${heroProgress * -120}px, 0)`, opacity: 1 - heroProgress * 0.94 };

  return (
    <div className={`site-shell ${pageReady ? "is-ready" : ""}`}>
      <section ref={heroRef} className="hero" id="top" aria-label="Muse Makeup Studio introduction">
        <div className="hero-stage">
          <header className="site-nav">
            <a className="brand" href="#top" aria-label="Muse Makeup Studio home">
              <span className="brand-mark"><Sparkles size={13} strokeWidth={1.4} /></span>
              <span>Muse / Makeup</span>
            </a>
            <nav className="desktop-nav" aria-label="Primary navigation">
              <a className="nav-link nav-link--active" href="#studio">Studio</a>
              <a className="nav-link" href="#looks">Looks</a>
              <a className="nav-link" href="#services">Services</a>
              <a className="nav-link" href="#contact">Contact</a>
            </nav>
            <button className={`menu-button ${menuOpen ? "is-open" : ""}`} type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
              <p className="mobile-menu-kicker">Muse / Makeup — Navigation</p>
              <nav aria-label="Mobile navigation">
                <a className="mobile-nav-link" href="#studio" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span>01</span> Studio <ArrowUpRight size={18} /></a>
                <a className="mobile-nav-link" href="#looks" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span>02</span> Looks <ArrowUpRight size={18} /></a>
                <a className="mobile-nav-link" href="#services" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span>03</span> Services <ArrowUpRight size={18} /></a>
                <a className="mobile-nav-link" href="#contact" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><span>04</span> Contact <ArrowUpRight size={18} /></a>
              </nav>
              <p className="mobile-menu-footer">Appointments / By inquiry</p>
            </div>
          </header>

          <div className="hero-orbit" aria-hidden="true"><span>EST. 2014</span><i /></div>
          <div className="hero-grid" aria-hidden="true" />
          <div className={`hero-copy ${pageReady ? "is-loaded" : ""}`} style={heroStyle}>
            <p className="eyebrow"><span>01</span> / 04&nbsp;&nbsp; — &nbsp;&nbsp;Beauty in focus</p>
            <p className="hero-kicker">Makeup artist &amp; image maker</p>
            <h1 className="hero-title"><span className="hero-title-line"><span>Quiet</span></span><span className="hero-title-line"><span><em>confidence.</em></span></span></h1>
            <p className="hero-intro">Makeup for the moments that become the image. Skin-first, detail-led, unmistakably yours.</p>
            <div className="hero-actions">
              <a className="button button--light" href="#contact">Book a session <ArrowUpRight size={14} /></a>
              <a className="text-link text-link--light" href="#looks">Explore the work <ArrowDownRight size={14} /></a>
            </div>
          </div>

          <div className="hero-image-wrap" style={{ transform: `translate3d(0, ${heroProgress * -28}px, 0) scale(${1 + heroProgress * 0.045})` }}>
            <img className="hero-image" src="/assets/hero-source-0.jpg" alt="Editorial makeup portrait with soft skin and sculpted eyes" />
          </div>
          <div className="hero-image-shade" aria-hidden="true" />
          <div className="hero-side-note"><span>01 / 04</span><span>Face / Form / Feeling</span></div>
          <div className="hero-scroll-cue"><span>Scroll to explore</span><span className="scroll-line" /></div>
        </div>
      </section>

      <main>
        <section className="intro section-pad" id="studio">
          <div className="section-index" data-reveal><span>02</span><span>Studio notes</span></div>
          <div className="intro-grid">
            <p className="section-label" data-reveal>Makeup that leaves room for you.</p>
            <div className="intro-copy" data-reveal>
              <h2 className="type-lockup" data-reveal><span className="type-line"><span>Less performance.</span></span><span className="type-line"><span><em>More presence.</em></span></span></h2>
              <p>Muse is an independent makeup studio for faces, stories, and the little details people remember. We build beauty that feels close to the skin—never layered over it.</p>
              <a className="text-link" href="#contact">Meet the studio <MoveUpRight size={14} /></a>
            </div>
          </div>
          <div className="intro-footnote" data-reveal><span>Based between</span><strong>New York · London · Everywhere</strong></div>
        </section>

        <section className="looks section-pad" id="looks">
          <div className="section-index section-index--light" data-reveal><span>03</span><span>Selected work</span></div>
          <div className="looks-heading" data-reveal>
            <p className="section-label">A study in light, texture, and restraint.</p>
            <h2 className="type-lockup" data-reveal><span className="type-line"><span>Featured</span></span><span className="type-line"><span><em>looks.</em></span></span></h2>
          </div>
          <div className="look-grid">
            {looks.map((look, index) => (
              <article className={`look-card ${look.tone}`} key={look.index} data-reveal style={{ transitionDelay: `${index * 90}ms` }}>
                <div className="look-card-visual">
                  {index === 0 && <img src="/assets/hero-source-0.jpg" alt="Soft focus editorial makeup look" />}
                  <span className="look-card-number">{look.index}</span>
                  <span className="look-card-arrow"><ArrowUpRight size={17} /></span>
                  {index !== 0 && <span className="look-card-swatch" aria-hidden="true" />}
                </div>
                <div className="look-card-copy"><h3>{look.title}</h3><p>{look.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="section-index" data-reveal><span>04</span><span>Ways to work together</span></div>
          <div className="services-layout">
            <div className="services-heading" data-reveal>
              <p className="section-label">The menu</p>
              <h2 className="type-lockup" data-reveal><span className="type-line"><span>Made to be</span></span><span className="type-line"><span><em>felt.</em></span></span></h2>
              <p>Every booking begins with a conversation, a reference, and enough time to make it right.</p>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <article className="service-card" key={service.number} data-reveal style={{ transitionDelay: `${index * 110}ms` }}>
                  <span className="service-number">{service.number}</span>
                  <div><h3>{service.title}</h3><p>{service.body}</p></div>
                  <ArrowUpRight className="service-arrow" size={18} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-noise" aria-hidden="true" />
          <div className="section-index section-index--light" data-reveal><span>05</span><span>Start a conversation</span></div>
          <div className="contact-content" data-reveal>
            <p className="section-label">Have a face in mind?</p>
            <h2 className="type-lockup" data-reveal><span className="type-line"><span>Let&apos;s make</span></span><span className="type-line"><span><em>the image.</em></span></span></h2>
            <a className="button button--outline" href="mailto:hello@musemakeup.studio">hello@musemakeup.studio <ArrowUpRight size={14} /></a>
          </div>
          <div className="contact-meta" data-reveal><span>Appointments / By inquiry</span><span>Instagram <Instagram size={14} /></span></div>
        </section>
      </main>

      <footer className="site-footer"><span>© {new Date().getFullYear()} Muse Makeup Studio</span><a href="#top">Back to top <ArrowUpRight size={13} /></a><span>Made with intention.</span></footer>
    </div>
  );
}
