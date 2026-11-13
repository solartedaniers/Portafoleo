"use client";
import { useCallback, useEffect, useState } from "react";

const LOCALES: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
};

const PREFERRED_VOICE = /male|man|david|jorge|diego|miguel|pablo|john|mike|brian|daniel/i;

function pickVoice(synth: SpeechSynthesis, lang: string): SpeechSynthesisVoice | null {
  const voices = synth.getVoices().filter((voice) => voice.lang.startsWith(lang));
  return voices.find((voice) => PREFERRED_VOICE.test(voice.name)) ?? voices[0] ?? null;
}

function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function useSpeech<K extends string | number>(lang: string) {
  const [speakingKey, setSpeakingKey] = useState<K | null>(null);

  useEffect(() => {
    if (!isSpeechSupported()) return;
    const synth = window.speechSynthesis;
    synth.getVoices();
    return () => synth.cancel();
  }, []);

  // Al cambiar de idioma corto la narración en curso
  useEffect(() => {
    if (!isSpeechSupported()) return;
    window.speechSynthesis.cancel();
    setSpeakingKey(null);
  }, [lang]);

  const toggle = useCallback(
    (key: K, text: string) => {
      if (!isSpeechSupported() || !text) return;
      const synth = window.speechSynthesis;
      const wasSpeakingThis = speakingKey === key;

      synth.cancel();
      setSpeakingKey(null);
      if (wasSpeakingThis) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = pickVoice(synth, lang);
      utterance.lang = LOCALES[lang] ?? lang;
      utterance.onend = () => setSpeakingKey((current) => (current === key ? null : current));
      utterance.onerror = () => setSpeakingKey((current) => (current === key ? null : current));

      setSpeakingKey(key);
      synth.speak(utterance);
    },
    [lang, speakingKey]
  );

  return { speakingKey, toggle };
}
