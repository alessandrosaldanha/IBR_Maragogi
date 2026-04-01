import { useState, useEffect } from 'react';
import { FolderKanban, ExternalLink, Calendar } from 'lucide-react';
import { projectsService } from '../../services/xano';
import { formatDate } from '../../utils/formatDate';
import { PageLoader } from '../../components/common/Loader/Loader';
import './Projects.css';

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProjects();
  }, [page]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsService.getAll(page, 6);
      setProjects(data.records);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && page === 1) {
    return <PageLoader />;
  }

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero">
        <div className="projects-hero-content">
          <h1 className="projects-hero-title">Nossos Projetos</h1>
          <p className="projects-hero-subtitle">
            Trabalho evangelístico e social que transforma vidas na nossa comunidade
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="projects-container">
          {loading ? (
            <PageLoader />
          ) : (
            <>
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <article 
                    key={project.id} 
                    className="project-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="project-image">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} />
                      ) : (
                        <div className="project-image-placeholder">
                          <FolderKanban size={48} />
                        </div>
                      )}
                    </div>
                    <div className="project-content">
                      <div className="project-meta">
                        <Calendar size={14} />
                        <span>{formatDate(project.createdAt)}</span>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <button className="project-link">
                        <span>Ver Detalhes</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="projects-pagination">
                  <button 
                    className="pagination-btn"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Anterior
                  </button>
                  <span className="pagination-info">
                    Página {page} de {totalPages}
                  </span>
                  <button 
                    className="pagination-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}