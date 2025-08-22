import PageLayout from "@/components/page-layout";
import Image from "next/image";

export default function CharityPage() {
  return (
    <PageLayout title="Charity & Community">
      <div className="space-y-4">
        <p>
          We believe in giving back to the community that feeds us. A portion of every transaction made through FarmNest goes towards supporting local farming initiatives and agricultural education programs for the next generation.
        </p>
        <Image 
          src="https://placehold.co/800x400.png"
          alt="Community farming event"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
          data-ai-hint="community farming"
        />
        <p>
          By choosing our services, you're not just investing in your farm; you're helping to cultivate a stronger, more resilient agricultural community for years to come.
        </p>
      </div>
    </PageLayout>
  );
}
