export function Logo({ className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="black" />
      <path
        d="M8 22V10h4.2c2.8 0 4.5 1.4 4.5 3.6 0 1.5-.8 2.6-2.1 3.1L18 22h-3.2l-2.8-4.5H11.2V22H8zm3.2-7.2h1c1.1 0 1.7-.5 1.7-1.3 0-.8-.6-1.2-1.7-1.2h-1v2.5zM20 22V10h3v12h-3z"
        fill="white"
      />
    </svg>
  );
}

export function LogoWordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <Logo />
      <span className="text-lg font-semibold tracking-tight text-black">
        Career<span className="text-neutral-400">Pilot</span>
      </span>
    </span>
  );
}
