'use client';

import { GameSession } from '@/types';
import { getPlayerTotalScore, getOrdinal, cn } from '@/lib/utils';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import { AlertTriangle, Trophy } from 'lucide-react';

interface ScoreTableProps {
    game: GameSession;
}

export default function ScoreTable({ game }: ScoreTableProps) {
    const completedRounds = game.rounds.filter(r => r.isCompleted);

    // Calculate totals per player
    const playerTotals = game.players.map(player => ({
        player,
        total: getPlayerTotalScore(player.id, completedRounds),
        fines: completedRounds.reduce((sum, round) => {
            const score = round.scores.find(s => s.playerId === player.id);
            return sum + (score?.fines.reduce((f, fine) => f + fine.amount, 0) || 0);
        }, 0),
    }));

    // Sort by total descending
    const sorted = [...playerTotals].sort((a, b) => b.total - a.total);
    const winner = sorted[0];

    return (
        <div className="card overflow-visible">
            <div className="card-header flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">Scoreboard</h3>
                <span className="text-xs font-medium text-slate-400">
                    {completedRounds.length} round{completedRounds.length !== 1 ? 's' : ''} completed
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="score-table">
                    <thead>
                        <tr>
                            <th className="sticky left-0 bg-slate-50 z-10">Player</th>
                            {completedRounds.map(round => (
                                <th key={round.id} className="text-center min-w-[80px]">
                                    R{round.roundNumber}
                                </th>
                            ))}
                            <th className="text-center min-w-[80px]">Fines</th>
                            <th className="text-center min-w-[90px]">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((entry, index) => (
                            <tr key={entry.player.id} className={cn(index === 0 && game.status !== 'active' ? 'bg-amber-50/50' : '')}>
                                <td className="sticky left-0 bg-white z-10">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-slate-400 w-5">{getOrdinal(index + 1)}</span>
                                        <PlayerAvatar
                                            avatar={entry.player.avatar}
                                            name={entry.player.name}
                                            color={entry.player.color}
                                            size="sm"
                                        />
                                        <div className="min-w-0">
                                            <span className="text-sm font-semibold text-slate-800 truncate block">
                                                {entry.player.name}
                                            </span>
                                        </div>
                                        {winner && entry.player.id === winner.player.id && game.status === 'completed' && (
                                            <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                        )}
                                    </div>
                                </td>
                                {completedRounds.map(round => {
                                    const roundScore = round.scores.find(s => s.playerId === entry.player.id);
                                    const hasFine = roundScore && roundScore.fines.length > 0;
                                    return (
                                        <td key={round.id} className="text-center">
                                            <div className="inline-flex items-center gap-1">
                                                <span className="font-semibold text-slate-700">
                                                    {roundScore?.score ?? '-'}
                                                </span>
                                                {hasFine && (
                                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" title="Fine applied" />
                                                )}
                                            </div>
                                        </td>
                                    );
                                })}
                                <td className="text-center">
                                    {entry.fines > 0 ? (
                                        <span className="text-red-600 font-semibold text-sm">-{entry.fines}</span>
                                    ) : (
                                        <span className="text-slate-300 text-sm">—</span>
                                    )}
                                </td>
                                <td className="text-center">
                                    <span className={cn(
                                        'text-base font-extrabold',
                                        index === 0 ? 'text-primary-700' : 'text-slate-800'
                                    )}>
                                        {entry.total}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
