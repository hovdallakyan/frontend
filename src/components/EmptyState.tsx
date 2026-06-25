interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="py-16 text-center text-slate-500">
      <p>{message}</p>
    </div>
  );
}
