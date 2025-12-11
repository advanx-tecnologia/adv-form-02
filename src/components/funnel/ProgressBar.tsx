import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ progress, currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">
          Etapa {currentStep} de {totalSteps}
        </span>
        <span className="text-primary font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out",
            progress > 0 && "glow-primary-sm"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
