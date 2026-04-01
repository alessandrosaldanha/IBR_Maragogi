import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.css';

const pageTitles = {
  '/': 'Início',
  '/sobre-nos': 'Sobre Nós',
  '/projetos': 'Projetos',
  '/materiais': 'Mensagens e Materiais',
  '/faq': 'Perguntas Frequentes',
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || 'IBR Maragogi';

  return (
    <div className="layout">
      <Header 
        onMenuToggle={() => setSidebarOpen(true)} 
        title={currentTitle}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}