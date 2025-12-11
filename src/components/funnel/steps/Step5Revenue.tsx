import { useState } from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FunnelFormData } from '@/hooks/useFunnelForm';

interface Step5RevenueProps {
  formData: FunnelFormData;
  updateFormData: (field: keyof FunnelFormData, value: string) => void;
  firstName: string;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const revenueOptions = [
  { value: '0-5k', label: '0 a 5 mil', sublabel: 'reais por mês' },
  { value: '5-10k', label: '5 a 10 mil', sublabel: 'reais por mês' },
  { value: '10-20k', label: '10 a 20 mil', sublabel: 'reais por mês' },
  { value: '20-50k', label: '20 a 50 mil', sublabel: 'reais por mês' },
  { value: '50-100k', label: '50 a 100 mil', sublabel: 'reais por mês' },
  { value: '100k+', label: '+de 100 mil', sublabel: 'reais por mês' },
];

export function Step5Revenue({ formData, updateFormData, firstName, onSubmit, isSubmitting }: Step5RevenueProps) {
  const [selected, setSelected] = useState(formData.revenue);

  const handleSelect = (value: string) => {
    setSelected(value);
    updateFormData('revenue', value);
  };

  return (
    <div className="animate-slide-up space-y-8 w-full max-w-lg mx-auto px-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            {firstName}, qual o seu{' '}
            <span className="text-gradient">faturamento médio mensal</span>?
          </h2>
          <p className="text-muted-foreground">
            Selecione a faixa que melhor representa seu momento atual
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {revenueOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-300 text-left",
              "hover:scale-[1.02] active:scale-[0.98]",
              selected === option.value
                ? "border-primary bg-primary/10 glow-primary-sm"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <p className="font-bold text-lg">{option.label}</p>
            <p className="text-sm text-muted-foreground">{option.sublabel}</p>
          </button>
        ))}
      </div>

      <Button
        onClick={onSubmit}
        disabled={!selected || isSubmitting}
        className={cn(
          "w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all",
          selected && !isSubmitting && "animate-pulse-glow"
        )}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Gerando diagnóstico...
          </span>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar Diagnóstico
          </>
        )}
      </Button>
    </div>
  );
}
