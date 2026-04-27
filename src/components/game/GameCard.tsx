import Link from 'next/link';
import { Clock, Users, ChevronRight } from 'lucide-react';
import { GameSession } from '@/types';
import { formatRelativeTime, getStatusColor } from '@/lib/utils';
import { gameTypeConfig } from '@/data/dummy';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import { cn } from '@/lib/utils';

interface GameCardProps {
    game: GameSession;
}

export default function GameCard({ game }: GameCardProps) {
    const config = gameTypeConfig[game.gameType];
    const statusStyle = getStatusColor(game.status);
    const completedRounds = game.rounds.filter(r => r.isCompleted).length;

    return (
        <Link href={`/games/${game.id}`} className="block">
            <div className="card group cursor-pointer hover:border-primary-200 transition-all duration-200">
                <div className="card-body">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <div
                                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                                style={{ backgroundColor: config.bg }}
                            >
                                {config.icon}
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-primary-700 transition-colors">
                                    {game.name}
                                </h3>
                                <p className="text-xs font-medium text-slate-400">{config.label} Game</p>
                            </div>
                        </div>
                        <div className={cn('badge', statusStyle.bg, statusStyle.text)}>
                            <span className={cn('w-1.5 h-1.5 rounded-full', statusStyle.dot, game.status === 'active' && 'animate-pulse-dot')} />
                            {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-5 mb-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">{game.players.length} players</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">
                                {completedRounds}{game.maxRounds ? `/${game.maxRounds}` : ''} rounds
                            </span>
                        </div>
                    </div>

                    {/* Players */}
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            {game.players.slice(0, 5).map(player => (
                                <PlayerAvatar
                                    key={player.id}
                                    avatar={player.avatar}
                                    name={player.name}
                                    color={player.color}
                                    size="sm"
                                />
                            ))}
                            {game.players.length > 5 && (
                                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                    +{game.players.length - 5}
                                </div>
                            )}
                        </div>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                            {formatRelativeTime(game.updatedAt)}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary-500 transition-colors" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
