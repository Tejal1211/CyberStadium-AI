"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe2, Volume2, Mic, CheckCircle, Languages, AlertCircle } from "lucide-react";

type LanguageKey = "en" | "es" | "fr" | "ar" | "hi" | "ja";

interface LangData {
  name: string;
  nativeName: string;
  flag: string;
  welcome: string;
  instruction: string;
  announcement: string;
  alignment: "ltr" | "rtl";
}

const LANGUAGES: Record<LanguageKey, LangData> = {
  en: {
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    welcome: "Welcome to the FIFA World Cup 2026 Stadium Concourse.",
    instruction: "Security screening gates are located on your left. Please have your digital ticket QR code ready.",
    announcement: "ANNOUNCEMENT: Kickoff is in 30 minutes. Please proceed to your designated seats.",
    alignment: "ltr"
  },
  es: {
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    welcome: "Bienvenido al vestíbulo del estadio de la Copa Mundial de la FIFA 2026.",
    instruction: "Las puertas de control de seguridad se encuentran a su izquierda. Tenga listo el código QR de su entrada digital.",
    announcement: "ANUNCIO: El partido comienza en 30 minutos. Diríjase a sus asientos asignados.",
    alignment: "ltr"
  },
  fr: {
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    welcome: "Bienvenue sur le parvis du stade de la Coupe du Monde de la FIFA 2026.",
    instruction: "Les portiques de contrôle de sécurité sont situés sur votre gauche. Veuillez préparer le code QR de votre billet numérique.",
    announcement: "ANNONCE: Le coup d'envoi est dans 30 minutes. Veuillez rejoindre les places attribuées.",
    alignment: "ltr"
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇶🇦",
    welcome: "مرحباً بكم في ساحة استاد كأس العالم فيفا 2026.",
    instruction: "بوابات الفحص الأمني تقع على يساركم. يرجى تجهيز رمز الاستجابة السريعة (QR) الخاص بتذكرتكم الرقمية.",
    announcement: "تنويه: تنطلق المباراة بعد 30 دقيقة. يرجى التوجه إلى المقاعد المخصصة لكم.",
    alignment: "rtl"
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    welcome: "फीफा विश्व कप 2026 स्टेडियम कॉनकोर्स में आपका स्वागत है।",
    instruction: "सुरक्षा जांच गेट आपकी बाईं ओर स्थित हैं। कृपया अपना डिजिटल टिकट क्यूआर कोड तैयार रखें।",
    announcement: "घोषणा: मैच 30 मिनट में शुरू होगा। कृपया अपनी आवंटित सीटों की ओर बढ़ें।",
    alignment: "ltr"
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    welcome: "FIFA ワールドカップ 2026 スタジアムコンコースへようこそ。",
    instruction: "手荷物検査ゲートは左側にございます。スマートフォンの電子チケットQRコードをご提示ください。",
    announcement: "アナウンス：キックオフまであと30分です。指定の座席にお進みください。",
    alignment: "ltr"
  }
};

