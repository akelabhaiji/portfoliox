import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const BORDER = 'rgba(124,58,237,0.18)'
const CARD_BG = 'rgba(13,21,38,0.85)'
const NAVY = '#080d1a'

const gradientText: React.CSSProperties = {
  background: 'linear-gradient(135deg, #a78bfa 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const glassCard: React.CSSProperties = {
  background: CARD_BG,
  border: `1px solid ${BORDER}`,
  borderRadius: 20,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
}

function Reveal({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const { ref, visible } = useScrollReveal()
  const translate = direction === 'up' ? 'translateY(40px)' : direction === 'left' ? 'translateX(-40px)' : 'translateX(40px)'
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const services = [
  { icon: <PenToolIcon />, title: 'UI/UX Design', desc: 'Crafting intuitive, user-centered interfaces that delight and convert.' },
  { icon: <MonitorIcon />, title: 'Website Design', desc: 'Beautiful, functional websites tailored to your brand and goals.' },
  { icon: <SmartphoneIcon />, title: 'Responsive Design', desc: 'Pixel-perfect layouts that look stunning on every screen size.' },
  { icon: <LayoutIcon />, title: 'Landing Page Design', desc: 'High-converting landing pages designed to make a lasting impression.' },
  { icon: <GridIcon />, title: 'Wireframing & Prototyping', desc: 'From concept to clickable prototype, validating ideas fast.' },
  { icon: <BrandIcon />, title: 'Brand Identity Design', desc: "Cohesive visual identities that tell your brand's story." },
]

const portfolioProjects = [
  { id: 1, title: 'Lumina Dashboard', category: 'UI/UX Design', img: 'https://picsum.photos/600/400?random=11' },
  { id: 2, title: 'Verdant Studio', category: 'Website Design', img: 'https://picsum.photos/600/400?random=22' },
  { id: 3, title: 'Novu Commerce', category: 'Landing Page', img: 'https://picsum.photos/600/400?random=33' },
  { id: 4, title: 'Helix Finance', category: 'Brand Identity', img: 'https://picsum.photos/600/400?random=44' },
  { id: 5, title: 'Aura Portfolio', category: 'Responsive Design', img: 'https://picsum.photos/600/400?random=55' },
  { id: 6, title: 'Orbit SaaS', category: 'Wireframing', img: 'https://picsum.photos/600/400?random=66' },
]

const testimonials = [
  {
    name: 'Nadia Svensson',
    role: 'CEO, Verdant Studio',
    text: 'Akela transformed our brand completely. The attention to detail and creative vision brought our company to a whole new level. Absolutely exceptional work.',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 5,
  },
  {
    name: 'Marcus Oyelaran',
    role: 'Product Lead, Helix Finance',
    text: 'Working with Akela was a seamless experience. The designs were delivered on time, looked stunning, and our users loved the new interface. Highly recommended.',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
  },
  {
    name: 'Priya Mehta',
    role: 'Founder, Orbit SaaS',
    text: 'Incredible designer with a real eye for modern aesthetics. Our landing page conversions went up 63% after the redesign. Worth every penny.',
    avatar: 'https://i.pravatar.cc/80?img=26',
    rating: 5,
  },
]

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)

    const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact']
    const handler = () => {
      const scrollY = window.scrollY + 100
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
    setFormState({ name: '', email: '', message: '' })
  }

  const navItems = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact']

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: NAVY, color: '#e2e8f0', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Ambient bg blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: `1px solid ${BORDER}`, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(8,13,26,0.85)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ ...gradientText, fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', display: 'block' }}>Akela Bhai</span>
          </button>
          <ul style={{ display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="ab-desktop-nav">
            {navItems.map(item => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  style={{
                    background: activeSection === item ? 'rgba(124,58,237,0.12)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    padding: '6px 14px', borderRadius: 8,
                    fontSize: 14, fontWeight: 500, textTransform: 'capitalize' as const,
                    color: activeSection === item ? '#a78bfa' : '#94a3b8',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <a
                href="mailto:contact@akelabhai.com"
                style={{
                  padding: '8px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  color: '#fff', textDecoration: 'none', display: 'block',
                }}
              >
                Hire Me
              </a>
            </li>
          </ul>
          <button
            onClick={() => setMenuOpen(m => !m)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#e2e8f0' }}
            className="ab-hamburger"
            aria-label="Menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background: 'rgba(8,13,26,0.98)', borderTop: `1px solid ${BORDER}`, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 0', textAlign: 'left' as const,
                  fontSize: 15, fontWeight: 500, textTransform: 'capitalize' as const,
                  color: activeSection === item ? '#a78bfa' : '#94a3b8',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
          <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
            <HeroPhoto />
          </div>
          <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, animation: 'ab-fadeDown 0.8s ease both', marginBottom: 16 }}>
            Welcome to my portfolio
          </p>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 24px', animation: 'ab-fadeUp 0.8s 0.1s ease both' }}>
            I am <span style={gradientText}>Akela Bhai</span>,<br />a Web Designer
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94a3b8', maxWidth: 560, margin: '0 auto 48px', lineHeight: 1.8, animation: 'ab-fadeUp 0.8s 0.2s ease both', fontWeight: 300 }}>
            Crafting digital experiences that blend aesthetic beauty with purposeful function — one pixel at a time.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' as const, animation: 'ab-fadeUp 0.8s 0.3s ease both' }}>
            <a
              href="mailto:contact@akelabhai.com"
              style={{
                padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                color: '#fff', textDecoration: 'none',
                boxShadow: '0 0 40px rgba(124,58,237,0.35)',
              }}
            >
              Hire Me
            </a>
            <button
              onClick={() => scrollTo('portfolio')}
              style={{
                padding: '14px 36px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                background: 'transparent', border: '2px solid rgba(124,58,237,0.5)',
                color: '#a78bfa', cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              View Portfolio
            </button>
          </div>
          <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#94a3b8' }}>Scroll</span>
            <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #7c3aed, transparent)' }} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
          <Reveal direction="left">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', zIndex: 0 }} />
                <img
                  src="https://i.ibb.co/1G7Jc35m/100008591.jpg"
                  alt="Akela Bhai"
                  style={{ width: 280, height: 280, borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 1, border: '4px solid #080d1a', display: 'block' }}
                  onError={e => { e.currentTarget.src = 'https://i.pravatar.cc/280?img=68' }}
                />
                <div style={{ position: 'absolute', bottom: 16, right: 0, ...glassCard, padding: '10px 18px', zIndex: 2, whiteSpace: 'nowrap' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>Available for work</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>Open to projects</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div>
              <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>About Me</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 24px', lineHeight: 1.2 }}>
                Designing with <span style={gradientText}>purpose</span>
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 16, fontSize: 15 }}>
                I am <strong style={{ color: '#e2e8f0' }}>Akela Bhai</strong>, a Web Designer passionate about creating beautiful, functional digital experiences. With a keen eye for aesthetics and a deep understanding of user behavior, I transform ideas into compelling visual stories.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.9, marginBottom: 36, fontSize: 15 }}>
                My expertise spans UI design, website design, and responsive design — ensuring every project not only looks exceptional but works flawlessly across all devices and platforms.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}>
                {['UI Design', 'Website Design', 'Responsive Design', 'Figma', 'Prototyping'].map(skill => (
                  <span key={skill} style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)', color: '#a78bfa' }}>{skill}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '100px 24px', position: 'relative', zIndex: 1, background: 'linear-gradient(to bottom, transparent, rgba(13,21,38,0.6), transparent)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>What I Offer</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0 }}>My <span style={gradientText}>Services</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>Recent Work</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0 }}>My <span style={gradientText}>Portfolio</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {portfolioProjects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <PortfolioCard {...p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: '100px 24px', position: 'relative', zIndex: 1, background: 'linear-gradient(to bottom, transparent, rgba(13,21,38,0.6), transparent)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>Client Words</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0 }}>What They <span style={gradientText}>Say</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' as const, color: '#06b6d4', fontWeight: 600, marginBottom: 12 }}>Get In Touch</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: 0 }}>Contact <span style={gradientText}>Me</span></h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>
            <Reveal direction="left">
              <div style={{ ...glassCard, padding: 40 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>Let's work together</h3>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>Have a project in mind? I'd love to hear about it. Send a message and let's create something remarkable.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <a href="mailto:contact@akelabhai.com" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: '#e2e8f0' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MailIcon />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase' as const, fontWeight: 600 }}>Email</div>
                      <div style={{ fontSize: 14, color: '#a78bfa', fontWeight: 500 }}>contact@akelabhai.com</div>
                    </div>
                  </a>
                  <a href="https://akelabhai.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', color: '#e2e8f0' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <GlobeIcon />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase' as const, fontWeight: 600 }}>Website</div>
                      <div style={{ fontSize: 14, color: '#06b6d4', fontWeight: 500 }}>akelabhai.com</div>
                    </div>
                  </a>
                </div>
                <div style={{ marginTop: 40 }}>
                  <p style={{ fontSize: 12, color: '#64748b', letterSpacing: 2, textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: 16 }}>Follow Me</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {[
                      { href: 'https://instagram.com/akelabhai', icon: <InstagramIcon />, color: '#e1306c' },
                      { href: 'https://facebook.com/akelabhai', icon: <FacebookIcon />, color: '#1877f2' },
                      { href: 'https://linkedin.com/in/akelabhai', icon: <LinkedInIcon />, color: '#0a66c2' },
                      { href: 'https://twitter.com/akelabhai', icon: <TwitterIcon />, color: '#1da1f2' },
                    ].map(({ href, icon, color }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                          color: '#94a3b8', textDecoration: 'none', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}28` }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ ...glassCard, padding: 40 }}>
                {formSent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                      <CheckIcon />
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', ...gradientText }}>Message Sent!</h3>
                    <p style={{ color: '#94a3b8', fontSize: 14 }}>Thank you for reaching out. I'll get back to you shortly.</p>
                    <button onClick={() => setFormSent(false)} style={{ marginTop: 24, padding: '10px 24px', borderRadius: 10, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa', cursor: 'pointer', fontSize: 14, fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>Your Name</label>
                      <input
                        type="text" required placeholder="Nadia Svensson" value={formState.name}
                        onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontFamily: "'Poppins', sans-serif", outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>Email Address</label>
                      <input
                        type="email" required placeholder="hello@example.com" value={formState.email}
                        onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontFamily: "'Poppins', sans-serif", outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 8 }}>Message</label>
                      <textarea
                        required rows={5} placeholder="Tell me about your project..." value={formState.message}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontSize: 14, fontFamily: "'Poppins', sans-serif", outline: 'none', boxSizing: 'border-box' as const, resize: 'none' as const, transition: 'border-color 0.2s' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        padding: '14px', borderRadius: 12, fontSize: 15, fontWeight: 700,
                        background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                        color: '#fff', border: 'none', cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif",
                        boxShadow: '0 0 30px rgba(124,58,237,0.3)',
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 24px', borderTop: `1px solid ${BORDER}`, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <a
          href="https://akelabhai.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#64748b', textDecoration: 'none', fontSize: 14 }}
        >
          Design by <span style={{ ...gradientText, fontWeight: 600 }}>akelabhai.com</span>
        </a>
      </footer>

      <style>{`
        @keyframes ab-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ab-fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes ab-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ab-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .ab-desktop-nav { display: flex !important; }
        .ab-hamburger { display: none !important; }
        @media (max-width: 768px) {
          .ab-desktop-nav { display: none !important; }
          .ab-hamburger { display: flex !important; }
        }
        input::placeholder, textarea::placeholder { color: #475569; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}

function HeroPhoto() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', zIndex: 0, animation: 'ab-spin 8s linear infinite' }} />
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', zIndex: 0, opacity: 0.5, animation: 'ab-pulse 2s ease-out infinite' }} />
      <img
        src="https://i.ibb.co/1G7Jc35m/100008591.jpg"
        alt="Akela Bhai — Web Designer"
        style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 1, border: '4px solid #080d1a', display: 'block' }}
        onError={e => { e.currentTarget.src = 'https://i.pravatar.cc/160?img=68' }}
      />
    </div>
  )
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassCard,
        padding: 32,
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(124,58,237,0.2)' : 'none',
        borderColor: hovered ? 'rgba(124,58,237,0.4)' : BORDER,
        cursor: 'default',
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: hovered ? 'linear-gradient(135deg, #7c3aed, #06b6d4)' : 'rgba(124,58,237,0.12)',
        border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20, color: hovered ? '#fff' : '#a78bfa',
        transition: 'all 0.3s', flexShrink: 0,
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 10px', color: '#e2e8f0' }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  )
}

function PortfolioCard({ img, title, category }: { img: string; title: string; category: string; id: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', cursor: 'pointer', border: `1px solid ${BORDER}` }}
    >
      <img
        src={img}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s', transform: hovered ? 'scale(1.08)' : 'none' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(8,13,26,0.88)' : 'rgba(8,13,26,0)',
        backdropFilter: hovered ? 'blur(4px)' : 'none',
        transition: 'all 0.4s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{ transform: hovered ? 'none' : 'translateY(20px)', opacity: hovered ? 1 : 0, transition: 'all 0.3s', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, background: 'rgba(124,58,237,0.3)', border: '1px solid rgba(124,58,237,0.5)', color: '#a78bfa', marginBottom: 10 }}>{category}</span>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#e2e8f0', margin: 0 }}>{title}</h3>
          <div style={{ width: 40, height: 2, background: 'linear-gradient(to right, #7c3aed, #06b6d4)', margin: '16px auto 0' }} />
        </div>
      </div>
    </div>
  )
}

function TestimonialCard({ name, role, text, avatar, rating }: { name: string; role: string; text: string; avatar: string; rating: number }) {
  return (
    <div style={{ ...glassCard, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ color: '#f59e0b', display: 'flex', gap: 3 }}>
        {Array.from({ length: rating }).map((_, i) => <span key={i} style={{ fontSize: 16 }}>{'★'}</span>)}
      </div>
      <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8, margin: 0, flex: 1, fontStyle: 'italic' }}>"{text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
        <img src={avatar} alt={name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(124,58,237,0.3)' }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#e2e8f0' }}>{name}</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open
        ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>)
        : (<><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>)
      }
    </svg>
  )
}

function PenToolIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
}
function MonitorIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
}
function SmartphoneIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
}
function LayoutIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
}
function GridIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
}
function BrandIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function MailIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
function GlobeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
}
function CheckIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
function InstagramIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
}
function FacebookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
}
function LinkedInIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}
function TwitterIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
}
