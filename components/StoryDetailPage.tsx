import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";
import type { Language } from '../App';
import FlipbookView from './FlipbookView';
import { storiesData } from './ContentSection';

export interface Story {
    id: number;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    content: string;
}

interface StoryDetailProps {
    story: Story;
    language: Language;
}

// Helper functions for TTS audio decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


const StoryDetailPage: React.FC<StoryDetailProps> = ({ story: initialStory, language }) => {
    const [isNarrating, setIsNarrating] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
    const [error, setError] = useState('');
    
    const isPersian = language === 'fa';
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const story = useMemo(() => {
        return storiesData[language].find(s => s.id === initialStory.id) || initialStory;
    }, [language, initialStory.id]);

    const handleNarration = async () => {
        setIsNarrating(true);
        setError('');
        try {
            const contentForNarration = story.content.split('.').slice(0, 3).join('.') + '.';
            const prompt = isPersian 
                ? `این قطعه را روایت کنید: ${contentForNarration}`
                : `Narrate the following passage: ${contentForNarration}`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                          prebuiltVoiceConfig: { voiceName: isPersian ? 'Puck' : 'Kore' },
                        },
                    },
                },
            });

            const candidate = response.candidates?.[0];
            const base64Audio = candidate?.content?.parts?.[0]?.inlineData?.data;
            
            if (!candidate || !candidate.content || !base64Audio) {
                 console.error("TTS Error: No audio data received. Full response:", response);
                 const errorDetails = response.text ? `Details: ${response.text}` : (candidate?.finishReason ? `Finish reason: ${candidate.finishReason}`: 'Unknown API issue.');
                 throw new Error(`No audio data received. ${errorDetails}`);
            }

            const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
            const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputAudioContext,
                24000,
                1,
            );
            const source = outputAudioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContext.destination);
            source.start();

        } catch (e) {
            console.error(e);
            setError(isPersian ? "گویا در ساخت آوا مشکلی پیش آمد. دوباره تلاش کنید." : "Failed to generate audio. Please try again.");
        } finally {
            setIsNarrating(false);
        }
    }
    
    const handleGenerateImage = async () => {
        setIsGeneratingImage(true);
        setGeneratedImage(null);
        setError('');
        try {
            // The instruction is now always in English for better model reliability,
            // while the story.excerpt is correctly localized based on the language state.
            const prompt = `Create a cinematic and artistic image inspired by the following story, capturing its mood and key themes: "${story.excerpt}"`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
            
            const candidate = response.candidates?.[0];
            if (!candidate || !candidate.content || !candidate.content.parts) {
                console.error("Image Gen Error: No image data received. Full response:", response);
                const errorDetails = response.text ? `Details: ${response.text}` : (candidate?.finishReason ? `Finish reason: ${candidate.finishReason}` : 'Unknown API issue.');
                throw new Error(`No image data received. ${errorDetails}`);
            }

            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                setGeneratedImage(imageUrl);
                return; // Exit after finding the first image
              }
            }
             throw new Error("No image data received from the API.");

        } catch (e) {
            console.error(e);
            setError(isPersian ? "آفرینش تصویر با مشکل روبرو شد. دوباره تلاش کنید." : "Failed to generate image. Please try again.");
        } finally {
            setIsGeneratingImage(false);
        }
    }


    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
            dir={isPersian ? 'rtl' : 'ltr'}
        >
            <AnimatePresence>
                {isFlipbookOpen && (
                    <FlipbookView 
                        story={story} 
                        language={language} 
                        onClose={() => setIsFlipbookOpen(false)} 
                    />
                )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto">
                <p className="text-brand-gold font-semibold font-ui">{story.category}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white my-4 leading-tight">{story.title}</h1>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-400 mb-8 font-ui">
                    <span>{story.author}</span>
                    <span>&bull;</span>
                    <span>{story.date}</span>
                </div>
                
                <div className="my-8 flex flex-col sm:flex-row flex-wrap gap-4 font-ui">
                    <button onClick={handleNarration} disabled={isNarrating} className="bg-gray-700 text-white font-bold py-2 px-5 rounded-full hover:bg-gray-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse">
                       {isNarrating ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                       )}
                       <span>{isNarrating ? (isPersian ? 'در حال ساختن آوا...' : 'Generating...') : (isPersian ? 'شنیدن داستان' : 'Listen to Narration')}</span>
                    </button>
                     <button onClick={() => setIsFlipbookOpen(true)} className="bg-gray-700 text-white font-bold py-2 px-5 rounded-full hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" /></svg>
                        <span>{isPersian ? 'ورق زدن داستان' : 'Read as Flipbook'}</span>
                    </button>
                    <button onClick={handleGenerateImage} disabled={isGeneratingImage} className="bg-gray-700 text-white font-bold py-2 px-5 rounded-full hover:bg-gray-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2 rtl:space-x-reverse">
                       {isGeneratingImage ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-2.293 2.293a1 1 0 000 1.414l2.293 2.293V12a1 1 0 102 0v-1.586l2.293-2.293a1 1 0 000-1.414L7 4.586V3a1 1 0 00-2 0v.586L2.707 5.879a1 1 0 000 1.414L5 9.586V11a1 1 0 102 0V9.586l2.293-2.293a1 1 0 000-1.414L7 3.586V3a1 1 0 00-1-1H5zM10 5a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 101.414 1.414L13 8.414V10a1 1 0 102 0V8.414l1.293 1.293a1 1 0 101.414-1.414L16 7h1.586a1 1 0 100-2H16l1.293-1.293a1 1 0 00-1.414-1.414L14.586 2H13a1 1 0 100 2h1.586l-1.293 1.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V5h1a1 1 0 100-2h-1a1 1 0 100-2h-1.586l1.293-1.293a1 1 0 10-1.414-1.414L13 2.586V1a1 1 0 10-2 0v1.586l-1.293-1.293a1 1 0 10-1.414 1.414L10 4.586V5z" clipRule="evenodd" /></svg>
                       )}
                       <span>{isGeneratingImage ? (isPersian ? 'در حال آفرینش تصویر...' : 'Imagining...') : (isPersian ? 'نقاشی خیال' : 'Imagine with AI')}</span>
                    </button>
                </div>

                {error && <p className="text-red-400 my-4">{error}</p>}

                 <AnimatePresence>
                    {generatedImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="my-12"
                        >
                             <h3 className="text-xl font-bold text-brand-gold mb-4 text-center">{isPersian ? 'نقشی از خیال' : 'Imagined by AI'}</h3>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border-2 border-brand-gold/50">
                                <img src={generatedImage} alt={isPersian ? 'تصویر تولید شده توسط هوش مصنوعی' : 'AI generated image'} className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <div className="aspect-w-16 aspect-h-9 my-12 rounded-lg overflow-hidden shadow-lg">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                    {story.content.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
            </div>
        </motion.div>
    );
};

export default StoryDetailPage;