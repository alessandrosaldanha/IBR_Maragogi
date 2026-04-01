import { ArrowRight } from 'lucide-react';
import Button from '../../common/Button/Button';
import './Hero.css';

export default function Hero({ 
  title = 'Bem-vindo à IBR Maragogi',
  subtitle = 'Uma comunidade de fé, amor e serviço',
  ctaText = 'Saiba Mais',
  ctaLink = '/sobre-nos',
  backgroundImage
}) {
  return (
    <section 
      className="hero" 
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {ctaText && (
          <Button variant="primary" size="large">
            {ctaText}
            <ArrowRight size={20} />
          </Button>
        )}
      </div>
      <div className="hero-decoration"></div>
    </section>
  );
}