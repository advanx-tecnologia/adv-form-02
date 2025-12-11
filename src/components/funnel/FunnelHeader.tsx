import { ProgressBar } from './ProgressBar';

interface FunnelHeaderProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
}

export function FunnelHeader({ progress, currentStep, totalSteps, showProgress = true }: FunnelHeaderProps) {
  return (
    <header className="w-full max-w-2xl mx-auto px-4 pt-6 pb-4 space-y-6">
      <div className="flex justify-center">
        <img 
          src="https://lhbwfbquxkutcyqazpnw.supabase.co/storage/v1/object/public/images/logo/v3%20png.webp" 
          alt="Advanx Logo" 
          className="h-10 md:h-12 object-contain"
        />
      </div>
      {showProgress && (
        <ProgressBar 
          progress={progress} 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
        />
      )}
    </header>
  );
}
