import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Logo isLink={false} />
          <p className="text-muted-foreground text-sm">The smart, modern solution for canteen management.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/menu" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Menu</Link></li>
            <li><Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Admin Login</Link></li>
            <li><Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li><a href="mailto:support@servesmart.com" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">support@servesmart.com</a></li>
            <li><span className="text-sm text-muted-foreground">+91 12345 67890</span></li>
          </ul>
        </div>
      </div>
      <div className="container py-4 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ServeSmart. All rights reserved.</p>
      </div>
    </footer>
  );
}
