import PageLayout from "@/components/page-layout";
import Image from "next/image";

export default function AboutPage() {
  return (
    <PageLayout title="About Us">
      <div className="space-y-4 text-center md:text-left">
        <p>
          Welcome to FarmNest, your digital gateway to modern farming solutions. We were founded on the principle that technology can revolutionize agriculture, making it more efficient, sustainable, and profitable for farmers everywhere.
        </p>
        <div className="flex justify-center">
        <Image 
          src="https://picsum.photos/800/400"
          alt="A beautiful farm landscape"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
          data-ai-hint="farm landscape"
        />
        </div>
        <p>
          Our interactive platform provides easy access to essential services, from purchasing high-quality seeds to securing comprehensive farm insurance. We're a team of agronomists, tech innovators, and financial experts dedicated to supporting the backbone of our world: the farmer.
        </p>
      </div>
    </PageLayout>
  );
}
