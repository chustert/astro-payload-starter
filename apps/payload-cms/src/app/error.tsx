'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Something went wrong</h1>
      <p>Sorry about that. Please try again.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
      <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
        {error?.message}
      </pre>
    </main>
  );
}
