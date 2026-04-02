import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Eye,
  Download,
  FileText,
  Presentation,
  Table,
  Image,
  File,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { materialsService } from "../../services/xano";
import { formatDate } from "../../utils/formatDate";
import {
  formatFileSize,
  getFileType,
  getFileTypeLabel,
} from "../../utils/fileUtils";
import {
  PageLoader,
  InlineLoader,
} from "../../components/common/Loader/Loader";
import "./Materials.css";

// Category labels
const categoryLabels = {
  pregacoes: "Pregações",
  ebd: "EBD",
  materiais: "Materiais",
  documentos: "Documentos",
};

// File type icons
const FileTypeIcon = ({ type }) => {
  const iconMap = {
    pdf: FileText,
    doc: FileText,
    docx: FileText,
    txt: FileText,
    ppt: Presentation,
    pptx: Presentation,
    xls: Table,
    xlsx: Table,
    image: Image,
  };
  const Icon = iconMap[type] || File;
  return <Icon size={20} />;
};

// Material Card Component
function MaterialCard({ material, onView, onDownload }) {
  const fileType = getFileType(material.fileName);
  const isPreviewable = ["pdf", "image"].includes(fileType);

  return (
    <div className="material-card">
      {/* Thumbnail */}
      <div className="material-thumbnail">
        {material.thumbnailUrl ? (
          <img src={material.thumbnailUrl} alt={material.title} />
        ) : (
          <div className="material-thumbnail-placeholder">
            <FileTypeIcon type={fileType} />
          </div>
        )}
        <span className="material-type-badge">
          {getFileTypeLabel(fileType)}
        </span>
      </div>

      {/* Content */}
      <div className="material-content">
        <span className="material-category">
          {categoryLabels[material.category]}
        </span>
        <h3 className="material-title">{material.title}</h3>
        {material.description && (
          <p className="material-description">{material.description}</p>
        )}
        <div className="material-meta">
          <span className="material-date">
            {formatDate(material.createdAt)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="material-actions">
        <button
          className="material-action-btn view"
          onClick={() => onView(material)}
          title="Visualizar"
        >
          <Eye size={18} />
          <span>Visualizar</span>
        </button>
        <button
          className="material-action-btn download"
          onClick={() => onDownload(material)}
          title="Baixar"
        >
          <Download size={18} />
          <span>Baixar</span>
        </button>
      </div>
    </div>
  );
}

// File Preview Modal
function FilePreviewModal({ material, onClose }) {
  if (!material) return null;

  const fileType = getFileType(material.fileName);

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-header">
          <h3>{material.title}</h3>
          <button className="preview-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="preview-modal-content">
          {fileType === "pdf" && (
            <div className="preview-pdf">
              <iframe
                src={material.fileUrl}
                title={material.title}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay"
              />
            </div>
          )}
          {fileType === "image" && (
            <div className="preview-image">
              <img src={material.fileUrl} alt={material.title} />
            </div>
          )}
          {!["pdf", "image"].includes(fileType) && (
            <div className="preview-generic">
              <div className="preview-generic-icon">
                <FileTypeIcon type={fileType} size={64} />
              </div>
              <p className="preview-filename">{material.fileName}</p>
              <p className="preview-type">{getFileTypeLabel(fileType)}</p>
            </div>
          )}
        </div>
        <div className="preview-modal-footer">
          <button
            className="preview-download-btn"
            onClick={() => window.open(material.fileUrl, "_blank")}
          >
            <Download size={18} />
            Baixar Arquivo
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Materials Page
export default function Materials() {
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grid");

  // Modal
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [materials, search, categoryFilter, typeFilter, sortBy, sortOrder]);

  const loadMaterials = async () => {
    setLoading(true);
    try {
      const data = await materialsService.getAll();

      // O Xano geralmente retorna um array direto.
      // Se ele retornar {records: [...]}, usamos data.records, senão usamos data.
      const rawRecords = Array.isArray(data) ? data : data.records || [];

      // Aqui fazemos a "mágica" de adaptar os nomes das colunas
      const formattedData = rawRecords.map((item) => ({
        ...item,
        // O componente espera 'thumbnailUrl', o Xano manda 'cover_image.url'
        thumbnailUrl: item.cover_image?.url || null,
        // O componente espera 'fileUrl', o Xano manda 'file_url'
        // E já trocamos o link do Drive para modo de visualização (preview)
        fileUrl: item.file_url?.replace("/view?usp=sharing", "/preview"),
        // O componente usa o nome do arquivo para saber o ícone (PDF, etc)
        fileName: item.title + ".pdf",
        // Como o arquivo está no Drive, o Xano não sabe o tamanho, então fixamos "PDF"
        fileSize: 0,
        createdAt: item.created_at,
      }));

      setMaterials(formattedData);
    } catch (error) {
      console.error("Error loading materials:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...materials];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchLower) ||
          m.description?.toLowerCase().includes(searchLower),
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((m) => m.category === categoryFilter);
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((m) => getFileType(m.fileName) === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortOrder === "desc"
          ? titleB.localeCompare(titleA)
          : titleA.localeCompare(titleB);
      }
    });

    setFilteredMaterials(filtered);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setTypeFilter("");
    setSortBy("date");
    setSortOrder("desc");
  };

  const handleView = (material) => {
    setSelectedMaterial(material);
  };

  const handleDownload = (material) => {
    // In a real app, this would trigger file download
    window.open(material.fileUrl, "_blank");
  };

  const hasActiveFilters = search || categoryFilter || typeFilter;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="materials-page">
      {/* Hero */}
      <section className="materials-hero">
        <div className="materials-hero-content">
          <h1 className="materials-hero-title">Mensagens e Materiais</h1>
          <p className="materials-hero-subtitle">
            Acesse pregações, aulas da EBD, documentos e materiais
            complementares
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="materials-filters">
        <div className="materials-filters-container">
          {/* Search */}
          <div className="materials-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar materiais..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch("")}>
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="materials-filter-group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas as Categorias</option>
              <option value="pregações">Pregações</option>
              <option value="ebd">EBD</option>
              <option value="documentos">Documentos</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos os Tipos</option>
              <option value="pdf">PDF</option>
              <option value="docx">Word</option>
              <option value="pptx">PowerPoint</option>
              <option value="xlsx">Excel</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setSortBy(by);
                setSortOrder(order);
              }}
              className="filter-select"
            >
              <option value="date-desc">Mais Recentes</option>
              <option value="date-asc">Mais Antigas</option>
              <option value="title-asc">A-Z</option>
              <option value="title-desc">Z-A</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Visualização em grid"
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="Visualização em lista"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="active-filters">
            <span>Filtros ativos:</span>
            {search && <span className="filter-tag">{search}</span>}
            {categoryFilter && (
              <span className="filter-tag">
                {categoryLabels[categoryFilter]}
              </span>
            )}
            {typeFilter && (
              <span className="filter-tag">{getFileTypeLabel(typeFilter)}</span>
            )}
            <button className="clear-filters" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      {/* Results */}
      <section className="materials-results">
        <div className="materials-container">
          <div className="results-info">
            <span>{filteredMaterials.length} material(is) encontrado(s)</span>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="empty-state">
              <FileText size={64} />
              <h3>Nenhum material encontrado</h3>
              <p>Try different search terms or clear filters</p>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className={`materials-${viewMode}`}>
              {filteredMaterials.map((material, index) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onView={handleView}
                  onDownload={handleDownload}
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {selectedMaterial && (
        <FilePreviewModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  );
}
