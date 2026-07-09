"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Cpu, Bot, User } from "lucide-react";

interface Message {
  sender: "user" | "copilot";
  text: string;
  isStreaming?: boolean;
  logs?: string[];
}

const SUGGESTED_PROMPTS = [
  "Find the nearest medical center from Section 112",
  "How busy is the South Gate entry queue right now?",
  "Locate vegetarian food options in Stadium Tier 1",
  "What is the recommended exit path for wheelchair users?"
];

const MOCK_ANSWERS: Record<string, { reply: string; logs: string[] }> = {
  "Find the nearest medical center from Section 112": {
    reply: "The nearest Medical Center is Station 4, located on Level 1 directly behind Section 110. From your current position in Section 112, exit to the outer concourse, turn left, and walk 40 meters. Level 1 access is fully ramp-compatible.",
    logs: [
      "SYSTEM: Fetching 3D stadium geometry map...",
      "POSITION: Anchor point found at Section 112 [lat: 34.052, lng: -118.243]",
      "PATHFINDING: Computing ADA-compliant path to Medical Station 4",
      "COPILOT: Response compiled successfully."
    ]
  },
  "How busy is the South Gate entry queue right now?": {
    reply: "South Gate currently has moderate congestion. Estimated wait time is 7 minutes. However, North-West Gate is clear with less than 2 minutes wait. I recommend redirecting to the North-West Gate if you are arriving via the metro link.",
    logs: [
      "SYSTEM: Accessing crowd counter sensors...",
      "SENSOR_DATA: South Gate flowrate = 42 persons/min (Capacity: 60/min)",
      "PREDICTION: Predictive queuing model estimates 7.3m wait time",
      "COPILOT: Route optimization recommendation ready."
    ]
  },
  "Locate vegetarian food options in Stadium Tier 1": {
    reply: "There are three vegetarian options on Tier 1 concourse: \n1. 'Green Pitch Bites' (Section 104 - 100% Vegan/Veg)\n2. 'Fiesta Football Grills' (Section 115 - Vegetarian quesadillas available)\n3. 'Eco Cafe' (Section 122 - Organic salads and wraps)\n'Green Pitch Bites' has the shortest wait queue (approx. 3 mins).",
    logs: [
      "SYSTEM: Querying vendor database...",
      "FILTER: Concierge Level 1 && category: vegetarian",
      "QUEUE_MONITOR: Compiling live counter wait times...",
      "COPILOT: Vendor selection ready."
    ]
  },
  "What is the recommended exit path for wheelchair users?": {
    reply: "For an ADA-compliant exit, please use Elevator Lobby B near Section 108. It connects Tier 1 directly to the Lower Ground Transit Hub. Level 1 concourse is cleared of obstructions, and staff are stationed at Exit Gate 6 to assist with boarding transport shuttles.",
    logs: [
      "SYSTEM: Scanning accessibility routes...",
      "ELEVATOR_STATUS: Lobby B Elevator - OPERATIONAL",
      "ROUTE: Sector 108 -> Elevator B -> Transit Hub Gate 6",
      "COPILOT: Generating step-by-step assistance script."
    ]
  }
};

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "copilot",
      text: "Affirmative. I am the CyberStadium Operations Copilot. Ready to assist with FIFA World Cup 2026 scheduling, safety, crowd telemetry, and navigation queries. Click a recommended query below or type your prompt.",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const triggerCopilotResponse = (promptText: string) => {
    if (isTyping) return;

    // Add user message
    const userMsg: Message = { sender: "user", text: promptText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setActiveLogs(["SYSTEM: Re-initializing connection...", "MODEL: Processing user request..."]);

    const mockData = MOCK_ANSWERS[promptText] || {
      reply: `Processing custom query: "${promptText}". I am retrieving real-time stadium metrics. Currently, operations are running at optimal levels. Let me know if you need specific coordinates.`,
      logs: [
        "SYSTEM: Processing raw input string...",
        "VECTOR_DB: Direct search returning 0 exact matches. Running fallback LLM...",
        "MODEL: Response compiled."
      ]
    };

    // Play logs step by step
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < mockData.logs.length) {
        setActiveLogs((prev) => [...prev, mockData.logs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        
        // Add Copilot response
        const newCopilotMsg: Message = {
          sender: "copilot",
          text: "",
          isStreaming: true,
          logs: mockData.logs
        };
        setMessages((prev) => [...prev, newCopilotMsg]);

        // Stream text response
        let textIndex = 0;
        const textStreamInterval = setInterval(() => {
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.sender === "copilot" && last.isStreaming) {
              if (textIndex < mockData.reply.length) {
                last.text = mockData.reply.substring(0, textIndex + 1);
                textIndex++;
              } else {
                last.isStreaming = false;
                clearInterval(textStreamInterval);
                setIsTyping(false);
              }
            }
            return updated;
          });
        }, 15);
      }
    }, 400);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    triggerCopilotResponse(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (terminalEndRef.current && typeof terminalEndRef.current.scrollIntoView === "function") {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeLogs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      {/* Left Chat Window (8 Cols) */}
      <div className="lg:col-span-8 flex flex-col glass-panel rounded-2xl border border-white/10 overflow-hidden relative">
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
        
        {/* Chat Header */}
        <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-display text-sm tracking-wider text-primary font-bold">CYBER_COPILOT v1.5</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2.5 py-1 rounded">GEMINI_1.5_FLASH</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-secondary/20 border border-secondary/50 text-white" : "bg-primary/10 border border-primary/30 text-white"}`}>
                    {msg.sender === "user" ? <User className="w-4 h-4 text-secondary" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user" 
                        ? "bg-secondary/15 border border-secondary/20 text-white" 
                        : "bg-white/5 border border-white/5 text-slate-100"
                    }`}>
                      {msg.text}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10 flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            aria-label="Ask the CyberStadium copilot"
            placeholder={isTyping ? "AI is processing request..." : "Ask Stadium Copilot anything..."}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 text-white placeholder-slate-500 font-sans disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            aria-label="Send prompt to the copilot"
            className="p-3 bg-primary/20 border border-primary/50 hover:bg-primary/35 text-primary rounded-xl transition duration-200 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Right Console Log Window (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col glass-panel rounded-2xl border border-white/10 overflow-hidden bg-black/40">
        <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs text-slate-300 font-semibold uppercase">Telemetry Stream</span>
          </div>
          <Cpu className="w-3.5 h-3.5 text-white/30 animate-pulse" />
        </div>

        {/* Terminal Logs */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] space-y-2.5 text-slate-400 select-none scrollbar">
          {activeLogs.length === 0 ? (
            <div className="text-slate-600 italic">No telemetry data stream. Trigger a prompt or question to view vector search and sensor pipeline.</div>
          ) : (
            activeLogs.map((log, index) => {
              const text = typeof log === "string" ? log : String(log ?? "");
              let color = "text-slate-400";
              if (text.startsWith("SYSTEM:")) color = "text-secondary";
              else if (text.startsWith("POSITION:")) color = "text-primary";
              else if (text.startsWith("PATHFINDING:") || text.startsWith("SENSOR_DATA:")) color = "text-accent";
              else if (text.startsWith("COPILOT:")) color = "text-white font-semibold";
              
              return (
                <div key={index} className={`flex items-start space-x-2 leading-relaxed ${color}`}>
                  <span className="text-white/20 select-none">&gt;&gt;</span>
                  <span>{text}</span>
                </div>
              );
            })
          )}
          {isTyping && (
            <div className="flex items-center space-x-1.5 text-accent animate-pulse">
              <span className="text-white/20 select-none">&gt;&gt;</span>
              <span>PARSING...</span>
            </div>
          )}
        </div>

        {/* Predefined prompt quick clicks */}
        <div className="p-4 bg-white/5 border-t border-white/10 space-y-2">
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold mb-1.5">Suggested Prompts</div>
          <div className="space-y-1.5 max-h-[140px] overflow-y-auto scrollbar pr-1">
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => triggerCopilotResponse(prompt)}
                disabled={isTyping}
                className="w-full text-left bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-primary/10 hover:border-primary/40 transition duration-150 block truncate font-sans disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
