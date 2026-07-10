import Button from './Button';

export default function PageHeader({ title, subtitle, actionLabel, onAction, loading, disabled }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-black">{title}</h1>
        {subtitle && <p className="text-neutral-500 text-sm mt-1">{subtitle}</p>}
      </div>
      {actionLabel && (
        <Button onClick={onAction} disabled={disabled || loading}>
          {loading ? 'Working...' : actionLabel}
        </Button>
      )}
    </div>
  );
}
