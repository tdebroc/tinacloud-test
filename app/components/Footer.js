export default function Footer() {
  return (
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
  )
}
