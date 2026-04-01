import './Header.css';
import { Menu } from 'lucide-react';

export default function Header({ onMenuToggle, title }) {
  return (
    <header className="header">
      <button 
        className="menu-toggle" 
        onClick={onMenuToggle}
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>
      <h1 className="header-title">{title}</h1>
    </header>
  );
}