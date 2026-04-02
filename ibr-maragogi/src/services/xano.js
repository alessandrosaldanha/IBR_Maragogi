// Configuração de URL do seu Xano
const XANO_BASE_URL = "https://x8ki-letl-twmt.n7.xano.io";
const API_VERSION = "/api:4NEYGl3e";

/**
 * Função auxiliar para fazer as requisições ao Xano
 */
async function xanoFetch(endpoint, options = {}) {
  const url = `${XANO_BASE_URL}${API_VERSION}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
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
      throw new Error(
        `Erro na API Xano: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Xano API Fetch Error:", error);
    throw error;
  }
}

// ============================================
// 1. SERVIÇO DE MATERIAIS (CONEXÃO REAL)
// ============================================
export const materialsService = {
  /**
   * Busca todos os materiais do Xano e adapta os nomes dos campos
   */
  // Dentro do seu materialsService no xano.js

  async getAll() {
    try {
      const data = await xanoFetch("/materials");
      const rawRecords = Array.isArray(data) ? data : data.records || [];

      return {
        records: rawRecords.map((item) => {
          // LOG DE DEPURAÇÃO: Isso vai mostrar no console do seu navegador
          // exatamente o que o Xano está enviando.
          console.log("Item vindo do Xano:", item);

          // Aqui tentamos pegar o link de qualquer lugar que ele possa estar
          const linkOriginal = item.file_url || item.file || item.url || "#";

          return {
            ...item,
            thumbnailUrl: item.cover_image?.url || null,

            // Se o link existir, limpamos ele. Se não, mandamos para o '#'
            fileUrl:
              linkOriginal !== "#"
                ? linkOriginal
                    .replace("/view?usp=sharing", "/preview")
                    .replace("/view", "/preview")
                : "#",

            fileName: item.title ? `${item.title}.pdf` : "arquivo.pdf",
            // Substitua a linha fileSize: 0, por esta:
            fileSize: null,
            createdAt: item.created_at,
          };
        }),
        count: rawRecords.length,
      };
    } catch (error) {
      console.error("Erro ao carregar materiais:", error);
      return { records: [], count: 0 };
    }
  },

  async getById(id) {
    const item = await xanoFetch(`/materials/${id}`);
    return {
      ...item,
      thumbnailUrl: item.cover_image?.url,
      fileUrl: item.file_url?.replace("/view", "/preview"),
      createdAt: item.created_at,
    };
  },
};

// ============================================
// 2. OUTROS SERVIÇOS (MOCKS PARA O BUILD NÃO FALHAR)
// ============================================
// Nota: Quando você criar as tabelas de Projetos, FAQ e Sobre no Xano,
// basta seguir a mesma lógica do materialsService acima.

export const projectsService = {
  async getAll() {
    return { records: [], count: 0 };
  },
  async getById(id) {
    return null;
  },
};

export const faqService = {
  async getAll() {
    return { records: [], count: 0 };
  },
};

export const aboutService = {
  async getContent() {
    return {
      history: "História da igreja carregando...",
      mission: "",
      vision: "",
      values: [],
    };
  },
};

// Exportação padrão agrupada
export default {
  materials: materialsService,
  projects: projectsService,
  faq: faqService,
  about: aboutService,
};
