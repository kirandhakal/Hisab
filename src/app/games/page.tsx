'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import GameCard from '@/components/game/GameCard';
import NewGameModal from '@/components/game/NewGameModal';
import EmptyState from '@/components/ui/EmptyState';
import { gameSessions, gameTypeConfig } from '@/data/dummy';
import { GameType } from '@/types';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | 'active' | 'paused' | 'completed';

export default function GamesPage() {
    const [showNewGame, setShowNewGame] = useState(false);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [typeFilter, setTypeFilter] = useState<GameType | 'all'>('all');

    const filteredGames = gameSessions.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === 'all' || game.status === statusFilter;
        const matchesType = typeFilter === 'all' || game.gameType === typeFilter;
        return matchesSearch && matchesStatus && matchesType;
    });

    const statusOptions: { value: StatusFilter; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'completed', label: 'Completed' },
    ];

    return (
        <div className="animate-fade-in">
            <PageHeader title="Games" description="Manage and track all your game sessions.">
                <button onClick={() => setShowNewGame(true)} className="btn btn-primary">
                    <Plus className="w-4 h-4" />
                    New Game
                </button>
            </PageHeader>

            {/* Filters */}
            <div className="card mb-6">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                className="input pl-10"
                                placeholder="Search games..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            {statusOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setStatusFilter(opt.value)}
                                    className={cn(
                                        'btn btn-sm transition-all duration-200',
                                        statusFilter === opt.value
                                            ? 'btn-primary'
                                            : 'btn-secondary'
                                    )}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Type Filter */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setTypeFilter('all')}
                                className={cn(
                                    'btn btn-sm transition-all duration-200',
                                    typeFilter === 'all' ? 'btn-primary' : 'btn-secondary'
                                )}
                            >
                                <Filter className="w-3.5 h-3.5" />
                                All Types
                            </button>
                            {(Object.keys(gameTypeConfig) as GameType[]).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setTypeFilter(type)}
                                    className={cn(
                                        'btn btn-sm transition-all duration-200',
                                        typeFilter === type ? 'btn-primary' : 'btn-secondary'
                                    )}
                                >
                                    {gameTypeConfig[type].icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon="🎮"
                    title="No games found"
                    description="Try adjusting your filters or start a new game."
                    action={
                        <button onClick={() => setShowNewGame(true)} className="btn btn-primary">
                            <Plus className="w-4 h-4" />
                            Start New Game
                        </button>
                    }
                />
            )}

            <NewGameModal
                isOpen={showNewGame}
                onClose={() => setShowNewGame(false)}
                onCreateGame={data => console.log('Create game:', data)}
            />
        </div>
    );
}
