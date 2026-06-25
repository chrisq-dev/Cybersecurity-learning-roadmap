"use client";

import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="reading-progress"
      aria-hidden="true"
      style={{ width: `${progress}%` }}
    />
  );
}
