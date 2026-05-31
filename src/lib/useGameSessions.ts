'use client';

import { useCallback, useEffect, useState } from 'react';
import { gameSessions as seedGameSessions } from '@/data/dummy';
import { GameSession, GameType, Player } from '@/types';
import { generateId } from '@/lib/utils';

const STORAGE_KEY = 'hisab:game-sessions';
const GAME_SESSIONS_UPDATED = 'hisab:game-sessions-updated';

export interface CreateGameInput {
    name: string;
    gameType: GameType;
    players: Player[];
    maxRounds: number | undefined;
}

function readStoredGameSessions(): GameSession[] {
    if (typeof window === 'undefined') return seedGameSessions;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return seedGameSessions;

        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : seedGameSessions;
    } catch {
        return seedGameSessions;
    }
}

function writeStoredGameSessions(sessions: GameSession[]) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    window.dispatchEvent(new Event(GAME_SESSIONS_UPDATED));
}

export function useGameSessions() {
    const [games, setGames] = useState<GameSession[]>(seedGameSessions);

    useEffect(() => {
        const syncGames = () => setGames(readStoredGameSessions());

        syncGames();
        window.addEventListener('storage', syncGames);
        window.addEventListener(GAME_SESSIONS_UPDATED, syncGames);

        return () => {
            window.removeEventListener('storage', syncGames);
            window.removeEventListener(GAME_SESSIONS_UPDATED, syncGames);
        };
    }, []);

    const createGame = useCallback((input: CreateGameInput) => {
        const now = new Date().toISOString();
        const newGame: GameSession = {
            id: `g-${generateId()}`,
            name: input.name,
            gameType: input.gameType,
            players: input.players,
            rounds: [],
            status: 'active',
            createdAt: now,
            updatedAt: now,
            maxRounds: input.maxRounds,
        };

        const nextGames = [newGame, ...readStoredGameSessions()];
        writeStoredGameSessions(nextGames);
        setGames(nextGames);
        return newGame;
    }, []);

    return { games, createGame };
}
