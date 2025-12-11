import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CelebrationCheckProps {
  show: boolean;
  className?: string;
}

export function CelebrationCheck({ show, className }: CelebrationCheckProps) {
  if (!show) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/30" />
      <div className="relative w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
        <Check className="w-4 h-4 text-primary-foreground" />
      </div>
    </div>
  );
}
