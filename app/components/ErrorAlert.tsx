/**
 * Component to display an error message with an optional retry button.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.error - The error message to display.
 * @param {() => void} [props.onRetry] - Optional callback to retry the failed action.
 * @returns {JSX.Element} A styled error alert component.
 */
export default function ErrorAlert<T>({
  error,
  onRetry,
}: {
  error: string;
  /**
   * Callback without a return value
   */
  onRetry?: () => void;
}): JSX.Element {
  return (
    <div
      className="relative mt-4 flex items-center justify-between rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
      aria-live="polite"
      aria-label="Error notification"
    >
      <div>
        <strong className="font-bold">Error: </strong>
        <span>{error}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-red-600 px-4 py-1 text-white transition hover:bg-red-700"
          aria-label="Retry the action"
        >
          Retry
        </button>
      )}
    </div>
  );
}
