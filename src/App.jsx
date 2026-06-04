/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────
   SHARED HELPERS
───────────────────────────────────────── */
const GOLD_GRADIENT = 'linear-gradient(135deg,#8B6914 0%,#C9A84C 40%,#F0D080 65%,#C9A84C 100%)';

function goldText(extra = {}) {
  return {
    background: GOLD_GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    ...extra,
  };
}

function CrownSVG({ size = 40, style = {} }) {
  return (
    <img
      src="/logo.png"
      alt="Black Vale"
      style={{ width: size, height: size, objectFit: 'contain', ...style }}
    />
  );
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const goto = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Packages', id: 'packages' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        height: 68,
        background: scrolled ? 'rgba(0,0,0,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.25)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px,5vw,60px)',
        justifyContent: 'space-between',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10 }}>
          <CrownSVG size={30} />
          <span style={{ fontFamily: 'Cinzel,serif', fontWeight: 700,
            fontSize: '1rem', letterSpacing: '0.22em', ...goldText() }}>
            BLACK VALE
          </span>
        </button>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 36 }} className="bv-desk-nav">
          {links.map(l => (
            <NavLink key={l.id} onClick={() => goto(l.id)}>{l.label}</NavLink>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)} className="bv-ham"
          style={{ display: 'none', background: 'none', border: 'none',
            cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              width: 24, height: 2, background: 'var(--gold)', display: 'block',
              transition: 'all .3s',
              transform: open
                ? i === 0 ? 'rotate(45deg) translateY(7px)'
                : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.98)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 44 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => goto(l.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Cinzel,serif', fontSize: '1.6rem',
                letterSpacing: '0.2em', ...goldText() }}>
              {l.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .bv-desk-nav{display:none!important}
          .bv-ham{display:flex!important}
        }
      `}</style>
    </>
  );
}

function NavLink({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'Montserrat,sans-serif', fontWeight: 300,
        fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase',
        color: h ? 'var(--gold)' : 'var(--text)', transition: 'color .3s',
      }}>
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const overlayRef = useRef(null);
  const flashRef = useRef(null);
  const crownRef = useRef(null);
  const blackRef = useRef(null);
  const valeRef = useRef(null);
  const autoRef = useRef(null);
  const dividerRef = useRef(null);
  const tagRef = useRef(null);
  const btnsRef = useRef(null);
  const photoRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!window.gsap) return;
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline({ defaults: { ease: 'power4.out' } });

      window.gsap.set([crownRef.current, blackRef.current, valeRef.current,
        autoRef.current, dividerRef.current, tagRef.current,
        btnsRef.current, photoRef.current, scrollRef.current], { opacity: 0 });
      window.gsap.set(overlayRef.current, { opacity: 1 });

      // Flash impact
      tl.fromTo(flashRef.current, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: 'none' }, 0)
        .to(flashRef.current, { opacity: 0, duration: 0.3 }, 0.08);

      // Photo slides in from right
      tl.fromTo(photoRef.current,
        { opacity: 0, x: 60, filter: 'blur(12px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' }, 0.1);

      // Crown drops
      tl.fromTo(crownRef.current,
        { opacity: 0, y: -50, scale: 1.4 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.5)' }, 0.4);

      // BLACK slams
      tl.fromTo(blackRef.current,
        { opacity: 0, x: -40, filter: 'blur(14px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power4.out' }, 0.65);

      // VALE slams
      tl.fromTo(valeRef.current,
        { opacity: 0, x: -60, filter: 'blur(14px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power4.out' }, 0.82);

      // automation
      tl.fromTo(autoRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45 }, 1.0);

      // Divider
      tl.fromTo(dividerRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.4, transformOrigin: 'left center' }, 1.2);

      // Tagline
      tl.fromTo(tagRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 1.38);

      // Reveal video bg
      tl.to(overlayRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 1.55);

      // Buttons
      tl.fromTo(btnsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 2.0);

      // Scroll indicator
      tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.5);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%', height: '100vh', overflow: 'hidden',
      background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Dark overlay on video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(0,0,0,0.68)' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, transparent 20%, rgba(0,0,0,0.80) 100%)' }} />
      {/* Intro black */}
      <div ref={overlayRef} style={{ position: 'absolute', inset: 0, background: '#000', zIndex: 9, pointerEvents: 'none' }} />
      <div ref={flashRef} style={{ position: 'absolute', inset: 0, background: 'rgba(255,245,180,0.08)', zIndex: 10, pointerEvents: 'none', opacity: 0 }} />

      {/* ── Layout: left text + right photo ── */}
      <div style={{
        position: 'relative', zIndex: 5,
        width: '100%', height: '100%',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(24px,6vw,80px)',
        maxWidth: 1100, margin: '0 auto',
      }}>

        {/* LEFT — text block */}
        <div style={{ flex: '0 0 auto', maxWidth: 'clamp(240px,52vw,520px)', zIndex: 6 }}>

          {/* Crown */}
          <div ref={crownRef} style={{ opacity: 0, marginBottom: 'clamp(8px,2vw,18px)' }}>
            <img src="/logo.png" alt="BV Crown"
              style={{ width: 'clamp(44px,8vw,72px)', height: 'auto', objectFit: 'contain',
                filter: 'drop-shadow(0 4px 18px rgba(201,168,76,0.6))' }} />
          </div>

          {/* BLACK */}
          <div ref={blackRef} style={{ opacity: 0 }}>
            <span style={{
              display: 'block',
              fontFamily: 'Cinzel, serif', fontWeight: 900,
              fontSize: 'clamp(3.2rem,12vw,8rem)', lineHeight: 0.88,
              letterSpacing: '0.04em',
              background: 'linear-gradient(160deg,#5a3e0a 0%,#c9a84c 35%,#f5e07a 52%,#c9a84c 68%,#7a5010 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 24px rgba(201,168,76,0.35))',
              textShadow: 'none',
            }}>BLACK</span>
          </div>

          {/* VALE */}
          <div ref={valeRef} style={{ opacity: 0, marginBottom: 'clamp(6px,1.5vw,14px)' }}>
            <span style={{
              display: 'block',
              fontFamily: 'Cinzel, serif', fontWeight: 900,
              fontSize: 'clamp(3.2rem,12vw,8rem)', lineHeight: 0.88,
              letterSpacing: '0.04em',
              background: 'linear-gradient(160deg,#5a3e0a 0%,#c9a84c 35%,#f5e07a 52%,#c9a84c 68%,#7a5010 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 24px rgba(201,168,76,0.35))',
            }}>VALE</span>
          </div>

          {/* automation */}
          <div ref={autoRef} style={{ opacity: 0, marginBottom: 'clamp(10px,2vw,18px)' }}>
            <span style={{
              display: 'block',
              fontFamily: 'Cormorant, serif', fontWeight: 700, fontStyle: 'italic',
              fontSize: 'clamp(1.6rem,5.5vw,3.8rem)', lineHeight: 1,
              letterSpacing: '0.02em',
              background: 'linear-gradient(90deg,#8b0000,#cc2020,#8b0000)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 16px rgba(139,0,0,0.6))',
            }}>automation</span>
          </div>

          {/* Divider */}
          <div ref={dividerRef} style={{ opacity: 0, marginBottom: 'clamp(10px,2vw,16px)',
            display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ height: 1, width: 'clamp(30px,8vw,70px)',
              background: 'linear-gradient(90deg,rgba(201,168,76,0.8),transparent)' }} />
            <span style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.55rem' }}>◆</span>
          </div>

          {/* Tagline */}
          <p ref={tagRef} style={{
            opacity: 0,
            fontFamily: 'Cormorant, serif', fontStyle: 'italic',
            fontSize: 'clamp(0.85rem,2.2vw,1.05rem)',
            color: 'rgba(232,220,200,0.75)', letterSpacing: '0.06em',
            marginBottom: 'clamp(24px,4vw,40px)',
            textShadow: '0 1px 16px rgba(0,0,0,0.9)',
          }}>AI Systems. Automation. Precision.</p>

          {/* Buttons */}
          <div ref={btnsRef} style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <a href="#packages" style={{
              padding: 'clamp(11px,1.8vw,14px) clamp(24px,4vw,40px)',
              background: 'linear-gradient(135deg,#8B6914,#C9A84C,#F0D080,#C9A84C,#8B6914)',
              color: '#0a0a0a', fontFamily: 'Montserrat,sans-serif', fontWeight: 700,
              fontSize: 'clamp(0.58rem,1.4vw,0.72rem)', letterSpacing: '0.24em',
              textDecoration: 'none', textTransform: 'uppercase',
              boxShadow: '0 4px 28px rgba(201,168,76,0.4)',
              border: '1px solid rgba(201,168,76,0.4)',
              whiteSpace: 'nowrap',
            }}>SEE THE SYSTEM</a>
            <a href="#contact" style={{
              padding: 'clamp(11px,1.8vw,14px) clamp(24px,4vw,40px)',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              color: 'var(--gold)', fontFamily: 'Montserrat,sans-serif', fontWeight: 600,
              fontSize: 'clamp(0.58rem,1.4vw,0.72rem)', letterSpacing: '0.24em',
              textDecoration: 'none', textTransform: 'uppercase',
              border: '1px solid rgba(201,168,76,0.4)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}>CONTACT VALE</a>
          </div>
        </div>

        {/* RIGHT — Vale's photo */}
        <div ref={photoRef} style={{
          opacity: 0,
          flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',
          height: '100%', position: 'relative',
        }}>
          <img
            src="/hero-bg.jpg"
            alt="Sinethemba Mtshali — Founder, Black Vale Automation"
            style={{
              height: 'clamp(70vh,85vh,92vh)',
              width: 'auto',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.95) 55%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.95) 55%, transparent 100%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.85) 12%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
              filter: 'contrast(1.08) brightness(0.9)',
            }}
          />
        </div>
      </div>

      {/* Mobile layout override */}
      <style>{`
        @media(max-width: 640px) {
          #hero-photo-wrap { display: none !important; }
          #hero-text-wrap { max-width: 100% !important; }
        }
      `}</style>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 6, opacity: 0,
      }}>
        <div style={{ width: 22, height: 36, border: '1px solid rgba(201,168,76,0.35)',
          borderRadius: 11, margin: '0 auto 8px', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 2, height: 7, background: 'rgba(201,168,76,0.6)', borderRadius: 2 }} />
        </div>
        <span style={{ fontFamily: 'Montserrat', fontSize: '0.5rem',
          color: 'rgba(201,168,76,0.38)', letterSpacing: '0.28em' }}>SCROLL</span>
      </div>
    </section>
  );
}


function About() {
  const secRef = useRef(null);
  const imgRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !secRef.current) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.fromTo(imgRef.current, { y: 30 }, { y: -30, ease: 'none',
          scrollTrigger: { trigger: secRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
            scrollTrigger: { trigger: rightRef.current, start: 'top 75%' } });
      }
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={secRef}
      style={{ background: 'rgba(0,0,0,0.45)', padding: 'clamp(60px,10vw,120px) clamp(20px,6vw,60px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'clamp(40px,6vw,80px)',
        alignItems: 'center' }}>

        {/* Image */}
        <div style={{ position: 'relative' }}>
          <span style={{ position:'absolute',top:-8,left:-8,width:28,height:28,
            borderTop:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)',zIndex:2 }} />
          <span style={{ position:'absolute',top:-8,right:-8,width:28,height:28,
            borderTop:'2px solid var(--gold)',borderRight:'2px solid var(--gold)',zIndex:2 }} />
          <span style={{ position:'absolute',bottom:-8,left:-8,width:28,height:28,
            borderBottom:'2px solid var(--gold)',borderLeft:'2px solid var(--gold)',zIndex:2 }} />
          <span style={{ position:'absolute',bottom:-8,right:-8,width:28,height:28,
            borderBottom:'2px solid var(--gold)',borderRight:'2px solid var(--gold)',zIndex:2 }} />
          <img ref={imgRef} src="/founder.png" alt="Sinethemba Mtshali — Vale"
            style={{ width:'100%', height:480, objectFit:'cover',
              objectPosition:'top center', display:'block' }} />
        </div>

        {/* Text */}
        <div ref={rightRef} style={{ display:'flex', flexDirection:'column', gap:20 }}>
          <p style={{ fontFamily:'Montserrat,sans-serif', fontWeight:300, fontSize:'0.68rem',
            color:'var(--crimson)', letterSpacing:'0.36em', textTransform:'uppercase', opacity:0 }}>
            FOUNDER &amp; CEO
          </p>
          <h2 style={{ fontFamily:'Cinzel,serif', fontWeight:700,
            fontSize:'clamp(2rem,4vw,3rem)', lineHeight:1.1, opacity:0, ...goldText() }}>
            Meet Vale
          </h2>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400,
            fontSize:'1.12rem', color:'var(--text)', lineHeight:1.85, opacity:0 }}>
            Sinethemba Mtshali — known as Vale — built Black Vale Automation on one belief:
            that elite businesses deserve elite systems. We engineer AI-powered workflows that
            eliminate inefficiency, capture every lead, and scale your operation without
            scaling your workload.
          </p>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
            fontWeight:300, fontSize:'0.98rem', color:'rgba(201,168,76,0.7)', opacity:0 }}>
            — Sinethemba Mtshali, Founder &amp; CEO
          </p>
          <div style={{ display:'flex', gap:16, opacity:0 }}>
            <SocIcon href="https://wa.me/27747534679" label="WhatsApp" icon={<WaIcon />} />
            <SocIcon href="https://instagram.com/themba_sm" label="Instagram" icon={<IgIcon />} />
            <SocIcon href="https://tiktok.com/@themba_sm" label="TikTok" icon={<TkIcon />} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocIcon({ href, label, icon }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width:44,height:44,border:`1px solid ${h?'var(--gold)':'rgba(201,168,76,0.3)'}`,
        display:'flex',alignItems:'center',justifyContent:'center',
        color:h?'var(--gold)':'rgba(201,168,76,0.55)',transition:'all .3s',
        background:h?'rgba(201,168,76,0.05)':'transparent',textDecoration:'none' }}>
      {icon}
    </a>
  );
}

function WaIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function TkIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   LIVE DEMOS
───────────────────────────────────────── */
function LiveDemos() {
  const [tab, setTab] = useState('STARTER');
  const hdRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !hdRef.current) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(hdRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: hdRef.current, start: 'top 80%' } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="demos" style={{ background: 'rgba(0,0,0,0.5)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,50px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={hdRef} style={{ textAlign:'center', marginBottom:56, opacity:0 }}>
          <p style={{ fontFamily:'Montserrat', fontWeight:200, fontSize:'0.74rem',
            letterSpacing:'0.42em', color:'var(--crimson)',
            textTransform:'uppercase', marginBottom:14 }}>INTERACTIVE PREVIEW</p>
          <h2 style={{ fontFamily:'Cinzel,serif', fontWeight:700,
            fontSize:'clamp(1.8rem,4.5vw,3.2rem)', marginBottom:14, ...goldText() }}>
            EXPERIENCE THE SYSTEM
          </h2>
          <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
            fontSize:'1.15rem', color:'rgba(201,168,76,0.6)' }}>
            Every feature. Live. Interactive. Right here.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', justifyContent:'center',
          borderBottom:'1px solid rgba(201,168,76,0.18)', marginBottom:50 }}>
          {['STARTER','GROWTH','ELITE'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background:'none', border:'none', cursor:'pointer',
              fontFamily:'Montserrat', fontWeight:400, fontSize:'0.78rem',
              letterSpacing:'0.2em',
              color: tab===t ? 'var(--gold)' : 'rgba(201,168,76,0.38)',
              padding:'14px clamp(16px,4vw,34px)',
              borderBottom:`2px solid ${tab===t?'var(--gold)':'transparent'}`,
              marginBottom:-1, transition:'all .3s',
            }}>{t}</button>
          ))}
        </div>

        <div key={tab} style={{ animation:'tabFade .4s ease' }}>
          {tab === 'STARTER' && <StarterTab />}
          {tab === 'GROWTH'  && <GrowthTab />}
          {tab === 'ELITE'   && <EliteTab />}
        </div>
      </div>
    </section>
  );
}

/* ── STARTER ── */
function StarterTab() {
  const [msgs, setMsgs] = useState([{
    from:'bot',
    text:"Hi! I'm Vale AI. I can answer your questions about Black Vale Automation. What would you like to know?"
  }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  const chips = [
    'What does Black Vale do?',
    'How does the chatbot work?',
    "What's included in the Starter package?",
    'How do I get started?',
    'How quickly can I get set up?',
  ];

  const getReply = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes('what does black vale') || m.includes('black vale do'))
      return "Black Vale Automation builds AI-powered systems that capture leads, qualify prospects, and follow up automatically — so you can focus on closing, not chasing.";
    if (m.includes('chatbot work'))
      return "Your AI chatbot is trained on your business, services, and FAQs. It handles inquiries 24/7 via your website and WhatsApp — booking calls and capturing leads while you sleep.";
    if (m.includes('starter'))
      return "The Starter package includes your AI chatbot setup and training, WhatsApp Business integration, a basic lead automation workflow, and a lead capture system. Perfect to launch fast.";
    if (m.includes('get started'))
      return "Simple — tap the Contact Vale button or message us on WhatsApp at +27747534679. Vale will personally walk you through the best package for your business.";
    if (m.includes('quickly') || m.includes('how fast'))
      return "Most Starter setups go live within 5–7 business days. We move fast because your time is valuable.";
    return "Great question. For a detailed answer tailored to your business, reach Vale directly on WhatsApp: +27747534679";
  };

  const send = (text) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { from:'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(p => [...p, { from:'bot', text: getReply(text) }]);
    }, 1200);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs, typing]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:60 }}>
      {/* Chatbot */}
      <div>
        <DemoLabel>AI CHATBOT DEMO</DemoLabel>
        <div style={{ maxWidth:460, margin:'0 auto',
          border:'1px solid rgba(201,168,76,0.38)', borderRadius:12, overflow:'hidden', background:'#0d0d0d' }}>
          {/* Header */}
          <div style={{ padding:'12px 18px', background:'#111',
            borderBottom:'1px solid rgba(201,168,76,0.18)',
            display:'flex', alignItems:'center', gap:12 }}>
            <img src="/logo.png" alt="BV" style={{ width:32,height:32,borderRadius:'50%' }} />
            <div>
              <p style={{ fontFamily:'Cinzel,serif', fontSize:'0.84rem', color:'var(--gold)', fontWeight:700 }}>Vale AI</p>
              <p style={{ fontFamily:'Montserrat', fontSize:'0.62rem', color:'#22c55e',
                display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',
                  display:'inline-block', animation:'greenPulse 2s ease infinite' }} /> Online
              </p>
            </div>
          </div>
          {/* Messages */}
          <div style={{ padding:14, maxHeight:280, overflowY:'auto',
            display:'flex', flexDirection:'column', gap:10 }}>
            {msgs.map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent:m.from==='user'?'flex-end':'flex-start' }}>
                <div style={{
                  padding:'9px 13px', maxWidth:'82%', lineHeight:1.55,
                  fontFamily:'Cormorant Garamond,serif', fontSize:'0.94rem',
                  borderRadius: m.from==='user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.from==='user' ? 'var(--gold-dark)' : '#1a1a1a',
                  border: m.from==='bot' ? '1px solid rgba(201,168,76,0.12)' : 'none',
                  color: m.from==='user' ? '#fff' : 'var(--text)',
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display:'flex', gap:4, padding:'9px 13px', background:'#1a1a1a',
                border:'1px solid rgba(201,168,76,0.12)', borderRadius:'12px 12px 12px 2px',
                width:'fit-content' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width:6,height:6,borderRadius:'50%',background:'var(--gold)',
                    display:'block', animation:`typingDot 1s ease ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          {/* Chips */}
          <div style={{ padding:'0 10px 8px', display:'flex', flexWrap:'wrap', gap:6 }}>
            {chips.map(c => (
              <ChipBtn key={c} onClick={() => send(c)}>{c}</ChipBtn>
            ))}
          </div>
          {/* Input */}
          <div style={{ padding:12, borderTop:'1px solid rgba(201,168,76,0.12)', display:'flex', gap:8 }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send(input)}
              placeholder="Ask anything..."
              style={{ flex:1, background:'#1a1a1a',
                border:'1px solid rgba(201,168,76,0.18)', borderRadius:6,
                padding:'9px 13px', color:'var(--text)',
                fontFamily:'Cormorant Garamond,serif', fontSize:'0.95rem', outline:'none' }} />
            <button onClick={() => send(input)} style={{
              background:'var(--gold)', border:'none', borderRadius:6,
              padding:'9px 16px', color:'#000',
              fontFamily:'Montserrat', fontSize:'0.72rem', fontWeight:500,
              letterSpacing:'0.1em', cursor:'pointer',
            }}>SEND</button>
          </div>
        </div>
      </div>

      {/* WhatsApp mockup */}
      <div>
        <DemoLabel>WHATSAPP INTEGRATION MOCKUP</DemoLabel>
        <div style={{ maxWidth:390, margin:'0 auto',
          borderRadius:12, overflow:'hidden', border:'1px solid rgba(37,211,102,0.28)' }}>
          <div style={{ background:'#075E54', padding:'12px 16px',
            display:'flex', alignItems:'center', gap:12 }}>
            <WaIcon />
            <span style={{ fontFamily:'Montserrat', fontWeight:500,
              fontSize:'0.88rem', color:'#fff' }}>Black Vale Automation</span>
          </div>
          <div style={{ background:'#0d1117', padding:14,
            display:'flex', flexDirection:'column', gap:9 }}>
            {[
              { from:'bot', text:"Hi! Thanks for your interest in Black Vale Automation. What's your name?" },
              { from:'lead', text:"It's Thabo" },
              { from:'bot', text:"Great, Thabo! What service are you looking for?\n1. AI Chatbot  2. Full Automation  3. Elite Package" },
              { from:'lead', text:"2" },
              { from:'bot', text:"Perfect. Vale will contact you within the hour. Your details have been saved." },
            ].map((m,i) => (
              <div key={i} style={{ display:'flex', justifyContent:m.from==='lead'?'flex-end':'flex-start' }}>
                <div style={{ padding:'7px 11px', borderRadius:7, maxWidth:'82%',
                  background:m.from==='lead'?'#005C4B':'#1f2937',
                  fontFamily:'Cormorant Garamond,serif', fontSize:'0.9rem',
                  color:'#e5e7eb', lineHeight:1.5, whiteSpace:'pre-line' }}>{m.text}</div>
              </div>
            ))}
          </div>
        </div>
        <DemoCaption>Lead Capture System — every inquiry captured, zero manual effort.</DemoCaption>
      </div>
    </div>
  );
}

