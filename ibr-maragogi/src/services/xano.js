// ============================================
// XANO API SERVICE LAYER
// ============================================
// This service is prepared for Xano integration
// Replace the base URL with your Xano instance

// Configuration - Replace with your Xano URL
const XANO_BASE_URL = import.meta.env.VITE_XANO_URL || 'https://your-xano-instance.xano.io';
const API_VERSION = '/api:v1';

// Base fetch wrapper with error handling
async function xanoFetch(endpoint, options = {}) {
  const url = `${XANO_BASE_URL}${API_VERSION}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Xano API Error:', error);
    throw error;
  }
}

// ============================================
// PROJECTS SERVICE
// ============================================

export const projectsService = {
  /**
   * Get all projects with optional filters
   */
  async getAll(page = 1, limit = 10) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/projects?page=${page}&limit=${limit}`);
    
    // Currently returns mock data
    return mockProjects;
  },

  /**
   * Get project by ID
   */
  async getById(id) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/projects/${id}`);
    
    return mockProjects.records.find(p => p.id === id) || mockProjects.records[0];
  },
};

// ============================================
// MATERIALS SERVICE
// ============================================

export const materialsService = {
  /**
   * Get materials with filters, pagination, and sorting
   */
  async getAll(filter = {}) {
    // TODO: Connect to Xano endpoint with query params
    // const params = new URLSearchParams();
    // if (filter.search) params.append('search', filter.search);
    // if (filter.category) params.append('category', filter.category);
    // if (filter.type) params.append('type', filter.type);
    // if (filter.sortBy) params.append('sort_by', filter.sortBy);
    // if (filter.sortOrder) params.append('sort_order', filter.sortOrder);
    // if (filter.page) params.append('page', filter.page.toString());
    // if (filter.limit) params.append('limit', filter.limit.toString());
    // return xanoFetch(`/materials?${params}`);
    
    return mockMaterials;
  },

  /**
   * Get material by ID
   */
  async getById(id) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/materials/${id}`);
    
    return mockMaterials.records.find(m => m.id === id) || mockMaterials.records[0];
  },

  /**
   * Create new material
   * Note: File upload would need multipart/form-data handling
   */
  async create(data) {
    // TODO: Connect to Xano endpoint
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (value instanceof File) {
    //     formData.append(key, value);
    //   } else {
    //     formData.append(key, JSON.stringify(value));
    //   }
    // });
    // return xanoFetch('/materials', {
    //   method: 'POST',
    //   body: formData,
    // });
    
    const newMaterial = {
      ...data,
      id: `mat_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newMaterial;
  },

  /**
   * Update existing material
   */
  async update(id, data) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/materials/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    
    return {
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    };
  },

  /**
   * Delete material
   */
  async delete(id) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/materials/${id}`, { method: 'DELETE' });
    
    console.log(`Deleted material: ${id}`);
  },
};

// ============================================
// FAQ SERVICE
// ============================================

export const faqService = {
  /**
   * Get all FAQs
   */
  async getAll() {
    // TODO: Connect to Xano endpoint
    // return xanoFetch('/faq');
    
    return mockFAQ;
  },

  /**
   * Get FAQ by ID
   */
  async getById(id) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch(`/faq/${id}`);
    
    return mockFAQ.records.find(f => f.id === id) || mockFAQ.records[0];
  },
};

// ============================================
// ABOUT SERVICE
// ============================================

