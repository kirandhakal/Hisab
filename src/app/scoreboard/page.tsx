'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import ScoreTable from '@/components/game/ScoreTable';
import { gameSessions, gameTypeConfig } from '@/data/dummy';
import { cn, getStatusColor } from '@/lib/utils';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function ScoreboardPage() {
    const [selectedGameId, setSelectedGameId] = useState(gameSessions[0]?.id || '');
    const selectedGame = gameSessions.find(g => g.id === selectedGameId);

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Scoreboard"
                description="Quick view of points across all game sessions."
            />

            {/* Game Selector Tabs */}
            <div className="card mb-6">
                <div className="card-body py-3 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {gameSessions.map(game => {
                            const isActive = selectedGameId === game.id;
                            const config = gameTypeConfig[game.gameType];
                            const statusStyle = getStatusColor(game.status);
                            return (
                                <button
                                    key={game.id}
                                    onClick={() => setSelectedGameId(game.id)}
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 whitespace-nowrap',
                                        isActive
                                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                                            : 'border-transparent hover:bg-slate-50 text-slate-600'
                                    )}
                                >
                                    <span>{config.icon}</span>
                                    <span>{game.name}</span>
                                    <span className={cn('badge text-[0.65rem] py-0.5 px-1.5', statusStyle.bg, statusStyle.text)}>
                                        {game.status}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Score Table */}
            {selectedGame ? (
                <div className="space-y-4">
                    <ScoreTable game={selectedGame} />
                    <div className="flex justify-end">
                        <Link
                            href={`/games/${selectedGame.id}`}
                            className="btn btn-secondary text-sm"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open Full Game
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body text-center py-12">
                        <p className="text-slate-500">Select a game to view its scoreboard.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
