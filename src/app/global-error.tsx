'use client';

import Error from '@/components/Error/Error';
import error500 from './../../public/500.png';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Error errorText="" errorCode={error500} />
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
