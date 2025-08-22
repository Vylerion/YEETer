
import PageLayout from "@/components/page-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const initiatives = [
  {
    name: "Youth Agricultural Education",
    description: "Sponsoring scholarships and hands-on programs for students pursuing careers in agriculture."
  },
  {
    name: "Sustainable Farming Grants",
    description: "Providing funding for small farms to adopt eco-friendly technologies and sustainable practices."
  },
  {
    name: "Local Food Bank Partnerships",
    description: "Working with community food banks to donate fresh produce and support food security initiatives."
  },
  {
    name: "Farmer Mental Health Support",
    description: "Funding access to mental health resources and support networks for farmers and their families."
  }
];

export default function CharityPage() {
  return (
    <PageLayout title="Charity & Community">
      <div className="space-y-8">
        <div className="text-center">
            <p className="text-xl">
              At FarmNest, we believe in cultivating more than just crops; we believe in cultivating community. A portion of every transaction made through our platform is dedicated to supporting the very heart of agriculture—the people and communities who sustain it.
            </p>
        </div>
        
        <Image 
          src="https://placehold.co/800x300.png"
          alt="A group of volunteers working together on a community farm"
          width={800}
          height={300}
          className="rounded-lg object-cover w-full"
          data-ai-hint="community farm volunteers"
        />

        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">Our Core Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative) => (
              <div key={initiative.name} className="bg-background/50 p-4 rounded-lg border">
                <h3 className="font-semibold text-lg">{initiative.name}</h3>
                <p className="text-muted-foreground">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-4">How It Works</h2>
          <p>
            When you use FarmNest for your mortgage, insurance, or marketplace needs, you're automatically contributing to our community fund. We're transparent about our contributions and partner with established non-profit organizations to ensure that every dollar makes a real impact where it's needed most.
          </p>
        </div>
        
        <div className="text-center bg-primary/10 p-6 rounded-lg">
          <h2 className="text-2xl font-headline font-bold mb-4 flex items-center justify-center text-primary"><Heart className="mr-3"/> Join Us in Making a Difference</h2>
          <p className="mb-4 text-primary/90">
            Interested in partnering with us or learning more about our charitable work? We'd love to hear from you.
          </p>
          <Link href="/contact?subject=Charity+Partnership+Inquiry" passHref>
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
