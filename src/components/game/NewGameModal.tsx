'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { GameType, Player } from '@/types';
import { players as allPlayers, gameTypeConfig } from '@/data/dummy';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import { cn, generateId } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface NewGameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGame: (data: {
        name: string;
        gameType: GameType;
        players: Player[];
        maxRounds: number | undefined;
    }) => void;
}

export default function NewGameModal({ isOpen, onClose, onCreateGame }: NewGameModalProps) {
    const [name, setName] = useState('');
    const [gameType, setGameType] = useState<GameType>('cards');
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>(allPlayers);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);
    const [maxRounds, setMaxRounds] = useState('');
    const [customPlayerName, setCustomPlayerName] = useState('');

    const handleTogglePlayer = (id: string) => {
        setSelectedPlayerIds(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleAddCustomPlayer = () => {
        const playerName = customPlayerName.trim();
        if (!playerName) return;

        const newPlayer: Player = {
            id: `custom-${generateId()}`,
            name: playerName,
            avatar: playerName.charAt(0).toUpperCase(),
            color: '#0F766E',
            isOnline: true,
        };

        setAvailablePlayers(prev => [...prev, newPlayer]);
        setSelectedPlayerIds(prev => [...prev, newPlayer.id]);
        setCustomPlayerName('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || selectedPlayerIds.length < 2) return;
        const selected = availablePlayers.filter(p => selectedPlayerIds.includes(p.id));
        onCreateGame({
            name: name.trim(),
            gameType,
            players: selected,
            maxRounds: maxRounds ? parseInt(maxRounds) : undefined,
        });
        // Reset
        setName('');
        setGameType('cards');
        setAvailablePlayers(allPlayers);
        setSelectedPlayerIds([]);
        setMaxRounds('');
        setCustomPlayerName('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Start New Game" maxWidth="36rem">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Game Name */}
                <div>
                    <label className="input-label">Game Name</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="e.g. Saturday Poker Night"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Game Type */}
                <div>
                    <label className="input-label">Game Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(Object.keys(gameTypeConfig) as GameType[]).map(type => {
                            const config = gameTypeConfig[type];
                            const isActive = gameType === type;
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setGameType(type)}
                                    className={cn(
                                        'flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all duration-200',
                                        isActive
                                            ? 'border-primary-400 bg-primary-50'
                                            : 'border-slate-200 hover:border-slate-300 bg-white'
                                    )}
                                >
                                    <span className="text-2xl">{config.icon}</span>
                                    <span className={cn('text-xs font-semibold', isActive ? 'text-primary-700' : 'text-slate-600')}>
                                        {config.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Max Rounds */}
                <div>
                    <label className="input-label">Max Rounds (optional)</label>
                    <input
                        type="number"
                        className="input"
                        placeholder="No limit"
                        min="1"
                        value={maxRounds}
                        onChange={e => setMaxRounds(e.target.value)}
                    />
                </div>

                {/* Select Players */}
                <div>
                    <label className="input-label">
                        Select Players ({selectedPlayerIds.length} selected, minimum 2)
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {availablePlayers.map(player => {
                            const isSelected = selectedPlayerIds.includes(player.id);
                            return (
                                <button
                                    key={player.id}
                                    type="button"
                                    onClick={() => handleTogglePlayer(player.id)}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 text-left',
                                        isSelected
                                            ? 'border-primary-300 bg-primary-50'
                                            : 'border-slate-100 hover:border-slate-200 bg-white'
                                    )}
                                >
                                    <PlayerAvatar
                                        avatar={player.avatar}
                                        name={player.name}
                                        color={player.color}
                                        size="sm"
                                        isOnline={player.isOnline}
                                    />
                                    <span className="text-sm font-semibold text-slate-700">{player.name}</span>
                                    {isSelected && (
                                        <span className="ml-auto w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Add Custom Player */}
                <div>
                    <label className="input-label">Add Custom Player (optional)</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="input flex-1"
                            placeholder="Player name"
                            value={customPlayerName}
                            onChange={e => setCustomPlayerName(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            disabled={!customPlayerName.trim()}
                            onClick={handleAddCustomPlayer}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!name.trim() || selectedPlayerIds.length < 2}
                    >
                        Start Game
                    </button>
                </div>
            </form>
        </Modal>
    );
}