function ChipBtn({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background:'none',
        border:`1px solid ${h?'var(--gold)':'rgba(201,168,76,0.28)'}`,
        borderRadius:16, padding:'5px 11px',
        color:h?'var(--gold)':'rgba(201,168,76,0.65)',
        cursor:'pointer', fontFamily:'Montserrat', fontSize:'0.63rem',
        transition:'all .2s' }}>
      {children}
    </button>
  );
}

/* ── GROWTH ── */
function GrowthTab() {
  const initCols = {
    'NEW LEAD':  [{ id:1, name:'Amahle D.',  detail:'3-bed apartment, Cape Town' }],
    'CONTACTED': [{ id:2, name:'Sipho M.',   detail:'Commercial property, JHB' },
                  { id:4, name:'James K.',   detail:'Holiday home, Garden Route' }],
    'QUALIFIED': [{ id:3, name:'Priya N.',   detail:'Investment property' }],
    'CLOSED':    [{ id:5, name:'Fatima A.',  detail:'Residential estate' }],
  };
  const [cols, setCols] = useState(initCols);
  const [drag, setDrag] = useState(null);
  const lineRef = useRef(null);
  const barRef  = useRef(null);
  const lineInst = useRef(null);
  const barInst  = useRef(null);

  const onDrop = (toCol) => {
    if (!drag || drag.fromCol === toCol) return;
    setCols(prev => {
      const card = prev[drag.fromCol].find(c => c.id === drag.cardId);
      return {
        ...prev,
        [drag.fromCol]: prev[drag.fromCol].filter(c => c.id !== drag.cardId),
        [toCol]: [...prev[toCol], card],
      };
    });
    setDrag(null);
  };

  useEffect(() => {
    if (!window.Chart) return;
    const Chart = window.Chart;
    if (lineRef.current) {
      if (lineInst.current) lineInst.current.destroy();
      const data = [3,4,2,6,5,4,8,6,7,9,8,10,9,11,10,12,11,13,12,14,13,12,15,14,16,15,14,17,16,18];
      lineInst.current = new Chart(lineRef.current, {
        type:'line',
        data:{
          labels: data.map((_,i) => `D${i+1}`),
          datasets:[{ label:'Leads Captured', data, borderColor:'#C9A84C',
            backgroundColor:'rgba(201,168,76,0.07)', borderWidth:2,
            pointRadius:2, tension:0.4, fill:true }]
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ labels:{ color:'#C9A84C', font:{ family:'Montserrat', size:11 } } } },
          scales:{
            x:{ ticks:{ color:'rgba(201,168,76,0.4)', font:{size:8} }, grid:{ color:'rgba(201,168,76,0.05)' } },
            y:{ ticks:{ color:'rgba(201,168,76,0.6)', font:{size:9} }, grid:{ color:'rgba(201,168,76,0.07)' } }
          }
        }
      });
    }
    if (barRef.current) {
      if (barInst.current) barInst.current.destroy();
      const vals = [42,28,19,35,22];
      const mx = Math.max(...vals);
      barInst.current = new Chart(barRef.current, {
        type:'bar',
        data:{
          labels:['WhatsApp','Website','Referral','Instagram','TikTok'],
          datasets:[{ label:'Leads by Source', data:vals,
            backgroundColor: vals.map(v => v===mx?'#8B1A1A':'rgba(201,168,76,0.7)'),
            borderColor: vals.map(v => v===mx?'#C0392B':'#C9A84C'),
            borderWidth:1 }]
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ labels:{ color:'#C9A84C', font:{ family:'Montserrat', size:11 } } } },
          scales:{
            x:{ ticks:{ color:'rgba(201,168,76,0.6)', font:{size:9} }, grid:{ color:'rgba(201,168,76,0.05)' } },
            y:{ ticks:{ color:'rgba(201,168,76,0.6)', font:{size:9} }, grid:{ color:'rgba(201,168,76,0.07)' } }
          }
        }
      });
    }
    return () => {
      if (lineInst.current) lineInst.current.destroy();
      if (barInst.current) barInst.current.destroy();
    };
  }, []);

  const COLS = ['NEW LEAD','CONTACTED','QUALIFIED','CLOSED'];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:60 }}>

      {/* CRM Kanban */}
      <div>
        <DemoLabel>CRM PIPELINE — DRAG &amp; DROP</DemoLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14 }}>
          {COLS.map(col => (
            <div key={col}
              onDragOver={e => e.preventDefault()}
              onDrop={() => onDrop(col)}
              style={{ background:'#0d0d0d', border:'1px solid rgba(201,168,76,0.2)',
                borderRadius:8, minHeight:200, overflow:'hidden' }}>
              <div style={{ padding:'10px 14px',
                background:'rgba(201,168,76,0.07)',
                borderBottom:'1px solid rgba(201,168,76,0.18)' }}>
                <p style={{ fontFamily:'Montserrat', fontWeight:500, fontSize:'0.62rem',
                  color:'var(--gold)', letterSpacing:'0.14em' }}>{col}</p>
              </div>
              <div style={{ padding:10, display:'flex', flexDirection:'column', gap:8 }}>
                {(cols[col]||[]).map(card => (
                  <KanbanCard key={card.id} card={card} onDragStart={() => setDrag({ cardId:card.id, fromCol:col })} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <DemoCaption>CRM Integration &amp; Setup — your entire pipeline, automated.</DemoCaption>
      </div>

      {/* Charts */}
      <div>
        <DemoLabel>ANALYTICS DASHBOARD</DemoLabel>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20 }}>
          {[
            { ref:lineRef, title:'LEADS CAPTURED — LAST 30 DAYS' },
            { ref:barRef,  title:'LEADS BY SOURCE' },
          ].map(({ ref, title }) => (
            <div key={title} style={{ background:'#0d0d0d',
              border:'1px solid rgba(201,168,76,0.18)', borderRadius:8, padding:18 }}>
              <p style={{ fontFamily:'Montserrat', fontSize:'0.67rem',
                color:'var(--gold)', marginBottom:14, letterSpacing:'0.1em' }}>{title}</p>
              <div style={{ height:210 }}><canvas ref={ref} /></div>
            </div>
          ))}
        </div>
        <DemoCaption>Real-time visibility into every lead source.</DemoCaption>
      </div>

      {/* Follow-up timeline */}
      <FollowUpTimeline />
    </div>
  );
}

function KanbanCard({ card, onDragStart }) {
  const [h, setH] = useState(false);
  return (
    <div draggable onDragStart={onDragStart}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background:'#1a1a1a',
        border:`1px solid ${h?'var(--gold)':'rgba(201,168,76,0.13)'}`,
        borderRadius:6, padding:'9px 11px', cursor:'grab', transition:'border-color .2s' }}>
      <p style={{ fontFamily:'Cinzel,serif', fontSize:'0.78rem', color:'var(--gold)', fontWeight:700 }}>{card.name}</p>
      <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.79rem',
        color:'rgba(232,220,200,0.55)', marginTop:3 }}>{card.detail}</p>
    </div>
  );
}

