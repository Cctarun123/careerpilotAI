export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) {
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 border border-black',
    secondary: 'bg-transparent text-black border border-neutral-600 hover:border-black hover:bg-neutral-100',
    ghost: 'text-neutral-400 hover:text-black hover:bg-neutral-100 border border-transparent',
    danger: 'bg-neutral-100 text-neutral-700 border border-neutral-600 hover:border-neutral-400',
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
