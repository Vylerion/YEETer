import PageLayout from "@/components/page-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const coverageTypes = [
  {
    name: "Crop Insurance",
    description: "Protection against yield losses due to natural disasters like drought, floods, and pests. We cover a wide variety of crops."
  },
  {
    name: "Livestock Insurance",
    description: "Coverage for your animals against accidents, illness, and other unforeseen events that could impact your herd."
  },
  {
    name: "Farm Equipment & Machinery",
    description: "Insure your tractors, harvesters, and other essential equipment against mechanical failure, damage, and theft."
  },
  {
    name: "Farm Property & Structures",
    description: "Protect your barns, silos, fences, and your farmhouse from damage due to fire, weather, or other perils."
  }
];

export default function InsurancePage() {
  return (
    <PageLayout title="Insurance & Assurance">
      <div className="space-y-8">
        <div className="text-center">
            <p className="text-xl">
                Protect your livelihood with our comprehensive farm insurance plans. Our policies are tailored to the unique risks of modern agriculture, ensuring you're covered when you need it most.
            </p>
        </div>
        
        <Image 
          src="https://placehold.co/800x300.png"
          alt="Tractor in a field under a clear sky"
          width={800}
          height={300}
          className="rounded-lg object-cover w-full"
          data-ai-hint="tractor field"
        />

        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coverageTypes.map((coverage) => (
              <div key={coverage.name} className="bg-background/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-lg">{coverage.name}</h3>
                <p className="text-muted-foreground">{coverage.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">Why Insure with FarmNest?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Specialized Agents:</span> Our agents understand agriculture and can build a policy that fits your specific operation.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Fast & Fair Claims:</span> We pride ourselves on a straightforward claims process to get you back on your feet quickly.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Customizable Policies:</span> Don't pay for what you don't need. We'll help you tailor your coverage to your risk level and budget.</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center bg-accent/20 p-6 rounded-lg">
          <h2 className="text-2xl font-headline font-bold mb-4">Secure Your Peace of Mind</h2>
          <p className="mb-4">
            Get a no-obligation quote from one of our specialists today and learn how affordable it can be to protect your farm's future.
          </p>
          <Link href="/contact" passHref>
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Request a Quote
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
