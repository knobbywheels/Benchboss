import React, { useState } from 'react';
import { Player, Position } from '../types';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RosterPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
    name: '',
    number: '',
    position: 'F'
  });

  const addPlayer = () => {
    if (!newPlayer.name || !newPlayer.number) return;
    
    const player: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPlayer.name,
      number: newPlayer.number,
      position: newPlayer.position as Position,
      onIce: false,
      toi: 0,
      stats: { shots: 0, blockedShots: 0, takeaways: 0, completedPasses: 0, goals: 0, assists: 0, saves: 0 }
    };
    
    setPlayers([...players, player]);
    setNewPlayer({ name: '', number: '', position: 'F' });
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-gray-800 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold uppercase tracking-widest">Roster</h1>
      </div>

      {/* Add Player Form */}
      <div className="bg-gray-900 p-4 rounded-lg mb-8 border border-gray-800">
        <h2 className="text-sm font-semibold uppercase text-gray-500 mb-4">Add New Player</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={newPlayer.name}
            onChange={e => setNewPlayer({...newPlayer, name: e.target.value})}
            className="bg-black border border-gray-700 p-3 rounded"
          />
          <input 
            type="text" 
            placeholder="Number" 
            value={newPlayer.number}
            onChange={e => setNewPlayer({...newPlayer, number: e.target.value})}
            className="bg-black border border-gray-700 p-3 rounded"
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={newPlayer.position}
            onChange={e => setNewPlayer({...newPlayer, position: e.target.value as Position})}
            className="flex-1 bg-black border border-gray-700 p-3 rounded"
          >
            <option value="F">Forward</option>
            <option value="D">Defense</option>
            <option value="G">Goalie</option>
          </select>
          <button 
            onClick={addPlayer}
            className="bg-primary px-6 py-3 rounded font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add
          </button>
        </div>
      </div>

      {/* Player List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2">Current Roster ({players.length})</h2>
        {players.map(p => (
          <div key={p.id} className="flex items-center justify-between bg-gray-900 p-4 rounded border border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold">
                {p.number}
              </div>
              <div>
                <div className="font-bold">{p.name}</div>
                <div className="text-xs text-gray-500">{p.position}</div>
              </div>
            </div>
            <button onClick={() => removePlayer(p.id)} className="text-destructive p-2">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