function FollowUpTimeline() {
  const ref = useRef(null);
  const steps = [
    { day:'Day 0', label:'Lead captured — instant WhatsApp welcome sent',
      msg:'Welcome to Black Vale! Vale will be in touch shortly.' },
    { day:'Day 1', label:'Follow-up check-in',
      msg:'Hi [Name], just checking in. Any questions for us?' },
    { day:'Day 3', label:'Qualification',
      msg:"What's your timeline for getting started? We'd love to match you with the right package." },
    { day:'Day 7', label:'Closing',
      msg:"We're ready when you are. Book your free consultation: wa.me/27747534679" },
  ];

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !ref.current) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.bv-tl-step',
        { opacity:0, x:-28 },
        { opacity:1, x:0, duration:0.65, stagger:0.15, ease:'power2.out',
          scrollTrigger:{ trigger:ref.current, start:'top 75%' } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <DemoLabel>AUTOMATED FOLLOW-UP SEQUENCE</DemoLabel>
      <div style={{ position:'relative', paddingLeft:42 }}>
        <div style={{ position:'absolute', left:15, top:0, bottom:0, width:1,
          background:'linear-gradient(to bottom,var(--gold),transparent)' }} />
        {steps.map((s,i) => (
          <div key={i} className="bv-tl-step" style={{ opacity:0, marginBottom:30, position:'relative' }}>
            <div style={{ position:'absolute', left:-31, top:4, width:16, height:16,
              borderRadius:'50%', background:'var(--gold-dark)', border:'2px solid var(--gold)',
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:5,height:5,borderRadius:'50%',background:'var(--gold-light)' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
              <span style={{ fontFamily:'Montserrat', fontWeight:500, fontSize:'0.67rem',
                color:'var(--gold)', background:'rgba(201,168,76,0.1)',
                border:'1px solid rgba(201,168,76,0.28)', padding:'2px 10px', borderRadius:12 }}>{s.day}</span>
              <span style={{ fontFamily:'Montserrat', fontWeight:300, fontSize:'0.72rem',
                color:'rgba(232,220,200,0.65)' }}>{s.label}</span>
            </div>
            <div style={{ background:'#0d1117', border:'1px solid rgba(37,211,102,0.18)',
              borderRadius:7, padding:'9px 13px', maxWidth:420 }}>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.92rem',
                color:'var(--text)', lineHeight:1.5 }}>{s.msg}</p>
            </div>
          </div>
        ))}
      </div>
      <DemoCaption>No lead left behind — ever.</DemoCaption>
    </div>
  );
}

