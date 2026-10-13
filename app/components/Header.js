'use client'

import { useState, useEffect } from 'react'

const bp = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

export default function Header({ items = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen(v => !v)
  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    const nav = document.getElementById('nav')
    const bar = document.getElementById('readingProgress')

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      <div className="reading-progress" id="readingProgress"></div>

      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`} id="mobileOverlay">
        {items.map(item => (
          <a
            key={item.label}
            href={bp(item.url)}
            onClick={closeMobile}
            style={item.highlight ? { color: 'var(--gold)' } : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>

      <nav id="nav">
        <a href={bp('/')} className="nav-logo">
          <img src={bp('/Logo+SGJBG-1920w.webp')} alt="Saint-Jean-Baptiste de Grenelle" />
          <div className="nav-logo-text">
            <span className="name">SJBG</span>
            <span className="loc">Paris XV<sup>e</sup></span>
          </div>
        </a>
        <ul className="nav-links">
          {items.map(item => (
            <li key={item.label}>
              <a
                href={bp(item.url)}
                className={item.highlight ? 'nav-cta' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-hamburger" id="hamburger" onClick={toggleMobile}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </>
  )
}
