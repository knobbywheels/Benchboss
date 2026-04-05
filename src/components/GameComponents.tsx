import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Plus, Users, BarChart2, Settings, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Player Token Component
 */
interface PlayerTokenProps {
  number: string;
  onIce?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({ number, onIce, onToggle, className }) => {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className={cn(
        "player-token",
        onIce ? "on-ice bg-accent" : "bench",
        className
      )}
      whileTap={{ scale: 0.9 }}
    >
      {number}
    </motion.div>
  );
};

/**
 * Game Clock Component
 */
interface GameClockProps {
  seconds: number;
  isRunning: boolean;
  onToggle: () => void;
}

export const GameClock: React.FC<GameClockProps> = ({ seconds, isRunning, onToggle }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="game-clock">
        {formatTime(minutes)}:{formatTime(remainingSeconds)}
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "sticky-footer w-full flex items-center justify-center text-2xl font-bold uppercase transition-colors",
          isRunning ? "bg-destructive" : "bg-primary"
        )}
      >
        {isRunning ? (
          <><Pause className="mr-2 fill-current" /> Stop Clock</>
        ) : (
          <><Play className="mr-2 fill-current" /> Start Clock</>
        )}
      </button>
    </div>
  );
};

/**
 * Rink Overlay Component for Shot Mapping
 */
interface RinkOverlayProps {
  onShot: (x: number, y: number) => void;
}

export const RinkOverlay: React.FC<RinkOverlayProps> = ({ onShot }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    longPressTimer.current = setTimeout(() => {
      onShot(x, y);
      if ('vibrate' in navigator) navigator.vibrate(20);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-[2/1] rink-overlay relative rounded-lg border border-white/20 overflow-hidden"
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-4xl pointer-events-none">
        TAP & HOLD TO LOG SHOT
      </div>
    </div>
  );
};