/* ── ELITE ── */
function EliteTab() {
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(0);
  const waveRef = useRef(null);
  const waveRaf = useRef(null);
  const intRef  = useRef(null);

  const transcript = [
    { s:'Vale AI', t:"Good afternoon, this is Vale AI calling from Black Vale Automation. Am I speaking with the property owner?" },
    { s:'Lead',    t:"Yes, that's me." },
    { s:'Vale AI', t:"Excellent. I'm reaching out because you enquired about our automation services. Do you currently have a system in place for capturing and following up on leads?" },
    { s:'Lead',    t:"Not really, it's mostly manual." },
    { s:'Vale AI', t:"Understood. Our Growth package would eliminate that entirely. I can book you a 15-minute call with Vale — does tomorrow at 10am work?" },
    { s:'Lead',    t:"Yes, that works." },
    { s:'Vale AI', t:"Perfect. You're booked. You'll receive a WhatsApp confirmation shortly. Have a great day." },
  ];

  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(waveRaf.current);
      clearInterval(intRef.current);
      if (waveRef.current) {
        const ctx = waveRef.current.getContext('2d');
        ctx.clearRect(0, 0, waveRef.current.width, waveRef.current.height);
      }
      return;
    }
    if (!waveRef.current) return;
    const canvas = waveRef.current;
    const ctx = canvas.getContext('2d');
    let ti = 0;
    const draw = () => {
      waveRaf.current = requestAnimationFrame(draw);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x=0;x<canvas.width;x++) {
        const y = canvas.height/2 + Math.sin(x*0.05+ti)*18*Math.sin(ti*0.5+x*0.02);
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.stroke(); ti += 0.08;
    };
    draw();
    intRef.current = setInterval(() => {
      setLine(p => Math.min(p+1, transcript.length-1));
    }, 2000);
    return () => { cancelAnimationFrame(waveRaf.current); clearInterval(intRef.current); };
  }, [playing]);

  const nodes = [
    { l:'LEAD IN',          d:'Incoming lead from any source' },
    { l:'AI QUALIFIER',     d:'Qualifies lead intent and budget' },
    { l:'CRM LOGGER',       d:'Logs lead to CRM pipeline instantly' },
    { l:'WA SENDER',        d:'Sends instant WhatsApp welcome' },
    { l:'VOICE FOLLOW-UP',  d:'AI voice call to confirm interest' },
    { l:'BOOKING CONFIRMED',d:'Appointment auto-booked' },
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:60 }}>

      {/* Voice agent */}
      <div>
        <DemoLabel>AI VOICE AGENT — LIVE PREVIEW</DemoLabel>
        <div style={{ maxWidth:370, margin:'0 auto',
          background:'#0d0d0d', border:'1px solid rgba(201,168,76,0.3)',
          borderRadius:20, overflow:'hidden' }}>
          <div style={{ background:'#111', padding:'14px 18px',
            borderBottom:'1px solid rgba(201,168,76,0.14)',
            display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <p style={{ fontFamily:'Montserrat', fontSize:'0.68rem',
              color:'rgba(201,168,76,0.6)', letterSpacing:'0.14em' }}>
              INCOMING CALL — QUALIFYING LEAD
            </p>
            <span style={{ fontFamily:'Montserrat', fontSize:'0.62rem', color:'#22c55e',
              display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:6,height:6,borderRadius:'50%',background:'#22c55e',
                display:'inline-block',animation:'greenPulse 1.5s ease infinite' }} /> ACTIVE
            </span>
          </div>
          <div style={{ padding:'18px 18px 20px', display:'flex',
            flexDirection:'column', alignItems:'center', gap:14 }}>
            <img src="/logo.png" alt="BV" style={{ width:56,height:56,
              borderRadius:'50%', border:'2px solid var(--gold)' }} />
            <p style={{ fontFamily:'Cinzel,serif', fontSize:'0.88rem', color:'var(--gold)' }}>Vale AI Voice Agent</p>
            <canvas ref={waveRef} width={290} height={56}
              style={{ background:'rgba(0,0,0,0.4)', borderRadius:7,
                border:'1px solid rgba(201,168,76,0.1)' }} />
            <button onClick={() => { setPlaying(p => !p); if (!playing) setLine(0); }}
              style={{ background:playing?'rgba(201,168,76,0.08)':'var(--gold)',
                border:'1px solid var(--gold)', borderRadius:'50%',
                width:46,height:46, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:playing?'var(--gold)':'#000', fontSize:'1rem' }}>
              {playing?'⏸':'▶'}
            </button>
            <div style={{ width:'100%', maxHeight:190, overflowY:'auto',
              background:'#0a0a0a', borderRadius:8, padding:12,
              border:'1px solid rgba(201,168,76,0.1)' }}>
              {transcript.slice(0, line+1).map((ln,i) => (
                <div key={i} style={{ marginBottom:8 }}>
                  <span style={{ fontFamily:'Montserrat', fontSize:'0.63rem', fontWeight:500,
                    color:ln.s==='Vale AI'?'var(--gold)':'rgba(232,220,200,0.45)',
                    marginRight:7 }}>[{ln.s}]:</span>
                  <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.88rem',
                    color:'var(--text)', lineHeight:1.45 }}>{ln.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DemoCaption>AI Voice Agents — qualify leads, book appointments, follow up. 24/7. Zero staff required.</DemoCaption>
      </div>

      {/* Multi-agent flow */}
      <div>
        <DemoLabel>MULTI-AGENT SYSTEM — LIVE FLOW</DemoLabel>
        <div style={{ overflowX:'auto' }}>
          <svg width="700" height="170" viewBox="0 0 700 170"
            style={{ display:'block', margin:'0 auto', maxWidth:'100%' }}>
            <defs>
              <linearGradient id="nodeG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#160f00" />
              </linearGradient>
              <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#C9A84C" opacity="0.7" />
              </marker>
            </defs>
            {nodes.slice(0,-1).map((_,i) => {
              const x1 = 42+i*110+34, x2 = 42+(i+1)*110-2;
              return (
                <line key={i} x1={x1} y1={85} x2={x2} y2={85}
                  stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="6,4"
                  opacity="0.7" markerEnd="url(#arr)">
                  <animate attributeName="stroke-dashoffset" from="40" to="0" dur="1.4s" repeatCount="indefinite" />
                </line>
              );
            })}
            {nodes.map((n,i) => (
              <g key={i} transform={`translate(${42+i*110},54)`}>
                <circle cx="22" cy="31" r="26" fill="url(#nodeG)" stroke="#C9A84C" strokeWidth="1.4" />
                <text textAnchor="middle" fill="#C9A84C" fontFamily="Montserrat" fontSize="6.5" fontWeight="500">
                  {n.l.split(' ').map((w,wi) => (
                    <tspan key={wi} x="22" dy={wi===0?'14':'9'}>{w}</tspan>
                  ))}
                </text>
                <title>{n.d}</title>
              </g>
            ))}
          </svg>
        </div>
        <DemoCaption>Every agent has a role. Every role is automated.</DemoCaption>
      </div>

      {/* Custom web app */}
      <div>
        <DemoLabel>CUSTOM WEB APPLICATION</DemoLabel>
        <div style={{ maxWidth:680, margin:'0 auto',
          border:'1px solid rgba(201,168,76,0.28)', borderRadius:10, overflow:'hidden' }}>
          {/* Browser bar */}
          <div style={{ background:'#1a1a1a', padding:'9px 14px',
            display:'flex', alignItems:'center', gap:10,
            borderBottom:'1px solid rgba(201,168,76,0.18)' }}>
            <div style={{ display:'flex', gap:5 }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c => (
                <div key={c} style={{ width:9,height:9,borderRadius:'50%',background:c,opacity:0.6 }} />
              ))}
            </div>
            <div style={{ flex:1, background:'#0d0d0d', borderRadius:4, padding:'3px 11px',
              fontFamily:'Montserrat', fontSize:'0.62rem', color:'rgba(201,168,76,0.45)' }}>
              blackvaleautomation.com/dashboard
            </div>
          </div>
          {/* App */}
          <div style={{ display:'flex', background:'#050505' }}>
            <div style={{ width:124, background:'#0a0a0a',
              borderRight:'1px solid rgba(201,168,76,0.1)', padding:'14px 0' }}>
              {['Dashboard','Leads','Automations','Reports','Settings'].map(it => (
                <div key={it} style={{ padding:'7px 14px',
                  fontFamily:'Montserrat', fontSize:'0.62rem',
                  color:it==='Dashboard'?'var(--gold)':'rgba(232,220,200,0.38)',
                  background:it==='Dashboard'?'rgba(201,168,76,0.07)':'transparent',
                  borderLeft:it==='Dashboard'?'2px solid var(--gold)':'2px solid transparent',
                  cursor:'pointer' }}>{it}</div>
              ))}
            </div>
            <div style={{ flex:1, padding:14 }}>
              <p style={{ fontFamily:'Cinzel,serif', fontSize:'0.78rem',
                color:'var(--gold)', marginBottom:11 }}>Dashboard</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, marginBottom:11 }}>
                {[
                  { l:'Total Leads',          v:'847' },
                  { l:'Active Automations',   v:'12' },
                  { l:'Messages Sent',        v:'3,291' },
                  { l:'Revenue Attributed',   v:'R142,000' },
                ].map(s => (
                  <div key={s.l} style={{ background:'#111',
                    border:'1px solid rgba(201,168,76,0.13)',
                    borderRadius:5, padding:'9px 11px' }}>
                    <p style={{ fontFamily:'Montserrat', fontSize:'0.52rem',
                      color:'rgba(201,168,76,0.45)', marginBottom:3 }}>{s.l}</p>
                    <p style={{ fontFamily:'Cinzel,serif', fontSize:'0.82rem',
                      color:'var(--gold)', fontWeight:700 }}>{s.v}</p>
                  </div>
                ))}
              </div>
              <div style={{ background:'#111',
                border:'1px solid rgba(201,168,76,0.1)',
                borderRadius:5, padding:'7px 11px' }}>
                <p style={{ fontFamily:'Montserrat', fontSize:'0.5rem',
                  color:'rgba(201,168,76,0.38)', marginBottom:7 }}>LEADS THIS WEEK</p>
                <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:38 }}>
                  {[40,62,45,80,58,90,74].map((h,i) => (
                    <div key={i} style={{ flex:1, background:'rgba(201,168,76,0.6)',
                      height:`${h}%`, borderRadius:'2px 2px 0 0' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DemoCaption>Custom-built for your exact business. Nothing generic. Nothing off-the-shelf.</DemoCaption>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PACKAGES
───────────────────────────────────────── */
function Packages() {
  const secRef = useRef(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !secRef.current) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.bv-pkg-card',
        { opacity:0, y:60 },
        { opacity:1, y:0, duration:0.85, stagger:0.2, ease:'power3.out',
          scrollTrigger:{ trigger:secRef.current, start:'top 75%' } });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const goto = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

  const pkgs = [
    { name:'STARTER PACKAGE', img:'/starter-card.jpg', raised:false, elite:false,
      features:['AI Chatbot Setup & Training','WhatsApp Business Integration','Basic Lead Automation Workflow','Lead Capture System'],
      cta:'Get Started' },
    { name:'GROWTH PACKAGE', img:'/growth-card.jpg', raised:true, elite:false, badge:'MOST POPULAR',
      features:['Advanced AI Chatbot System','Full Real Estate Website + Multi-Listing Automation','CRM Integration & Setup','Automated Follow-Up Sequences','Intelligent Qualification System','Analytics Dashboard'],
      cta:'Scale Now' },
    { name:'ELITE PACKAGE', img:'/elite-card.jpg', raised:false, elite:true,
      features:['Full AI Ecosystem Build-Out','AI Voice Agents','Custom Web Application','CRM + WhatsApp Automation','Multi-Agent Team Support','Enterprise Integrations','Dedicated Support Line','Custom AI Workflows'],
      cta:'Go Elite' },
  ];

  return (
    <section id="packages" ref={secRef}
      style={{ background:'var(--surface)', padding:'clamp(60px,10vw,120px) clamp(20px,5vw,50px)' }}>
      <div style={{ textAlign:'center', marginBottom:66 }}>
        <p style={{ fontFamily:'Montserrat', fontWeight:200, fontSize:'0.74rem',
          letterSpacing:'0.42em', color:'var(--crimson)',
          textTransform:'uppercase', marginBottom:14 }}>SELECT YOUR TIER</p>
        <h2 style={{ fontFamily:'Cinzel,serif', fontWeight:700,
          fontSize:'clamp(2rem,5vw,3.6rem)', ...goldText() }}>
          CHOOSE YOUR ARSENAL
        </h2>
      </div>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'grid',
        gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',
        gap:24, alignItems:'center' }}>
        {pkgs.map((p,i) => <PkgCard key={i} pkg={p} onCta={() => goto('contact')} />)}
      </div>
    </section>
  );
}

function PkgCard({ pkg, onCta }) {
  const [h, setH] = useState(false);
  return (
    <div className="bv-pkg-card"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        opacity:0, position:'relative', borderRadius:12, overflow:'hidden',
        transform: pkg.raised ? (h?'translateY(-30px)':'translateY(-20px)') : (h?'translateY(-10px)':'none'),
        transition:'all .4s ease',
        border: pkg.elite
          ? '1px solid var(--gold)'
          : `1px solid ${h?'rgba(201,168,76,0.55)':'rgba(201,168,76,0.18)'}`,
        boxShadow: h
          ? '0 20px 60px rgba(201,168,76,0.18), inset 0 0 28px rgba(201,168,76,0.04)'
          : pkg.raised ? '0 10px 40px rgba(201,168,76,0.14)' : 'none',
      }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${pkg.img})`,
        backgroundSize:'cover', backgroundPosition:'center' }} />
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.82)' }} />
      {pkg.badge && (
        <div style={{ position:'absolute', top:14, right:14, zIndex:2,
          background:'var(--gold)', color:'#000',
          fontFamily:'Montserrat', fontWeight:500, fontSize:'0.58rem',
          letterSpacing:'0.14em', padding:'4px 12px', borderRadius:20 }}>
          {pkg.badge}
        </div>
      )}
      <div style={{ position:'relative', zIndex:1, padding:'36px 28px' }}>
        <CrownSVG size={28} style={{ marginBottom:14 }} />
        <h3 style={{ fontFamily:'Cinzel,serif', fontWeight:700, fontSize:'1.05rem',
          letterSpacing:'0.1em', marginBottom:22, ...goldText() }}>{pkg.name}</h3>
        <ul style={{ listStyle:'none', display:'flex', flexDirection:'column',
          gap:10, marginBottom:30 }}>
          {pkg.features.map((f,i) => (
            <li key={i} style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
              <span style={{ color:'var(--gold)', fontSize:'0.58rem', marginTop:4, flexShrink:0 }}>◆</span>
              <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.94rem',
                color:'var(--text)', lineHeight:1.42 }}>{f}</span>
            </li>
          ))}
        </ul>
        <button onClick={onCta} style={{
          width:'100%', padding:13,
          background: h ? 'var(--gold)' : 'rgba(201,168,76,0.09)',
          border:'1px solid var(--gold)',
          color: h ? '#000' : 'var(--gold)',
          fontFamily:'Montserrat', fontWeight:500, fontSize:'0.73rem',
          letterSpacing:'0.2em', textTransform:'uppercase',
          cursor:'pointer', transition:'all .3s',
        }}>{pkg.cta}</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   BRAND MARK
───────────────────────────────────────── */
function BrandMark() {
  return (
    <section style={{ background:'#000', padding:'96px 40px', textAlign:'center' }}>
      <img src="/logo.png" alt="Black Vale Automation Logo"
        style={{ width:260, height:260, borderRadius:'50%', display:'block', margin:'0 auto 30px',
          animation:'rotateLogo 60s linear infinite, logoPulse 4s ease-in-out infinite' }} />
      <h2 style={{ fontFamily:'Cinzel,serif', fontWeight:700,
        fontSize:'clamp(0.9rem,2.5vw,1.5rem)', letterSpacing:'0.4em',
        marginBottom:12, ...goldText() }}>
        BLACK VALE AUTOMATION
      </h2>
      <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
        fontWeight:300, fontSize:'1.08rem', color:'rgba(201,168,76,0.58)' }}>
        AI Systems. Automation. Precision.
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  const secRef = useRef(null);
  const [form, setForm] = useState({ name:'', email:'', phone:'', pkg:'', message:'' });
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger || !secRef.current) return;
    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.bv-ccard',
        { opacity:0, y:28 },
        { opacity:1, y:0, duration:0.6, stagger:0.14,
          scrollTrigger:{ trigger:secRef.current, start:'top 75%' } });
    }, secRef);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }
    setErrs({}); setSending(true);
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Accept:'application/json' },
        body: JSON.stringify({ name:form.name, email:form.email, phone:form.phone,
          package:form.pkg, message:form.message }),
      });
    } catch (_) { /* show success regardless */ }
    setSending(false); setDone(true);
  };

  const contacts = [
    { icon:'📱', label:'WhatsApp', val:'+27 74 753 4679', href:'https://wa.me/27747534679' },
    { icon:'✉️', label:'Email', val:'blackvaleautomation@protonmail.com', href:'mailto:blackvaleautomation@protonmail.com' },
    { icon:'📸', label:'Instagram', val:'@themba_sm', href:'https://instagram.com/themba_sm' },
    { icon:'🎵', label:'TikTok', val:'@themba_sm', href:'https://tiktok.com/@themba_sm' },
  ];

  return (
    <section id="contact" ref={secRef}
      style={{ background:'var(--surface)', padding:'clamp(60px,10vw,120px) clamp(20px,5vw,50px)' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:64 }}>
          <p style={{ fontFamily:'Montserrat', fontWeight:200, fontSize:'0.74rem',
            letterSpacing:'0.42em', color:'var(--crimson)',
            textTransform:'uppercase', marginBottom:14 }}>LET'S WORK</p>
          <h2 style={{ fontFamily:'Cinzel,serif', fontWeight:700,
            fontSize:'clamp(1.5rem,4vw,3rem)', ...goldText() }}>
            READY TO AUTOMATE YOUR EMPIRE?
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:56 }}>
          {/* Contact cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {contacts.map(c => <CCard key={c.label} item={c} />)}
          </div>

          {/* Form */}
          <div>
            {done ? (
              <div style={{ textAlign:'center', padding:'56px 36px',
                border:'1px solid var(--gold)', background:'rgba(201,168,76,0.04)' }}>
                <CrownSVG size={38} style={{ margin:'0 auto 18px' }} />
                <h3 style={{ fontFamily:'Cinzel,serif', fontSize:'1.15rem',
                  marginBottom:10, ...goldText() }}>Message Received.</h3>
                <p style={{ fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
                  fontSize:'1rem', color:'rgba(201,168,76,0.68)' }}>
                  Vale will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:15 }}>
                {[
                  { key:'name',  label:'Name *',          type:'text',  ph:'Your full name' },
                  { key:'email', label:'Email *',         type:'email', ph:'your@email.com' },
                  { key:'phone', label:'Phone (optional)',type:'tel',   ph:'+27 ...' },
                ].map(f => (
                  <FieldRow key={f.key} field={f} form={form} errs={errs}
                    onChange={v => setForm(p => ({ ...p, [f.key]:v }))} />
                ))}

                <div>
                  <label style={labelStyle}>Package Interest</label>
                  <select value={form.pkg} onChange={e => setForm(p => ({ ...p, pkg:e.target.value }))}
                    style={{ ...inputStyle, color:form.pkg?'var(--text)':'rgba(232,220,200,0.4)',
                      appearance:'none', cursor:'pointer' }}>
                    <option value="">Select a package...</option>
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea rows={4} placeholder="Tell Vale about your business..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                    style={{ ...inputStyle, resize:'vertical',
                      borderColor:errs.message?'var(--crimson)':'rgba(201,168,76,0.2)' }} />
                  {errs.message && <ErrMsg>{errs.message}</ErrMsg>}
                </div>

                <button type="submit" disabled={sending} style={{
                  width:'100%', padding:15,
                  background:sending?'rgba(201,168,76,0.28)':'var(--gold)',
                  border:'none', color:'#000',
                  fontFamily:'Montserrat', fontWeight:500, fontSize:'0.77rem',
                  letterSpacing:'0.24em', textTransform:'uppercase',
                  cursor:sending?'wait':'pointer', transition:'all .3s',
                }}>{sending?'SENDING...':'SEND MESSAGE'}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const labelStyle = {
  fontFamily:'Montserrat,sans-serif', fontWeight:300, fontSize:'0.63rem',
  color:'rgba(201,168,76,0.58)', letterSpacing:'0.16em',
  display:'block', marginBottom:6,
};
const inputStyle = {
  width:'100%', background:'#0d0d0d',
  border:'1px solid rgba(201,168,76,0.2)',
  padding:'11px 15px', color:'var(--text)',
  fontFamily:'Cormorant Garamond,serif', fontSize:'1rem',
  outline:'none', transition:'border-color .3s',
};

function FieldRow({ field, form, errs, onChange }) {
  const err = errs[field.key];
  return (
    <div>
      <label style={labelStyle}>{field.label}</label>
      <input type={field.type} placeholder={field.ph}
        value={form[field.key]}
        onChange={e => onChange(e.target.value)}
        onFocus={e => { e.target.style.borderColor='var(--gold)'; }}
        onBlur={e  => { e.target.style.borderColor=err?'var(--crimson)':'rgba(201,168,76,0.2)'; }}
        style={{ ...inputStyle, borderColor:err?'var(--crimson)':'rgba(201,168,76,0.2)' }} />
      {err && <ErrMsg>{err}</ErrMsg>}
    </div>
  );
}

function ErrMsg({ children }) {
  return (
    <p style={{ color:'var(--crimson)', fontFamily:'Montserrat', fontSize:'0.62rem', marginTop:4 }}>
      {children}
    </p>
  );
}

function CCard({ item }) {
  const [h, setH] = useState(false);
  return (
    <a href={item.href} target="_blank" rel="noopener noreferrer"
      className="bv-ccard"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ opacity:0, display:'flex', alignItems:'center', gap:16,
        padding:'18px 22px',
        background:h?'rgba(201,168,76,0.04)':'#0d0d0d',
        border:`1px solid ${h?'var(--gold)':'rgba(201,168,76,0.18)'}`,
        textDecoration:'none', transition:'all .3s' }}>
      <span style={{ fontSize:'1.35rem' }}>{item.icon}</span>
      <div>
        <p style={{ fontFamily:'Montserrat', fontSize:'0.58rem',
          color:'rgba(201,168,76,0.48)', letterSpacing:'0.2em',
          textTransform:'uppercase', marginBottom:4 }}>{item.label}</p>
        <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.94rem',
          color:'var(--gold)' }}>{item.val}</p>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  const socials = [
    { href:'https://wa.me/27747534679', label:'WhatsApp', icon:<WaIcon /> },
    { href:'https://instagram.com/themba_sm', label:'Instagram', icon:<IgIcon /> },
    { href:'https://tiktok.com/@themba_sm', label:'TikTok', icon:<TkIcon /> },
  ];
  return (
    <footer style={{ background:'#000', padding:'36px clamp(20px,5vw,50px) 26px',
      borderTop:'1px solid',
      borderImage:'linear-gradient(90deg,transparent,var(--gold),transparent) 1' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center',
          justifyContent:'space-between', flexWrap:'wrap', gap:18, marginBottom:22 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <CrownSVG size={26} />
            <span style={{ fontFamily:'Cinzel,serif', fontWeight:700,
              fontSize:'0.88rem', letterSpacing:'0.22em', ...goldText() }}>
              BLACK VALE AUTOMATION
            </span>
          </div>
          <div style={{ display:'flex', gap:18 }}>
            {socials.map(s => (
              <FtIcon key={s.label} href={s.href} label={s.label}>{s.icon}</FtIcon>
            ))}
          </div>
        </div>
        <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)', marginBottom:22 }} />
        <p style={{ textAlign:'center', fontFamily:'Cormorant Garamond,serif',
          fontWeight:300, fontSize:'0.88rem', color:'rgba(201,168,76,0.38)' }}>
          © 2025 Black Vale Automation. Engineered for the elite.
        </p>
      </div>
    </footer>
  );
}

function FtIcon({ href, label, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ color:h?'var(--gold)':'rgba(201,168,76,0.38)',
        transition:'color .3s', textDecoration:'none' }}>
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────
   SMALL SHARED UI
───────────────────────────────────────── */
function DemoLabel({ children }) {
  return (
    <p style={{ fontFamily:'Montserrat', fontWeight:400, fontSize:'0.68rem',
      letterSpacing:'0.3em', color:'var(--crimson)',
      textTransform:'uppercase', marginBottom:22, textAlign:'center' }}>
      {children}
    </p>
  );
}
function DemoCaption({ children }) {
  return (
    <p style={{ textAlign:'center', fontFamily:'Cormorant Garamond,serif',
      fontStyle:'italic', color:'rgba(201,168,76,0.55)',
      fontSize:'0.9rem', marginTop:14 }}>
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   APP ROOT
───────────────────────────────────────── */
export default function App() {
  return (
    <>
      {/* Fixed video background — entire site */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <video
          src="/hero-video.mp4"
          autoPlay muted loop playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Dark overlay so text stays readable */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.72)',
        }} />
      </div>

      {/* All site content floats above video */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <LiveDemos />
        <Packages />
        <BrandMark />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
