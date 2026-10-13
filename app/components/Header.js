'use client'

import { useState, useEffect } from 'react'

const bp = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

export default function Header() {
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
        <a href={bp('/#about')} onClick={closeMobile}>La Paroisse</a>
        <a href={bp('/#events')} onClick={closeMobile}>Agenda</a>
        <a href={bp('/#parish-life')} onClick={closeMobile}>Vie Paroissiale</a>
        <a href={bp('/#sacraments')} onClick={closeMobile}>Sacrements</a>
        <a href={bp('/#contact')} onClick={closeMobile}>Contact</a>
        <a href={bp('/#mass-times')} onClick={closeMobile} style={{ color: 'var(--gold)' }}>Horaires des Messes</a>
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
          <li><a href={bp('/#about')}>La Paroisse</a></li>
          <li><a href={bp('/#events')}>Agenda</a></li>
          <li><a href={bp('/#parish-life')}>Vie Paroissiale</a></li>
          <li><a href={bp('/#sacraments')}>Sacrements</a></li>
          <li><a href={bp('/#contact')}>Contact</a></li>
          <li><a href={bp('/#mass-times')} className="nav-cta">Horaires</a></li>
        </ul>
        <div className="nav-hamburger" id="hamburger" onClick={toggleMobile}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </>
  )
}
