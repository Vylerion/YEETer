import { LoginForm } from '@/components/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2">
              <Leaf className="h-10 w-10 text-primary" />
              <CardTitle className="text-4xl font-headline text-primary">AgriMenu 3D</CardTitle>
            </div>
            <CardDescription>Enter the digital farmstead</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}