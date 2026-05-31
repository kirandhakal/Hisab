'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Player } from '@/types';
import PlayerAvatar from '@/components/ui/PlayerAvatar';

interface ScoreEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    players: Player[];
    roundNumber: number;
    onSubmitScores: (scores: Record<string, number>) => void;
}

export default function ScoreEntryModal({
    isOpen,
    onClose,
    players,
    roundNumber,
    onSubmitScores,
}: ScoreEntryModalProps) {
    const [scores, setScores] = useState<Record<string, string>>(
        Object.fromEntries(players.map(p => [p.id, '']))
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed: Record<string, number> = {};
        for (const [id, val] of Object.entries(scores)) {
            parsed[id] = parseInt(val, 10) || 0;
        }
        onSubmitScores(parsed);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Enter Scores — Round ${roundNumber}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                {players.map(player => (
                    <div key={player.id} className="flex items-center gap-4">
                        <PlayerAvatar
                            avatar={player.avatar}
                            name={player.name}
                            color={player.color}
                            size="sm"
                        />
                        <span className="text-sm font-semibold text-slate-700 flex-1 min-w-0 truncate">
                            {player.name}
                        </span>
                        <input
                            type="number"
                            className="input w-24 text-center text-lg font-bold"
                            placeholder="0"
                            value={scores[player.id]}
                            onChange={e => setScores(prev => ({ ...prev, [player.id]: e.target.value }))}
                        />
                    </div>
                ))}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Scores
                    </button>
                </div>
            </form>
        </Modal>
    );
}
