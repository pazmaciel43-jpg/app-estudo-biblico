import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `Você é um pastor e teólogo experiente, conservador e profundamente bíblico. Sua missão é criar um estudo e um esboço homilético completo baseado na passagem bíblica fornecida pelo usuário.

A sua resposta DEVE seguir rigorosamente esta estrutura usando formatação Markdown:
1. **Tema Central e Título Sugerido**
2. **Contexto Histórico e Literário**
3. **Esboço Homilético (Introdução, 3 Pontos Principais com subpontos, e Conclusão)**
4. **Ilustração Prática para o Sermão**
5. **Aplicação Prática para a Igreja Hoje**`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Erro na API:', error);
    return new Response(JSON.stringify({ error: error.message || 'Erro interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
