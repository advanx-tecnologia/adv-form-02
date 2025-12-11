import { useState, useCallback } from 'react';
import { trackEvent } from '@/lib/tracking';

export interface FunnelFormData {
  // Página 2 - Contato
  fullName: string;
  email: string;
  whatsapp: string;
  // Página 3 - Instagram
  instagram: string;
  // Página 4 - Estrutura
  businessStructure: string;
  // Página 5 - Faturamento
  revenue: string;
  // Metadados
  ddd: string;
  city: string;
  state: string;
  stateCode: string;
}

const initialFormData: FunnelFormData = {
  fullName: '',
  email: '',
  whatsapp: '',
  instagram: '',
  businessStructure: '',
  revenue: '',
  ddd: '',
  city: '',
  state: '',
  stateCode: '',
};

export function useFunnelForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FunnelFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 6;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const updateFormData = useCallback((field: keyof FunnelFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      trackEvent('PageView', newStep);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      trackEvent('PageView', step);
    }
  }, []);

  const submitForm = useCallback(async () => {
    setIsSubmitting(true);
    
    // Dispara evento Lead
    trackEvent('Lead', currentStep, {
      revenue: formData.revenue,
      city: formData.city,
      state: formData.state,
    });

    // Aqui será integrado com Supabase
    console.log('Form submitted:', formData);
    
    // Simula delay de envio
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    nextStep();
  }, [formData, currentStep, nextStep]);

  const getFirstName = useCallback(() => {
    return formData.fullName.split(' ')[0] || '';
  }, [formData.fullName]);

  return {
    currentStep,
    totalSteps,
    progress,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    getFirstName,
  };
}