export default function MultilingualAssistant() {
  const [lang, setLang] = useState<LanguageKey>("en");
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [waveHeight, setWaveHeight] = useState<number[]>(() => new Array(15).fill(4));

  const current = LANGUAGES[lang];

  // Voice Wave Simulation
  useEffect(() => {
    if (!isPlayingVoice) return undefined;

    const interval = window.setInterval(() => {
      setWaveHeight(new Array(15).fill(0).map(() => Math.floor(Math.random() * 28) + 6));
    }, 100);

    return () => window.clearInterval(interval);
  }, [isPlayingVoice]);

  const displayWaveHeight = isPlayingVoice ? waveHeight : new Array(15).fill(4);

  const triggerVoice = () => {
    if (isPlayingVoice) {
      setIsPlayingVoice(false);
      return;
    }
    setIsPlayingVoice(true);
    // Auto stop voice after 4 seconds
    setTimeout(() => {
      setIsPlayingVoice(false);
    }, 4500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      {/* Left controls (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Language Grid */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3 mb-2">
            <Languages className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm tracking-wider text-white font-bold uppercase">Language Selection</h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(LANGUAGES) as LanguageKey[]).map((key) => {
              const l = LANGUAGES[key];
              return (
                <button
                  key={key}
                  onClick={() => {
                    setLang(key);
                    setIsPlayingVoice(false);
                  }}
                  className={`flex flex-col text-left px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                    lang === key 
                      ? "bg-white/10 border-primary text-white shadow-glow-primary" 
                      : "bg-white/[0.01] hover:bg-white/[0.03] border-white/10 text-slate-300"
                  }`}
                >
                  <span className="text-xs font-semibold flex items-center space-x-1.5">
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">{l.nativeName}</span>
                </button>
              );
            })}
          </div>

          {/* Voice translator simulation */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-primary" />
                <span className="text-xs text-white font-bold font-display uppercase">Real-Time Voice Translate</span>
              </div>
              <span className="text-[8px] font-mono text-accent bg-accent/15 px-2 py-0.5 rounded font-bold">READY</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Simulating instant announcements speaker synchronization in real-time.</p>
            <button
              onClick={triggerVoice}
              className={`w-full py-2.5 rounded-xl border font-mono text-xs flex items-center justify-center space-x-2.5 transition duration-200 ${
                isPlayingVoice 
                  ? "bg-danger/25 border-danger text-danger hover:bg-danger/35"
                  : "bg-primary/20 border-primary/50 text-primary hover:bg-primary/30"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingVoice ? "STOP ANNOUNCEMENT" : "PLAY AUDIO CONSOLE"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right translation output screen (8 cols) */}
      <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/10 p-6 relative overflow-hidden bg-black/40 flex flex-col justify-between">
        <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <Globe2 className="w-5 h-5 text-primary" />
            <div>
              <h4 className="font-display text-xs text-white uppercase font-bold tracking-wider">AI Translate HUD Console</h4>
              <p className="text-[9px] text-slate-500 font-mono">LATENCY: &lt;12ms | SYNC: ACTIVE</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-accent text-xs font-mono font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>TRANSLATION COMPLETED</span>
          </div>
        </div>

        {/* Translation Output Text */}
        <div 
          className="flex-1 space-y-6 flex flex-col justify-center select-none"
          dir={current.alignment}
        >
          {/* Welcome translation */}
          <div className="space-y-1">
            <div className={`text-[9px] font-mono text-white/30 uppercase tracking-widest ${current.alignment === 'rtl' ? 'text-right' : 'text-left'}`}>
              [01_WELCOME_BANNER]
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">{current.welcome}</h2>
          </div>

          {/* Instruction translation */}
          <div className="space-y-1">
            <div className={`text-[9px] font-mono text-white/30 uppercase tracking-widest ${current.alignment === 'rtl' ? 'text-right' : 'text-left'}`}>
              [02_INSTRUCTIONAL_ALERT]
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{current.instruction}</p>
          </div>

          {/* Safety alert translation */}
          <div className="space-y-1">
            <div className={`text-[9px] font-mono text-white/30 uppercase tracking-widest ${current.alignment === 'rtl' ? 'text-right' : 'text-left'}`}>
              [03_PA_ANNOUNCEMENT]
            </div>
            <p className="text-xs text-warning border-l-2 border-warning/50 pl-3 leading-relaxed rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
              {current.announcement}
            </p>
          </div>
        </div>

        {/* Voice wave visualizer footer */}
        <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] text-slate-400 font-sans">Multi-channel voice synthesizer outputting broadcast signal.</span>
          </div>

          {/* Bouncing Audio Bars */}
          <div className="flex items-end space-x-[3px] h-[35px] pr-2">
            {displayWaveHeight.map((h, i) => (
              <motion.div
                key={i}
                className={`w-[2.5px] rounded-t-full ${
                  isPlayingVoice ? "bg-accent" : "bg-white/20"
                }`}
                animate={{ height: h }}
                transition={{ type: "tween", duration: 0.1 }}
                style={{
                  boxShadow: isPlayingVoice 
                    ? "0 0 10px rgba(0, 255, 136, 0.4)" 
                    : "none"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
