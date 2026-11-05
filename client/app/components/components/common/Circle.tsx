'use client';

import { useId } from 'react';

export default function CircularText({ text }: { text: string }) {
  const id = useId();

  return (
    <div aria-hidden className="pointer-events-none select-none">
      <svg
        viewBox="0 0 200 200"
        className="h-16 w-16 text-white"
        role="presentation"
      >
        <defs>
          <path
            id={`circle-path-${id}`}
            d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
          />
        </defs>
        <text
          fill="currentColor"
          fontSize="12"
          fontFamily="inherit"
          letterSpacing="0.25em"
        >
          <textPath href={`#circle-path-${id}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

