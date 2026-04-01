import './Input.css';

export default function Input({ 
  label,
  error,
  className = '',
  ...props 
}) {
  return (
    <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input 
        className="input-field" 
        {...props} 
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export function TextArea({ 
  label,
  error,
  className = '',
  rows = 4,
  ...props 
}) {
  return (
    <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <textarea 
        className="input-field textarea" 
        rows={rows}
        {...props} 
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export function Select({ 
  label,
  options,
  error,
  className = '',
  ...props 
}) {
  return (
    <div className={`input-group ${error ? 'input-error' : ''} ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <select className="input-field select" {...props}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}