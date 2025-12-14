import { useEffect, useState } from 'react';
import { CheckCircle2, Target, Users, Cog, TrendingUp, MessageCircle, ArrowRight, Sparkles, Zap, DollarSign, Briefcase, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confetti } from '../Confetti';
import { FunnelFormData, AIDiagnostic } from '@/hooks/useFunnelForm';
import { cn } from '@/lib/utils';

interface Step6DiagnosticProps {
  formData: FunnelFormData;
  firstName: string;
  aiDiagnostic?: AIDiagnostic | null;
}

const WHATSAPP_GROUP_LINK = 'https://advanx.com.br/grupomdc';
const WHATSAPP_BIO_LINK = 'https://advanx.com.br/whatsapp';

export function Step6Diagnostic({ formData, firstName, aiDiagnostic }: Step6DiagnosticProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Se temos diagnóstico da IA, usar ele
  if (aiDiagnostic) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4">
        {showConfetti && <Confetti />}

        <div className={cn(
          "space-y-6 transition-all duration-700",
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
              <Sparkles className="w-5 h-5 text-success" />
              <span className="text-sm text-success font-medium">Diagnóstico Gerado com IA</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">
              {firstName}, aqui está seu{' '}
              <span className="text-gradient">diagnóstico personalizado</span>
            </h2>
          </div>

          {/* Nicho e Problema Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Nicho Identificado</span>
              </div>
              <p className="font-bold text-lg">{aiDiagnostic.nicho_identificado}</p>
            </div>

            <div className="p-4 bg-destructive/10 rounded-xl border border-destructive/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-destructive" />
                </div>
                <span className="text-sm text-muted-foreground">Problema Principal</span>
              </div>
              <p className="font-bold text-lg text-destructive">{aiDiagnostic.problema_principal}</p>
            </div>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-card rounded-xl border border-border text-center">
              <TrendingUp className="w-6 h-6 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Potencial</p>
              <p className="font-bold text-sm">{aiDiagnostic.potencial_contratos}</p>
            </div>
            <div className="p-3 bg-card rounded-xl border border-border text-center">
              <DollarSign className="w-6 h-6 text-success mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Investimento</p>
              <p className="font-bold text-sm">{aiDiagnostic.investimento_sugerido}</p>
            </div>
            <div className="p-3 bg-card rounded-xl border border-border text-center">
              <Zap className="w-6 h-6 text-warning mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Economia</p>
              <p className="font-bold text-sm">{aiDiagnostic.economia_potencial}</p>
            </div>
          </div>

          {/* Insights da IA */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Insights Personalizados
            </h3>
            {aiDiagnostic.insights.map((insight, index) => (
              <div
                key={index}
                className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{insight}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem Personalizada */}
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-center italic text-lg">
              "{aiDiagnostic.mensagem_personalizada}"
            </p>
          </div>

          {/* Garantia */}
          <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20">
            <div className="flex items-center gap-3 justify-center">
              <Clock className="w-6 h-6 text-success" />
              <p className="font-bold text-success">
                Garantimos resultados reais de contratos fechados em até 41 dias!
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
            <div className="text-center space-y-2">
              <h3 className="font-bold text-xl">Próximos Passos</h3>
              <p className="text-muted-foreground">
                Entre no grupo VIP para encontros ao vivo toda semana e conheça nosso sistema de captação
              </p>
            </div>

            <Button
              asChild
              className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
            >
              <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Entrar no Grupo VIP
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Para uma <strong>conversa personalizada</strong>, acesse o link na bio do nosso Instagram e fale diretamente com nossa equipe.
            </p>

            <Button
              asChild
              variant="outline"
              className="w-full py-4 border-border hover:border-primary/50"
            >
              <a href={WHATSAPP_BIO_LINK} target="_blank" rel="noopener noreferrer">
                Quero Conversa Personalizada
              </a>
            </Button>
          </div>

          {/* Summary */}
          <div className="p-4 bg-card rounded-xl border border-border">
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Resumo do seu perfil:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-muted-foreground">Nome:</span> {formData.fullName}</div>
              <div><span className="text-muted-foreground">Cidade:</span> {formData.city || 'N/A'}</div>
              <div><span className="text-muted-foreground">Faturamento:</span> {formData.revenue}</div>
              {formData.instagram && (
                <div><span className="text-muted-foreground">Instagram:</span> @{formData.instagram}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: diagnóstico baseado em regras (sem IA)
  const getFallbackContent = () => {
    const revenue = formData.revenue;

    if (['0-5k', '5-10k', '10-20k'].includes(revenue)) {
      return {
        title: 'Fase de Crescimento',
        subtitle: 'Foco em gerar demanda qualificada',
        insights: [
          'Seu foco principal deve ser atrair clientes qualificados',
          'Com R$1.200/mês em mídia, pode fechar 8-12 contratos',
          'Potencial de dobrar faturamento em 6-12 meses'
        ],
      };
    }

    if (['20-50k', '50-100k'].includes(revenue)) {
      return {
        title: 'Fase de Escala',
        subtitle: 'Momento de automatizar e diversificar',
        insights: [
          'Automação pode fazer o trabalho de 2-3 pessoas',
          'Diversifique seus canais de aquisição',
          'Potencial de economia de R$15.000+/mês'
        ],
      };
    }

    return {
      title: 'Fase de Otimização',
      subtitle: 'Operacionalização e eficiência máxima',
      insights: [
        'Sistema integrado para todos os canais',
        'Economia de 20% em custos fixos',
        'Automação completa do atendimento'
      ],
    };
  };

  const fallback = getFallbackContent();

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {showConfetti && <Confetti />}

      <div className={cn(
        "space-y-8 transition-all duration-700",
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm text-success font-medium">Diagnóstico Completo</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold">{fallback.title}</h2>
          <p className="text-lg text-muted-foreground">{fallback.subtitle}</p>
        </div>

        <div className="space-y-4">
          {fallback.insights.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-xl border border-border animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm">{insight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
          <Button
            asChild
            className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow"
          >
            <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar no Grupo VIP
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
