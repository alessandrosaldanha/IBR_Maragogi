import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Star, Quote } from 'lucide-react';
import { aboutService } from '../../services/xano';
import { PageLoader } from '../../components/common/Loader/Loader';
import './About.css';

export default function About() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await aboutService.getContent();
      setContent(data);
    } catch (error) {
      console.error('Error loading about content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">Sobre Nós</h1>
          <p className="about-hero-subtitle">Conheça a história e os valores que guiam nossa comunidade</p>
        </div>
        <div className="about-hero-decoration"></div>
      </section>

      {/* History Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-history">
            <div className="about-history-content">
              <h2 className="about-section-title">Nossa História</h2>
              <p className="about-text">{content?.history}</p>
            </div>
            <div className="about-history-image">
              <div className="about-image-placeholder">
                <Quote size={48} />
                <span>25+ Anos de História</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="about-values-section">
        <div className="about-container">
          <h2 className="about-section-title about-section-title-center">O que nos move</h2>
          
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon">
                <Target size={32} />
              </div>
              <h3 className="about-value-title">Missão</h3>
              <p className="about-value-text">{content?.mission}</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <Eye size={32} />
              </div>
              <h3 className="about-value-title">Visão</h3>
              <p className="about-value-text">{content?.vision}</p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon">
                <Heart size={32} />
              </div>
              <h3 className="about-value-title">Valores</h3>
              <ul className="about-values-list">
                {content?.values?.map((value, index) => (
                  <li key={index}>
                    <Star size={14} className="value-star" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="about-container">
          <div className="about-stats-grid">
            <div className="about-stat">
              <span className="about-stat-number">25+</span>
              <span className="about-stat-label">Anos de História</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">1000+</span>
              <span className="about-stat-label">Membros</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">50+</span>
              <span className="about-stat-label">Projetos Sociais</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">5</span>
              <span className="about-stat-label">Ministérios Ativos</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}