import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    iconBg?: string;
    trend?: string;
    trendUp?: boolean;
    className?: string;
}

export default function StatCard({
    label,
    value,
    icon: Icon,
    iconColor = 'text-primary-600',
    iconBg = 'bg-primary-50',
    trend,
    trendUp,
    className,
}: StatCardProps) {
    return (
        <div className={cn('card', className)}>
            <div className="card-body flex items-start gap-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
                    <Icon className={cn('w-6 h-6', iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-500 mb-0.5">{label}</p>
                    <p className="text-2xl font-extrabold text-slate-800">{value}</p>
                    {trend && (
                        <p className={cn(
                            'text-xs font-semibold mt-1',
                            trendUp ? 'text-emerald-600' : 'text-slate-400'
                        )}>
                            {trend}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
