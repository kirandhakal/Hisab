'use client';

import { useState } from 'react';
import { Trophy, Medal, TrendingUp, AlertTriangle, ChevronUp, ChevronDown } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import { leaderboard } from '@/data/dummy';
import { cn, getOrdinal } from '@/lib/utils';

type SortKey = 'totalScore' | 'gamesPlayed' | 'wins' | 'avgScore';

export default function LeaderboardPage() {
    const [sortKey, setSortKey] = useState<SortKey>('totalScore');
    const [sortAsc, setSortAsc] = useState(false);

    const sorted = [...leaderboard].sort((a, b) => {
        const diff = a[sortKey] - b[sortKey];
        return sortAsc ? diff : -diff;
    });

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc);
        } else {
            setSortKey(key);
            setSortAsc(false);
        }
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return <ChevronUp className="w-3 h-3 text-slate-300" />;
        return sortAsc ? (
            <ChevronUp className="w-3 h-3 text-primary-600" />
        ) : (
            <ChevronDown className="w-3 h-3 text-primary-600" />
        );
    };

    const top3 = sorted.slice(0, 3);

    return (
        <div className="animate-fade-in">
            <PageHeader title="Leaderboard" description="Overall rankings across all games." />

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {top3.map((entry, i) => {
                    const medals = ['🥇', '🥈', '🥉'];
                    const bgColors = ['bg-gradient-to-br from-amber-50 to-amber-100/50', 'bg-gradient-to-br from-slate-50 to-slate-100/50', 'bg-gradient-to-br from-orange-50 to-orange-100/50'];
                    const borderColors = ['border-amber-200', 'border-slate-200', 'border-orange-200'];
                    const order = i === 0 ? 'sm:order-2' : i === 1 ? 'sm:order-1' : 'sm:order-3';

                    return (
                        <div
                            key={entry.player.id}
                            className={cn(
                                'card border-2 text-center',
                                bgColors[i],
                                borderColors[i],
                                order,
                                i === 0 && 'sm:-mt-4'
                            )}
                        >
                            <div className="card-body py-8">
                                <span className="text-4xl mb-3 inline-block">{medals[i]}</span>
                                <div className="flex justify-center mb-3">
                                    <PlayerAvatar
                                        avatar={entry.player.avatar}
                                        name={entry.player.name}
                                        color={entry.player.color}
                                        size="lg"
                                        isOnline={entry.player.isOnline}
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{entry.player.name}</h3>
                                <p className="text-3xl font-extrabold text-primary-700 mt-2">{entry.totalScore}</p>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Total Points</p>
                                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/60">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{entry.wins}</p>
                                        <p className="text-[0.6rem] text-slate-400 uppercase">Wins</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{entry.gamesPlayed}</p>
                                        <p className="text-[0.6rem] text-slate-400 uppercase">Games</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{entry.avgScore.toFixed(1)}</p>
                                        <p className="text-[0.6rem] text-slate-400 uppercase">Avg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Full Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th className="w-12">#</th>
                                <th>Player</th>
                                <th
                                    className="cursor-pointer select-none text-center"
                                    onClick={() => handleSort('totalScore')}
                                >
                                    <div className="inline-flex items-center gap-1">
                                        Total Score <SortIcon column="totalScore" />
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer select-none text-center"
                                    onClick={() => handleSort('gamesPlayed')}
                                >
                                    <div className="inline-flex items-center gap-1">
                                        Games <SortIcon column="gamesPlayed" />
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer select-none text-center"
                                    onClick={() => handleSort('wins')}
                                >
                                    <div className="inline-flex items-center gap-1">
                                        Wins <SortIcon column="wins" />
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer select-none text-center"
                                    onClick={() => handleSort('avgScore')}
                                >
                                    <div className="inline-flex items-center gap-1">
                                        Avg Score <SortIcon column="avgScore" />
                                    </div>
                                </th>
                                <th className="text-center">Fines</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((entry, i) => (
                                <tr
                                    key={entry.player.id}
                                    className={cn(i < 3 && 'bg-amber-50/30')}
                                >
                                    <td>
                                        <span className={cn(
                                            'w-7 h-7 rounded-full inline-flex items-center justify-center text-xs font-bold',
                                            i === 0 ? 'bg-amber-200 text-amber-800' :
                                                i === 1 ? 'bg-slate-200 text-slate-600' :
                                                    i === 2 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-slate-100 text-slate-500'
                                        )}>
                                            {i + 1}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <PlayerAvatar
                                                avatar={entry.player.avatar}
                                                name={entry.player.name}
                                                color={entry.player.color}
                                                size="sm"
                                                isOnline={entry.player.isOnline}
                                            />
                                            <span className="font-semibold text-slate-800">{entry.player.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-base font-extrabold text-primary-700">{entry.totalScore}</span>
                                    </td>
                                    <td className="text-center font-semibold text-slate-700">{entry.gamesPlayed}</td>
                                    <td className="text-center font-semibold text-amber-700">{entry.wins}</td>
                                    <td className="text-center font-semibold text-slate-700">{entry.avgScore.toFixed(1)}</td>
                                    <td className="text-center">
                                        {entry.totalFines > 0 ? (
                                            <span className="text-red-600 font-semibold text-sm flex items-center justify-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                -{entry.totalFines}
                                            </span>
                                        ) : (
                                            <span className="text-slate-300">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
