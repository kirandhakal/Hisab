import {
    Player,
    GameSession,
    PlayerGroup,
    Notification,
    LeaderboardEntry,
    DashboardStats,
    Fine,
} from '@/types';

// ============================================
// Players
// ============================================
export const players: Player[] = [
    { id: 'p1', name: 'Ram Prasad', avatar: '🧔', color: '#4F46E5', isOnline: true, email: 'ram@example.com' },
    { id: 'p2', name: 'Sita Devi', avatar: '👩', color: '#059669', isOnline: true, email: 'sita@example.com' },
    { id: 'p3', name: 'Hari Bahadur', avatar: '👨', color: '#D97706', isOnline: false, email: 'hari@example.com' },
    { id: 'p4', name: 'Gita Kumari', avatar: '👧', color: '#DC2626', isOnline: true, email: 'gita@example.com' },
    { id: 'p5', name: 'Bishnu Thapa', avatar: '🧑', color: '#7C3AED', isOnline: false, email: 'bishnu@example.com' },
    { id: 'p6', name: 'Maya Sharma', avatar: '👵', color: '#0891B2', isOnline: true, email: 'maya@example.com' },
    { id: 'p7', name: 'Kiran Adhikari', avatar: '🧑‍💼', color: '#BE185D', isOnline: true, email: 'kiran@example.com' },
    { id: 'p8', name: 'Nirmala Poudel', avatar: '👩‍🦱', color: '#065F46', isOnline: false, email: 'nirmala@example.com' },
];

// ============================================
// Fines
// ============================================
export const sampleFines: Fine[] = [
    { id: 'f1', playerId: 'p1', roundNumber: 2, amount: 5, reason: 'Late to round', createdAt: '2026-04-23T10:30:00' },
    { id: 'f2', playerId: 'p3', roundNumber: 3, amount: 10, reason: 'Wrong move', createdAt: '2026-04-23T11:00:00' },
    { id: 'f3', playerId: 'p2', roundNumber: 5, amount: 3, reason: 'Phone usage', createdAt: '2026-04-23T11:45:00' },
    { id: 'f4', playerId: 'p4', roundNumber: 1, amount: 7, reason: 'Miscount', createdAt: '2026-04-22T15:00:00' },
];

