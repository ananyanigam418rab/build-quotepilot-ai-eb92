import OpenAI from 'openai';

export type NicrronResult = { success: boolean; message: string; latencyMs: number; raw?: unknown };

export async function runNicrron(prompt: string): Promise<NicrronResult> {
  const apiKey = import.meta.env.VITE_NICRRON_API_KEY;
  if (!apiKey) {
    return { success: false, message: 'NICRRON_API_KEY is not available in this Vite-only deployment.', latencyMs: 0 };
  }
  const client = new OpenAI({ apiKey, baseURL: 'https://api.nicrron.ai/v1', dangerouslyAllowBrowser: true });
  const started = performance.now();
  const response = await client.chat.completions.create({
    model: 'nicrron/auto',
    temperature: 0,
    messages: [
      { role: 'system', content: 'Return exactly one sentence.' },
      { role: 'user', content: prompt },
    ],
  });
  const latencyMs = Math.round(performance.now() - started);
  const message = response.choices?.[0]?.message?.content?.trim() || 'Nicrron returned an empty response.';
  return { success: true, message, latencyMs, raw: response };
}
