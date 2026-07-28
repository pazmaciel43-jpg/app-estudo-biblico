import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Você é um pastor e teólogo experiente, conservador e profundamente bíblico. Sua missão é criar um estudo e um esboço homilético completo baseado na passagem bíblica fornecida pelo usuário.

A sua resposta DEVE seguir rigorosamente esta estrutura usando formatação Markdown:
1. **Tema Central e Título Sugerido**
2. **Contexto Histórico e Literário**
3. **Esboço Homilético (Introdução, 3 Pontos Principais com subpontos, e Conclusão)**
4. **Ilustração Prática para o Sermão**
5. **Aplicação Prática para a Igreja Hoje**`,
        },
        { role: 'user', content: lastMessage },
      ],
    });

    const reply = completion.choices[0].message.content;

    return Response.json({ role: 'assistant', content: reply });
  } catch (error: any) {
    console.error('Erro:', error);
    return Response.json({ error: error.message || 'Erro interno' }, { status: 500 });
  }
}