// ============================================
// Game Sessions
// ============================================
export const gameSessions: GameSession[] = [
    {
        id: 'g1',
        name: 'Saturday Poker Night',
        gameType: 'cards',
        players: [players[0], players[1], players[2], players[3]],
        status: 'active',
        createdAt: '2026-04-23T18:00:00',
        updatedAt: '2026-04-23T20:30:00',
        maxRounds: 10,
        rounds: [
            {
                id: 'r1',
                roundNumber: 1,
                timestamp: '2026-04-23T18:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 25, fines: [] },
                    { playerId: 'p2', score: 40, fines: [] },
                    { playerId: 'p3', score: 15, fines: [] },
                    { playerId: 'p4', score: 30, fines: [] },
                ],
            },
            {
                id: 'r2',
                roundNumber: 2,
                timestamp: '2026-04-23T18:45:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 35, fines: [sampleFines[0]] },
                    { playerId: 'p2', score: 20, fines: [] },
                    { playerId: 'p3', score: 45, fines: [] },
                    { playerId: 'p4', score: 10, fines: [] },
                ],
            },
            {
                id: 'r3',
                roundNumber: 3,
                timestamp: '2026-04-23T19:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 50, fines: [] },
                    { playerId: 'p2', score: 30, fines: [] },
                    { playerId: 'p3', score: 20, fines: [sampleFines[1]] },
                    { playerId: 'p4', score: 35, fines: [] },
                ],
            },
            {
                id: 'r4',
                roundNumber: 4,
                timestamp: '2026-04-23T19:45:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 15, fines: [] },
                    { playerId: 'p2', score: 45, fines: [] },
                    { playerId: 'p3', score: 30, fines: [] },
                    { playerId: 'p4', score: 25, fines: [] },
                ],
            },
            {
                id: 'r5',
                roundNumber: 5,
                timestamp: '2026-04-23T20:15:00',
                isCompleted: false,
                scores: [
                    { playerId: 'p1', score: 0, fines: [] },
                    { playerId: 'p2', score: 0, fines: [sampleFines[2]] },
                    { playerId: 'p3', score: 0, fines: [] },
                    { playerId: 'p4', score: 0, fines: [] },
                ],
            },
        ],
    },
    {
        id: 'g2',
        name: 'Dice Masters Challenge',
        gameType: 'dice',
        players: [players[0], players[4], players[5]],
        status: 'active',
        createdAt: '2026-04-22T14:00:00',
        updatedAt: '2026-04-22T16:30:00',
        maxRounds: 8,
        rounds: [
            {
                id: 'r6',
                roundNumber: 1,
                timestamp: '2026-04-22T14:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 12, fines: [] },
                    { playerId: 'p5', score: 18, fines: [] },
                    { playerId: 'p6', score: 9, fines: [] },
                ],
            },
            {
                id: 'r7',
                roundNumber: 2,
                timestamp: '2026-04-22T14:45:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 22, fines: [] },
                    { playerId: 'p5', score: 14, fines: [] },
                    { playerId: 'p6', score: 20, fines: [] },
                ],
            },
            {
                id: 'r8',
                roundNumber: 3,
                timestamp: '2026-04-22T15:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p1', score: 8, fines: [sampleFines[3]] },
                    { playerId: 'p5', score: 25, fines: [] },
                    { playerId: 'p6', score: 16, fines: [] },
                ],
            },
        ],
        groupId: 'grp1',
    },
    {
        id: 'g3',
        name: 'Board Game Sunday',
        gameType: 'board',
        players: [players[1], players[2], players[5], players[6], players[7]],
        status: 'completed',
        createdAt: '2026-04-20T10:00:00',
        updatedAt: '2026-04-20T13:00:00',
        maxRounds: 6,
        rounds: [
            {
                id: 'r9',
                roundNumber: 1,
                timestamp: '2026-04-20T10:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p2', score: 50, fines: [] },
                    { playerId: 'p3', score: 35, fines: [] },
                    { playerId: 'p6', score: 60, fines: [] },
                    { playerId: 'p7', score: 45, fines: [] },
                    { playerId: 'p8', score: 40, fines: [] },
                ],
            },
            {
                id: 'r10',
                roundNumber: 2,
                timestamp: '2026-04-20T11:00:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p2', score: 55, fines: [] },
                    { playerId: 'p3', score: 30, fines: [] },
                    { playerId: 'p6', score: 40, fines: [] },
                    { playerId: 'p7', score: 70, fines: [] },
                    { playerId: 'p8', score: 25, fines: [] },
                ],
            },
            {
                id: 'r11',
                roundNumber: 3,
                timestamp: '2026-04-20T11:45:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p2', score: 45, fines: [] },
                    { playerId: 'p3', score: 55, fines: [] },
                    { playerId: 'p6', score: 35, fines: [] },
                    { playerId: 'p7', score: 50, fines: [] },
                    { playerId: 'p8', score: 65, fines: [] },
                ],
            },
        ],
        groupId: 'grp2',
    },
    {
        id: 'g4',
        name: 'Custom Number Crunch',
        gameType: 'custom',
        players: [players[3], players[6]],
        status: 'paused',
        createdAt: '2026-04-21T16:00:00',
        updatedAt: '2026-04-21T17:00:00',
        rounds: [
            {
                id: 'r12',
                roundNumber: 1,
                timestamp: '2026-04-21T16:15:00',
                isCompleted: true,
                scores: [
                    { playerId: 'p4', score: 100, fines: [] },
                    { playerId: 'p7', score: 85, fines: [] },
                ],
            },
        ],
    },
];

// ============================================
// Player Groups
// ============================================
export const playerGroups: PlayerGroup[] = [
    {
        id: 'grp1',
        name: 'Weekend Warriors',
        description: 'Regular weekend gaming crew',
        members: [players[0], players[4], players[5], players[6]],
        createdAt: '2026-03-01T10:00:00',
        gamesPlayed: 24,
        color: '#4F46E5',
    },
    {
        id: 'grp2',
        name: 'Family Fun',
        description: 'Family board game sessions',
        members: [players[1], players[2], players[5], players[6], players[7]],
        createdAt: '2026-02-15T10:00:00',
        gamesPlayed: 18,
        color: '#059669',
    },
    {
        id: 'grp3',
        name: 'Office Lunch Gang',
        description: 'Quick lunchtime card games',
        members: [players[0], players[1], players[3]],
        createdAt: '2026-04-01T10:00:00',
        gamesPlayed: 12,
        color: '#D97706',
    },
];

