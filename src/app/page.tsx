import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, User, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 p-4 flex justify-between items-center border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">ServeSmart</h1>
        </div>
        <nav>
          <Button asChild variant="ghost">
            <Link href="/menu">Menu</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/admin">Admin</Link>
          </Button>
        </nav>
      </header>
      
      <main className="flex-1">
        <section className="relative py-24 md:py-32 lg:py-40 text-center bg-grid">
           <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
           <div className="container relative">
            <UtensilsCrossed className="h-24 w-24 mx-auto text-primary" />
            <h2 className="mt-6 text-5xl font-extrabold tracking-tighter font-headline sm:text-6xl md:text-7xl">
              Welcome to ServeSmart
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
              The smart, modern solution for canteen management.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/menu">Order Now <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
           </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="text-left hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>
                    <span>Customer View</span>
                  </CardTitle>
                  <CardDescription>
                    Browse the menu, build your order, and experience a seamless checkout.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" variant="secondary">
                    <Link href="/menu">Go to Menu</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="text-left hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>
                    <span>Admin Panel</span>
                  </CardTitle>
                  <CardDescription>
                    Manage menu items, discounts, and view order analytics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/admin">Go to Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground border-t bg-background">
        <p>&copy; {new Date().getFullYear()} ServeSmart. All rights reserved.</p>
      </footer>
    </div>
  );
}
