import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, User, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center border-b">
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
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-3xl">
          <UtensilsCrossed className="h-24 w-24 mx-auto text-primary" />
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight font-headline sm:text-5xl">
            Welcome to ServeSmart
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            The smart solution for modern canteen management.
          </p>
          <p className="mt-6 max-w-xl mx-auto text-lg leading-8">
            This is a prototype showcasing the core features of the ServeSmart application. Explore the user and admin functionalities to see it in action.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-6 w-6" />
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
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6" />
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
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ServeSmart. All rights reserved.</p>
      </footer>
    </div>
  );
}
