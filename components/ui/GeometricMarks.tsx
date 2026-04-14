export function CrossMark({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-brand-accent ${className}`}
    >
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function OpenSquare({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-brand-accent ${className}`}
    >
      <path d="M4 8V4H8M16 4H20V8M20 16V20H16M8 20H4V16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function DotCluster({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-brand-accent ${className}`}
    >
      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="18" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function SectionRule({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px bg-brand-accent/30 flex-grow" />
      {label && <span className="text-xs font-mono text-brand-accent tracking-widest">{label}</span>}
      <div className="h-px bg-brand-accent/30 flex-grow" />
    </div>
  );
}
