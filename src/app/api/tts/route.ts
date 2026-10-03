import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: text,
      config: {
        responseModalities: ["TEXT", "AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: "Puck" 
            }
          }
        }
      }
    });

    let audioData = null;
    let mimeType = null;
    
    const candidate = response.candidates?.[0];
    const parts = candidate?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('audio')) {
          audioData = part.inlineData.data;
          mimeType = part.inlineData.mimeType;
          break;
        }
      }
    }

    if (!audioData) {
      return NextResponse.json({ error: 'No audio generated' }, { status: 500 });
    }

    const buffer = typeof audioData === 'string' ? Buffer.from(audioData, 'base64') : Buffer.from(audioData);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mimeType || 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store, max-age=0'
      }
    });

  } catch (error) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
