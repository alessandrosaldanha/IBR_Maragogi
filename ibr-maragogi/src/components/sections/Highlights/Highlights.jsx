import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, FileText } from 'lucide-react';
import { formatDate } from '../../../utils/formatDate';
import './Highlights.css';

export default function Highlights({ items = [], title = 'Destaques Recentes', viewAllLink = '/' }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="highlights">
      <div className="highlights-container">
        <div className="highlights-header">
          <h2 className="highlights-title">{title}</h2>
          <Link to={viewAllLink} className="highlights-view-all">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        <div className="highlights-grid">
          {items.slice(0, 4).map((item, index) => (
            <article 
              key={item.id || index} 
              className="highlight-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="highlight-image">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} />
                ) : (
                  <div className="highlight-image-placeholder">
                    <FileText size={32} />
                  </div>
                )}
              </div>
              <div className="highlight-content">
                <div className="highlight-meta">
                  <Calendar size={14} />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="highlight-title">{item.title}</h3>
                {item.description && (
                  <p className="highlight-description">
                    {item.description.length > 100 
                      ? `${item.description.substring(0, 100)}...` 
                      : item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}