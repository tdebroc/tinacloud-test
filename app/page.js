'use client'

import { useState, useEffect } from 'react'

const bp = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`

export default function Home() {
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

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            revealObserver.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObserver.observe(el))

    const container = document.getElementById('particles')
    if (container) {
      for (let i = 0; i < 35; i++) {
        const p = document.createElement('div')
        p.className = 'particle'
        const size = 1 + Math.random() * 2.5
        p.style.cssText = [
          `left:${Math.random() * 100}%`,
          `top:${45 + Math.random() * 45}%`,
          `width:${size}px`,
          `height:${size}px`,
          `--dur:${4 + Math.random() * 7}s`,
          `--delay:${Math.random() * 10}s`,
        ].join(';')
        container.appendChild(p)
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  return (
    <>
      <div className="reading-progress" id="readingProgress"></div>

      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`} id="mobileOverlay">
        <a href="#about" onClick={closeMobile}>La Paroisse</a>
        <a href="#events" onClick={closeMobile}>Agenda</a>
        <a href="#parish-life" onClick={closeMobile}>Vie Paroissiale</a>
        <a href="#sacraments" onClick={closeMobile}>Sacrements</a>
        <a href="#contact" onClick={closeMobile}>Contact</a>
        <a href="#mass-times" onClick={closeMobile} style={{ color: 'var(--gold)' }}>Horaires des Messes</a>
      </div>

      <nav id="nav">
        <a href="#" className="nav-logo">
          <img src={bp('/Logo+SGJBG-1920w.webp')} alt="Saint-Jean-Baptiste de Grenelle" />
          <div className="nav-logo-text">
            <span className="name">SJBG</span>
            <span className="loc">Paris XV<sup>e</sup></span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#about">La Paroisse</a></li>
          <li><a href="#events">Agenda</a></li>
          <li><a href="#parish-life">Vie Paroissiale</a></li>
          <li><a href="#sacraments">Sacrements</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#mass-times" className="nav-cta">Horaires</a></li>
        </ul>
        <div className="nav-hamburger" id="hamburger" onClick={toggleMobile}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-photo" style={{backgroundImage: `url('${bp('/images/hero-church.jpg')}')`}}></div>
        <div className="hero-texture"></div>
        <div className="hero-bg-cross"></div>
        <div className="particles" id="particles"></div>
        <div className="hero-content">
          <p className="hero-overline">Paroisse Catholique &middot; Paris 15<sup>e</sup> Arrondissement</p>
          <h1 className="hero-title">
            Saint-Jean-Baptiste<br />
            <em>de Grenelle</em>
          </h1>
          <p className="hero-location">14 place Étienne Pernet</p>
          <div className="hero-divider">
            <div className="hero-divider-line"></div>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <rect x="6" y="0" width="2" height="18" fill="#C9A84C" />
              <rect x="2" y="5" width="10" height="2" fill="#C9A84C" />
            </svg>
            <div className="hero-divider-line"></div>
          </div>
          <p className="hero-desc">
            Une communauté catholique vivante au cœur du 15<sup>e</sup> arrondissement,
            ouverte à tous, enracinée dans la foi et engagée dans le service.
          </p>
          <div className="hero-actions">
            <a href="#mass-times" className="btn-gold"><span>Horaires des Messes</span></a>
            <a href="#about" className="btn-outline">Découvrir la paroisse</a>
          </div>
        </div>
        <div
          className="hero-scroll"
          onClick={() => document.getElementById('mass-times').scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="hero-scroll-mouse">
            <div className="hero-scroll-wheel"></div>
          </div>
          <span className="hero-scroll-label">Défiler</span>
        </div>
      </section>

      {/* ═══ MASS TIMES ═══ */}
      <section id="mass-times" style={{ padding: 0 }}>
        <div className="mass-strip">
          <div className="mass-strip-label"><span>Horaires des&nbsp;Messes</span></div>
          <div className="mass-cell">
            <div className="mass-cell-day">Lun – Ven</div>
            <div className="mass-cell-time">7h30</div>
            <div className="mass-cell-note">Messe quotidienne</div>
          </div>
          <div className="mass-cell">
            <div className="mass-cell-day">Samedi</div>
            <div className="mass-cell-time">18h30</div>
            <div className="mass-cell-note">Messe de vigile</div>
          </div>
          <div className="mass-cell">
            <div className="mass-cell-day">Dimanche</div>
            <div className="mass-cell-time">9h &middot; 11h &middot; 18h30</div>
            <div className="mass-cell-note">Messes dominicales</div>
          </div>
          <div className="mass-cell">
            <div className="mass-cell-day">Confessions</div>
            <div className="mass-cell-time">Sur horaires</div>
            <div className="mass-cell-note">Ou sur rendez-vous</div>
          </div>
          <div className="mass-strip-link">
            <a href="https://www.sjbg.org/horaires">Tous les horaires →</a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about">
        <div className="about-grid">
          <div className="about-visual reveal-l">
            <div className="about-img-wrap">
              <img src={bp('/images/parish-1.jpg')} alt="Église Saint-Jean-Baptiste de Grenelle" className="about-photo" />
              <div className="about-img-overlay"></div>
            </div>
            <div className="stat-card">
              <div className="stat-accent"></div>
              <div className="stat-number">1886</div>
              <div className="stat-label">Année de fondation<br />de la paroisse</div>
            </div>
          </div>
          <div className="about-text-wrap">
            <div className="section-header reveal-r">
              <span className="section-tag">Notre Communauté</span>
              <h2 className="section-title">Une paroisse <em>vivante</em><br />au cœur de Paris</h2>
              <div className="ornament">
                <div className="ornament-line"></div>
                <div className="ornament-diamond"></div>
                <div className="ornament-line"></div>
              </div>
            </div>
            <p className="about-p reveal-r d1">
              Située au <strong>14 place Étienne Pernet</strong> dans le 15<sup>e</sup> arrondissement,
              la paroisse Saint-Jean-Baptiste de Grenelle est une communauté catholique dynamique qui
              accueille chaque jour fidèles, familles et personnes en recherche.
            </p>
            <p className="about-p reveal-r d2">
              Animée par une équipe pastorale dédiée — prêtres, diacres et laïcs en mission — notre
              paroisse offre une riche vie liturgique, des parcours de formation spirituelle, et un
              engagement caritatif concret auprès des plus fragiles du quartier.
            </p>
            <div className="pillars">
              <div className="pillar reveal d1">
                <div className="pillar-icon">🙏</div>
                <div className="pillar-name">Prière &amp; Liturgie</div>
                <div className="pillar-text">Messes, confessions, adorations et offices tout au long de la semaine.</div>
              </div>
              <div className="pillar reveal d2">
                <div className="pillar-icon">📖</div>
                <div className="pillar-name">Formation</div>
                <div className="pillar-text">Parcours Alpha, Zachée, catéchèse pour enfants et adultes.</div>
              </div>
              <div className="pillar reveal d3">
                <div className="pillar-icon">🤝</div>
                <div className="pillar-name">Charité</div>
                <div className="pillar-text">Vestiaire, Maraudes Antigel, accompagnement des plus démunis.</div>
              </div>
              <div className="pillar reveal d4">
                <div className="pillar-icon">✨</div>
                <div className="pillar-name">Jeunesse &amp; Famille</div>
                <div className="pillar-text">Aumôneries, mouvements de jeunesse et groupes familiaux.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ OCLOCHER ═══ */}
      <section id="oclocher">
        <div className="oclocher-wrap">
          <div className="section-header reveal" style={{ marginBottom: '2.5rem' }}>
            <span className="section-tag">En direct</span>
            <h2 className="section-title">L'actualité de <em>la paroisse</em></h2>
            <div className="ornament">
              <div className="ornament-line"></div>
              <div className="ornament-diamond"></div>
              <div className="ornament-line"></div>
            </div>
            <p className="section-desc">
              Retrouvez en temps réel les événements, annonces et intentions de prière de Saint-Jean-Baptiste de Grenelle.
            </p>
          </div>
          <div className="oclocher-frame-box reveal">
            <iframe
              src="https://widget.oclocher.app/organization/JVPsmntokME521d00UTP/carousel"
              title="Actualités — Saint-Jean-Baptiste de Grenelle (oClocher)"
              loading="lazy"
              allow="autoplay"
            ></iframe>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="oclocher-badge">Propulsé par oClocher · Ma paroisse dans la poche</span>
          </div>
        </div>
      </section>

      {/* ═══ EVENTS ═══ */}
      <section id="events">
        <div className="events-wrap">
          <div className="section-header reveal">
            <span className="section-tag">Agenda</span>
            <h2 className="section-title on-dark">Prochains <em>événements</em></h2>
            <div className="ornament">
              <div className="ornament-line"></div>
              <div className="ornament-diamond"></div>
              <div className="ornament-line"></div>
            </div>
            <p className="section-desc on-dark">Rejoignez-nous pour les temps forts de notre vie paroissiale.</p>
          </div>
          <div className="events-grid">
            <div className="ev-card featured reveal d1">
              <div className="ev-card-bg" style={{ backgroundImage: `url('${bp('/images/community.jpg')}')` }}></div>
              <div className="ev-date">
                <span className="ev-date-n">9</span>
                <span className="ev-date-m">Oct</span>
              </div>
              <div className="ev-cat">Fête Paroissiale</div>
              <h3 className="ev-title">Kermesse d'Automne</h3>
              <p className="ev-body">
                Trois jours de fête, de partage et de convivialité au cœur de la paroisse.
                Stands, animations pour petits et grands, buvette et bonne humeur garantie !
              </p>
              <div className="ev-meta">
                <span>📅 9 · 10 · 11 octobre 2026</span>
                <span>📍 14 pl. Étienne Pernet</span>
              </div>
              <a href="https://www.sjbg.org" className="ev-link">En savoir plus →</a>
            </div>
            <div className="ev-card reveal d2">
              <div className="ev-card-bg" style={{ backgroundImage: `url('${bp('/images/pelerinage.jpg')}')` }}></div>
              <div className="ev-date">
                <span className="ev-date-n">13</span>
                <span className="ev-date-m">Oct</span>
              </div>
              <div className="ev-cat">Pèlerinage</div>
              <h3 className="ev-title">Pèlerinage en Bulgarie</h3>
              <p className="ev-body">Réunion d'information pour le pèlerinage paroissial. Un projet spirituel hors du commun, ouvert à tous.</p>
              <div className="ev-meta"><span>📅 13 octobre 2026</span></div>
              <a href="https://www.sjbg.org" className="ev-link">S'inscrire →</a>
            </div>
            <div className="ev-card reveal d3">
              <div className="ev-card-bg" style={{ backgroundImage: `url('${bp('/images/rosary.jpg')}')` }}></div>
              <div className="ev-date">
                <span className="ev-date-n" style={{ fontSize: '1.3rem', padding: '0.2rem 0' }}>Mens.</span>
                <span className="ev-date-m">Récurrent</span>
              </div>
              <div className="ev-cat">Adoration</div>
              <h3 className="ev-title">La Bande à Jésus</h3>
              <p className="ev-body">Soirées d'adoration mensuelles ouvertes à tous, pour un moment de prière profonde et de louange.</p>
              <div className="ev-meta"><span>🕯️ Chaque mois</span></div>
              <a href="https://www.sjbg.org" className="ev-link">En savoir plus →</a>
            </div>
            <div className="ev-card reveal d4">
              <div className="ev-card-bg" style={{ backgroundImage: `url('${bp('/images/conference.jpg')}')` }}></div>
              <div className="ev-date">
                <span className="ev-date-n" style={{ fontSize: '1.2rem', padding: '0.1rem 0' }}>Oct</span>
                <span className="ev-date-m">2025</span>
              </div>
              <div className="ev-cat">Formation</div>
              <h3 className="ev-title">Parcours Alpha 2025</h3>
              <p className="ev-body">Explorez les grandes questions de la vie et de la foi dans un cadre convivial et bienveillant.</p>
              <div className="ev-meta"><span>📖 10 sessions</span></div>
              <a href="https://www.sjbg.org" className="ev-link">S'inscrire →</a>
            </div>
            <div className="ev-card reveal d5">
              <div className="ev-card-bg" style={{ backgroundImage: `url('${bp('/images/capture.jpg')}')` }}></div>
              <div className="ev-date">
                <span className="ev-date-n" style={{ fontSize: '1.2rem', padding: '0.1rem 0' }}>Nov</span>
                <span className="ev-date-m">2025</span>
              </div>
              <div className="ev-cat">Formation</div>
              <h3 className="ev-title">Parcours Zachée</h3>
              <p className="ev-body">Un parcours de réconciliation et de retour à la foi, pour ceux qui s'en sont éloignés.</p>
              <div className="ev-meta"><span>📿 Sur inscription</span></div>
              <a href="https://www.sjbg.org" className="ev-link">En savoir plus →</a>
            </div>
          </div>
          <div className="events-footer reveal">
            <a href="https://www.sjbg.org/agenda" className="btn-outline">Voir tout l'agenda →</a>
          </div>
        </div>
      </section>

      {/* ═══ PARISH LIFE ═══ */}
      <section id="parish-life">
        <div className="life-wrap">
          <div className="section-header reveal">
            <span className="section-tag">Vie Paroissiale</span>
            <h2 className="section-title">S'engager, <em>grandir</em>, servir</h2>
            <div className="ornament">
              <div className="ornament-line"></div>
              <div className="ornament-diamond"></div>
              <div className="ornament-line"></div>
            </div>
            <p className="section-desc">Découvrez les nombreux groupes et ministères qui animent notre communauté.</p>
          </div>
          <div className="life-grid">
            {[
              { img: 'choir.jpg', alt: 'Chorales SJBG', icon: '🎵', name: 'Chorales & Musique', desc: 'Plusieurs chorales accompagnent notre liturgie. Rejoignez-nous pour chanter la louange au Seigneur à chaque messe dominicale.' },
              { img: 'profession-foi.jpg', alt: 'Catéchèse SJBG', icon: '👶', name: 'Catéchèse Enfants', desc: 'Préparation aux sacrements pour les enfants de 7 à 15 ans, animée par des équipes de catéchistes bénévoles engagés.' },
              { img: 'community.jpg', alt: 'Jeunes SJBG', icon: '🌱', name: 'Aumônerie Jeunes', desc: 'Mouvements de jeunesse, JMJ, retraites et week-ends pour collégiens, lycéens et étudiants du quartier.' },
              { img: 'vestiaire.jpg', alt: 'Le Vestiaire SJBG', icon: '👕', name: 'Le Vestiaire', desc: 'Distribution de vêtements aux personnes dans le besoin. Un ministère de charité concret pour les plus pauvres du quartier.' },
              { img: 'landscape.jpg', alt: 'Maraudes Antigel', icon: '❄️', name: 'Maraudes Antigel', desc: 'Sorties hivernales pour aller à la rencontre des personnes sans-abri et leur apporter vivres, chaleur et fraternité.' },
              { img: 'rosary.jpg', alt: 'Adoration SJBG', icon: '🕯️', name: 'Adoration & Prière', desc: "Chapelle ouverte, adoration du Saint-Sacrement, groupes de prière et fraternités pour approfondir la vie intérieure." },
            ].map((item, i) => (
              <div key={item.img} className={`life-card reveal d${i + 1}`}>
                <div className="life-card-photo">
                  <img src={bp(`/images/${item.img}`)} alt={item.alt} />
                  <div className="life-card-photo-overlay"></div>
                </div>
                <div className="life-icon-box">{item.icon}</div>
                <div className="life-name">{item.name}</div>
                <div className="life-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SACRAMENTS ═══ */}
      <section id="sacrements">
        <div id="sacraments" className="sac-wrap">
          <div className="section-header reveal">
            <span className="section-tag">Sacrements</span>
            <h2 className="section-title">Les <em>sacrements</em><br />de l'Église</h2>
            <div className="ornament">
              <div className="ornament-line"></div>
              <div className="ornament-diamond"></div>
              <div className="ornament-line"></div>
            </div>
            <p className="section-desc">Notre paroisse célèbre et prépare tous les sacrements de l'Église catholique.</p>
          </div>
          <div className="sac-grid">
            {[
              { icon: '💧', name: 'Baptême', text: 'Accueil dans la communauté chrétienne. Préparation proposée pour enfants et adultes.' },
              { icon: '🕊️', name: 'Confirmation', text: 'Affermissement de la foi reçue au baptême, pour les jeunes et pour les adultes en démarche.' },
              { icon: '💍', name: 'Mariage', text: "Préparation au mariage chrétien avec des sessions d'accompagnement pour les futurs époux." },
              { icon: '✝️', name: 'Funérailles', text: "Accompagnement des familles dans l'épreuve du deuil avec la prière et la présence de l'Église." },
            ].map((s, i) => (
              <div key={s.name} className={`sac-card reveal d${i + 1}`}>
                <div className="sac-icon"><span>{s.icon}</span></div>
                <div className="sac-name">{s.name}</div>
                <div className="sac-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VERSE ═══ */}
      <section id="verse">
        <div className="verse-bg" style={{backgroundImage: `url('${bp('/images/hero-prayer.jpg')}')`}}></div>
        <div className="verse-wrap reveal">
          <span className="verse-mark">&ldquo;</span>
          <p className="verse-text">
            « Je suis le chemin, la vérité et la vie.
            Personne ne vient au Père sans passer par moi. »
          </p>
          <div className="verse-ref">Jean 14, 6</div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-header reveal-l">
              <span className="section-tag">Contact &amp; Accès</span>
              <h2 className="section-title">Venez <em>nous rendre visite</em></h2>
              <div className="ornament" style={{ justifyContent: 'center' }}>
                <div className="ornament-line"></div>
                <div className="ornament-diamond"></div>
                <div className="ornament-line"></div>
              </div>
            </div>
            <div className="cinfo-item reveal-l d1">
              <div className="cinfo-icon">📍</div>
              <div>
                <div className="cinfo-lbl">Adresse</div>
                <div className="cinfo-val">14 place Étienne Pernet<br />75015 Paris</div>
              </div>
            </div>
            <div className="cinfo-item reveal-l d2">
              <div className="cinfo-icon">📞</div>
              <div>
                <div className="cinfo-lbl">Téléphone</div>
                <div className="cinfo-val"><a href="tel:+33156568310">01 56 56 83 10</a></div>
              </div>
            </div>
            <div className="cinfo-item reveal-l d3">
              <div className="cinfo-icon">✉️</div>
              <div>
                <div className="cinfo-lbl">Email</div>
                <div className="cinfo-val">
                  <a href="mailto:accueil@sjbg.org">accueil@sjbg.org</a><br />
                  <small>Maison paroissiale : <a href="mailto:maison.paroissiale@sjbg.org">maison.paroissiale@sjbg.org</a></small>
                </div>
              </div>
            </div>
            <div className="cinfo-item reveal-l d4">
              <div className="cinfo-icon">🏠</div>
              <div>
                <div className="cinfo-lbl">Réservations Maison Paroissiale</div>
                <div className="cinfo-val"><a href="tel:+33951088711">09 51 08 87 11</a></div>
              </div>
            </div>
          </div>
          <div className="reveal-r">
            <div className="map-box">
              <div className="map-bg"></div>
              <div className="map-pin-group">
                <div className="map-pin-head"></div>
                <div className="map-pin-stick"></div>
                <div className="map-label">
                  Saint-Jean-Baptiste de Grenelle<br />
                  14 pl. Étienne Pernet, 75015
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=14+place+Etienne+Pernet+75015+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="map-ext"
              >
                Ouvrir dans Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <div className="footer-wrap">
          <div className="footer-top">
            <div>
              <div className="footer-logo-name">Saint-Jean-Baptiste de Grenelle</div>
              <div className="footer-logo-sub">Paroisse catholique, Paris XV<sup>e</sup></div>
              <p className="footer-blurb">
                Une communauté vivante, enracinée dans la foi, ouverte à tous. Venez prier, vous former
                et servir avec nous au cœur du 15<sup>e</sup> arrondissement de Paris.
              </p>
            </div>
            <div>
              <div className="footer-col-head">La Paroisse</div>
              <ul className="footer-list">
                <li><a href="https://www.sjbg.org">Présentation</a></li>
                <li><a href="https://www.sjbg.org">Équipe pastorale</a></li>
                <li><a href="https://www.sjbg.org">Histoire</a></li>
                <li><a href="https://www.sjbg.org">La Chapelle</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-head">Vie Spirituelle</div>
              <ul className="footer-list">
                <li><a href="https://www.sjbg.org">Horaires des messes</a></li>
                <li><a href="https://www.sjbg.org">Sacrements</a></li>
                <li><a href="https://www.sjbg.org">Parcours Alpha</a></li>
                <li><a href="https://www.sjbg.org">Parcours Zachée</a></li>
                <li><a href="https://www.sjbg.org">Adoration</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-head">Engagement</div>
              <ul className="footer-list">
                <li><a href="https://www.sjbg.org">Le Vestiaire</a></li>
                <li><a href="https://www.sjbg.org">Maraudes Antigel</a></li>
                <li><a href="https://www.sjbg.org">Saint-Vincent de Paul</a></li>
                <li><a href="https://www.sjbg.org">Bénévolat</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Paroisse Saint-Jean-Baptiste de Grenelle · Paris XV<sup>e</sup></span>
            <div className="footer-bottom-links">
              <a href="https://www.sjbg.org">sjbg.org</a>
              <a href="https://www.sjbg.org">Mentions légales</a>
              <a href="mailto:accueil@sjbg.org">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
