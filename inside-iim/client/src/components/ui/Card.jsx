export default function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`glass-card p-6 ${onClick ? 'cursor-pointer hover:bg-neutral-100/50 transition-colors' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
    >
      {children}
    </div>
  );
}
