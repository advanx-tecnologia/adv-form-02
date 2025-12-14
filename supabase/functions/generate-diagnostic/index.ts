import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const systemPrompt = `Você é um consultor especialista em marketing jurídico da Advanx, analisando dados de advogados para gerar diagnósticos personalizados.

BENCHMARKS POR NICHO JURÍDICO (investimento mensal em mídia → contratos fechados):
- Trabalhista: R$1.200 → 8-12 contratos/mês
- Bancário: R$1.200 → 8-12 contratos/mês  
- Previdenciário: R$1.200 → 8-12 contratos/mês
- Tributário: R$1.200 → 8-12 contratos/mês
- Criminalista: R$1.500 → 1-4 contratos/mês
- Empresarial: R$1.500 → 1-2 contratos recorrentes/mês
- Imobiliário: R$1.500 → 3-5 contratos/mês

REGRAS DE ANÁLISE:
1. Se fatura menos de R$10k e menciona funcionários → PROBLEMA CRÍTICO: Investimento errado em equipe antes de ter demanda
2. Se fatura menos de R$20k → Precisa focar em geração de demanda e fechamento
3. Se fatura entre R$20k-R$100k → Precisa automatizar e escalar processos
4. Se fatura acima de R$100k → Precisa otimizar operação e reduzir custos

IMPORTANTE: 
- Seja direto e específico
- Use os benchmarks do nicho identificado
- Mencione valores concretos baseados nos benchmarks
- Garantia Advanx: resultados reais de contratos fechados em até 41 dias

Retorne APENAS um JSON válido (sem markdown) com esta estrutura:
{
  "nicho_identificado": "string - o nicho jurídico identificado ou 'Geral' se não identificado",
  "problema_principal": "string - o principal problema identificado em 1 frase",
  "potencial_contratos": "string - quantos contratos pode fechar por mês baseado no nicho",
  "investimento_sugerido": "string - investimento mensal sugerido em mídia",
  "economia_potencial": "string - quanto pode economizar ou ganhar a mais",
  "insights": ["array de 3 insights personalizados e específicos baseados nos dados"],
  "mensagem_personalizada": "string - mensagem direta para o advogado usando o primeiro nome, mencionando a cidade se disponível"
}`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, city, businessStructure, revenue } = await req.json();

    console.log('Generating diagnostic for:', { fullName, city, revenue });

    const firstName = fullName?.split(' ')[0] || 'Advogado';

    const userPrompt = `Analise os dados deste advogado e gere um diagnóstico personalizado:

DADOS DO CLIENTE:
- Nome: ${fullName || 'Não informado'}
- Cidade: ${city || 'Não informada'}
- Descrição do negócio/escritório: ${businessStructure || 'Não informado'}
- Faturamento mensal: ${revenue || 'Não informado'}

Gere o diagnóstico JSON baseado nas regras e benchmarks fornecidos.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    console.log('OpenAI response:', content);

    // Parse JSON from response (handle potential markdown code blocks)
    let diagnostic;
    try {
      // Remove potential markdown code blocks
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      diagnostic = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      // Fallback diagnostic
      diagnostic = {
        nicho_identificado: "Advocacia Geral",
        problema_principal: "Precisamos analisar melhor seu perfil para um diagnóstico completo",
        potencial_contratos: "8-12 contratos/mês",
        investimento_sugerido: "R$1.200/mês",
        economia_potencial: "Até R$10.000/mês em novos contratos",
        insights: [
          "Seu escritório tem potencial de crescimento com as estratégias certas",
          "Marketing digital especializado para advogados gera resultados em até 41 dias",
          "Automação de atendimento pode triplicar sua capacidade de fechamento"
        ],
        mensagem_personalizada: `${firstName}, você está no caminho certo! Vamos acelerar seus resultados.`
      };
    }

    return new Response(JSON.stringify({ diagnostic, firstName }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in generate-diagnostic function:', errorMessage);
    return new Response(JSON.stringify({ 
      error: errorMessage,
      diagnostic: {
        nicho_identificado: "Advocacia Geral",
        problema_principal: "Oportunidade de crescimento identificada",
        potencial_contratos: "8-12 contratos/mês",
        investimento_sugerido: "R$1.200/mês",
        economia_potencial: "Até R$10.000/mês",
        insights: [
          "Marketing digital especializado gera resultados em até 41 dias",
          "Automação de atendimento aumenta taxa de fechamento",
          "Processos bem definidos escalam seu faturamento"
        ],
        mensagem_personalizada: "Você está no caminho certo! Vamos acelerar seus resultados."
      }
    }), {
      status: 200, // Return 200 with fallback to not break the flow
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
