/**
 * Get file extension from filename
 * @param {string} filename 
 * @returns {string} Extension in lowercase
 */
export function getFileExtension(filename) {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Get file type category from extension
 * @param {string} filename 
 * @returns {string} File type category
 */
export function getFileType(filename) {
  const ext = getFileExtension(filename);
  const typeMap = {
    pdf: 'pdf',
    doc: 'doc',
    docx: 'docx',
    txt: 'txt',
    ppt: 'ppt',
    pptx: 'pptx',
    xls: 'xlsx',
    xlsx: 'xlsx',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    svg: 'image',
    webp: 'image',
  };
  return typeMap[ext] || 'other';
}

/**
 * Format file size to human readable
 * @param {number} bytes 
 * @returns {string} Formatted size
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  
  return `${size.toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

/**
 * Get file type label for display
 * @param {string} type - File type
 * @returns {string} Display label
 */
export function getFileTypeLabel(type) {
  const labels = {
    pdf: 'PDF',
    doc: 'Word',
    docx: 'Word',
    txt: 'Texto',
    ppt: 'PowerPoint',
    pptx: 'PowerPoint',
    xls: 'Excel',
    xlsx: 'Excel',
    image: 'Imagem',
    other: 'Arquivo',
  };
  return labels[type] || 'Arquivo';
}

/**
 * Get icon name for file type
 * @param {string} type - File type
 * @returns {string} Icon component name
 */
export function getFileIcon(type) {
  const icons = {
    pdf: 'FileText',
    doc: 'FileText',
    docx: 'FileText',
    txt: 'FileText',
    ppt: 'Presentation',
    pptx: 'Presentation',
    xls: 'Table',
    xlsx: 'Table',
    image: 'Image',
    other: 'File',
  };
  return icons[type] || 'File';
}

/**
 * Check if file type supports preview
 * @param {string} type - File type
 * @returns {boolean}
 */
export function supportsPreview(type) {
  return ['pdf', 'image'].includes(type);
}

/**
 * Generate a safe filename
 * @param {string} filename 
 * @returns {string} Safe filename
 */
export function sanitizeFilename(filename) {
  if (!filename) return '';
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

/**
 * Check if file is an image
 * @param {string} filename 
 * @returns {boolean}
 */
export function isImageFile(filename) {
  const type = getFileType(filename);
  return type === 'image';
}

export default {
  getFileExtension,
  getFileType,
  formatFileSize,
  getFileTypeLabel,
  getFileIcon,
  supportsPreview,
  sanitizeFilename,
  isImageFile,
};