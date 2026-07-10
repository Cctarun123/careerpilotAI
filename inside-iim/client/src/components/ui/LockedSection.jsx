import Icon from '../icons/Icons';

export default function LockedSection({ locked, message, children }) {
  return (
    <div className="relative min-h-[12rem]">
      <div
        className={
          locked
            ? 'pointer-events-none select-none blur-[1px] opacity-35 saturate-50'
            : undefined
        }
        aria-hidden={locked}
      >
        {children}
      </div>
      {locked && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 rounded-md border border-dashed border-neutral-300 bg-neutral-100/80"
          role="status"
        >
          <div className="icon-box icon-box-lg mb-3">
            <Icon name="lock" className="w-5 h-5" />
          </div>
          <p className="text-sm text-neutral-600 text-center max-w-sm">{message}</p>
        </div>
      )}
    </div>
  );
}
