'use client';

import InternalServerError from '@/components/Error/InternalServerError';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <div>
      <InternalServerError errorText="Упс! Щось пішло не так, ми вже працюємо над виправленням" />
      {/* <h2>Something went wrong!</h2>
        <p>{error.name}</p>
        <button onClick={() => reset()}>Try again</button> */}
    </div>
  );
}
