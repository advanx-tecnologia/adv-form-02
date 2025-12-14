import { useState, useCallback } from 'react';
import { trackEvent } from '@/lib/tracking';
import { supabase } from '@/integrations/supabase/client';

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

export interface AIDiagnostic {
  nicho_identificado: string;
  problema_principal: string;
  potencial_contratos: string;
  investimento_sugerido: string;
  economia_potencial: string;
  insights: string[];
  mensagem_personalizada: string;
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
  const [aiDiagnostic, setAiDiagnostic] = useState<AIDiagnostic | null>(null);

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

    try {
      // Chamar edge function para gerar diagnóstico com IA
      const { data, error } = await supabase.functions.invoke('generate-diagnostic', {
        body: {
          fullName: formData.fullName,
          city: formData.city,
          businessStructure: formData.businessStructure,
          revenue: formData.revenue,
        }
      });

      if (error) {
        console.error('Error calling AI:', error);
      } else if (data?.diagnostic) {
        setAiDiagnostic(data.diagnostic);
        console.log('AI Diagnostic received:', data.diagnostic);
      }
    } catch (err) {
      console.error('Failed to get AI diagnostic:', err);
    }
    
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
    aiDiagnostic,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    submitForm,
    getFirstName,
  };
}
