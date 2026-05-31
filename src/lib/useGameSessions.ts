'use client';

import { useCallback, useEffect, useState } from 'react';
import { gameSessions as seedGameSessions } from '@/data/dummy';
import { Fine, GameSession, GameType, Player, Round, RoundScore } from '@/types';
import { generateId } from '@/lib/utils';

const STORAGE_KEY = 'hisab:game-sessions';
const GAME_SESSIONS_UPDATED = 'hisab:game-sessions-updated';

export interface CreateGameInput {
    name: string;
    gameType: GameType;
    players: Player[];
    maxRounds: number | undefined;
}

export interface FineInput {
    playerId: string;
    amount: number;
    reason: string;
    roundNumber: number;
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

    const updateGame = useCallback((gameId: string, updater: (game: GameSession) => GameSession) => {
        const nextGames = readStoredGameSessions().map(game =>
            game.id === gameId ? updater(game) : game
        );

        writeStoredGameSessions(nextGames);
        setGames(nextGames);
    }, []);

    const addRoundScores = useCallback((gameId: string, roundNumber: number, scores: Record<string, number>) => {
        updateGame(gameId, game => {
            const now = new Date().toISOString();
            const existingRound = game.rounds.find(round => round.roundNumber === roundNumber);
            const roundScores: RoundScore[] = game.players.map(player => {
                const existingScore = existingRound?.scores.find(score => score.playerId === player.id);

                return {
                    playerId: player.id,
                    score: scores[player.id] ?? 0,
                    fines: existingScore?.fines ?? [],
                };
            });
            const completedRound: Round = {
                id: existingRound?.id ?? `r-${generateId()}`,
                roundNumber,
                scores: roundScores,
                timestamp: existingRound?.timestamp ?? now,
                isCompleted: true,
                notes: existingRound?.notes,
            };
            const nextRounds = existingRound
                ? game.rounds.map(round => round.id === existingRound.id ? completedRound : round)
                : [...game.rounds, completedRound];
            const completedRoundCount = nextRounds.filter(round => round.isCompleted).length;

            return {
                ...game,
                rounds: nextRounds.sort((a, b) => a.roundNumber - b.roundNumber),
                status: game.maxRounds && completedRoundCount >= game.maxRounds ? 'completed' : game.status,
                updatedAt: now,
            };
        });
    }, [updateGame]);

    const imposeFine = useCallback((gameId: string, input: FineInput) => {
        updateGame(gameId, game => {
            const now = new Date().toISOString();
            const fine: Fine = {
                id: `f-${generateId()}`,
                playerId: input.playerId,
                roundNumber: input.roundNumber,
                amount: input.amount,
                reason: input.reason || 'Fine',
                createdAt: now,
            };
            const existingRound = game.rounds.find(round => round.roundNumber === input.roundNumber);
            const applyFineToScores = (roundScores: RoundScore[]) =>
                game.players.map(player => {
                    const existingScore = roundScores.find(score => score.playerId === player.id);

                    return {
                        playerId: player.id,
                        score: existingScore?.score ?? 0,
                        fines: player.id === input.playerId
                            ? [...(existingScore?.fines ?? []), fine]
                            : existingScore?.fines ?? [],
                    };
                });
            const fineRound: Round = existingRound
                ? {
                    ...existingRound,
                    scores: applyFineToScores(existingRound.scores),
                }
                : {
                    id: `r-${generateId()}`,
                    roundNumber: input.roundNumber,
                    scores: applyFineToScores([]),
                    timestamp: now,
                    isCompleted: false,
                };
            const nextRounds = existingRound
                ? game.rounds.map(round => round.id === existingRound.id ? fineRound : round)
                : [...game.rounds, fineRound];

            return {
                ...game,
                rounds: nextRounds.sort((a, b) => a.roundNumber - b.roundNumber),
                updatedAt: now,
            };
        });
    }, [updateGame]);

    return { games, createGame, addRoundScores, imposeFine };
}
