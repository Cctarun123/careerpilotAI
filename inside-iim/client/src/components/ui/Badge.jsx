export default function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-400 border border-neutral-300',
    success: 'bg-black text-white border border-black',
    warning: 'bg-neutral-300 text-black border border-neutral-600',
    danger: 'bg-white text-neutral-600 border border-neutral-400',
    accent: 'bg-black text-white border border-black',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
