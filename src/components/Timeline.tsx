"use client";

import React, { type ComponentType, type SVGProps } from "react";
import { motion } from "framer-motion";
import { 
  Ticket, 
  Compass, 
  MapPin, 
  Users, 
  Languages, 
  Leaf, 
  ShieldCheck 
} from "lucide-react";

interface TimelineStep {
  title: string;
  desc: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  badge: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    title: "Ticket Purchased",
    desc: "The moment your ticket is issued, your CyberStadium AI profile initializes, syncing stadium entry points and seat blueprints directly to your device.",
    icon: Ticket,
    color: "#00E5FF",
    badge: "STAGE 01"
  },
  {
    title: "AI Plans Journey",
    desc: "Our predictive engine scans city traffic, metro timetables, and entry gates to recommend the perfect departure time and shuttle routes.",
    icon: Compass,
    color: "#6C63FF",
    badge: "STAGE 02"
  },
  {
    title: "Smart Navigation",
    desc: "Arrive at the stadium and follow HUD concourse directions. The app routes you to your seat, ADA elevator lobbies, or preferred concession stands.",
    icon: MapPin,
    color: "#00FF88",
    badge: "STAGE 03"
  },
  {
    title: "Real-Time Crowd Updates",
    desc: "Receive proactive alerts on queue sizes at restrooms and food stalls, routing you to low-density concourse areas to avoid bottleneck queues.",
    icon: Users,
    color: "#F59E0B",
    badge: "STAGE 04"
  },
  {
    title: "Multilingual Assistance",
    desc: "Access instant localized audio translations of crowd announcements, security directions, and concession menus in 6 primary tournament languages.",
    icon: Languages,
    color: "#FF4D6D",
    badge: "STAGE 05"
  },
  {
    title: "Sustainable Match Experience",
    desc: "Contribute to FIFA's green goal by using compost bins and tracking your carbon offset points in real-time on our eco leaderboard.",
    icon: Leaf,
    color: "#00FF88",
    badge: "STAGE 06"
  },
  {
    title: "Safe Exit Guidance",
    desc: "When the whistle blows, receive customized egress routing that splits crowd volume evenly across metro corridors, ensuring a safe, stress-free transit home.",
    icon: ShieldCheck,
    color: "#00E5FF",
    badge: "STAGE 07"
  }
];

export default function Timeline() {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-12">
      {/* Central Glowing Line (hidden on smallest screens, left-aligned on mobile, centered on md+) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-20 transform -translate-x-1/2" />
      
      <div className="space-y-12 md:space-y-16">
        {TIMELINE_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isLeft = idx % 2 === 0;

          return (
            <div 
              key={idx}
              className={`flex flex-col md:flex-row items-start ${
                isLeft ? "md:flex-row-reverse" : ""
              } relative`}
            >
              {/* Central Glowing Pulse Node */}
              <div 
                className="absolute left-8 md:left-1/2 w-5 h-5 rounded-full bg-cyber-bg border-2 z-10 transform -translate-x-1/2 flex items-center justify-center"
                style={{ borderColor: step.color }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: step.color }}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>

              {/* Spacing holder for layout matching */}
              <div className="hidden md:block md:w-1/2" />

              {/* Timeline Card */}
              <motion.div 
                className="w-full md:w-1/2 pl-14 md:pl-0 md:px-8"
                initial={{ opacity: 0, x: isLeft ? 40 : -40, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 relative group bg-black/30">
                  <div className="absolute inset-0 scanline opacity-10 pointer-events-none rounded-2xl" />
                  
                  {/* Step Icon Accent */}
                  <div 
                    className="absolute top-6 right-6 p-2 rounded-lg border bg-white/[0.02]"
                    style={{ borderColor: `${step.color}30`, color: step.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span 
                    className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border inline-block mb-3.5"
                    style={{ 
                      borderColor: `${step.color}30`, 
                      color: step.color,
                      backgroundColor: `${step.color}10`
                    }}
                  >
                    {step.badge}
                  </span>

                  <h3 className="text-lg font-display text-white font-bold mb-2 group-hover:text-primary transition duration-150">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
