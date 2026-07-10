const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconHome(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
    </svg>
  );
}

export function IconChart(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M4 20V4M4 20h16M8 16V10M12 16V7M16 16v-4" />
    </svg>
  );
}

export function IconTarget(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <circle {...stroke} cx="12" cy="12" r="8" />
      <circle {...stroke} cx="12" cy="12" r="4" />
      <path {...stroke} d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  );
}

export function IconBolt(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

export function IconMap(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" />
    </svg>
  );
}

export function IconBulb(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3 11v3h6v-3a6 6 0 0 0-3-11z" />
    </svg>
  );
}

export function IconEdit(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export function IconMic(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect {...stroke} x="9" y="3" width="6" height="11" rx="3" />
      <path {...stroke} d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M4 20V6l8-3 8 3v14H4zM9 10h1M9 14h1M14 10h1M14 14h1M9 20v-4h6v4" />
    </svg>
  );
}

export function IconMessage(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M4 5h16v10H8l-4 4V5z" />
    </svg>
  );
}

export function IconCode(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
    </svg>
  );
}

export function IconFolder(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M4 7h5l2 2h9v10H4V7z" />
    </svg>
  );
}

export function IconFile(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path {...stroke} d="M14 2v6h6" />
    </svg>
  );
}

export function IconGrid(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect {...stroke} x="3" y="3" width="7" height="7" rx="1" />
      <rect {...stroke} x="14" y="3" width="7" height="7" rx="1" />
      <rect {...stroke} x="3" y="14" width="7" height="7" rx="1" />
      <rect {...stroke} x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M5 12l4 4L19 6" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconUpload(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path {...stroke} d="M12 16V4M8 8l4-4 4 4M4 20h16" />
    </svg>
  );
}

export function IconLock(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect {...stroke} x="5" y="11" width="14" height="10" rx="2" />
      <path {...stroke} d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const ICON_MAP = {
  home: IconHome,
  chart: IconChart,
  target: IconTarget,
  bolt: IconBolt,
  map: IconMap,
  bulb: IconBulb,
  edit: IconEdit,
  mic: IconMic,
  building: IconBuilding,
  message: IconMessage,
  code: IconCode,
  folder: IconFolder,
  file: IconFile,
  grid: IconGrid,
  check: IconCheck,
  x: IconX,
  'arrow-right': IconArrowRight,
  upload: IconUpload,
  lock: IconLock,
};

export default function Icon({ name, className = 'w-5 h-5', ...props }) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden {...props} />;
}

export { ICON_MAP };
