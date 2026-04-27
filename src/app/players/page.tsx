'use client';

import { useState } from 'react';
import { Search, Plus, Mail, Gamepad2, Trophy, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import Modal from '@/components/ui/Modal';
import { players, leaderboard } from '@/data/dummy';
import { cn } from '@/lib/utils';

export default function PlayersPage() {
    const [search, setSearch] = useState('');
    const [showAddPlayer, setShowAddPlayer] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const filteredPlayers = players.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <PageHeader title="Players" description="Manage all your game players.">
                <button onClick={() => setShowAddPlayer(true)} className="btn btn-primary">
                    <Plus className="w-4 h-4" />
                    Add Player
                </button>
            </PageHeader>

            {/* Search */}
            <div className="relative mb-6 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    className="input pl-10"
                    placeholder="Search players..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredPlayers.map(player => {
                    const stats = leaderboard.find(l => l.player.id === player.id);
                    return (
                        <div key={player.id} className="card hover:border-primary-200 transition-all duration-200">
                            <div className="card-body text-center">
                                <div className="flex justify-center mb-3">
                                    <PlayerAvatar
                                        avatar={player.avatar}
                                        name={player.name}
                                        color={player.color}
                                        size="lg"
                                        isOnline={player.isOnline}
                                    />
                                </div>
                                <h3 className="text-base font-bold text-slate-800 mb-0.5">{player.name}</h3>
                                {player.email && (
                                    <p className="text-xs text-slate-400 mb-4 flex items-center justify-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {player.email}
                                    </p>
                                )}

                                {stats && (
                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                                        <div>
                                            <p className="text-lg font-extrabold text-primary-700">{stats.totalScore}</p>
                                            <p className="text-[0.65rem] font-medium text-slate-400 uppercase">Points</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-extrabold text-slate-800">{stats.gamesPlayed}</p>
                                            <p className="text-[0.65rem] font-medium text-slate-400 uppercase">Games</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-extrabold text-amber-600">{stats.wins}</p>
                                            <p className="text-[0.65rem] font-medium text-slate-400 uppercase">Wins</p>
                                        </div>
                                    </div>
                                )}

                                {stats && stats.totalFines > 0 && (
                                    <div className="mt-3 flex items-center justify-center gap-1 text-xs text-red-500 font-medium">
                                        <AlertTriangle className="w-3 h-3" />
                                        {stats.totalFines} pts in fines
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Player Modal */}
            <Modal isOpen={showAddPlayer} onClose={() => setShowAddPlayer(false)} title="Add New Player">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        console.log('Add player:', { name: newName, email: newEmail });
                        setNewName('');
                        setNewEmail('');
                        setShowAddPlayer(false);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="input-label">Player Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter name"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="input-label">Email (optional, for notifications)</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="player@example.com"
                            value={newEmail}
                            onChange={e => setNewEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <button type="button" onClick={() => setShowAddPlayer(false)} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!newName.trim()}>
                            Add Player
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
