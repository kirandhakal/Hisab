'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
    ArrowLeft,
    Plus,
    AlertTriangle,
    Share2,
    CheckCircle2,
    Users,
    Clock,
    Trophy,
} from 'lucide-react';
import Link from 'next/link';
import ScoreTable from '@/components/game/ScoreTable';
import ScoreEntryModal from '@/components/game/ScoreEntryModal';
import FineModal from '@/components/game/FineModal';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import { gameTypeConfig } from '@/data/dummy';
import { useGameSessions } from '@/lib/useGameSessions';
import { formatDate, formatTime, cn, getStatusColor, getPlayerTotalScore } from '@/lib/utils';

export default function GameDetailPage() {
    const params = useParams();
    const { games, addRoundScores, imposeFine } = useGameSessions();
    const gameId = params.id as string;

    const game = games.find(g => g.id === gameId);

    const [showScoreEntry, setShowScoreEntry] = useState(false);
    const [showFineModal, setShowFineModal] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);

    if (!game) {
        return (
            <div className="animate-fade-in">
                <div className="flex flex-col items-center justify-center py-24">
                    <span className="text-5xl mb-4">🔍</span>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">Game not found</h2>
                    <p className="text-slate-500 mb-6">This game session does not exist or has been removed.</p>
                    <Link href="/games" className="btn btn-primary">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Games
                    </Link>
                </div>
            </div>
        );
    }

    const config = gameTypeConfig[game.gameType];
    const statusStyle = getStatusColor(game.status);
    const completedRounds = game.rounds.filter(r => r.isCompleted);
    const currentRound = completedRounds.length + 1;

    // Player standings
    const standings = game.players
        .map(player => ({
            player,
            total: getPlayerTotalScore(player.id, completedRounds),
            fines: completedRounds.reduce((sum, round) => {
                const score = round.scores.find(s => s.playerId === player.id);
                return sum + (score?.fines.reduce((f, fine) => f + fine.amount, 0) || 0);
            }, 0),
        }))
        .sort((a, b) => b.total - a.total);

    const gameFines = game.rounds.flatMap(round =>
        round.scores.flatMap(score => score.fines)
    );

    const handleShare = () => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
    };

    return (
        <div className="animate-fade-in">
            {/* Back + Header */}
            <div className="mb-6">
                <Link
                    href="/games"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Games
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                            style={{ backgroundColor: config.bg }}
                        >
                            {config.icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-2xl font-extrabold text-slate-800">{game.name}</h1>
                                <div className={cn('badge', statusStyle.bg, statusStyle.text)}>
                                    <span className={cn('w-1.5 h-1.5 rounded-full', statusStyle.dot)} />
                                    {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {game.players.length} players
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    Started {formatDate(game.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {game.status === 'active' && (
                            <>
                                <button onClick={() => setShowScoreEntry(true)} className="btn btn-primary">
                                    <Plus className="w-4 h-4" />
                                    Add Scores
                                </button>
                                <button onClick={() => setShowFineModal(true)} className="btn btn-outline">
                                    <AlertTriangle className="w-4 h-4" />
                                    Fine
                                </button>
                            </>
                        )}
                        <button onClick={handleShare} className="btn btn-secondary">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Table — 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                    <ScoreTable game={game} />

                    {/* Round History */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-base font-bold text-slate-800">Round History</h3>
                        </div>
                        <div className="card-body pt-0 space-y-3">
                            {[...game.rounds].reverse().map(round => (
                                <div
                                    key={round.id}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold',
                                            round.isCompleted
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        )}>
                                            R{round.roundNumber}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">
                                                Round {round.roundNumber}
                                            </p>
                                            <p className="text-xs text-slate-400">{formatTime(round.timestamp)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {round.isCompleted && (
                                            <div className="text-right">
                                                <p className="text-xs text-slate-400">High Score</p>
                                                <p className="text-sm font-bold text-primary-700">
                                                    {Math.max(...round.scores.map(s => s.score))} pts
                                                </p>
                                            </div>
                                        )}
                                        <span className={cn(
                                            'badge',
                                            round.isCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        )}>
                                            {round.isCompleted ? (
                                                <><CheckCircle2 className="w-3 h-3" /> Done</>
                                            ) : (
                                                <><Clock className="w-3 h-3" /> In Progress</>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Player Standings */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-500" />
                                Standings
                            </h3>
                        </div>
                        <div className="card-body pt-0 space-y-3">
                            {standings.map((entry, i) => (
                                <div
                                    key={entry.player.id}
                                    className={cn(
                                        'flex items-center gap-3 p-3 rounded-xl border transition-colors',
                                        i === 0 ? 'border-amber-200 bg-amber-50/50' : 'border-slate-100 bg-white'
                                    )}
                                >
                                    <span className={cn(
                                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                                        i === 0 ? 'bg-amber-200 text-amber-800' :
                                            i === 1 ? 'bg-slate-200 text-slate-600' :
                                                i === 2 ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-100 text-slate-500'
                                    )}>
                                        {i + 1}
                                    </span>
                                    <PlayerAvatar
                                        avatar={entry.player.avatar}
                                        name={entry.player.name}
                                        color={entry.player.color}
                                        size="sm"
                                        isOnline={entry.player.isOnline}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-700 truncate">{entry.player.name}</p>
                                        {entry.fines > 0 && (
                                            <p className="text-[0.65rem] text-red-500 font-medium">Fines: -{entry.fines}</p>
                                        )}
                                    </div>
                                    <span className="text-base font-extrabold text-slate-800">{entry.total}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fines Log */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-500" />
                                Fines Log
                            </h3>
                        </div>
                        <div className="card-body pt-0">
                            {gameFines.length > 0 ? (
                                <div className="space-y-3">
                                    {gameFines.map(fine => {
                                        const player = game.players.find(p => p.id === fine.playerId);
                                        if (!player) return null;
                                        return (
                                            <div
                                                key={fine.id}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100"
                                            >
                                                <PlayerAvatar avatar={player.avatar} name={player.name} color={player.color} size="sm" />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-700 truncate">{player.name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {fine.reason} · R{fine.roundNumber}
                                                    </p>
                                                </div>
                                                <span className="text-sm font-bold text-red-600">-{fine.amount}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 text-center py-4">No fines recorded</p>
                            )}
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-base font-bold text-slate-800">Game Info</h3>
                        </div>
                        <div className="card-body pt-0 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Type</span>
                                <span className="font-semibold text-slate-700">{config.icon} {config.label}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Created</span>
                                <span className="font-semibold text-slate-700">{formatDate(game.createdAt)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Rounds</span>
                                <span className="font-semibold text-slate-700">
                                    {completedRounds.length}{game.maxRounds ? ` / ${game.maxRounds}` : ''}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Last Updated</span>
                                <span className="font-semibold text-slate-700">{formatTime(game.updatedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ScoreEntryModal
                key={`scores-${game.id}-${currentRound}-${showScoreEntry}`}
                isOpen={showScoreEntry}
                onClose={() => setShowScoreEntry(false)}
                players={game.players}
                roundNumber={currentRound}
                onSubmitScores={scores => addRoundScores(game.id, currentRound, scores)}
            />

            <FineModal
                key={`fine-${game.id}-${currentRound}-${showFineModal}`}
                isOpen={showFineModal}
                onClose={() => setShowFineModal(false)}
                players={game.players}
                currentRound={currentRound}
                onImposeFine={fine => imposeFine(game.id, fine)}
            />

            {/* Share Toast */}
            {showShareToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
                    <div className="bg-slate-800 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Scorecard link copied! Share with players.
                    </div>
                </div>
            )}
        </div>
    );
}
