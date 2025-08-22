
import PageLayout from "@/components/page-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Store, ShieldCheck } from "lucide-react";
import Link from "next/link";

const products = [
  { name: "Sunflower Seeds", price: "15.99", image_url: "https://placehold.co/300x200.png", hint: "sunflower seeds" },
  { name: "Corn Kernels", price: "12.50", image_url: "https://placehold.co/300x200.png", hint: "corn kernels" },
  { name: "Wheat Grains", price: "18.00", image_url: "https://placehold.co/300x200.png", hint: "wheat grains" },
  { name: "Organic Fertilizer", price: "25.00", image_url: "https://placehold.co/300x200.png", hint: "fertilizer bag" },
  { name: "Hand Trowel Set", price: "22.50", image_url: "https://placehold.co/300x200.png", hint: "gardening tools" },
  { name: "Raw Honey", price: "10.00", image_url: "https://placehold.co/300x200.png", hint: "honey jar" },
];

export default function MarketPage() {
  return (
    <PageLayout title="FarmNest Marketplace">
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Buy Goods</h2>
          <p className="mb-6">
            Browse our selection of premium, high-yield seeds and quality farm products. All items are sourced from trusted suppliers and fellow farmers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.name} className="flex flex-col">
                <CardHeader className="p-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="rounded-t-lg object-cover w-full aspect-[3/2]"
                    data-ai-hint={product.hint}
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-xl font-headline">{product.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">₦{product.price}</p>
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
        </div>

        <div className="bg-background/50 p-8 rounded-lg border-2 border-dashed">
            <h2 className="text-3xl font-bold text-primary mb-4 flex items-center"><Store className="mr-3"/> Sell Your Products</h2>
            <p className="mb-4">
              Have products to sell? Join the FarmNest Marketplace to reach a community of passionate farmers and consumers. We provide the platform, you provide the quality goods.
            </p>
            <div className="flex items-start p-4 rounded-md bg-accent/10">
                <ShieldCheck className="h-8 w-8 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Our Verification Promise</h3>
                    <p className="text-muted-foreground">To maintain the highest standards, all vendors must complete a simple verification process. This ensures that all products on our marketplace are authentic, high-quality, and responsibly sourced, building trust within our community.</p>
                </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/contact?subject=Marketplace+Vendor+Application" passHref>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Become a Verified Seller
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </PageLayout>
  );
}

    