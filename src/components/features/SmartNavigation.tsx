"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Compass, Accessibility, Clock, CornerDownRight, Layers } from "lucide-react";

type Category = "all" | "food" | "washrooms" | "medical" | "exits" | "wheelchair";

interface LocationNode {
  id: string;
  name: string;
  category: Category;
  x: number;
  y: number;
  details: string;
}

const LOCATIONS: LocationNode[] = [
  { id: "user", name: "Your Position (Sec 112)", category: "all", x: 200, y: 320, details: "Tier 2 concourse lobby" },
  { id: "food_a", name: "Green Pitch Bites", category: "food", x: 350, y: 180, details: "Tier 1 - Vegan options" },
  { id: "food_b", name: "Stadium Tacos", category: "food", x: 120, y: 150, details: "Tier 1 - Quick bites" },
  { id: "rest_a", name: "Concourse Washroom West", category: "washrooms", x: 100, y: 250, details: "Restrooms & Baby Care" },
  { id: "rest_b", name: "Concourse Washroom East", category: "washrooms", x: 380, y: 280, details: "Restrooms & Handicap Friendly" },
  { id: "med", name: "Medical Station 4", category: "medical", x: 340, y: 310, details: "Emergency & First Aid" },
  { id: "exit_a", name: "South Gate (Gate 4)", category: "exits", x: 250, y: 380, details: "Main Exit Gate" },
  { id: "exit_b", name: "North-West Gate (Gate 1)", category: "exits", x: 80, y: 100, details: "Metro connection exit" },
  { id: "elevator", name: "ADA Elevator Lobby B", category: "wheelchair", x: 160, y: 300, details: "Wheelchair accessible lift" }
];

