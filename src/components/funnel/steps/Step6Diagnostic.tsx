import { useEffect, useState } from 'react';
import { CheckCircle2, Target, Users, Cog, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Confetti } from '../Confetti';
import { FunnelFormData } from '@/hooks/useFunnelForm';
import { cn } from '@/lib/utils';

interface Step6DiagnosticProps {
  formData: FunnelFormData;
  firstName: string;
}

interface DiagnosticContent {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  insights: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  cta: string;
}

const WHATSAPP_GROUP_LINK = 'https://advanx.com.br/grupomdc';

export function Step6Diagnostic({ formData, firstName }: Step6DiagnosticProps) {
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

  const getDiagnosticContent = (): DiagnosticContent => {
    const revenue = formData.revenue;

    // Até R$20k
    if (['0-5k', '5-10k', '10-20k'].includes(revenue)) {
      return {
        title: 'Fase de Crescimento',
        subtitle: 'Foco em gerar demanda qualificada',
        icon: <Target className="w-8 h-8" />,
        color: 'from-orange-500 to-amber-500',
        insights: [
          {
            icon: <Target className="w-5 h-5 text-primary" />,
            title: 'Gerar Demanda Qualificada',
            description: 'Seu foco principal deve ser atrair clientes que realmente precisam dos seus serviços jurídicos. Marketing direcionado é essencial.',
          },
          {
            icon: <Users className="w-5 h-5 text-primary" />,
            title: 'Fechar Mais Negócios',
            description: 'Com a demanda certa, você precisa de um processo de vendas eficiente. Nossa IA pode qualificar leads 24/7.',
          },
          {
            icon: <TrendingUp className="w-5 h-5 text-primary" />,
            title: 'Potencial de Crescimento',
            description: `Com as estratégias certas, escritórios nessa faixa costumam dobrar o faturamento em 6-12 meses.`,
          },
        ],
        cta: 'Você pode estar deixando de faturar R$10.000+ por mês em clientes que não chegam até você.',
      };
    }

    // R$20k a R$100k
    if (['20-50k', '50-100k'].includes(revenue)) {
      return {
        title: 'Fase de Escala',
        subtitle: 'Momento de automatizar e diversificar',
        icon: <Cog className="w-8 h-8" />,
        color: 'from-blue-500 to-cyan-500',
        insights: [
          {
            icon: <Users className="w-5 h-5 text-primary" />,
            title: 'Contratação Inteligente',
            description: 'Antes de contratar mais pessoas, automatize. Nossa IA pode fazer o trabalho de 2-3 pessoas na qualificação de leads.',
          },
          {
            icon: <Cog className="w-5 h-5 text-primary" />,
            title: 'Automatizar Processos',
            description: 'Tarefas repetitivas como agendamento, follow-up e qualificação podem ser 100% automatizadas.',
          },
          {
            icon: <Target className="w-5 h-5 text-primary" />,
            title: 'Diversificar Canais',
            description: 'Você não pode depender de uma única fonte de clientes. Vamos criar múltiplos canais de aquisição.',
          },
        ],
        cta: 'Escritórios nessa faixa costumam economizar R$15.000+ por mês com automação inteligente.',
      };
    }

    // +R$100k
    return {
      title: 'Fase de Otimização',
      subtitle: 'Operacionalização e eficiência máxima',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-emerald-500 to-green-500',
      insights: [
        {
          icon: <Cog className="w-5 h-5 text-primary" />,
          title: 'Operacionalizar Processos',
          description: 'Com múltiplos canais de aquisição, você precisa de um sistema que gerencie tudo de forma integrada.',
        },
        {
          icon: <Target className="w-5 h-5 text-primary" />,
          title: 'Múltiplos Canais de Aquisição',
          description: 'Conecte todos os seus canais (orgânico, pago, indicações) em um único funil com IA.',
        },
        {
          icon: <TrendingUp className="w-5 h-5 text-primary" />,
          title: 'Economia de 20% em Custos Fixos',
          description: 'Automatizando trabalho manual, você pode economizar pelo menos 20% dos seus custos fixos atuais.',
        },
      ],
      cta: `${firstName}, você pode estar perdendo mais de R$20.000/mês em ineficiências operacionais.`,
    };
  };

  const diagnostic = getDiagnosticContent();

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {showConfetti && <Confetti />}

      <div className={cn(
        "space-y-8 transition-all duration-700",
        showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm text-success font-medium">Diagnóstico Completo</span>
          </div>

          <div className={cn(
            "w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white bg-gradient-to-br",
            diagnostic.color
          )}>
            {diagnostic.icon}
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{diagnostic.title}</h2>
            <p className="text-lg text-muted-foreground">{diagnostic.subtitle}</p>
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          {diagnostic.insights.map((insight, index) => (
            <div
              key={index}
              className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  {insight.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="space-y-4 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
          <p className="text-center font-medium text-lg">
            {diagnostic.cta}
          </p>

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
            👆 Clique acima e depois confira seu WhatsApp para receber o acesso exclusivo
          </p>
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
