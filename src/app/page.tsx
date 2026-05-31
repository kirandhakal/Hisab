'use client';

import { useState } from 'react';
import {
  Gamepad2,
  Users,
  FolderOpen,
  TrendingUp,
  Plus,
  ArrowRight,
  Trophy,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import StatCard from '@/components/ui/StatCard';
import GameCard from '@/components/game/GameCard';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import NewGameModal from '@/components/game/NewGameModal';
import {
  dashboardStats,
  leaderboard,
  notifications,
  sampleFines,
  players,
} from '@/data/dummy';
import { formatRelativeTime, cn } from '@/lib/utils';
import { useGameSessions } from '@/lib/useGameSessions';

export default function DashboardPage() {
  const { games, createGame } = useGameSessions();
  const [showNewGame, setShowNewGame] = useState(false);

  const activeGames = games.filter(g => g.status === 'active');
  const recentNotifications = notifications.slice(0, 4);
  const topPlayers = [...leaderboard].sort((a, b) => b.totalScore - a.totalScore).slice(0, 5);
  const recentFines = sampleFines.slice(0, 3);

  const notificationIcon: Record<string, string> = {
    score_update: '📊',
    fine_imposed: '⚠️',
    game_invite: '✉️',
    game_completed: '🏆',
    round_completed: '🔄',
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your game overview."
      >
        <button onClick={() => setShowNewGame(true)} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New Game
        </button>
      </PageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Games"
          value={activeGames.length}
          icon={Gamepad2}
          iconColor="text-primary-600"
          iconBg="bg-primary-50"
          trend="+1 this week"
          trendUp
        />
        <StatCard
          label="Total Players"
          value={dashboardStats.totalPlayers}
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend="2 online now"
          trendUp
        />
        <StatCard
          label="Groups"
          value={dashboardStats.totalGroups}
          icon={FolderOpen}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Games This Week"
          value={dashboardStats.gamesThisWeek}
          icon={TrendingUp}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
          trend="Up from 2 last week"
          trendUp
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Games — 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Games */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Active Games</h2>
              <Link
                href="/games"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>

          {/* Recent Fines */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Recent Fines
              </h3>
            </div>
            <div className="card-body pt-0">
              <div className="space-y-3">
                {recentFines.map(fine => {
                  const player = players.find(p => p.id === fine.playerId);
                  if (!player) return null;
                  return (
                    <div
                      key={fine.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100"
                    >
                      <PlayerAvatar avatar={player.avatar} name={player.name} color={player.color} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{player.name}</p>
                        <p className="text-xs text-slate-500">
                          {fine.reason} · Round {fine.roundNumber}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-red-600">-{fine.amount} pts</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Players */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Top Players
              </h3>
              <Link
                href="/leaderboard"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                See All
              </Link>
            </div>
            <div className="card-body pt-0">
              <div className="space-y-3">
                {topPlayers.map((entry, i) => (
                  <div key={entry.player.id} className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                        i === 0
                          ? 'bg-amber-100 text-amber-700'
                          : i === 1
                            ? 'bg-slate-200 text-slate-600'
                            : i === 2
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-slate-100 text-slate-500'
                      )}
                    >
                      {i + 1}
                    </span>
                    <PlayerAvatar
                      avatar={entry.player.avatar}
                      name={entry.player.name}
                      color={entry.player.color}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {entry.player.name}
                      </p>
                      <p className="text-xs text-slate-400">{entry.gamesPlayed} games</p>
                    </div>
                    <span className="text-sm font-bold text-primary-700">{entry.totalScore} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Notifications</h3>
              <Link
                href="/notifications"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="card-body pt-0">
              <div className="space-y-3">
                {recentNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-xl transition-colors',
                      !notif.isRead ? 'bg-primary-50/50' : 'hover:bg-slate-50'
                    )}
                  >
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {notificationIcon[notif.type] || '📌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm truncate', !notif.isRead ? 'font-semibold text-slate-800' : 'text-slate-600')}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{notif.message}</p>
                      <p className="text-[0.65rem] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(notif.timestamp)}
                      </p>
                    </div>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewGameModal
        isOpen={showNewGame}
        onClose={() => setShowNewGame(false)}
        onCreateGame={createGame}
      />
    </div>
  );
}
