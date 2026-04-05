import React, { useState, useEffect, useRef } from 'react';
import { PlayerToken, GameClock, RinkOverlay } from '../components/GameComponents';
import { Player, Game, Shot } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Users, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'McDavid', number: '97', position: 'F', onIce: false, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
  { id: '2', name: 'Draisaitl', number: '29', position: 'F', onIce: false, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
  { id: '3', name: 'Hyman', number: '18', position: 'F', onIce: false, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
  { id: '4', name: 'Bouchard', number: '2', position: 'D', onIce: false, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
  { id: '5', name: 'Ekholm', number: '14', position: 'D', onIce: false, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
  { id: '6', name: 'Skinner', number: '74', position: 'G', onIce: true, toi: 0, stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 } },
];

export const GamePage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [clockTime, setClockTime] = useState(1200); // 20 mins
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [shots, setShots] = useState<Shot[]>([]);
  const wakeLock = useRef<any>(null);

  // Wake Lock Logic
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLock.current = await (navigator as any).wakeLock.request('screen');
        console.log('Wake Lock is active');
      }
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLock.current) {
      wakeLock.current.release();
      wakeLock.current = null;
      console.log('Wake Lock released');
    }
  };

  useEffect(() => {
    if (isClockRunning) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => releaseWakeLock();
  }, [isClockRunning]);

  // Clock Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockRunning && clockTime > 0) {
      interval = setInterval(() => {
        setClockTime(prev => prev - 1);
        
        // Update TOI for players on ice
        setPlayers(prev => prev.map(p => 
          p.onIce ? { ...p, toi: p.toi + 1 } : p
        ));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockRunning, clockTime]);

  const toggleClock = () => {
    setIsClockRunning(!isClockRunning);
    if ('vibrate' in navigator) {
      if (!isClockRunning) navigator.vibrate(50);
      else navigator.vibrate([100, 50, 100]);
    }
  };

  const togglePlayerIce = (id: string) => {
    setPlayers(prev => prev.map(p => 
      p.id === id ? { ...p, onIce: !p.onIce } : p
    ));
    if ('vibrate' in navigator) navigator.vibrate(20);
  };

  const handleShot = (x: number, y: number) => {
    const newShot: Shot = {
      id: Math.random().toString(36).substr(2, 9),
      playerId: 'unknown', // In a real app, we'd select a player
      x,
      y,
      timestamp: Date.now(),
      period: 1,
      isGoal: false
    };
    setShots(prev => [...prev, newShot]);
  };

  const onIcePlayers = players.filter(p => p.onIce);
  const benchPlayers = players.filter(p => !p.onIce);

  return (
    <div className="flex flex-col h-screen bg-black text-white p-4 pb-24 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold uppercase tracking-widest">BenchBoss</h1>
        <div className="flex gap-4">
          <Link to="/roster">
            <Users className="w-6 h-6" />
          </Link>
          <Link to="/stats">
            <BarChart2 className="w-6 h-6" />
          </Link>
          <SettingsIcon className="w-6 h-6" />
        </div>
      </div>

      {/* Clock Area */}
      <GameClock 
        seconds={clockTime} 
        isRunning={isClockRunning} 
        onToggle={toggleClock} 
      />

      {/* Ice Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
        <section>
          <h2 className="text-sm font-semibold uppercase text-gray-500 mb-3">On Ice</h2>
          <div className="flex flex-wrap gap-4">
            <AnimatePresence>
              {onIcePlayers.map(p => (
                <PlayerToken 
                  key={p.id} 
                  number={p.number} 
                  onIce 
                  onToggle={() => togglePlayerIce(p.id)} 
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase text-gray-500 mb-3">Bench</h2>
          <div className="flex flex-wrap gap-4">
            <AnimatePresence>
              {benchPlayers.map(p => (
                <PlayerToken 
                  key={p.id} 
                  number={p.number} 
                  onToggle={() => togglePlayerIce(p.id)} 
                />
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase text-gray-500 mb-3">Shot Map</h2>
          <RinkOverlay onShot={handleShot} />
          <div className="mt-2 text-xs text-gray-400">
            {shots.length} shots recorded this period
          </div>
        </section>
      </div>
    </div>
  );
};
