/**
 * Format date to Brazilian format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (dd/MM/yyyy)
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Format date with time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date with time
 */
export function formatDateTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Format relative time (e.g., "há 2 dias")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time string
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'agora';
  if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} minutos`;
  if (diffInSeconds < 86400) return `há ${Math.floor(diffInSeconds / 3600)} horas`;
  if (diffInSeconds < 2592000) return `há ${Math.floor(diffInSeconds / 86400)} dias`;
  if (diffInSeconds < 31536000) return `há ${Math.floor(diffInSeconds / 2592000)} meses`;
  return `há ${Math.floor(diffInSeconds / 31536000)} anos`;
}

export default { formatDate, formatDateTime, formatRelativeTime };