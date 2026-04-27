'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Hamburger Button */}
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={cn(
                    'hidden lg:flex fixed z-50 items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-300',
                    sidebarCollapsed ? 'left-4 top-4' : 'left-[276px] top-4'
                )}
                aria-label={sidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
            >
                {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                ) : (
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                )}
            </button>

            <Sidebar collapsed={sidebarCollapsed} />
            <main className={cn(
                'flex-1 pt-[60px] lg:pt-0 transition-all duration-300',
                sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-[260px]'
            )}>
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
