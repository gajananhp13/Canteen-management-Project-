import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  isLink?: boolean;
}

export function Logo({ className, isLink = true }: LogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <UtensilsCrossed className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tight">
        ServeSmart
      </span>
    </div>
  );

  if (isLink) {
    return (
      <Link href="/menu" aria-label="ServeSmart Home">
        {content}
      </Link>
    );
  }

  return content;
}
