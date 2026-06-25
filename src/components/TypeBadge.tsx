import { getTypeStyle } from '../lib/typeStyles';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md';
}

export function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const color = getTypeStyle(type);
  const sizeClass =
    size === 'md'
      ? 'px-3 py-1 text-xs'
      : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-block rounded-full font-semibold uppercase tracking-wide text-white shadow-sm ring-1 ring-white/20 ${sizeClass} ${color}`}
    >
      {type}
    </span>
  );
}
