import React from 'react';
import { Player } from '../types';
import { ArrowLeft, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StatsPage: React.FC = () => {
  // Mock data for now
  const players: Player[] = [
    { id: '1', name: 'McDavid', number: '97', position: 'F', onIce: false, toi: 1240, stats: { shots: 5, blockedShots: 1, takeaways: 2, completedPasses: 15, goals: 1, assists: 2, saves: 0 } },
    { id: '2', name: 'Draisaitl', number: '29', position: 'F', onIce: false, toi: 1180, stats: { shots: 3, blockedShots: 0, takeaways: 1, completedPasses: 12, goals: 0, assists: 1, saves: 0 } },
  ];

  const formatTOI = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white text-black p-4">
      {/* Analysis Mode is Light Mode as per Style Guide */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold uppercase tracking-widest">Post-Game Analysis</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Player</th>
              <th className="py-3 px-2">TOI</th>
              <th className="py-3 px-2">G</th>
              <th className="py-3 px-2">A</th>
              <th className="py-3 px-2">S</th>
              <th className="py-3 px-2">P%</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id} className="border-b border-gray-100">
                <td className="py-4 px-2 font-bold">{p.number}</td>
                <td className="py-4 px-2">{p.name}</td>
                <td className="py-4 px-2 font-mono">{formatTOI(p.toi)}</td>
                <td className="py-4 px-2">{p.stats.goals}</td>
                <td className="py-4 px-2">{p.stats.assists}</td>
                <td className="py-4 px-2">{p.stats.shots}</td>
                <td className="py-4 px-2">85%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5" /> Team Performance
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <div className="text-xs text-gray-500 uppercase">Total Shots</div>
            <div className="text-2xl font-bold">24</div>
          </div>
          <div className="p-4 bg-white rounded shadow-sm">
            <div className="text-xs text-gray-500 uppercase">Faceoff %</div>
            <div className="text-2xl font-bold">58%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
