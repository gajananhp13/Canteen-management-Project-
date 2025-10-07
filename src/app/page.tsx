import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UtensilsCrossed, User, Shield, ArrowRight, Smartphone, ScanLine, ShoppingBasket, Quote } from 'lucide-react';
import { menuItems } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/shared/ThemeToggle';


export default function Home() {
  const featuredItems = menuItems.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <Logo isLink={false} />
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Button asChild variant="ghost">
              <Link href="/menu">Menu</Link>
            </Button>
            <Button asChild>
              <Link href="/admin">Admin Panel</Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container relative py-20 md:py-32 lg:py-40 text-center">
            <Badge variant="outline" className="mb-6 font-semibold">Fast, Fresh &amp; Flavorful</Badge>
            <h1 className="text-4xl font-extrabold tracking-tighter font-headline sm:text-5xl md:text-6xl lg:text-7xl">
              The Future of Canteen Ordering
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground sm:text-xl">
              ServeSmart revolutionizes your dining experience with seamless mobile ordering, QR-based payments, and real-time order tracking. Say goodbye to long queues.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/menu">Explore Menu <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-muted/40">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold font-headline">Simple Steps to Deliciousness</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Ordering your favorite meal has never been easier. Just three simple steps.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-none shadow-lg bg-card">
                <CardHeader>
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <ShoppingBasket className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>1. Browse &amp; Select</CardTitle>
                  <CardDescription>
                    Explore our diverse menu and add your favorite dishes to the cart.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center border-none shadow-lg bg-card">
                <CardHeader>
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <ScanLine className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>2. Pay with QR</CardTitle>
                  <CardDescription>
                    Checkout securely and instantly by scanning a QR code with any UPI app.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center border-none shadow-lg bg-card">
                <CardHeader>
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <Smartphone className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>3. Pick Up Your Order</CardTitle>
                  <CardDescription>
                    Get a notification when your order is ready for a quick and easy pickup.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Items Section */}
        <section className="py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold font-headline">Featured Dishes</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Handpicked selections that our customers love the most.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredItems.map((item) => (
                <Card key={item.id} className="group flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-[3/2] relative w-full overflow-hidden">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-primary">₹{item.price.toFixed(2)}</p>
                    <Button asChild variant="secondary">
                      <Link href="/menu">Order</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-muted/40">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold font-headline">What People Are Saying</h2>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card">
                <CardHeader className="gap-4">
                  <Quote className="h-8 w-8 text-primary" />
                  <CardDescription className="italic">"The ordering process is so smooth! I love that I can just grab my food without waiting in line. The classic burger is a must-try!"</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Alex" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">Regular Customer</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="gap-4">
                  <Quote className="h-8 w-8 text-primary" />
                  <CardDescription className="italic">"ServeSmart has completely changed my lunch break. It's fast, efficient, and the food is always fresh and delicious. Highly recommended!"</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Maria" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Maria Garcia</p>
                    <p className="text-sm text-muted-foreground">Happy Customer</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="gap-4">
                  <Quote className="h-8 w-8 text-primary" />
                  <CardDescription className="italic">"As an admin, the dashboard is incredibly intuitive. Managing the menu and tracking orders is a breeze. A fantastic system all around."</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="David" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">David Chen</p>
                    <p className="text-sm text-muted-foreground">Canteen Manager</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted border-t">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo isLink={false} />
            <p className="text-muted-foreground text-sm">The smart, modern solution for canteen management.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-sm text-muted-foreground hover:text-primary">Menu</Link></li>
              <li><Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">Admin Login</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@servesmart.com" className="text-sm text-muted-foreground hover:text-primary">support@servesmart.com</a></li>
              <li><span className="text-sm text-muted-foreground">+91 12345 67890</span></li>
            </ul>
          </div>
        </div>
        <div className="container py-4 text-center text-sm text-muted-foreground border-t">
          <p>&copy; {new Date().getFullYear()} ServeSmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
