import { Link } from 'react-router-dom';
import { Info, FolderKanban, Files, HelpCircle, ArrowRight } from 'lucide-react';
import './QuickAccess.css';

const quickAccessItems = [
  {
    icon: Info,
    title: 'Sobre Nós',
    description: 'Conheça nossa história, missão e valores',
    link: '/sobre-nos',
    color: '#FFD700',
  },
  {
    icon: FolderKanban,
    title: 'Projetos',
    description: 'Veja nossos projetos sociais e evangelísticos',
    link: '/projetos',
    color: '#1A1A1A',
  },
  {
    icon: Files,
    title: 'Materiais',
    description: 'Acesse pregações, aulas da EBD e documentos',
    link: '/materiais',
    color: '#FFD700',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Perguntas frequentes sobre nossa igreja',
    link: '/faq',
    color: '#1A1A1A',
  },
];

export default function QuickAccess() {
  return (
    <section className="quick-access">
      <div className="quick-access-container">
        <h2 className="quick-access-title">Explore Nossa Igreja</h2>
        <p className="quick-access-subtitle">
          Navigate por nossas principais áreas e conheça mais sobre a IBR Maragogi
        </p>
        
        <div className="quick-access-grid">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.title} 
                to={item.link} 
                className="quick-access-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="quick-access-icon"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <Icon size={28} />
                </div>
                <h3 className="quick-access-card-title">{item.title}</h3>
                <p className="quick-access-card-desc">{item.description}</p>
                <span className="quick-access-link">
                  Acessar <ArrowRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}