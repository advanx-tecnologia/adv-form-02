import { Building2, ArrowRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FunnelFormData } from '@/hooks/useFunnelForm';

interface Step4BusinessProps {
  formData: FunnelFormData;
  updateFormData: (field: keyof FunnelFormData, value: string) => void;
  onNext: () => void;
}

export function Step4Business({ formData, updateFormData, onNext }: Step4BusinessProps) {
  const placeholder = `Por exemplo: tenho um escritório físico há 5 anos, 3000 clientes atendidos, especializado na área trabalhista, com 15 funcionários, quero resolver o problema de qualificação de cliente e aumentar meu faturamento.`;

  return (
    <div className="animate-slide-up space-y-8 w-full max-w-lg mx-auto px-4">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            Conta pra gente sua{' '}
            <span className="text-gradient">estrutura atual</span>
          </h2>
          <p className="text-muted-foreground">
            Com suas palavras, descreva seu negócio e dificuldades. Isso vai ajudar a entregar um diagnóstico preciso ao final.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          value={formData.businessStructure}
          onChange={(e) => updateFormData('businessStructure', e.target.value)}
          placeholder={placeholder}
          className="min-h-[180px] bg-secondary border-border focus:border-primary transition-colors resize-none"
        />

        <div className="flex items-start gap-2 p-3 bg-card rounded-lg border border-border">
          <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Dica:</span> Quanto mais detalhes você compartilhar, mais personalizado será o seu diagnóstico.
          </p>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!formData.businessStructure.trim()}
        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 transition-all"
      >
        Avançar
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}