export const aboutService = {
  /**
   * Get about page content
   */
  async getContent() {
    // TODO: Connect to Xano endpoint
    // return xanoFetch('/about');
    
    return mockAbout;
  },

  /**
   * Update about page content
   */
  async updateContent(data) {
    // TODO: Connect to Xano endpoint
    // return xanoFetch('/about', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
    
    return {
      ...mockAbout,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  },
};

// ============================================
// MOCK DATA (for demonstration)
// ============================================

const mockProjects = {
  records: [
    {
      id: 'proj_1',
      title: 'Projeto Evangelístico 2024',
      description: 'Trabalho de evangelização nas comunidades locais, levando a mensagem de esperança e amor através de ações sociais e religiosas.',
      imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop',
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: 'proj_2',
      title: 'Programa de Capacitação Profissional',
      description: 'Curso de qualificação profissional para jovens da comunidade, oferecendo oportunidades de emprego e desenvolvimento pessoal.',
      imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
      createdAt: '2024-02-20T14:30:00Z',
    },
    {
      id: 'proj_3',
      title: 'Assistência Social',
      description: 'Programa de apoio às famílias carentes com distribuição de cestas básicas, medicamentos e apoio psicológico.',
      imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
      createdAt: '2024-03-10T09:00:00Z',
    },
    {
      id: 'proj_4',
      title: 'Campus Kids',
      description: 'Ministério infantil com atividades semanais, aulas bíblicas e eventos especiais para crianças de 5 a 12 anos.',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      createdAt: '2024-04-05T16:00:00Z',
    },
  ],
  count: 4,
  page: 1,
  totalPages: 1,
};

const mockMaterials = {
  records: [
    {
      id: 'mat_1',
      title: 'Pregação - O Amor de Deus',
      description: 'Mensagem sobre o amor incondicional de Deus e como aplicar em nosso dia a dia.',
      category: 'pregacoes',
      type: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518546305927-5a440bbabb91?w=200&h=150&fit=crop',
      fileName: 'pregao_amor_de_deus.pdf',
      fileSize: 2450000,
      createdAt: '2024-03-15T10:00:00Z',
    },
    {
      id: 'mat_2',
      title: 'EBD - Lucas Capítulo 15',
      description: 'Aula da Escola Bíblica Dominical sobre a parábola do filho pródigo.',
      category: 'ebd',
      type: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
      fileName: 'ebd_lucas_15.pdf',
      fileSize: 1800000,
      createdAt: '2024-03-10T14:30:00Z',
    },
    {
      id: 'mat_3',
      title: 'Hino de Louvor - ABC',
      description: 'Partitura e letra do hino de louvor para Congregação.',
      category: 'materiais',
      type: 'docx',
      fileUrl: '#',
      fileName: 'hino_abc.docx',
      fileSize: 450000,
      createdAt: '2024-03-08T09:00:00Z',
    },
    {
      id: 'mat_4',
      title: 'Estatuto da Igreja',
      description: 'Documento oficial com as regras e diretrizes da instituição.',
      category: 'documentos',
      type: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: 'estatuto_2024.pdf',
      fileSize: 520000,
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'mat_5',
      title: 'Pregação - Fé e Esperança',
      description: 'Mensagem sobre a importância da fé e esperança na vida cristã.',
      category: 'pregacoes',
      type: 'pptx',
      fileUrl: '#',
      fileName: 'pregao_fe_esperanca.pptx',
      fileSize: 8500000,
      createdAt: '2024-03-20T19:00:00Z',
    },
    {
      id: 'mat_6',
      title: 'EBD - Evangelho de João',
      description: 'Série de estudos sobre o Evangelho de João - lições 1-10.',
      category: 'ebd',
      type: 'pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=150&fit=crop',
      fileName: 'ebd_joao_1_10.pdf',
      fileSize: 3200000,
      createdAt: '2024-03-17T10:00:00Z',
    },
    {
      id: 'mat_7',
      title: 'Planning Estratégico 2024',
      description: 'Planilha com metas e objetivos pastorais para o ano de 2024.',
      category: 'documentos',
      type: 'xlsx',
      fileUrl: '#',
      fileName: 'planning_2024.xlsx',
      fileSize: 180000,
      createdAt: '2024-01-15T08:00:00Z',
    },
    {
      id: 'mat_8',
      title: 'Fotos - Retreat 2024',
      description: 'Galeria de fotos do retreat anual da igreja.',
      category: 'materiais',
      type: 'image',
      fileUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=150&fit=crop',
      fileName: 'retreat_2024.jpg',
      fileSize: 4500000,
      createdAt: '2024-02-28T16:00:00Z',
    },
  ],
  count: 8,
  page: 1,
  totalPages: 1,
};

const mockFAQ = {
  records: [
    {
      id: 'faq_1',
      question: 'Quais são os horários dos cultos?',
      answer: 'Nossos cultos acontecem toda quarta-feira às 19h30 e domingo às 9h e 18h30. Também temos cultos de jovens aos sábados às 19h.',
      category: 'Cultos',
      order: 1,
    },
    {
      id: 'faq_2',
      question: 'Como posso me tornar membro da igreja?',
      answer: 'Para se tornar membro, basta participar de nosso curso de discipulado que acontece mensalmente. Entre em contato conosco para mais informações.',
      category: 'Membros',
      order: 2,
    },
    {
      id: 'faq_3',
      question: 'A igreja oferece algum tipo de assistência social?',
      answer: 'Sim! Temos um programa de assistência social que distribui cestas básicas mensalmente. Também oferecemos apoio psicológico e orientação jurídica.',
      category: 'Assistência',
      order: 3,
    },
    {
      id: 'faq_4',
      question: 'Existe escola bíblica para crianças?',
      answer: 'Sim! Temos a EBD (Escola Bíblica Dominical) para crianças de todas as idades durante o culto de domingo. Também temos o projeto Campus Kids com atividades semanais.',
      category: 'Crianças',
      order: 4,
    },
    {
      id: 'faq_5',
      question: 'Como posso fazer uma doação ou contribuição?',
      answer: 'Você pode fazer sua contribuição através de transferência bancária, PIX ou presencialmente durante os cultos. Entre em contato para receber os dados bancários.',
      category: 'Contribuições',
      order: 5,
    },
    {
      id: 'faq_6',
      question: 'A igreja realiza eventos especiais durante o ano?',
      answer: 'Sim! Realizamos diversos eventos como retiros espirituais, semanas de jejum, congressos de jovens, natal e muito mais. Siga nossas redes sociais para ficar por dentro!',
      category: 'Eventos',
      order: 6,
    },
  ],
  count: 6,
};

const mockAbout = {
  id: 'about_1',
  history: `A Igreja Batista Reformada de Maragogi foi fundada em 1995 com o propósito de proclamar o evangelho de Cristo e servir à comunidade local. Ao longo de mais de 25 anos, crescemos de um pequeno grupo de fiéis para uma comunidade vibrante que impacta não apenas Maragogi, mas toda a região.

Nossa jornada começou com um sonho de criar um espaço onde as pessoas pudessem encontrar não apenas um lugar de adoração, mas uma família espiritual. Hoje, continuamos comprometidos com a Palavra de Deus e com o crescimento espiritual de cada membro.`,
  mission: 'Proclamar o evangelho de Cristo de forma clara e relevante, discipulando vidas e servindo à comunidade com amor e excelência, glorificando a Deus em tudo o que fazemos.',
  vision: 'Ser uma igreja que transforma vidas através da verdade bíblica, desenvolve líderes que impactam a sociedade e mostra o amor de Deus através de ações concretas de serviço à comunidade.',
  values: [
    'Sola Scriptura - A Bíblia como única regra de fé e prática',
    'Exposição bíblica na pregação',
    'Comunhão genuína entre os membros',
    'Serviço à comunidade',
    'Integridade e transparência',
    'Amor e aceitação',
  ],
  bannerUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=400&fit=crop',
  updatedAt: '2024-03-01T00:00:00Z',
};

// Export service instances for use
export default {
  projects: projectsService,
  materials: materialsService,
  faq: faqService,
  about: aboutService,
};