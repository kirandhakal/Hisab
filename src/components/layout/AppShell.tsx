'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
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
