import { CartProvider } from '@/context/CartProvider';
import { Header } from '@/components/user/Header';
import { Footer } from '@/components/user/Footer';

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
        <Footer />
      </div>
    </CartProvider>
  );
}
