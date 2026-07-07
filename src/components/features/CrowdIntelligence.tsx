"use client";

import React, { useState } from "react";
import { Users, AlertTriangle, BarChart2, TrendingUp } from "lucide-react";

type MatchPhase = "gates_open" | "kickoff_peak" | "halftime" | "exit_flow";

interface GateQueue {
  name: string;
  load: number; // 0 to 100
  waitTime: number; // in minutes
  status: "clear" | "moderate" | "congested";
}

interface SectorDensity {
  name: string;
  density: number; // percentage
  occupants: number;
}

const PHASE_DATA: Record<MatchPhase, {
  label: string;
  time: string;
  totalOccupancy: string;
  globalStatus: "nominal" | "warning" | "alert";
  riskDescription: string;
  gates: GateQueue[];
  sectors: SectorDensity[];
}> = {
  gates_open: {
    label: "Gates Opening",
    time: "15:00 AST",
    totalOccupancy: "24,500 / 75,000",
    globalStatus: "nominal",
    riskDescription: "Crowd flow is normal. All entry scanners reporting optimal throughput.",
    gates: [
      { name: "North Gate", load: 20, waitTime: 2, status: "clear" },
      { name: "South Gate", load: 35, waitTime: 5, status: "clear" },
      { name: "East Gate", load: 15, waitTime: 1, status: "clear" },
      { name: "West Gate", load: 22, waitTime: 3, status: "clear" }
    ],
    sectors: [
      { name: "Tier 1 North", density: 30, occupants: 6000 },
      { name: "Tier 1 South", density: 40, occupants: 8000 },
      { name: "Tier 2 East", density: 20, occupants: 4000 },
      { name: "Tier 2 West", density: 25, occupants: 5000 },
      { name: "VVIP Boxes", density: 15, occupants: 1500 }
    ]
  },
  kickoff_peak: {
    label: "Kickoff Arrival Peak",
    time: "17:30 AST",
    totalOccupancy: "71,200 / 75,000",
    globalStatus: "warning",
    riskDescription: "High congestion at South Gate concourse. Volunter staff redirected to speed up ticketing checks.",
    gates: [
      { name: "North Gate", load: 60, waitTime: 12, status: "moderate" },
      { name: "South Gate", load: 92, waitTime: 28, status: "congested" },
      { name: "East Gate", load: 45, waitTime: 8, status: "moderate" },
      { name: "West Gate", load: 50, waitTime: 9, status: "moderate" }
    ],
    sectors: [
      { name: "Tier 1 North", density: 95, occupants: 19000 },
      { name: "Tier 1 South", density: 98, occupants: 19600 },
      { name: "Tier 2 East", density: 85, occupants: 17000 },
      { name: "Tier 2 West", density: 80, occupants: 16000 },
      { name: "VVIP Boxes", density: 60, occupants: 6000 }
    ]
  },
  halftime: {
    label: "Half-time Rush",
    time: "18:45 AST",
    totalOccupancy: "74,800 / 75,000",
    globalStatus: "alert",
    riskDescription: "Severe bottleneck detected in Food Courts Concourse B & C. Rerouting recommendations sent to fan app.",
    gates: [
      { name: "North Concourse", load: 88, waitTime: 18, status: "congested" },
      { name: "South Concourse", load: 95, waitTime: 22, status: "congested" },
      { name: "East Concourse", load: 70, waitTime: 11, status: "moderate" },
      { name: "West Concourse", load: 55, waitTime: 7, status: "clear" }
    ],
    sectors: [
      { name: "Tier 1 North", density: 98, occupants: 19600 },
      { name: "Tier 1 South", density: 99, occupants: 19800 },
      { name: "Tier 2 East", density: 90, occupants: 18000 },
      { name: "Tier 2 West", density: 88, occupants: 17600 },
      { name: "VVIP Boxes", density: 98, occupants: 9800 }
    ]
  },
  exit_flow: {
    label: "Post-Match Exit",
    time: "20:00 AST",
    totalOccupancy: "42,000 / 75,000",
    globalStatus: "warning",
    riskDescription: "Heavy outward flow towards Metro station. Shuttles frequency increased to 90s intervals.",
    gates: [
      { name: "North Gate", load: 85, waitTime: 14, status: "congested" },
      { name: "South Gate", load: 30, waitTime: 4, status: "clear" },
      { name: "East Gate", load: 60, waitTime: 9, status: "moderate" },
      { name: "West Gate", load: 75, waitTime: 11, status: "moderate" }
    ],
    sectors: [
      { name: "Tier 1 North", density: 50, occupants: 10000 },
      { name: "Tier 1 South", density: 30, occupants: 6000 },
      { name: "Tier 2 East", density: 65, occupants: 13000 },
      { name: "Tier 2 West", density: 55, occupants: 11000 },
      { name: "VVIP Boxes", density: 20, occupants: 2000 }
    ]
  }
};

