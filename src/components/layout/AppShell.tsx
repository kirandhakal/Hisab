import Sidebar from './Sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 lg:pl-0 pt-[60px] lg:pt-0">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
