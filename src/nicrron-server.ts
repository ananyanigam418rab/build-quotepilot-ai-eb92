import OpenAI from 'openai';

declare const process: { env: Record<string, string | undefined> };

export async function serverNicrronTest(prompt: string) {
  const apiKey = process.env.NICRRON_API_KEY;
  if (!apiKey) {
    return { ok: false as const, status: 500, body: { success: false, error: 'NICRRON_API_KEY is missing in server runtime.' } };
  }

  const client = new OpenAI({ apiKey, baseURL: 'https://api.nicrron.ai/v1' });
  const started = Date.now();
  try {
    const response = await client.chat.completions.create({
      model: 'nicrron/auto',
      temperature: 0,
      messages: [
        { role: 'system', content: 'Return exactly: Nicrron connection successful' },
        { role: 'user', content: prompt },
      ],
    });

    const content = response.choices?.[0]?.message?.content?.trim() || '';
    return {
      ok: true as const,
      status: 200,
      body: {
        success: true,
        message: content || 'Nicrron connection successful',
        latencyMs: Date.now() - started,
      },
    };
  } catch (error: any) {
    return {
      ok: false as const,
      status: 502,
      body: { success: false, error: error?.message || 'Nicrron request failed' },
    };
  }
}
