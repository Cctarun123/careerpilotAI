import Button from './Button';
import Icon from '../icons/Icons';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card w-full max-w-lg p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <Button variant="ghost" onClick={onClose} className="!px-2 !py-1">
            <Icon name="x" className="w-4 h-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
