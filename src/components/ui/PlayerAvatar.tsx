import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
    avatar: string;
    name: string;
    color: string;
    size?: 'sm' | 'md' | 'lg';
    isOnline?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-14 h-14 text-2xl',
};

export default function PlayerAvatar({
    avatar,
    name,
    color,
    size = 'md',
    isOnline,
    className,
}: PlayerAvatarProps) {
    return (
        <div className={cn('relative inline-flex', className)}>
            <div
                className={cn(
                    'rounded-full flex items-center justify-center font-bold select-none',
                    sizeClasses[size]
                )}
                style={{ backgroundColor: `${color}15`, border: `2px solid ${color}30` }}
                title={name}
                role="img"
                aria-label={name}
            >
                <span>{avatar}</span>
            </div>
            {isOnline !== undefined && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 rounded-full border-2 border-white',
                        size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3',
                        isOnline ? 'bg-emerald-500' : 'bg-slate-300'
                    )}
                />
            )}
        </div>
    );
}
