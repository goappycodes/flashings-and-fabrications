export function ArrowIcon({ className = "arrow-icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}

export function Chevron() {
  return (
    <svg className="chevron" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="m1.5 3.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
