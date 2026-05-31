'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Player } from '@/types';
import PlayerAvatar from '@/components/ui/PlayerAvatar';

interface FineModalProps {
    isOpen: boolean;
    onClose: () => void;
    players: Player[];
    currentRound: number;
    initialRoundNumber?: number;
    onImposeFine: (data: { playerId: string; amount: number; reason: string; roundNumber: number }) => void;
}

const fineReasons = [
    'Late to round',
    'Wrong move',
    'Phone usage',
    'Miscount',
    'Cheating suspicion',
    'Time violation',
    'Other',
];

export default function FineModal({ isOpen, onClose, players, currentRound, initialRoundNumber, onImposeFine }: FineModalProps) {
    const [selectedPlayerId, setSelectedPlayerId] = useState('');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [roundNumber, setRoundNumber] = useState((initialRoundNumber ?? currentRound).toString());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlayerId || !amount) return;
        onImposeFine({
            playerId: selectedPlayerId,
            amount: parseInt(amount, 10),
            reason: reason === 'Other' ? customReason : reason,
            roundNumber: parseInt(roundNumber, 10),
        });
        setSelectedPlayerId('');
        setAmount('');
        setReason('');
        setCustomReason('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Impose Fine">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Player Selection */}
                <div>
                    <label className="input-label">Select Player</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {players.map(player => (
                            <button
                                key={player.id}
                                type="button"
                                onClick={() => setSelectedPlayerId(player.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 text-left ${selectedPlayerId === player.id
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-slate-100 hover:border-slate-200'
                                    }`}
                            >
                                <PlayerAvatar avatar={player.avatar} name={player.name} color={player.color} size="sm" />
                                <span className="text-sm font-semibold text-slate-700">{player.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Round */}
                <div>
                    <label className="input-label">Round Number</label>
                    <input
                        type="number"
                        className="input"
                        min="1"
                        value={roundNumber}
                        onChange={e => setRoundNumber(e.target.value)}
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="input-label">Fine Amount (points)</label>
                    <input
                        type="number"
                        className="input"
                        placeholder="e.g. 5"
                        min="1"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>

                {/* Reason */}
                <div>
                    <label className="input-label">Reason</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {fineReasons.map(r => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setReason(r)}
                                className={`badge cursor-pointer transition-all duration-200 ${reason === r
                                        ? 'bg-red-100 text-red-700 border border-red-300'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    {reason === 'Other' && (
                        <input
                            type="text"
                            className="input mt-2"
                            placeholder="Enter custom reason"
                            value={customReason}
                            onChange={e => setCustomReason(e.target.value)}
                            required
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                    <button type="button" onClick={onClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger"
                        disabled={!selectedPlayerId || !amount || !reason}
                    >
                        Impose Fine
                    </button>
                </div>
            </form>
        </Modal>
    );
}
