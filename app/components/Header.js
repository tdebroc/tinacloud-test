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

      {/* Mobile overlay */}
      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`} id="mobileOverlay">
        {items.map(item => (
          <div key={item.label} className="nav-mobile-item">
            <a
              href={item.url ? bp(item.url) : undefined}
              onClick={!item.children?.length ? closeMobile : undefined}
              style={item.highlight ? { color: 'var(--gold)' } : undefined}
            >
              {item.label}
            </a>
            {item.children?.map(child => (
              <a
                key={child.label}
                href={bp(child.url)}
                onClick={closeMobile}
                className="nav-mobile-child"
              >
                {child.label}
              </a>
            ))}
          </div>
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
          {items.map(item => {
            const hasChildren = item.children?.length > 0
            return (
              <li key={item.label} className={hasChildren ? 'has-dropdown' : undefined}>
                <a
                  href={item.url ? bp(item.url) : undefined}
                  className={item.highlight ? 'nav-cta' : undefined}
                >
                  {item.label}
                  {hasChildren && <span className="nav-arrow">&#9662;</span>}
                </a>
                {hasChildren && (
                  <ul className="nav-dropdown">
                    {item.children.map(child => (
                      <li key={child.label}>
                        <a href={bp(child.url)}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
        <div className="nav-hamburger" id="hamburger" onClick={toggleMobile}>
          <span></span><span></span><span></span>
        </div>
      </nav>
    </>
  )
}
