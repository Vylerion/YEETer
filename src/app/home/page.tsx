import ThreeCanvas from '@/components/three-canvas';

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <ThreeCanvas />
      <div className="pointer-events-none absolute bottom-4 left-4 text-foreground/80 bg-background/50 p-2 rounded-md shadow-lg">
        <p className="font-headline font-bold">AgriMenu 3D</p>
        <p className="text-sm">Hover and click the farm objects to navigate.</p>
      </div>
    </main>
  );
}