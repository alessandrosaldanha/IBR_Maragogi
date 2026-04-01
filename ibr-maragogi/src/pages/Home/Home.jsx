import { useState, useEffect } from 'react';
import Hero from '../../components/sections/Hero/Hero';
import QuickAccess from '../../components/sections/QuickAccess/QuickAccess';
import Highlights from '../../components/sections/Highlights/Highlights';
import { projectsService, materialsService } from '../../services/xano';
import { PageLoader } from '../../components/common/Loader/Loader';
import './Home.css';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    loadHighlights();
  }, []);

  const loadHighlights = async () => {
    try {
      // Load recent materials for highlights
      const materialsData = await materialsService.getAll({ limit: 2 });
      const projectsData = await projectsService.getAll(1, 2);
      
      // Combine and sort by date
      const combined = [
        ...materialsData.records.map(m => ({ ...m, type: 'material' })),
        ...projectsData.records.map(p => ({ ...p, type: 'project' })),
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setHighlights(combined);
    } catch (error) {
      console.error('Error loading highlights:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="home-page">
      <Hero
        title="Bem-vindo à IBR Maragogi"
        subtitle="Uma comunidade de fé, amor e serviço. Aqui você encontra um lar espiritual onde cada pessoa é valorizada e incentivada a crescer em sua jornada de fé."
        ctaText="Conheça Nossa História"
        ctaLink="/sobre-nos"
      />
      
      <QuickAccess />
      
      <Highlights 
        items={highlights}
        title="Últimas Atualizações"
        viewAllLink="/materiais"
      />
    </div>
  );
}