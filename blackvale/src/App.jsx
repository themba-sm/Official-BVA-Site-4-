import React, { useState, useEffect, useRef } from 'react';

/* ── Brand tokens ── */
const G = {
  gold: '#C9A84C', crimson: '#8B0000', black: '#000', white: '#fff',
  surface: '#0a0a0a', card: '#111', border: 'rgba(201,168,76,0.18)',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Montserrat:wght@300;400;600;700&display=swap');
  :root {
    --gold: ${G.gold}; --crimson: ${G.crimson}; --surface: ${G.surface}; --card: ${G.card};
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #000; color: #fff; font-family: 'Montserrat', sans-serif; overflow-x: hidden; }
  ::selection { background: rgba(201,168,76,0.3); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
`;

function CrownSVG({ size = 40, style = {} }) {
  return (
    <img
      src="/logo.png"
      alt="Black Vale"
      style={{ width: size, height: size, objectFit: 'contain', ...style }}
    />
  );
}

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['About', 'Services', 'Packages', 'Contact'];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '16px clamp(20px,5vw,50px)',
      background: scrolled ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? `1px solid ${G.border}` : '1px solid transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <CrownSVG size={30} />
        <span style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: '1rem',
          letterSpacing: '0.22em', color: G.gold }}>BLACK VALE</span>
      </div>
      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 36 }} className="desktop-nav">
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.18em',
            color: 'rgba(255,255,255,0.75)', textDecoration: 'none', textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = G.gold}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
          >{l}</a>
        ))}
      </div>
      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
      }}>
        <div style={{ width: 22, height: 2, background: G.gold, marginBottom: 5, transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
        <div style={{ width: 22, height: 2, background: G.gold, marginBottom: 5,
          opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
        <div style={{ width: 22, height: 2, background: G.gold, transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(0,0,0,0.97)', borderBottom: `1px solid ${G.border}`,
          padding: '24px clamp(20px,5vw,50px)',
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', fontFamily: 'Montserrat', fontSize: '0.8rem',
                letterSpacing: '0.18em', color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none', textTransform: 'uppercase', padding: '12px 0',
                borderBottom: `1px solid ${G.border}`,
              }}>
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════
   HERO — CINEMATIC INTRO ANIMATION
══════════════════════════════════════════════ */
function Hero() {
  const overlayRef = useRef(null);
  const crownRef = useRef(null);
  const blackRef = useRef(null);
  const valeRef = useRef(null);
  const autoRef = useRef(null);
  const lineLeftRef = useRef(null);
  const lineRightRef = useRef(null);
  const diamondRef = useRef(null);
  const tagRef = useRef(null);
  const btnsRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    if (!window.gsap) {
      // fallback: show everything immediately
      [overlayRef, crownRef, blackRef, valeRef, autoRef,
        lineLeftRef, lineRightRef, diamondRef, tagRef, btnsRef, flashRef].forEach(r => {
        if (r.current) r.current.style.opacity = r === overlayRef ? '0' : '1';
      });
      return;
    }
    const ctx = window.gsap.context(() => {
      const tl = window.gsap.timeline({ defaults: { ease: 'power4.out' } });

      // init all hidden
      window.gsap.set([crownRef.current, blackRef.current, valeRef.current,
        autoRef.current, lineLeftRef.current, lineRightRef.current,
        diamondRef.current, tagRef.current, btnsRef.current], { opacity: 0 });
      window.gsap.set(overlayRef.current, { opacity: 1 });
      window.gsap.set(flashRef.current, { opacity: 0 });

      // 1. white flash
      tl.to(flashRef.current, { opacity: 0.12, duration: 0.06, ease: 'none' }, 0.05)
        .to(flashRef.current, { opacity: 0, duration: 0.3 }, 0.11);

      // 2. Crown drops + impact
      tl.fromTo(crownRef.current,
        { opacity: 0, y: -160, scale: 3, filter: 'blur(20px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power4.out' }, 0.08);

      // 3. BLACK slams in — horizontal stretch
      tl.fromTo(blackRef.current,
        { opacity: 0, scaleX: 1.8, scaleY: 0.3, filter: 'blur(20px)' },
        { opacity: 1, scaleX: 1, scaleY: 1, filter: 'blur(0px)', duration: 0.38, ease: 'power4.out' }, 0.42);

      // 4. VALE zooms in from tiny
      tl.fromTo(valeRef.current,
        { opacity: 0, scale: 0.1, filter: 'blur(24px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.42, ease: 'back.out(1.6)' }, 0.62);

      // 5. automation slides up in crimson
      tl.fromTo(autoRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.38, ease: 'power3.out' }, 0.84);

      // 6. Lines draw out from center
      tl.fromTo(lineLeftRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: 'right' },
        { scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }, 1.04);
      tl.fromTo(lineRightRef.current,
        { scaleX: 0, opacity: 0, transformOrigin: 'left' },
        { scaleX: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }, 1.04);

      // 7. Diamond snaps in
      tl.fromTo(diamondRef.current,
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(3)' }, 1.28);

      // 8. Tagline
      tl.fromTo(tagRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45 }, 1.42);

      // 9. Black overlay fades — video revealed
      tl.to(overlayRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 1.65);

      // 10. Buttons slide up
      tl.fromTo(btnsRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.0);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%', height: '100vh', overflow: 'hidden',
      background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Black intro overlay */}
      <div ref={overlayRef} style={{
        position: 'absolute', inset: 0, background: '#000', zIndex: 3, pointerEvents: 'none',
      }} />
      {/* Impact flash */}
      <div ref={flashRef} style={{
        position: 'absolute', inset: 0, background: 'rgba(255,255,255,1)',
        zIndex: 4, pointerEvents: 'none', opacity: 0,
      }} />

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 24px' }}>
        {/* Crown / Logo */}
        <div ref={crownRef} style={{ marginBottom: 14, opacity: 0 }}>
          <CrownSVG size={88} />
        </div>

        {/* BLACK */}
        <div ref={blackRef} style={{ opacity: 0 }}>
          <span style={{
            fontFamily: 'Cinzel', fontWeight: 900,
            fontSize: 'clamp(3.8rem,15vw,8.5rem)', lineHeight: 0.88,
            color: '#1c1c1c',
            textShadow: '3px 3px 0 #2a2a2a, -1px -1px 0 #111, 0 0 60px rgba(0,0,0,0.8)',
            WebkitTextStroke: '1.5px rgba(201,168,76,0.25)',
            display: 'block', letterSpacing: '0.07em',
          }}>BLACK</span>
        </div>

        {/* VALE */}
        <div ref={valeRef} style={{ opacity: 0, marginBottom: 10 }}>
          <span style={{
            fontFamily: 'Cinzel', fontWeight: 900,
            fontSize: 'clamp(3.8rem,15vw,8.5rem)', lineHeight: 0.88,
            color: '#1c1c1c',
            textShadow: '3px 3px 0 #2a2a2a, -1px -1px 0 #111, 0 0 60px rgba(0,0,0,0.8)',
            WebkitTextStroke: '1.5px rgba(201,168,76,0.25)',
            display: 'block', letterSpacing: '0.07em',
          }}>VALE</span>
        </div>

        {/* automation */}
        <div ref={autoRef} style={{ opacity: 0, marginBottom: 20 }}>
          <span style={{
            fontFamily: 'Cinzel', fontWeight: 700,
            fontSize: 'clamp(1.5rem,5.5vw,3rem)',
            color: G.crimson,
            letterSpacing: '0.1em',
            textShadow: `0 0 40px rgba(139,0,0,0.7), 0 0 80px rgba(139,0,0,0.3)`,
            display: 'block',
          }}>automation</span>
        </div>

        {/* Divider — lines + diamond */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <div ref={lineLeftRef} style={{
            height: 1, width: 'clamp(50px,16vw,110px)',
            background: `linear-gradient(90deg, transparent, ${G.gold})`,
            opacity: 0,
          }} />
          <span ref={diamondRef} style={{ color: G.gold, fontSize: '0.85rem', opacity: 0 }}>◆</span>
          <div ref={lineRightRef} style={{
            height: 1, width: 'clamp(50px,16vw,110px)',
            background: `linear-gradient(90deg, ${G.gold}, transparent)`,
            opacity: 0,
          }} />
        </div>

        {/* Tagline */}
        <p ref={tagRef} style={{
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
          fontSize: 'clamp(0.95rem,3vw,1.25rem)',
          color: 'rgba(255,255,255,0.85)', letterSpacing: '0.06em',
          marginBottom: 40, opacity: 0,
        }}>
          AI Systems. Automation. Precision.
        </p>

        {/* Buttons */}
        <div ref={btnsRef} style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', opacity: 0 }}>
          <a href="#packages" style={{
            display: 'inline-block', padding: '14px 40px',
            background: G.gold, color: '#000',
            fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.78rem',
            letterSpacing: '0.18em', textDecoration: 'none', textTransform: 'uppercase',
            minWidth: 240, textAlign: 'center',
          }}>VIEW PACKAGES</a>
          <a href="#contact" style={{
            display: 'inline-block', padding: '13px 40px',
            border: `1px solid ${G.gold}`, color: G.gold,
            fontFamily: 'Montserrat', fontWeight: 600, fontSize: '0.78rem',
            letterSpacing: '0.18em', textDecoration: 'none', textTransform: 'uppercase',
            minWidth: 240, textAlign: 'center',
          }}>CONTACT VALE</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 5,
      }}>
        <div style={{
          width: 24, height: 38, border: '2px solid rgba(201,168,76,0.5)',
          borderRadius: 12, margin: '0 auto 8px', display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{ width: 3, height: 8, background: G.gold, borderRadius: 2 }} />
        </div>
        <span style={{
          fontFamily: 'Montserrat', fontSize: '0.58rem',
          color: 'rgba(201,168,76,0.45)', letterSpacing: '0.22em',
        }}>SCROLL</span>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════ */
function About() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    const ctx = window.gsap.context(() => {
      window.gsap.from(ref.current.children, {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.9,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="about" style={{ background: 'rgba(0,0,0,0.6)', padding: 'clamp(60px,10vw,120px) clamp(20px,6vw,60px)' }}>
      <div ref={ref} style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cinzel', fontSize: '0.7rem', letterSpacing: '0.35em', color: G.gold, marginBottom: 20 }}>
          THE MANDATE
        </p>
        <h2 style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.8rem,5vw,3rem)',
          color: '#fff', marginBottom: 28, lineHeight: 1.2 }}>
          We Don't Automate Businesses.<br />We Liberate Them.
        </h2>
        <div style={{ width: 48, height: 1, background: G.gold, margin: '0 auto 32px' }} />
        <p style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(1.05rem,2.5vw,1.3rem)',
          color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, fontStyle: 'italic' }}>
          Black Vale Automation engineers intelligent systems that eliminate repetitive work,
          amplify decision-making, and position businesses to operate at their highest potential.
          Built for founders who refuse to settle.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOUNDER
══════════════════════════════════════════════ */
function Founder() {
  const ref = useRef(null);
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);
    const ctx = window.gsap.context(() => {
      window.gsap.from(ref.current, {
        opacity: 0, x: -40, duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="founder" style={{ background: 'rgba(0,0,0,0.55)', padding: 'clamp(60px,10vw,120px) clamp(20px,6vw,60px)' }}>
      <div ref={ref} style={{
        maxWidth: 1000, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: 'clamp(30px,6vw,70px)', alignItems: 'center',
      }}>
        <div style={{ flex: '0 0 clamp(180px,28vw,280px)' }}>
          <div style={{
            border: `1px solid ${G.border}`, padding: 6,
            boxShadow: `0 0 40px rgba(201,168,76,0.08)`,
          }}>
            <img src="/founder.png" alt="Sinethemba Mtshali"
              style={{ width: '100%', display: 'block', filter: 'grayscale(15%)' }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <p style={{ fontFamily: 'Cinzel', fontSize: '0.65rem', letterSpacing: '0.35em', color: G.gold, marginBottom: 12 }}>
            THE FOUNDER
          </p>
          <h3 style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.4rem,4vw,2.2rem)',
            color: '#fff', marginBottom: 6 }}>
            Sinethemba Mtshali
          </h3>
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: G.gold, letterSpacing: '0.2em', marginBottom: 22 }}>
            FOUNDER & CEO
          </p>
          <div style={{ width: 40, height: 1, background: G.gold, marginBottom: 24 }} />
          <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 'clamp(1rem,2.2vw,1.18rem)',
            color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
            "Most businesses are working hard. We make sure they're working smart. 
            Every system we build is designed to give you back your most valuable asset — time."
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   LIVE DEMOS
══════════════════════════════════════════════ */
function LiveDemos() {
  const [active, setActive] = useState('chatbot');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hello. I\'m the Black Vale AI assistant. How can I help your business today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [kanban, setKanban] = useState({
    'Lead': ['Acme Corp', 'TechStart SA'],
    'Qualified': ['Delta Group'],
    'Proposal': ['Nova Ventures'],
    'Closed': ['Pinnacle Ltd'],
  });
  const [dragging, setDragging] = useState(null);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (active !== 'analytics' || !chartRef.current || !window.Chart) return;
    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new window.Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue (R)',
          data: [42000, 58000, 51000, 73000, 89000, 102000],
          borderColor: G.gold, backgroundColor: 'rgba(201,168,76,0.08)',
          borderWidth: 2, pointBackgroundColor: G.gold, fill: true, tension: 0.4,
        }, {
          label: 'Leads',
          data: [18, 24, 20, 31, 38, 45],
          borderColor: G.crimson, backgroundColor: 'rgba(139,0,0,0.06)',
          borderWidth: 2, pointBackgroundColor: G.crimson, fill: true, tension: 0.4,
          yAxisID: 'y2',
        }],
      },
      options: {
        responsive: true, interaction: { mode: 'index', intersect: false },
        plugins: { legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { family: 'Montserrat', size: 11 } } } },
        scales: {
          x: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { ticks: { color: 'rgba(255,255,255,0.5)' }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y2: { position: 'right', ticks: { color: G.crimson }, grid: { drawOnChartArea: false } },
        },
      },
    });
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [active]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', text: chatInput };
    const responses = [
      'Great question. Black Vale Automation specialises in AI-driven workflows, CRM systems, and lead generation automation.',
      'We\'ve helped businesses cut manual admin by over 70%. Would you like to see our packages?',
      'Absolutely. Our team can have your first automation live within 48 hours of onboarding.',
      'Precision is everything. Every system we build is custom-engineered for your business model.',
    ];
    const botMsg = { role: 'bot', text: responses[Math.floor(Math.random() * responses.length)] };
    setChatMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput('');
  };

  const moveCard = (card, fromCol, toCol) => {
    setKanban(prev => {
      const n = { ...prev };
      n[fromCol] = n[fromCol].filter(c => c !== card);
      n[toCol] = [...n[toCol], card];
      return n;
    });
  };

  const demos = [
    { id: 'chatbot', label: 'AI Chatbot' },
    { id: 'crm', label: 'CRM' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'voice', label: 'Voice Agent' },
    { id: 'workflow', label: 'Workflow' },
  ];

  return (
    <section id="services" style={{ background: 'rgba(0,0,0,0.6)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,50px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'Cinzel', fontSize: '0.65rem', letterSpacing: '0.35em', color: G.gold, marginBottom: 14 }}>
            LIVE SYSTEMS
          </p>
          <h2 style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.6rem,4.5vw,2.6rem)', color: '#fff' }}>
            Experience the Automation
          </h2>
        </div>
        {/* Tab bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32, justifyContent: 'center' }}>
          {demos.map(d => (
            <button key={d.id} onClick={() => setActive(d.id)} style={{
              fontFamily: 'Montserrat', fontSize: '0.68rem', letterSpacing: '0.14em',
              padding: '9px 20px', border: `1px solid ${active === d.id ? G.gold : G.border}`,
              background: active === d.id ? G.gold : 'transparent',
              color: active === d.id ? '#000' : 'rgba(255,255,255,0.65)',
              cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.25s',
            }}>{d.label}</button>
          ))}
        </div>

        {/* Demo panels */}
        <div style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${G.border}`, minHeight: 380, padding: 28 }}>

          {/* Chatbot */}
          {active === 'chatbot' && (
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              <div style={{ height: 260, overflowY: 'auto', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chatMessages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '78%', padding: '10px 14px',
                      background: m.role === 'user' ? G.gold : 'rgba(255,255,255,0.06)',
                      color: m.role === 'user' ? '#000' : 'rgba(255,255,255,0.85)',
                      fontFamily: 'Montserrat', fontSize: '0.78rem', lineHeight: 1.55,
                      borderRadius: 2,
                    }}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Ask anything about Black Vale…"
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`,
                    color: '#fff', fontFamily: 'Montserrat', fontSize: '0.78rem', padding: '10px 14px',
                    outline: 'none',
                  }} />
                <button onClick={sendChat} style={{
                  background: G.gold, color: '#000', border: 'none', padding: '10px 18px',
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer', letterSpacing: '0.1em',
                }}>SEND</button>
              </div>
            </div>
          )}

          {/* CRM Kanban */}
          {active === 'crm' && (
            <div>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.12em', marginBottom: 18, textAlign: 'center' }}>
                DRAG CARDS BETWEEN COLUMNS
              </p>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                {Object.entries(kanban).map(([col, cards]) => (
                  <div key={col}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      const [card, from] = e.dataTransfer.getData('text').split('||');
                      if (from !== col) moveCard(card, from, col);
                    }}
                    style={{
                      flex: '0 0 160px', background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${G.border}`, padding: '14px 12px', minHeight: 200,
                    }}>
                    <p style={{ fontFamily: 'Cinzel', fontSize: '0.6rem', letterSpacing: '0.2em',
                      color: G.gold, marginBottom: 12, textAlign: 'center' }}>{col.toUpperCase()}</p>
                    {cards.map(card => (
                      <div key={card} draggable
                        onDragStart={e => e.dataTransfer.setData('text', `${card}||${col}`)}
                        style={{
                          background: 'rgba(255,255,255,0.06)', border: `1px solid ${G.border}`,
                          padding: '8px 10px', marginBottom: 8, cursor: 'grab',
                          fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)',
                        }}>{card}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {active === 'analytics' && (
            <div>
              <canvas ref={chartRef} style={{ maxHeight: 320 }} />
            </div>
          )}

          {/* Voice Agent */}
          {active === 'voice' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                border: `2px solid ${G.gold}`, margin: '0 auto 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'pulse 2s infinite',
                boxShadow: `0 0 30px rgba(201,168,76,0.2)`,
              }}>
                <span style={{ fontSize: '2rem' }}>🎙</span>
              </div>
              <p style={{ fontFamily: 'Cinzel', fontSize: '0.8rem', letterSpacing: '0.25em', color: G.gold, marginBottom: 12 }}>
                VOICE AI AGENT
              </p>
              <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)', maxWidth: 400, margin: '0 auto 28px' }}>
                Deploy AI voice agents that handle inbound calls, qualify leads, and book appointments — 24/7.
              </p>
              <div style={{
                display: 'inline-block', padding: '10px 24px',
                border: `1px solid ${G.border}`, fontFamily: 'Montserrat', fontSize: '0.68rem',
                letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)',
              }}>COMING TO YOUR BUSINESS</div>
            </div>
          )}

          {/* Workflow */}
          {active === 'workflow' && (
            <div style={{ padding: '20px 0' }}>
              <p style={{ fontFamily: 'Cinzel', fontSize: '0.65rem', letterSpacing: '0.25em',
                color: G.gold, textAlign: 'center', marginBottom: 28 }}>AUTOMATED LEAD PIPELINE</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                {[
                  { icon: '📥', label: 'Lead Captured' },
                  { icon: '🤖', label: 'AI Qualifies' },
                  { icon: '📧', label: 'Email Sent' },
                  { icon: '📅', label: 'Meeting Booked' },
                  { icon: '💰', label: 'Deal Closed' },
                ].map((step, i, arr) => (
                  <React.Fragment key={step.label}>
                    <div style={{ textAlign: 'center', padding: '12px 16px' }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        border: `1px solid ${G.gold}`, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 8px',
                        background: 'rgba(201,168,76,0.06)',
                        fontSize: '1.4rem',
                      }}>{step.icon}</div>
                      <p style={{ fontFamily: 'Montserrat', fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.1em', maxWidth: 72 }}>{step.label}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ color: G.gold, fontSize: '1.2rem', opacity: 0.5 }}>→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PACKAGES
══════════════════════════════════════════════ */
function Packages() {
  const packages = [
    {
      name: 'Starter', price: 'R 4,500', period: '/month', img: '/starter-card.jpg',
      features: ['1 Automation Workflow', 'AI Chatbot Setup', 'Email Automation', 'Monthly Report', '5-Day Onboarding'],
      cta: 'Get Started', highlight: false,
    },
    {
      name: 'Growth', price: 'R 9,500', period: '/month', img: '/growth-card.jpg',
      features: ['5 Automation Workflows', 'CRM Integration', 'Lead Gen System', 'WhatsApp Bot', 'Bi-Weekly Strategy Call'],
      cta: 'Scale Now', highlight: true,
    },
    {
      name: 'Elite', price: 'Custom', period: '', img: '/elite-card.jpg',
      features: ['Unlimited Automations', 'Full AI Infrastructure', 'Voice Agent', 'Dedicated Engineer', '24/7 Priority Support'],
      cta: 'Contact Vale', highlight: false,
    },
  ];
  return (
    <section id="packages" style={{ background: 'rgba(0,0,0,0.6)', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,50px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontFamily: 'Cinzel', fontSize: '0.65rem', letterSpacing: '0.35em', color: G.gold, marginBottom: 14 }}>
            INVESTMENT
          </p>
          <h2 style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.6rem,4.5vw,2.6rem)', color: '#fff' }}>
            Choose Your Level
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {packages.map(pkg => (
            <div key={pkg.name} style={{
              flex: '1 1 280px', maxWidth: 340,
              border: `1px solid ${pkg.highlight ? G.gold : G.border}`,
              background: pkg.highlight ? 'rgba(201,168,76,0.04)' : 'rgba(0,0,0,0.4)',
              overflow: 'hidden', position: 'relative',
              boxShadow: pkg.highlight ? `0 0 40px rgba(201,168,76,0.12)` : 'none',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(201,168,76,0.15)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = pkg.highlight ? `0 0 40px rgba(201,168,76,0.12)` : 'none';
              }}
            >
              {pkg.highlight && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: G.gold, color: '#000',
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.58rem',
                  letterSpacing: '0.14em', padding: '4px 10px',
                }}>MOST POPULAR</div>
              )}
              <img src={pkg.img} alt={pkg.name}
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '28px 24px' }}>
                <p style={{ fontFamily: 'Cinzel', fontSize: '0.62rem', letterSpacing: '0.25em',
                  color: G.gold, marginBottom: 8 }}>{pkg.name.toUpperCase()}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.6rem,4vw,2rem)', color: '#fff' }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>
                    {pkg.period}
                  </span>
                </div>
                <div style={{ width: 32, height: 1, background: G.gold, marginBottom: 20 }} />
                {pkg.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: G.gold, fontSize: '0.65rem' }}>◆</span>
                    <span style={{ fontFamily: 'Montserrat', fontSize: '0.76rem', color: 'rgba(255,255,255,0.72)' }}>{f}</span>
                  </div>
                ))}
                <a href="#contact" style={{
                  display: 'block', textAlign: 'center', marginTop: 28, padding: '12px',
                  background: pkg.highlight ? G.gold : 'transparent',
                  border: `1px solid ${G.gold}`, color: pkg.highlight ? '#000' : G.gold,
                  fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.72rem',
                  letterSpacing: '0.16em', textDecoration: 'none', textTransform: 'uppercase',
                }}>{pkg.cta}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   BRAND MARK
