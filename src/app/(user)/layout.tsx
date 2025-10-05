import { CartProvider } from '@/context/CartProvider';
import { Header } from '@/components/user/Header';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="p-4 text-center text-sm text-muted-foreground border-t">
          <p>&copy; {new Date().getFullYear()} ServeSmart. All rights reserved.</p>
        </footer>
      </div>
    </CartProvider>
  );
}
