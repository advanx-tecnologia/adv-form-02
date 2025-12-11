import { ArrowRight, Sparkles, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step1LandingProps {
  onNext: () => void;
}

export function Step1Landing({ onNext }: Step1LandingProps) {
  return (
    <div className="animate-fade-in space-y-8 text-center px-4">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Estratégia Exclusiva</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Vamos implantar pra você a mesma estratégia de{' '}
          <span className="text-gradient">Marketing Pago e Orgânico</span>{' '}
          para atrair e <span className="text-primary">FECHAR</span> clientes
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Funil com IA ponta a ponta, sem times grandes, alta margem e velocidade no seu operacional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
          <Target className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold">Marketing Inteligente</h3>
          <p className="text-sm text-muted-foreground">Atraia clientes qualificados</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
          <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold">Funil com IA</h3>
          <p className="text-sm text-muted-foreground">Automação completa</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold">Alta Margem</h3>
          <p className="text-sm text-muted-foreground">Sem times grandes</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">
          Preencha o formulário que meu time vai te chamar para uma{' '}
          <span className="text-primary font-semibold">REUNIÃO 1:1</span>
        </p>
        
        <Button 
          size="lg" 
          onClick={onNext}
          className="group animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
        >
          Preencher Formulário
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