══════════════════════════════════════════════ */
function BrandMark() {
  return (
    <section style={{ background: 'rgba(0,0,0,0.5)', padding: '96px 40px', textAlign: 'center' }}>
      <CrownSVG size={28} style={{ marginBottom: 14 }} />
      <p style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.2rem,4vw,2rem)',
        letterSpacing: '0.28em', color: G.gold }}>BLACK VALE AUTOMATION</p>
      <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: '1rem',
        color: 'rgba(255,255,255,0.4)', marginTop: 10, letterSpacing: '0.08em' }}>
        Precision. Intelligence. Results.
      </p>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════ */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch { setStatus('error'); }
  };

  const field = (key, label, type = 'text', multiline = false) => {
    const props = {
      value: form[key], placeholder: label,
      onChange: e => setForm(f => ({ ...f, [key]: e.target.value })),
      style: {
        width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${G.border}`,
        color: '#fff', fontFamily: 'Montserrat', fontSize: '0.8rem', padding: '14px 16px',
        outline: 'none', resize: 'vertical',
      },
    };
    return multiline ? <textarea key={key} {...props} rows={5} /> : <input key={key} type={type} {...props} />;
  };

  return (
    <section id="contact" style={{ background: 'rgba(0,0,0,0.6)', padding: 'clamp(60px,10vw,120px) clamp(20px,6vw,60px)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'Cinzel', fontSize: '0.65rem', letterSpacing: '0.35em', color: G.gold, marginBottom: 14 }}>
            BEGIN
          </p>
          <h2 style={{ fontFamily: 'Cinzel', fontWeight: 700, fontSize: 'clamp(1.6rem,4.5vw,2.6rem)', color: '#fff' }}>
            Contact Vale
          </h2>
          <div style={{ width: 40, height: 1, background: G.gold, margin: '20px auto 0' }} />
        </div>
        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <p style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', color: G.gold, marginBottom: 12 }}>Message Received.</p>
            <p style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: '1rem',
              color: 'rgba(255,255,255,0.6)' }}>Vale will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {field('name', 'Full Name')}
            {field('email', 'Email Address', 'email')}
            {field('business', 'Business Name')}
            {field('message', 'Tell us about your business…', 'text', true)}
            <button type="submit" disabled={status === 'sending'} style={{
              background: G.gold, color: '#000', border: 'none', padding: '15px',
              fontFamily: 'Montserrat', fontWeight: 700, fontSize: '0.8rem',
              letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
              opacity: status === 'sending' ? 0.7 : 1,
            }}>
              {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
            {status === 'error' && (
              <p style={{ color: G.crimson, fontFamily: 'Montserrat', fontSize: '0.75rem', textAlign: 'center' }}>
                Something went wrong. Email us at blackvaleautomation@protonmail.com
              </p>
            )}
          </form>
        )}
        {/* Direct contact */}
        <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {[
            { label: 'EMAIL', value: 'blackvaleautomation@protonmail.com' },
            { label: 'WHATSAPP', value: '+27 74 753 4679' },
          ].map(c => (
            <div key={c.label} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.22em',
                color: G.gold, marginBottom: 6 }}>{c.label}</p>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      background: 'rgba(0,0,0,0.8)', padding: '36px clamp(20px,5vw,50px) 26px',
      borderTop: `1px solid ${G.border}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex',
        flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CrownSVG size={26} />
          <span style={{ fontFamily: 'Cinzel', fontSize: '0.75rem', letterSpacing: '0.2em', color: G.gold }}>
            BLACK VALE AUTOMATION
          </span>
        </div>
        <p style={{ fontFamily: 'Montserrat', fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          © 2025 Black Vale Automation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   APP ROOT
══════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.15); }
          50% { box-shadow: 0 0 40px rgba(201,168,76,0.4); }
        }
      `}</style>

      {/* ── Fixed MP4 background ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video src="/hero-video.mp4" autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)' }} />
      </div>

      {/* ── All content floats above ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Founder />
        <LiveDemos />
        <Packages />
        <BrandMark />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
