import PageLayout from "@/components/page-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const loanTypes = [
  { 
    name: "New Farm Acquisition", 
    description: "Ready to start your farming journey? We provide financing for purchasing your first farm property." 
  },
  { 
    name: "Land Expansion Loans", 
    description: "Acquire adjacent plots or new tracts of land to grow your existing operations." 
  },
  { 
    name: "Facility & Infrastructure Upgrades", 
    description: "Finance new barns, silos, irrigation systems, or other essential infrastructure." 
  },
  {
    name: "Refinancing Options",
    description: "Restructure your current debt with our competitive refinancing packages to improve cash flow."
  }
];

export default function MortgagePage() {
  return (
    <PageLayout title="Farm Mortgages">
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-xl">
            Secure the financing you need to grow your operations, purchase new land, or upgrade your facilities. Our farm mortgage solutions offer competitive rates and flexible terms designed specifically for the needs of modern agricultural businesses.
          </p>
        </div>
        
        <div className="flex justify-center">
        <Image 
          src="https://picsum.photos/800/300"
          alt="Expansive farm property at sunset"
          width={800}
          height={300}
          className="rounded-lg object-cover w-full"
          data-ai-hint="farm property"
        />
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4 text-center md:text-left">Our Mortgage Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loanTypes.map((loan) => (
              <div key={loan.name} className="bg-background/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-lg">{loan.name}</h3>
                <p className="text-muted-foreground">{loan.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">Why Choose AgriMenu Financing?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Agri-Focused Expertise:</span> Our loan officers specialize in agriculture and understand the cyclical nature of the business.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Competitive Rates:</span> We leverage our network to offer some of the best interest rates in the industry.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
              <span><span className="font-semibold">Flexible Terms:</span> We offer payment schedules that can align with your harvest and income cycles.</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center bg-accent/20 p-6 rounded-lg">
          <h2 className="text-2xl font-headline font-bold mb-4">Ready to Grow?</h2>
          <p className="mb-4">
            Our specialists understand the agricultural market and can guide you through the process, ensuring you get a financial package that supports your long-term vision.
          </p>
          <Link href="/contact?subject=Mortgage+Inquiry" passHref>
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact a Loan Specialist
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