// ============================================
// Notifications
// ============================================
export const notifications: Notification[] = [
    {
        id: 'n1',
        type: 'score_update',
        title: 'Score Updated',
        message: 'Ram Prasad scored 50 points in Round 3 of Saturday Poker Night',
        timestamp: '2026-04-23T19:15:00',
        isRead: false,
        gameId: 'g1',
        playerId: 'p1',
    },
    {
        id: 'n2',
        type: 'fine_imposed',
        title: 'Fine Imposed',
        message: 'Hari Bahadur was fined 10 pts for "Wrong move" in Round 3',
        timestamp: '2026-04-23T19:20:00',
        isRead: false,
        gameId: 'g1',
        playerId: 'p3',
    },
    {
        id: 'n3',
        type: 'game_invite',
        title: 'Game Invitation',
        message: 'You are invited to join "Dice Masters Challenge"',
        timestamp: '2026-04-22T13:55:00',
        isRead: true,
        gameId: 'g2',
    },
    {
        id: 'n4',
        type: 'game_completed',
        title: 'Game Completed',
        message: '"Board Game Sunday" has been completed. Check final scores!',
        timestamp: '2026-04-20T13:00:00',
        isRead: true,
        gameId: 'g3',
    },
    {
        id: 'n5',
        type: 'round_completed',
        title: 'Round Completed',
        message: 'Round 2 of "Dice Masters Challenge" is complete. Bishnu leads!',
        timestamp: '2026-04-22T14:50:00',
        isRead: false,
        gameId: 'g2',
    },
    {
        id: 'n6',
        type: 'score_update',
        title: 'Points Shared',
        message: 'Maya Sharma shared the scorecard for "Board Game Sunday"',
        timestamp: '2026-04-20T13:05:00',
        isRead: true,
        gameId: 'g3',
        playerId: 'p6',
    },
];

// ============================================
// Leaderboard
// ============================================
export const leaderboard: LeaderboardEntry[] = [
    { player: players[0], totalScore: 167, gamesPlayed: 5, wins: 2, avgScore: 33.4, totalFines: 12 },
    { player: players[1], totalScore: 285, gamesPlayed: 6, wins: 3, avgScore: 47.5, totalFines: 3 },
    { player: players[2], totalScore: 230, gamesPlayed: 5, wins: 1, avgScore: 46.0, totalFines: 10 },
    { player: players[3], totalScore: 200, gamesPlayed: 4, wins: 2, avgScore: 50.0, totalFines: 7 },
    { player: players[4], totalScore: 57, gamesPlayed: 2, wins: 1, avgScore: 28.5, totalFines: 0 },
    { player: players[5], totalScore: 225, gamesPlayed: 5, wins: 2, avgScore: 45.0, totalFines: 0 },
    { player: players[6], totalScore: 250, gamesPlayed: 4, wins: 3, avgScore: 62.5, totalFines: 0 },
    { player: players[7], totalScore: 130, gamesPlayed: 2, wins: 0, avgScore: 65.0, totalFines: 0 },
];

// ============================================
// Dashboard Stats
// ============================================
export const dashboardStats: DashboardStats = {
    activeGames: 2,
    totalPlayers: 8,
    totalGroups: 3,
    gamesThisWeek: 4,
};

// ============================================
// Game type config
// ============================================
export const gameTypeConfig: Record<string, { label: string; icon: string; color: string; bg: string }> = {
    cards: { label: 'Cards', icon: '🃏', color: '#4F46E5', bg: '#EEF2FF' },
    dice: { label: 'Dice', icon: '🎲', color: '#D97706', bg: '#FFFBEB' },
    board: { label: 'Board', icon: '♟️', color: '#059669', bg: '#ECFDF5' },
    custom: { label: 'Custom', icon: '🔢', color: '#7C3AED', bg: '#F5F3FF' },
};
