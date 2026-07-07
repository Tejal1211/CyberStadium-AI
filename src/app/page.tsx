"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowUpRight, Bot, Code, Globe, Leaf, ChevronRight, Map, Play, Users } from "lucide-react";

// Dynamically import ThreeDScene with SSR disabled to prevent WebGL canvas crashes during Next.js hydration
const ThreeDScene = dynamic(() => import("@/components/ThreeDScene"), { ssr: false });

// Import Feature Components
import AICopilot from "@/components/features/AICopilot";
import SmartNavigation from "@/components/features/SmartNavigation";
import CrowdIntelligence from "@/components/features/CrowdIntelligence";
import MultilingualAssistant from "@/components/features/MultilingualAssistant";
import GreenStadium from "@/components/features/GreenStadium";

// Import Timeline & Dashboard
import Timeline from "@/components/Timeline";
import DashboardPreview from "@/components/DashboardPreview";

type FeatureTab = "copilot" | "nav" | "crowd" | "lang" | "green";

export default function Home() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("copilot");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg overflow-x-hidden font-sans">
      
      {/* HUD Grid & Background scanlines */}
      <div className="absolute inset-0 cyber-grid animate-grid-move z-0 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.05)_0,transparent_60%)] pointer-events-none" />

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#050816]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-xl">⚽</span>
            <span className="font-display text-sm tracking-widest text-white font-black uppercase">
              CyberStadium <span className="text-primary">AI</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono text-slate-400">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition">01. ABOUT</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-primary transition">02. AI_PILLARS</button>
            <button onClick={() => scrollToSection("journey")} className="hover:text-primary transition">03. FAN_TIMELINE</button>
            <button onClick={() => scrollToSection("dashboard")} className="hover:text-primary transition">04. CONTROL_ROOM</button>
          </nav>

          <div>
            <button 
              onClick={() => scrollToSection("dashboard")}
              className="px-4 py-2 border border-primary/40 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-mono text-xs font-bold transition duration-200 tracking-wider shadow-glow-primary interactive-hover"
            >
              LAUNCH HUB
            </button>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-16 z-10">
        {/* WebGL Canvas Background */}
        <ThreeDScene />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 border border-accent/30 bg-accent/10 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[10px] text-accent tracking-widest font-black uppercase">
              The AI Brain Behind FIFA World Cup 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tight leading-none mb-6"
          >
            The Future of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent glow-primary">
              Stadium Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-10"
          >
            An AI-powered operations platform transforming fan experiences, stadium management, and real-time decision-making during FIFA World Cup 2026.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => scrollToSection("features")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-mono text-xs font-bold transition duration-200 tracking-wider shadow-glow-primary hover:scale-[1.02] flex items-center justify-center space-x-2.5 interactive-hover"
            >
              <span>EXPLORE PLATFORM</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => scrollToSection("dashboard")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-mono text-xs font-bold transition duration-200 tracking-wider flex items-center justify-center space-x-2.5 interactive-hover"
            >
              <Play className="w-4 h-4 text-primary fill-primary" />
              <span>WATCH OPERATOR DEMO</span>
            </button>
          </motion.div>
        </div>

        {/* HUD corners indicator decoration */}
        <div className="absolute bottom-8 left-8 hidden lg:block font-mono text-[9px] text-white/20 uppercase tracking-widest space-y-1">
          <div>LOC: LUSAIL_DOME [LAT: 25.421, LNG: 51.492]</div>
          <div>BEAM: PRIMARY_STATION_SYNC: OK</div>
        </div>
      </section>

      {/* 2. ABOUT CYBERSTADIUM AI */}
      <section id="about" className="py-24 relative border-t border-white/5 z-10 bg-[#050816]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">01. ABOUT CYBERSTADIUM AI</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-2.5">
              Reinventing the Matchday Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-4 leading-relaxed">
              Leveraging Gemini models and Google Cloud telemetry pipelines to bridge physical venue infrastructure with intelligent software guidance.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Our Mission",
                text: "To build a highly responsive stadium operations matrix that guarantees safe crowds, zero language friction, and automated energy offsets during the world's biggest sports tournament.",
                border: "border-primary/20",
                glow: "shadow-glow-primary",
                label: "MISSION"
              },
              {
                title: "Our Vision",
                text: "A stadium that communicates as a single intelligent entity, connecting fans, medical stations, security officers, and circular eco grids through microsecond-latency AI processing.",
                border: "border-secondary/20",
                glow: "shadow-glow-secondary",
                label: "VISION"
              },
              {
                title: "Why Generative AI?",
                text: "Traditional rule-based engines fail during massive crowd fluctuations. GenAI compiles telemetry reports and speaks natural languages to deliver instant context-aware solutions.",
                border: "border-accent/20",
                glow: "shadow-glow-accent",
                label: "INTELLIGENCE"
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                className={`glass-panel p-6 rounded-2xl border ${card.border} hover:${card.glow} transition-all duration-300 relative group`}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 scanline opacity-10 pointer-events-none rounded-2xl" />
                <span className="text-[9px] font-mono text-white/30 tracking-widest mb-4 block font-bold">{card.label}</span>
                <h3 className="text-lg font-display text-white font-bold mb-3">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{card.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick telemetry statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
            {[
              { val: 120, label: "STADIUM SERVICES", suffix: "+" },
              { val: 99, label: "AI PREDICTION ACCURACY", suffix: "%" },
              { val: 24, label: "REAL-TIME AGENTS ACTIVE", suffix: "/7" },
              { val: 10, label: "STADIUM LATENCY RATE", suffix: "ms" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-1">
                  <CountUp end={stat.val} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR FIVE AI FEATURES */}
      <section id="features" className="py-24 relative border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-secondary font-bold tracking-widest uppercase">02. OUR FIVE AI FEATURES</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-2.5">
              Advanced Operations Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-4 leading-relaxed">
              Explore our core modules governing stadium safety, localized translations, smart pathfinding, and eco grid sustainability.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "copilot", label: "AI Stadium Copilot", icon: Bot, color: "text-primary" },
              { id: "nav", label: "Smart Indoor Navigation", icon: Map, color: "text-primary" },
              { id: "crowd", label: "Crowd Intelligence", icon: Users, color: "text-accent" },
              { id: "lang", label: "Multilingual Assistant", icon: Globe, color: "text-secondary" },
              { id: "green", label: "Green Stadium Intelligence", icon: Leaf, color: "text-accent" }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FeatureTab)}
                  aria-pressed={activeTab === tab.id}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab.id 
                      ? "bg-white/10 border-primary text-white shadow-glow-primary" 
                      : "bg-white/[0.01] hover:bg-white/[0.03] border-white/5 text-slate-400"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Feature Render with Animation */}
          <div className="relative min-h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {activeTab === "copilot" && <AICopilot />}
                {activeTab === "nav" && <SmartNavigation />}
                {activeTab === "crowd" && <CrowdIntelligence />}
                {activeTab === "lang" && <MultilingualAssistant />}
                {activeTab === "green" && <GreenStadium />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS TIMELINE */}
      <section id="journey" className="py-24 relative border-t border-white/5 bg-[#050816]/60 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-accent font-bold tracking-widest uppercase">03. STADIUM FAN TIMELINE</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-2.5">
              The Connected Fan Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-4 leading-relaxed">
              Witness how CyberStadium AI orchestrates a fluid stadium experience from transit arrival to seating navigation and eco actions.
            </p>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 5. INTERACTIVE DASHBOARD PREVIEW */}
      <section id="dashboard" className="py-24 relative border-t border-white/5 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase">04. OPERATIONS CONTROL CENTRE</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mt-2.5">
              Operator HUD Command Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-4 leading-relaxed">
              Test the facility controller interfaces. Tap panels to override roof levels, toggle shuttle flows, and view telemetry outputs.
            </p>
          </div>

          <DashboardPreview />
        </div>
      </section>

      {/* 6. ANIMATED STATISTICS COUNT-UP */}
      <section className="py-20 relative border-t border-white/5 bg-[#050816]/75 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { val: 20, label: "FANS ASSISTED", suffix: "M+", color: "text-primary" },
              { val: 95, label: "REDUCED WAITING", suffix: "%", color: "text-accent" },
              { val: 40, label: "LOWER CONGESTION", suffix: "%", color: "text-secondary" },
              { val: 30, label: "ENERGY SAVINGS", suffix: "%", color: "text-accent" },
              { val: 120, label: "LANGUAGES SUPPORTED", suffix: "+", color: "text-primary" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <h3 className={`text-3xl sm:text-4xl md:text-5xl font-mono font-bold ${stat.color} mb-2`}>
                  <CountUp end={stat.val} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </h3>
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-24 relative border-t border-white/5 bg-gradient-to-b from-[#050816] to-[#0d0728] z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-primary/20 relative overflow-hidden bg-black/40">
            <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
            
            <span className="font-mono text-xs text-primary font-bold tracking-widest uppercase mb-4 block">GET STARTED</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight leading-none mb-6">
              Experience the Future of Stadium Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl mx-auto mb-8">
              Empower volunteers, safety managers, and millions of fans during the FIFA World Cup 2026 with a state-of-the-art Generative AI facility engine.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => scrollToSection("dashboard")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-mono text-xs font-bold transition duration-200 tracking-wider shadow-glow-primary hover:scale-[1.02] flex items-center justify-center space-x-2.5 interactive-hover"
              >
                <span>LAUNCH PLATFORM</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              
              <a 
                href="#"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 font-mono text-xs font-bold transition duration-200 tracking-wider flex items-center justify-center space-x-2.5 interactive-hover"
              >
                <Code className="w-4 h-4 text-slate-300" />
                <span>GITHUB REPOSITORY</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050816] py-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-base">⚽</span>
            <span className="font-display text-xs tracking-wider text-white font-black uppercase">
              CyberStadium <span className="text-primary">AI</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-slate-500">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition">ABOUT</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-primary transition">FEATURES</button>
            <button onClick={() => scrollToSection("journey")} className="hover:text-primary transition">TIMELINE</button>
            <button onClick={() => scrollToSection("dashboard")} className="hover:text-primary transition">DASHBOARD</button>
          </div>

          <div className="text-[10px] font-mono text-slate-600">
            &copy; {new Date().getFullYear()} CyberStadium AI. Google Cloud GenAI Hackathon.
          </div>
        </div>

        {/* Bottom glowing divider line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-8 max-w-2xl mx-auto shadow-glow-primary" />
      </footer>

    </div>
  );
}
