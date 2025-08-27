"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ThreeCanvas = dynamic(() => import('@/components/three-canvas'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center">
      <Skeleton className="h-full w-full" />
      <p className="absolute text-lg text-foreground">Loading 3D Scene...</p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <ThreeCanvas />
      <div className="pointer-events-none absolute bottom-4 left-4 text-foreground/80 bg-background/50 p-2 rounded-md shadow-lg">
        <p className="font-headline font-bold">FarmNest</p>
        <p className="text-sm">Hover and click the farm objects to navigate.</p>
      </div>
    </main>
  );
}
