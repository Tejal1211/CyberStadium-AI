"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Zap, Droplet, Trash2, Cpu } from "lucide-react";

type EcoTab = "energy" | "water" | "waste";

export default function GreenStadium() {
  const [activeTab, setActiveTab] = useState<EcoTab>("energy");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      {/* Left controls (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Tab selection */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-3 mb-2">
              <Leaf className="w-4 h-4 text-accent" />
              <h3 className="font-display text-sm tracking-wider text-white font-bold uppercase">Eco Dashboard</h3>
            </div>

            <div className="space-y-2">
              {[
                { id: "energy", label: "Energy Monitor", desc: "Solar grid & HVAC consumption", icon: Zap, color: "text-amber-400" },
                { id: "water", label: "Water Operations", desc: "Recycling & irrigation telemetry", icon: Droplet, color: "text-blue-400" },
                { id: "waste", label: "Waste Analytics", desc: "Recycling, composting levels", icon: Trash2, color: "text-accent" }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as EcoTab)}
                    className={`w-full flex items-start space-x-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${
                      activeTab === tab.id 
                        ? "bg-white/10 border-accent text-white shadow-glow-accent" 
                        : "bg-white/[0.01] hover:bg-white/[0.03] border-white/10 text-slate-300"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${tab.color} mt-0.5`} />
                    <div className="text-xs">
                      <div className="font-semibold text-white">{tab.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{tab.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Eco-Tip */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-accent animate-pulse-cyber" />
              <span className="font-display text-xs text-white uppercase font-bold">AI Sustainability Tip</span>
            </div>
            {activeTab === "energy" && (
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Optimize energy distribution: Redirect battery reserves from Solar Grid C to Level 2 HVAC concourse zones to shave peak cooling rates by 12%.
              </p>
            )}
            {activeTab === "water" && (
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Irrigation delay active: Greywater collection exceeds pitch irrigation demand by 140%. Postponing sprinkler cycle by 2 hours based on humidity logs.
              </p>
            )}
            {activeTab === "waste" && (
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Direct composting dispatch: Bin Section 108 is at 88% capacity. Dispatched volunteer crew to move waste to Bio-Compost Digester Sub-Station 2.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right panel visuals (8 cols) */}
      <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/10 p-6 relative overflow-hidden bg-black/40 flex flex-col justify-between">
        <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />

        {/* Tab specific screens */}
        {activeTab === "energy" && (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="font-display text-xs font-bold text-slate-300 uppercase">Live Solar & Grid Power Telemetry</span>
                <span className="text-[10px] font-mono text-white/40">REFRESH_RATE: 2.5s</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Solar Array Generation</span>
                    <span className="text-amber-400 font-bold">78% (1,450 kW)</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Battery Storage Bank</span>
                    <span className="text-accent font-bold">92% (8,280 kWh)</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-accent to-emerald-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">HVAC Stadium Climate Load</span>
                    <span className="text-primary font-bold">64% (980 kW)</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-blue-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "64%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid indicators */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Carbon Offset</div>
                <div className="text-base font-display font-bold text-accent">14.8 Tons/hr</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Grid Independence</div>
                <div className="text-base font-display font-bold text-white">82% Self-run</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Smart EV Chargers</div>
                <div className="text-base font-display font-bold text-primary">68 / 80 Active</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "water" && (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="font-display text-xs font-bold text-slate-300 uppercase">Water Recycling & Greywater Systems</span>
                <span className="text-[10px] font-mono text-white/40">SYSTEM: ACTIVE</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Rainwater Harvesting Reserve</span>
                    <span className="text-blue-400 font-bold">85% (340,000 Liters)</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-blue-300 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Greywater Treatment Recovery</span>
                    <span className="text-accent font-bold">96% Recycle Rate</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-accent to-emerald-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "96%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Pitch Turf Irrigation Draw</span>
                    <span className="text-primary font-bold">14,200 Liters/cycle</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-cyan-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid indicators */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Irrigation Mode</div>
                <div className="text-base font-display font-bold text-accent">ECO-OPTIMIZED</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Purification Capacity</div>
                <div className="text-base font-display font-bold text-white">45,000 L/hr</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Leak Sensors Status</div>
                <div className="text-base font-display font-bold text-primary">100% OK</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "waste" && (
          <div className="space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="font-display text-xs font-bold text-slate-300 uppercase">Stadium Waste & Circular Economy Logs</span>
                <span className="text-[10px] font-mono text-white/40">COMPILATION: ON</span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Food Waste Organic Compost bins</span>
                    <span className="text-accent font-bold">54% filled (Sub-Station A/B)</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-accent to-emerald-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "54%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Plastic & Aluminum Recycling</span>
                    <span className="text-primary font-bold">78% Target Achieved</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-primary to-cyan-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Total Diversion from Landfill</span>
                    <span className="text-white font-bold">95.4% Diverted</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-white to-slate-400 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: "95%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Grid indicators */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Bio-Composter Rate</div>
                <div className="text-base font-display font-bold text-accent">4.2 Tons/day</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Aluminum Recovered</div>
                <div className="text-base font-display font-bold text-white">45k Cans</div>
              </div>
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="text-[9px] uppercase font-mono text-slate-400">Circular Sourcing</div>
                <div className="text-base font-display font-bold text-primary">100% compostable</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
