'use client';

import { useState } from 'react';
import { CheckCheck, Bell, Filter, Clock } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import { notifications } from '@/data/dummy';
import { formatRelativeTime, cn } from '@/lib/utils';

type FilterType = 'all' | 'unread' | 'read';

const notificationIcons: Record<string, string> = {
    score_update: '📊',
    fine_imposed: '⚠️',
    game_invite: '✉️',
    game_completed: '🏆',
    round_completed: '🔄',
};

export default function NotificationsPage() {
    const [filter, setFilter] = useState<FilterType>('all');
    const [items, setItems] = useState(notifications);

    const filtered = items.filter(n => {
        if (filter === 'unread') return !n.isRead;
        if (filter === 'read') return n.isRead;
        return true;
    });

    const unreadCount = items.filter(n => !n.isRead).length;

    const markAllRead = () => {
        setItems(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const toggleRead = (id: string) => {
        setItems(prev =>
            prev.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
        );
    };

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="Notifications"
                description={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
            >
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="btn btn-secondary">
                        <CheckCheck className="w-4 h-4" />
                        Mark All Read
                    </button>
                )}
            </PageHeader>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {(['all', 'unread', 'read'] as FilterType[]).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            'btn btn-sm transition-all duration-200',
                            filter === f ? 'btn-primary' : 'btn-secondary'
                        )}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                        {f === 'unread' && unreadCount > 0 && (
                            <span className="bg-white/20 text-white text-[0.65rem] px-1.5 py-0.5 rounded-full ml-1">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {filtered.length > 0 ? (
                    filtered.map(notif => (
                        <div
                            key={notif.id}
                            onClick={() => toggleRead(notif.id)}
                            className={cn(
                                'card cursor-pointer transition-all duration-200',
                                !notif.isRead && 'border-l-4 border-l-primary-500 bg-primary-50/30'
                            )}
                        >
                            <div className="card-body py-4 flex items-start gap-4">
                                <span className="text-2xl flex-shrink-0 mt-0.5">
                                    {notificationIcons[notif.type] || '📌'}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className={cn(
                                                'text-sm',
                                                !notif.isRead ? 'font-bold text-slate-800' : 'font-medium text-slate-600'
                                            )}>
                                                {notif.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 mt-0.5">{notif.message}</p>
                                        </div>
                                        {!notif.isRead && (
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatRelativeTime(notif.timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="card">
                        <div className="card-body text-center py-12">
                            <span className="text-4xl mb-3 block">🔔</span>
                            <h3 className="text-base font-bold text-slate-700 mb-1">All caught up!</h3>
                            <p className="text-sm text-slate-500">No{filter !== 'all' ? ` ${filter}` : ''} notifications.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
