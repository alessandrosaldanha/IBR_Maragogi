import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqService } from '../../services/xano';
import { PageLoader } from '../../components/common/Loader/Loader';
import './FAQ.css';

export default function FAQ() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const data = await faqService.getAll();
      setFaqs(data.records);
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter FAQs by search
  const filteredFAQs = faqs.filter(faq => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <h1 className="faq-hero-title">Perguntas Frequentes</h1>
          <p className="faq-hero-subtitle">
            Encontre respostas para as dúvidas mais comuns sobre nossa igreja
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="faq-search-section">
        <div className="faq-search-container">
          <div className="faq-search">
            <Search size={20} className="faq-search-icon" />
            <input 
              type="text"
              placeholder="Buscar nas perguntas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="faq-search-input"
            />
            {search && (
              <button 
                className="faq-search-clear" 
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="faq-list-section">
        <div className="faq-container">
          {filteredFAQs.length === 0 ? (
            <div className="faq-empty">
              <HelpCircle size={48} />
              <h3>Nenhuma pergunta encontrada</h3>
              <p>Tente buscar com outras palavras ou <button onClick={() => setSearch('')}>limpe a busca</button></p>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={faq.id} 
                  className={`faq-item ${expandedId === faq.id ? 'faq-item-expanded' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button 
                    className="faq-question"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={expandedId === faq.id}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-question-icon">
                      {expandedId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="faq-contact">
        <div className="faq-contact-container">
          <h2>Ainda tem dúvidas?</h2>
          <p>Entre em contato conosco que we'll be happy to help!</p>
          <a href="mailto:contato@ibrmaragogi.org" className="faq-contact-btn">
            Fale Conosco
          </a>
        </div>
      </section>
    </div>
  );
}