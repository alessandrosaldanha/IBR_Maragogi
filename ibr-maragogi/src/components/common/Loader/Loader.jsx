import './Loader.css';

export default function Loader({ size = 'medium', className = '' }) {
  return (
    <div className={`loader loader-${size} ${className}`}>
      <div className="loader-spinner"></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="page-loader">
      <Loader size="large" />
      <p className="page-loader-text">Carregando...</p>
    </div>
  );
}

export function InlineLoader({ text = 'Carregando...' }) {
  return (
    <div className="inline-loader">
      <Loader size="small" />
      <span>{text}</span>
    </div>
  );
}