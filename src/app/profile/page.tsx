'use client';

import { Bell, Mail, Shield, Gamepad2, Trophy, Users, Calendar, Settings } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import StatCard from '@/components/ui/StatCard';

export default function ProfilePage() {
    // Simulated current user
    const user = {
        name: 'Ram Prasad',
        email: 'ram@example.com',
        avatar: '🧔',
        color: '#4F46E5',
        isOnline: true,
        joinedAt: '2026-01-15',
        gamesPlayed: 5,
        wins: 2,
        totalPoints: 167,
        groupsJoined: 2,
    };

    return (
        <div className="animate-fade-in">
            <PageHeader title="Profile" description="Your account and game statistics." />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="card lg:col-span-1">
                    <div className="card-body text-center py-8">
                        <div className="flex justify-center mb-4">
                            <PlayerAvatar
                                avatar={user.avatar}
                                name={user.name}
                                color={user.color}
                                size="lg"
                                isOnline={user.isOnline}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                        <p className="text-sm text-slate-400 flex items-center justify-center gap-1 mt-1">
                            <Mail className="w-3.5 h-3.5" />
                            {user.email}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>

                        <div className="mt-6 space-y-3">
                            <button className="btn btn-secondary w-full">
                                <Settings className="w-4 h-4" />
                                Edit Profile
                            </button>
                            <button className="btn btn-outline w-full">
                                <Bell className="w-4 h-4" />
                                Notification Preferences
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <StatCard
                            label="Games Played"
                            value={user.gamesPlayed}
                            icon={Gamepad2}
                            iconColor="text-primary-600"
                            iconBg="bg-primary-50"
                        />
                        <StatCard
                            label="Total Wins"
                            value={user.wins}
                            icon={Trophy}
                            iconColor="text-amber-600"
                            iconBg="bg-amber-50"
                        />
                        <StatCard
                            label="Total Points"
                            value={user.totalPoints}
                            icon={Shield}
                            iconColor="text-emerald-600"
                            iconBg="bg-emerald-50"
                        />
                        <StatCard
                            label="Groups Joined"
                            value={user.groupsJoined}
                            icon={Users}
                            iconColor="text-violet-600"
                            iconBg="bg-violet-50"
                        />
                    </div>

                    {/* Settings Sections */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-base font-bold text-slate-800">Settings</h3>
                        </div>
                        <div className="card-body pt-0 space-y-4">
                            {[
                                { label: 'Score Notifications', desc: 'Receive alerts when scores are updated', enabled: true },
                                { label: 'Fine Notifications', desc: 'Get notified when fines are imposed', enabled: true },
                                { label: 'Game Invites', desc: 'Allow others to invite you to games', enabled: true },
                                { label: 'Weekly Summary', desc: 'Receive a weekly points summary email', enabled: false },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{setting.label}</p>
                                        <p className="text-xs text-slate-400">{setting.desc}</p>
                                    </div>
                                    <button
                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${setting.enabled ? 'bg-primary-600' : 'bg-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${setting.enabled ? 'left-[22px]' : 'left-0.5'
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
