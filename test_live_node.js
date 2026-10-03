const { GoogleGenAI } = require('@google/genai');
const WebSocket = require('ws');
global.WebSocket = WebSocket;
const fs = require('fs');

const ai = new GoogleGenAI({apiKey: 'AIzaSyCLymc-8B6LukSjNorFYrmGsvPkybSrVP0'});

async function main() {
  const session = await ai.live.connect({ 
    model: 'gemini-3.8-live', 
    config: { 
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }
    } 
  });
  
  await session.send({ parts: [{ text: 'say hello clearly' }], endOfTurn: true });
  
  const chunks = [];
  for await (const msg of session.receive()) {
    if (msg.serverContent?.modelTurn?.parts) {
      for (const p of msg.serverContent.modelTurn.parts) {
        if (p.inlineData) {
          chunks.push(Buffer.from(p.inlineData.data, 'base64'));
        }
      }
    }
    if (msg.serverContent?.turnComplete) break;
  }
  
  const pcmData = Buffer.concat(chunks);
  const header = Buffer.alloc(44);
  const sampleRate = 24000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmData.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmData.length, 40);

  const wav = Buffer.concat([header, pcmData]);
  fs.writeFileSync('test_live.wav', wav);
  console.log('Saved test_live.wav, size:', wav.length);
}
main().catch(console.error);