export default function SmartNavigation() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [targetLoc, setTargetLoc] = useState<LocationNode | null>(null);
  const [useWheelchairRoute, setUseWheelchairRoute] = useState(false);

  const filteredLocations = LOCATIONS.filter(
    (loc) => selectedCategory === "all" || loc.category === selectedCategory || loc.id === "user"
  );

  const handleSelectLoc = (loc: LocationNode) => {
    if (loc.id === "user") return;
    setTargetLoc(loc);
  };

  // Generate SVG path from User to Target
  const getPathD = () => {
    if (!targetLoc) return "";
    const user = LOCATIONS.find((l) => l.id === "user")!;
    
    if (useWheelchairRoute) {
      // ADA Elevator route: routes through the elevator node first
      const elevator = LOCATIONS.find((l) => l.id === "elevator")!;
      return `M ${user.x} ${user.y} Q ${elevator.x} ${elevator.y} ${elevator.x} ${elevator.y} T ${targetLoc.x} ${targetLoc.y}`;
    }
    
    // Normal route: quadratic curve around the pitch center
    return `M ${user.x} ${user.y} Q 250 220 ${targetLoc.x} ${targetLoc.y}`;
  };

  // Calculate distance
  const getDistance = () => {
    if (!targetLoc) return 0;
    const user = LOCATIONS.find((l) => l.id === "user")!;
    const dx = targetLoc.x - user.x;
    const dy = targetLoc.y - user.y;
    // Scale distance factor
    const scalar = useWheelchairRoute ? 1.4 : 1.1;
    return Math.round(Math.sqrt(dx * dx + dy * dy) * scalar);
  };

  const getEstTime = (meters: number) => {
    const walkingSpeedMps = 1.2; // 1.2 m/s
    const seconds = meters / walkingSpeedMps;
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} min`;
  };

  const distance = getDistance();
  const estTime = getEstTime(distance);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      {/* Left Navigation Controls (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {/* Layer Selection */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm tracking-wider text-white font-bold uppercase">Map Layers</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "all", label: "Show All", color: "border-white/20 text-slate-300" },
              { id: "food", label: "Food Concourse", color: "border-orange-500/30 text-orange-400" },
              { id: "washrooms", label: "Restrooms", color: "border-blue-500/30 text-blue-400" },
              { id: "medical", label: "Medical Aid", color: "border-danger/30 text-danger" },
              { id: "exits", label: "Exit Gates", color: "border-accent/30 text-accent" },
              { id: "wheelchair", label: "ADA Access", color: "border-purple-500/30 text-purple-400" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`text-left text-xs px-3 py-2.5 rounded-xl border transition-all duration-200 ${
                  selectedCategory === cat.id 
                    ? "bg-white/10 border-primary text-white shadow-glow-primary" 
                    : `bg-white/[0.01] hover:bg-white/[0.03] ${cat.color}`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accessibility toggle */}
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <Accessibility className="w-4 h-4 text-primary" />
              <div className="text-xs">
                <div className="font-semibold text-white">Wheelchair Accessible</div>
                <div className="text-[10px] text-slate-400">Ramps & Elevator routing</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={useWheelchairRoute}
                onChange={() => setUseWheelchairRoute(!useWheelchairRoute)}
                aria-label="Use wheelchair accessible route"
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:height-4 after:w-4 after:transition-all peer-checked:bg-primary peer-checked:after:bg-black peer-checked:after:border-primary"></div>
            </label>
          </div>
        </div>

        {/* Selected Route Info */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 min-h-[170px] flex flex-col justify-between">
          {!targetLoc ? (
            <div className="text-center my-auto">
              <Compass className="w-8 h-8 text-white/20 mx-auto mb-2 animate-pulse" />
              <div className="text-xs text-slate-400 font-sans">Select a location node on the stadium map to calculate optimal routing.</div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 uppercase font-semibold">Active Route</span>
                  <h4 className="font-semibold text-white text-sm mt-1">{targetLoc.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{targetLoc.details}</p>
                </div>
                <MapPin className="w-4 h-4 text-primary animate-bounce" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Estimated Time</div>
                    <div className="text-sm font-semibold text-white">{estTime}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-secondary" />
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Distance</div>
                    <div className="text-sm font-semibold text-white">{distance} meters</div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono flex items-center space-x-1.5 pt-1">
                <CornerDownRight className="w-3.5 h-3.5 text-accent" />
                <span>ADA compliance: {useWheelchairRoute ? "ENABLED (100% lifts/ramps)" : "STANDARD ROUTE"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Map Canvas (8 Cols) */}
      <div className="lg:col-span-8 glass-panel rounded-2xl border border-white/10 p-4 relative overflow-hidden bg-black/40 flex items-center justify-center">
        <div className="absolute inset-0 scanline opacity-25 pointer-events-none" />
        <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40">HUD_MAP_RENDER: OK [SCALE_1:1250]</div>

        <svg 
          viewBox="0 0 500 450" 
          className="w-full h-full max-w-[460px] max-h-[420px]"
        >
          {/* Outer Stadium Ellipse Rim */}
          <ellipse 
            cx="250" cy="225" rx="200" ry="160" 
            fill="none" stroke="rgba(108, 99, 255, 0.15)" strokeWidth="12" 
          />
          <ellipse 
            cx="250" cy="225" rx="200" ry="160" 
            fill="none" stroke="#6C63FF" strokeWidth="1" strokeDasharray="8 4" 
            className="opacity-50"
          />

          {/* Mid Concourse Divider */}
          <ellipse 
            cx="250" cy="225" rx="150" ry="115" 
            fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="8" 
          />
          <ellipse 
            cx="250" cy="225" rx="150" ry="115" 
            fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="12 6" 
            className="opacity-40"
          />

          {/* Central Pitch Ellipse */}
          <ellipse 
            cx="250" cy="225" rx="90" ry="60" 
            fill="rgba(0, 255, 136, 0.03)" stroke="#00FF88" strokeWidth="1" 
          />
          {/* Pitch center line */}
          <line x1="250" y1="165" x2="250" y2="285" stroke="#00FF88" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />
          <circle cx="250" cy="225" r="20" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="4 4" className="opacity-40" />

          {/* Animated path if selected */}
          {targetLoc && (
            <motion.path
              d={getPathD()}
              fill="none"
              stroke={useWheelchairRoute ? "#6C63FF" : "#00E5FF"}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="10, 5"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
              className="drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]"
            />
          )}

          {/* Plot Location Nodes */}
          {filteredLocations.map((loc) => {
            const isUser = loc.id === "user";
            const isTarget = targetLoc?.id === loc.id;
            
            // Assign colors based on category
            let color = "#E2E8F0";
            if (isUser) color = "#00FF88"; // User is Accent green
            else if (loc.category === "food") color = "#F97316"; // Food is Orange
            else if (loc.category === "washrooms") color = "#3B82F6"; // Washroom is Blue
            else if (loc.category === "medical") color = "#FF4D6D"; // Medical is Pink
            else if (loc.category === "exits") color = "#00E5FF"; // Exit is Cyan
            else if (loc.category === "wheelchair") color = "#A855F7"; // Wheelchair is Purple

            return (
              <g 
                key={loc.id} 
                onClick={() => handleSelectLoc(loc)}
                className={`cursor-pointer group select-none`}
              >
                {/* Glowing sonar ring */}
                {(isUser || isTarget) && (
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={isUser ? 14 : 18}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${loc.x}px ${loc.y}px`, animationDuration: "2s" }}
                  />
                )}
                
                {/* Visual hover ring */}
                {!isUser && (
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="12"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isUser ? 6 : 5.5}
                  fill={color}
                  className="transition-all duration-300 group-hover:scale-125"
                  style={{ transformOrigin: `${loc.x}px ${loc.y}px` }}
                />

                {/* Node Label Tooltip (Always show User and Target; show others on hover) */}
                <g 
                  className={`transition-opacity duration-200 ${
                    isUser || isTarget ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <rect
                    x={loc.x - 55}
                    y={loc.y - 30}
                    width="110"
                    height="18"
                    rx="4"
                    fill="rgba(5, 8, 22, 0.9)"
                    stroke={color}
                    strokeWidth="0.5"
                  />
                  <text
                    x={loc.x}
                    y={loc.y - 18}
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="var(--font-sans)"
                  >
                    {loc.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
