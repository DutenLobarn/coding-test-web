/**
 * Spinner component to indicate loading state.
 * This is a reusable component for displaying a simple loading spinner.
 *
 * @returns {JSX.Element} The rendered loading spinner.
 */
export default function Spinner(): JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="flex items-center justify-center py-8"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-600"></div>
    </div>
  );
}
