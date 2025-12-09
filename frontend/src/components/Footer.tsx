import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-authors">Autorzy: Szymon Paw, Filip Mech</div>
        <button
          type="button"
          className="footer-scroll"
          onClick={scrollToTop}
          aria-label="Przewiń na górę strony"
        >
          <span aria-hidden="true">↑</span>
        </button>
        <div className="footer-links">
          <a href="/regulamin">Regulamin</a>
          <span aria-hidden="true">•</span>
          <a href="/polityka-prywatnosci">Polityka prywatności</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
