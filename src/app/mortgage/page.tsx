import PageLayout from "@/components/page-layout";
import Image from "next/image";

export default function MortgagePage() {
  return (
    <PageLayout title="Farm Mortgages">
      <div className="space-y-4">
        <p>
          Secure the financing you need to expand your operations, purchase new land, or upgrade your facilities. Our farm mortgage solutions offer competitive rates and flexible terms designed for agricultural businesses.
        </p>
         <Image 
          src="https://placehold.co/800x400.png"
          alt="Farm property with a for sale sign"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
          data-ai-hint="farm property"
        />
        <p>
          Our specialists understand the agricultural market and can guide you through the process, ensuring you get a financial package that supports your long-term growth.
        </p>
      </div>
    </PageLayout>
  );
}