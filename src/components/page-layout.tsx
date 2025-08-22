"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, children }: PageLayoutProps) {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <CardTitle className="text-3xl font-headline text-primary">{title}</CardTitle>
              <Button variant="outline" onClick={() => router.push('/home')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="text-lg pt-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
