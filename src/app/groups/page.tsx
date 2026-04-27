'use client';

import { useState } from 'react';
import { Plus, Users, Gamepad2, Calendar } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import PlayerAvatar from '@/components/ui/PlayerAvatar';
import Modal from '@/components/ui/Modal';
import { playerGroups, players as allPlayers } from '@/data/dummy';
import { formatDate, cn } from '@/lib/utils';

export default function GroupsPage() {
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDesc, setGroupDesc] = useState('');
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const toggleMember = (id: string) => {
        setSelectedMembers(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="animate-fade-in">
            <PageHeader title="Groups" description="Organize players into groups for quick game setup.">
                <button onClick={() => setShowCreateGroup(true)} className="btn btn-primary">
                    <Plus className="w-4 h-4" />
                    Create Group
                </button>
            </PageHeader>

            {/* Groups Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {playerGroups.map(group => (
                    <div key={group.id} className="card hover:border-primary-200 transition-all duration-200 group">
                        <div className="card-body">
                            {/* Group Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                    style={{ background: `linear-gradient(135deg, ${group.color}, ${group.color}CC)` }}
                                >
                                    {group.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base font-bold text-slate-800 truncate group-hover:text-primary-700 transition-colors">
                                        {group.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 truncate">{group.description}</p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4" />
                                    {group.members.length} members
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Gamepad2 className="w-4 h-4" />
                                    {group.gamesPlayed} games
                                </span>
                            </div>

                            {/* Members */}
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {group.members.slice(0, 5).map(member => (
                                        <PlayerAvatar
                                            key={member.id}
                                            avatar={member.avatar}
                                            name={member.name}
                                            color={member.color}
                                            size="sm"
                                        />
                                    ))}
                                    {group.members.length > 5 && (
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                            +{group.members.length - 5}
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(group.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Group Modal */}
            <Modal isOpen={showCreateGroup} onClose={() => setShowCreateGroup(false)} title="Create Group" maxWidth="36rem">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        console.log('Create group:', { name: groupName, description: groupDesc, members: selectedMembers });
                        setGroupName('');
                        setGroupDesc('');
                        setSelectedMembers([]);
                        setShowCreateGroup(false);
                    }}
                    className="space-y-5"
                >
                    <div>
                        <label className="input-label">Group Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g. Weekend Warriors"
                            value={groupName}
                            onChange={e => setGroupName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="input-label">Description (optional)</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="What this group is about"
                            value={groupDesc}
                            onChange={e => setGroupDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="input-label">Select Members ({selectedMembers.length} selected)</label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {allPlayers.map(player => {
                                const isSelected = selectedMembers.includes(player.id);
                                return (
                                    <button
                                        key={player.id}
                                        type="button"
                                        onClick={() => toggleMember(player.id)}
                                        className={cn(
                                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 text-left',
                                            isSelected
                                                ? 'border-primary-300 bg-primary-50'
                                                : 'border-slate-100 hover:border-slate-200'
                                        )}
                                    >
                                        <PlayerAvatar avatar={player.avatar} name={player.name} color={player.color} size="sm" />
                                        <span className="text-sm font-semibold text-slate-700">{player.name}</span>
                                        {isSelected && (
                                            <span className="ml-auto w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <button type="button" onClick={() => setShowCreateGroup(false)} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!groupName.trim() || selectedMembers.length < 2}>
                            Create Group
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
