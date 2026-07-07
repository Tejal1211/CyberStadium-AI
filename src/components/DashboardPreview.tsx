"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Wind, Car, Bus, Cpu, Radio, Eye } from "lucide-react";

interface LogEntry {
  time: string;
  type: "info" | "warning" | "success";
  text: string;
}

export default function DashboardPreview() {
  const [roofOpen, setRoofOpen] = useState(false);
  const [shuttleFrequency, setShuttleFrequency] = useState<"normal" | "rapid">("normal");
  const [liveStats, setLiveStats] = useState({
    parkingFree: 412,
    hvacUsage: 78,
    activeSecurityAlerts: 0,
    crowdFlowRate: 1420
  });

  const [aiLogs, setAiLogs] = useState<LogEntry[]>([
    { time: "20:29:54", type: "success", text: "Solar backup arrays synced to concourse HVAC grids." },
    { time: "20:29:10", type: "info", text: "Volunteers dispatched to Section 104 compost station." },
    { time: "20:28:45", type: "warning", text: "Crowd flow bottleneck emerging at Gate C exit ramp." }
  ]);

  // Simulate updating stats and logs
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random shifts in stats
      setLiveStats(prev => ({
        parkingFree: Math.max(120, prev.parkingFree + (Math.random() > 0.5 ? -3 : 2)),
        hvacUsage: Math.min(100, Math.max(50, prev.hvacUsage + (Math.random() > 0.5 ? -1 : 1))),
        activeSecurityAlerts: Math.random() > 0.95 ? 1 : 0,
        crowdFlowRate: Math.max(1000, prev.crowdFlowRate + Math.floor((Math.random() - 0.5) * 80))
      }));

      // Random new log
      if (Math.random() > 0.7) {
        const logTypes: ("info" | "warning" | "success")[] = ["info", "success", "warning"];
        const type = logTypes[Math.floor(Math.random() * logTypes.length)];
        const times = new Date().toTimeString().split(' ')[0];
        
        let text = "Telemetry node heartbeat nominal.";
        if (type === "warning") {
          text = `Restroom queue waiting time exceeded 15 mins in Bay ${Math.floor(Math.random() * 20) + 100}.`;
        } else if (type === "success") {
          text = `Language pack ${["ja", "es", "ar"][Math.floor(Math.random() * 3)]} compiler reload completed.`;
        } else {
          text = `Shuttle dispatch queue optimized for Sector ${["North", "South", "East"][Math.floor(Math.random() * 3)]}.`;
        }

        setAiLogs(prev => [
          { time: times, type, text },
          ...prev.slice(0, 5) // keep last 6 logs
        ]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 md:p-8 bg-black/40 relative overflow-hidden">
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
      
      {/* Control Room Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="font-display text-lg text-white font-black tracking-wider uppercase">Stadium Operations Center</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">Real-time AI telemetry feed & facility controller system.</p>
        </div>

        {/* Global stats indicators */}
        <div className="flex items-center space-x-4 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
            <span className="text-[10px] font-mono text-slate-300 font-semibold">FEED: STABLE</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[10px] font-mono text-primary font-bold">LATENCY: 8ms</span>
        </div>
      </div>

      {/* Main Grid: Widgets + Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: 4 Widgets (8 Cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Parking slot status */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase font-display">Smart Parking Slots</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500">SECTOR A & B</span>
            </div>
            <div className="text-2xl font-mono font-bold text-white mb-2">{liveStats.parkingFree} / 600</div>
            <div className="text-[10px] text-slate-400 font-sans mb-3">Available vehicle stalls detected via camera matrix.</div>
            <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${(liveStats.parkingFree / 600) * 100}%` }}
              />
            </div>
          </div>

          {/* Climate controls / roof switch */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Wind className="w-4 h-4 text-warning" />
                  <span className="text-xs font-bold uppercase font-display">Climate Control</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">ROOF SYSTEM</span>
              </div>
              <div className="text-2xl font-mono font-bold text-white mb-1">
                {roofOpen ? "OPEN (100%)" : "CLOSED"}
              </div>
              <p className="text-[10px] text-slate-400 font-sans">Adjust ceiling dome panels based on temperature predictions.</p>
            </div>
            <button
              onClick={() => setRoofOpen(!roofOpen)}
              className="mt-4 py-2 px-3 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/20 hover:border-primary/40 hover:text-white transition duration-200 text-xs font-mono text-slate-300 text-center"
            >
              TOGGLE ROOF CEILING
            </button>
          </div>

          {/* Security status */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold uppercase font-display">CCTV AI SCANNER</span>
              </div>
              <span className="text-[9px] font-mono text-slate-500">1,240 FEEDS</span>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-2xl font-mono font-bold text-white">
                {liveStats.activeSecurityAlerts === 0 ? "SECURE" : "CHECK SEC_14"}
              </span>
              <span className="text-[10px] text-accent font-semibold font-mono">100% MONITORING</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans mb-3">Computer vision threat scanning running. Alert status is stable.</p>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-accent">
              <Eye className="w-3.5 h-3.5" />
              <span>LOG: ALL BOUNDARY LINES SECURED</span>
            </div>
          </div>

          {/* Transit and shuttle logs */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/20 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Bus className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase font-display">Transit Despatcher</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">METRO LINKS</span>
              </div>
              <div className="text-xl font-mono font-bold text-white mb-1">
                {shuttleFrequency === "normal" ? "Normal Frequency" : "Rapid Flow (90s)"}
              </div>
              <p className="text-[10px] text-slate-400 font-sans">Control volunteer transit buses to stadium gate corridors.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setShuttleFrequency("normal")}
                className={`py-1.5 rounded-lg border text-[10px] font-mono transition duration-150 text-center ${
                  shuttleFrequency === "normal"
                    ? "bg-primary/25 border-primary text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >
                NORMAL
              </button>
              <button
                onClick={() => setShuttleFrequency("rapid")}
                className={`py-1.5 rounded-lg border text-[10px] font-mono transition duration-150 text-center ${
                  shuttleFrequency === "rapid"
                    ? "bg-accent/25 border-accent text-white shadow-glow-accent"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >
                RAPID FLOW
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Log console (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col glass-panel rounded-2xl border border-white/10 bg-black/50 overflow-hidden min-h-[300px]">
          {/* Console head */}
          <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-accent animate-pulse-cyber" />
              <span className="font-mono text-xs text-slate-300 font-semibold uppercase">AI Orchestrator logs</span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
          </div>

          {/* Console logs */}
          <div className="flex-1 p-4 font-mono text-[10px] space-y-3.5 overflow-y-auto max-h-[300px] scrollbar text-slate-400">
            <AnimatePresence initial={false}>
              {aiLogs.map((log, index) => {
                let badgeColor = "border-slate-500/30 text-slate-400";
                if (log.type === "warning") badgeColor = "border-danger/30 text-danger bg-danger/10";
                else if (log.type === "success") badgeColor = "border-accent/30 text-accent bg-accent/10";

                return (
                  <motion.div
                    key={log.time + index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-white/20">[{log.time}]</span>
                      <span className={`border px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${badgeColor}`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed pl-1">{log.text}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
