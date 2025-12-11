import { useEffect } from 'react';
import { FunnelHeader } from './FunnelHeader';
import { Step1Landing } from './steps/Step1Landing';
import { Step2Contact } from './steps/Step2Contact';
import { Step3Instagram } from './steps/Step3Instagram';
import { Step4Business } from './steps/Step4Business';
import { Step5Revenue } from './steps/Step5Revenue';
import { Step6Diagnostic } from './steps/Step6Diagnostic';
import { useFunnelForm } from '@/hooks/useFunnelForm';
import { trackEvent } from '@/lib/tracking';

export function FunnelForm() {
  const {
    currentStep,
    totalSteps,
    progress,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    submitForm,
    getFirstName,
  } = useFunnelForm();

  // Dispara PageView na montagem inicial
  useEffect(() => {
    trackEvent('PageView', 1);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Landing onNext={nextStep} />;
      case 2:
        return (
          <Step2Contact
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 3:
        return (
          <Step3Instagram
            formData={formData}
            updateFormData={updateFormData}
            firstName={getFirstName()}
            onNext={nextStep}
          />
        );
      case 4:
        return (
          <Step4Business
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 5:
        return (
          <Step5Revenue
            formData={formData}
            updateFormData={updateFormData}
            firstName={getFirstName()}
            onSubmit={submitForm}
            isSubmitting={isSubmitting}
          />
        );
      case 6:
        return (
          <Step6Diagnostic
            formData={formData}
            firstName={getFirstName()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FunnelHeader
        progress={progress}
        currentStep={currentStep}
        totalSteps={totalSteps}
        showProgress={currentStep > 1}
      />
      
      <main className="flex-1 flex items-center justify-center py-8">
        {renderStep()}
      </main>

      <footer className="py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Advanx. Todos os direitos reservados.
      </footer>
    </div>
  );
}
