import { AlertIcon } from './icons';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertIcon className="h-6 w-6" />
      </div>
      <p className="max-w-sm text-sm font-semibold text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-dark"
        >
          Try again
        </button>
      )}
    </div>
  );
}
