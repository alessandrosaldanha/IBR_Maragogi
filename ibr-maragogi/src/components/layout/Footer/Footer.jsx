import { Cross, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Cross size={24} className="footer-logo-icon" />
            <span className="footer-logo-text">IBR Maragogi</span>
          </div>
          <p className="footer-tagline">
            Igreja Batista Reformada de Maragogi<br />
            proclaiming o evangelho com amor e verdade
          </p>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Navegação</h4>
          <ul className="footer-list">
            <li><a href="/">Início</a></li>
            <li><a href="/sobre-nos">Sobre Nós</a></li>
            <li><a href="/projetos">Projetos</a></li>
            <li><a href="/materiais">Materiais</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Contato</h4>
          <ul className="footer-list">
            <li>
              <MapPin size={16} />
              <span>Maragogi, AL - Brasil</span>
            </li>
            <li>
              <Phone size={16} />
              <span>(82) 9XXXX-XXXX</span>
            </li>
            <li>
              <Mail size={16} />
              <span>contato@ibrmaragogi.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 IBR Maragogi. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}