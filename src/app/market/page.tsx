import PageLayout from "@/components/page-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout } from "lucide-react";

const seeds = [
  { name: "Sunflower Seeds", price: "15.99", image_url: "https://placehold.co/300x200.png", hint: "sunflower seeds" },
  { name: "Corn Kernels", price: "12.50", image_url: "https://placehold.co/300x200.png", hint: "corn kernels" },
  { name: "Wheat Grains", price: "18.00", image_url: "https://placehold.co/300x200.png", hint: "wheat grains" },
];

export default function MarketPage() {
  return (
    <PageLayout title="Seed Market">
      <p className="mb-6">
        Browse our selection of premium, high-yield seeds. Quality is our guarantee.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed) => (
          <Card key={seed.name} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={seed.image_url}
                alt={seed.name}
                width={300}
                height={200}
                className="rounded-t-lg object-cover w-full aspect-[3/2]"
                data-ai-hint={seed.hint}
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <CardTitle className="text-xl font-headline">{seed.name}</CardTitle>
              <p className="text-2xl font-bold text-primary">${seed.price}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Sprout className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
