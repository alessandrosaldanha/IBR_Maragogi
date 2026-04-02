import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  FolderKanban,
  Files,
  HelpCircle,
  X,
  Cross,
} from "lucide-react";
import "./Sidebar.css";
import logoMaragogi from "../../../assets/icons/logomaragogi.svg";

const navItems = [
  { path: "/", label: "Início", icon: Home },
  { path: "/sobre-nos", label: "Sobre Nós", icon: Info },
  { path: "/projetos", label: "Projetos", icon: FolderKanban },
  { path: "/materiais", label: "Mensagens e Materiais", icon: Files },
  { path: "/faq", label: "FAQ", icon: HelpCircle },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img
              src={logoMaragogi}
              alt="Logo IBR Maragogi"
              className="logo-img"
            />
            <div className="logo-text">
              <span className="logo-title">IBR Maragogi</span>
              <span className="logo-subtitle">Igreja Batista Reformada</span>
            </div>
          </div>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                onClick={onClose}
                end={item.path === "/"}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-copyright">© 2024 IBR Maragogi</p>
        </div>
      </aside>
    </>
  );
}
