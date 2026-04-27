import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

export function getPlayerTotalScore(
    playerId: string,
    rounds: { scores: { playerId: string; score: number; fines: { amount: number }[] }[] }[]
): number {
    return rounds.reduce((total, round) => {
        const playerScore = round.scores.find(s => s.playerId === playerId);
        if (!playerScore) return total;
        const fineTotal = playerScore.fines.reduce((sum, f) => sum + f.amount, 0);
        return total + playerScore.score - fineTotal;
    }, 0);
}

export function getStatusColor(status: string): { bg: string; text: string; dot: string } {
    switch (status) {
        case 'active':
            return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
        case 'paused':
            return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
        case 'completed':
            return { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
        default:
            return { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' };
    }
}

export function getOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
