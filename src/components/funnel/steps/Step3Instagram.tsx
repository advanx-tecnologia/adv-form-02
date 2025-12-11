import { Instagram, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FunnelFormData } from '@/hooks/useFunnelForm';

interface Step3InstagramProps {
  formData: FunnelFormData;
  updateFormData: (field: keyof FunnelFormData, value: string) => void;
  firstName: string;
  onNext: () => void;
}

export function Step3Instagram({ formData, updateFormData, firstName, onNext }: Step3InstagramProps) {
  const location = formData.city 
    ? `direto de ${formData.city}` 
    : formData.state 
      ? `direto de ${formData.state}` 
      : '';

  const handleInstagramChange = (value: string) => {
    // Remove @ se o usuário digitar
    const cleaned = value.startsWith('@') ? value.slice(1) : value;
    updateFormData('instagram', cleaned);
  };

  return (
    <div className="animate-slide-up space-y-8 w-full max-w-md mx-auto px-4">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="absolute inset-0 animate-pulse-glow rounded-full" />
          <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center animate-float">
            <Instagram className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            {firstName}{location ? `, ${location}` : ''}, vamos ativar o{' '}
            <span className="text-gradient">poder máximo da IA</span>!
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Zap className="w-4 h-4 text-primary" />
          <p>
            Com seu Instagram, nossa IA vai personalizar o seu funil com base no seu perfil.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
            @
          </div>
          <Input
            value={formData.instagram}
            onChange={(e) => handleInstagramChange(e.target.value)}
            placeholder="seu_instagram"
            className="pl-8 py-6 text-lg bg-secondary border-border focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            A IA vai analisar seu perfil para criar estratégias personalizadas de captação de clientes.
          </p>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Personalizar
      </Button>

      <button
        onClick={onNext}
        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Pular por agora →
      </button>
    </div>
  );
}
