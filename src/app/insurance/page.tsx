import PageLayout from "@/components/page-layout";
import Image from "next/image";

export default function InsurancePage() {
  return (
    <PageLayout title="Insurance & Assurance">
      <div className="space-y-4">
        <p>
          Protect your livelihood with our comprehensive farm insurance plans. From crop failure to equipment damage, we've got you covered. Our policies are tailored to the unique risks of modern agriculture.
        </p>
        <Image 
          src="https://placehold.co/800x400.png"
          alt="Farmer inspecting crops"
          width={800}
          height={400}
          className="rounded-lg object-cover w-full"
          data-ai-hint="farmer crops"
        />
        <p>
          Get a quote today and gain the peace of mind that comes with knowing your farm is secure, no matter what the seasons bring.
        </p>
      </div>
    </PageLayout>
  );
}