export default function CrowdIntelligence() {
  const [phase, setPhase] = useState<MatchPhase>("kickoff_peak");

  const current = PHASE_DATA[phase];

  const getStatusColor = (status: "clear" | "moderate" | "congested") => {
    switch (status) {
      case "clear": return "bg-accent/20 border-accent text-accent";
      case "moderate": return "bg-warning/20 border-warning text-warning";
      case "congested": return "bg-danger/20 border-danger text-danger";
    }
  };

  const getGlobalStatusBadge = (status: "nominal" | "warning" | "alert") => {
    switch (status) {
      case "nominal":
        return <span className="bg-accent/20 border border-accent/40 text-accent text-xs px-2.5 py-0.5 rounded font-mono font-semibold uppercase animate-pulse">Nominal</span>;
      case "warning":
        return <span className="bg-warning/20 border border-warning/40 text-warning text-xs px-2.5 py-0.5 rounded font-mono font-semibold uppercase animate-pulse">Caution</span>;
      case "alert":
        return <span className="bg-danger/20 border border-danger/40 text-danger text-xs px-2.5 py-0.5 rounded font-mono font-semibold uppercase animate-pulse">Critical</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      {/* Left Control Panel (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Phase Selectors */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 border-b border-white/10 pb-3 mb-4">
              <Users className="w-4 h-4 text-primary" />
              <h3 className="font-display text-sm tracking-wider text-white font-bold uppercase">Match Telemetry Timeline</h3>
            </div>
            
            <div className="space-y-2">
              {[
                { id: "gates_open", label: "Gates Opening", time: "15:00" },
                { id: "kickoff_peak", label: "Arrival Peak (Kickoff)", time: "17:30" },
                { id: "halftime", label: "Half-time Rush", time: "18:45" },
                { id: "exit_flow", label: "Post-match Exit Flow", time: "20:00" }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPhase(p.id as MatchPhase)}
                  className={`w-full flex items-center justify-between text-xs px-4 py-3 rounded-xl border transition-all duration-200 ${
                    phase === p.id 
                      ? "bg-white/10 border-primary text-white shadow-glow-primary" 
                      : "bg-white/[0.01] hover:bg-white/[0.03] border-white/10 text-slate-400"
                  }`}
                >
                  <span className="font-semibold">{p.label}</span>
                  <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-[10px]">{p.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Alert Widget */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="font-display text-xs text-white uppercase font-bold">AI Crowdflow Insights</span>
              </div>
              {getGlobalStatusBadge(current.globalStatus)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{current.riskDescription}</p>
          </div>
        </div>

        {/* Global Occupancy Status */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl">
              <BarChart2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Total Stadium Occupancy</div>
              <div className="text-lg font-display text-white font-bold">{current.totalOccupancy}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-accent">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-mono font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      {/* Right Graph/Data Grid (7 Cols) */}
      <div className="lg:col-span-7 glass-panel rounded-2xl border border-white/10 p-6 relative overflow-hidden bg-black/40 flex flex-col justify-between">
        <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />
        
        {/* Heatmap Grid Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-xs tracking-wider text-slate-300 font-bold uppercase">Sector Density Heatmap</h4>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
              <div className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-accent/20 border border-accent rounded" /><span>&lt;40%</span></div>
              <div className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-warning/20 border border-warning rounded" /><span>40-80%</span></div>
              <div className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-danger/20 border border-danger rounded" /><span>&gt;80%</span></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {current.sectors.map((sec, index) => {
              // Color mapping
              let bg = "bg-accent/10 border-accent/30 text-accent";
              if (sec.density >= 85) bg = "bg-danger/10 border-danger/30 text-danger";
              else if (sec.density >= 40) bg = "bg-warning/10 border-warning/30 text-warning";

              return (
                <div 
                  key={index}
                  className={`border p-3.5 rounded-xl flex items-center justify-between transition-all duration-300 ${bg}`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{sec.name}</div>
                    <div className="text-[10px] opacity-60 font-mono mt-0.5">{sec.occupants.toLocaleString()} occupants</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-mono font-bold">{sec.density}%</div>
                    <div className="text-[8px] uppercase tracking-wider opacity-60">density</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gate Wait Times */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-3.5">
          <h4 className="font-display text-xs tracking-wider text-slate-300 font-bold uppercase">Gate Entrance Queuing</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {current.gates.map((gate, index) => (
              <div 
                key={index} 
                className={`border p-3 rounded-xl flex flex-col justify-between h-[90px] transition-all duration-300 ${getStatusColor(gate.status)}`}
              >
                <div className="text-xs font-bold text-white">{gate.name}</div>
                <div>
                  <div className="text-lg font-mono font-bold leading-none">{gate.waitTime}m</div>
                  <div className="text-[8px] uppercase tracking-wider opacity-60 mt-0.5">wait time</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
