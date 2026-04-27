'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Gamepad2,
    Users,
    Trophy,
    Bell,
    Menu,
    X,
    UserCircle,
    FolderOpen,
    Calculator,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { notifications } from '@/data/dummy';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/games', label: 'Games', icon: Gamepad2 },
    { href: '/scoreboard', label: 'Scoreboard', icon: Calculator },
    { href: '/players', label: 'Players', icon: Users },
    { href: '/groups', label: 'Groups', icon: FolderOpen },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <>
            {/* Mobile Top Bar */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="btn btn-icon btn-secondary"
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                            <Calculator className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-800">Hisab</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/notifications" className="btn btn-icon btn-secondary relative">
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && <span className="notification-dot" />}
                    </Link>
                    <Link href="/profile" className="btn btn-icon btn-secondary">
                        <UserCircle className="w-5 h-5" />
                    </Link>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-0 left-0 z-40 h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out overflow-hidden',
                    collapsed ? 'w-0 lg:w-0' : 'w-[260px]',
                    'lg:static lg:z-auto',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                )}
            >
                {/* Logo */}
                <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 whitespace-nowrap">
                    <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm flex-shrink-0">
                            <Calculator className="w-5 h-5 text-white" />
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Hisab</h1>
                            <p className="text-[0.65rem] font-medium text-slate-400 uppercase tracking-widest">Score Keeper</p>
                        </div>
                    </Link>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden btn btn-icon btn-secondary"
                        aria-label="Close menu"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map(item => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-medium transition-all duration-200 whitespace-nowrap',
                                    isActive
                                        ? 'bg-primary-50 text-primary-700 font-semibold'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                )}
                            >
                                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-primary-600' : '')} />
                                <span className={cn('transition-opacity duration-300', collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="px-3 pb-4 space-y-1 border-t border-slate-100 pt-3">
                    <Link
                        href="/notifications"
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                            'flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-medium transition-all duration-200 whitespace-nowrap',
                            pathname === '/notifications'
                                ? 'bg-primary-50 text-primary-700 font-semibold'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        )}
                    >
                        <div className="relative">
                            <Bell className="w-5 h-5 flex-shrink-0" />
                            {unreadCount > 0 && <span className="notification-dot" />}
                        </div>
                        <span className={cn('transition-opacity duration-300', collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </span>
                    </Link>
                    <Link
                        href="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[0.9rem] font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200 whitespace-nowrap"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            U
                        </div>
                        <div className={cn('transition-opacity duration-300', collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100')}>
                            <p className="text-sm font-semibold text-slate-700">User</p>
                            <p className="text-[0.7rem] text-slate-400">View Profile</p>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}
