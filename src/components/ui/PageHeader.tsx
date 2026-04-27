import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <div className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8', className)}>
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">{title}</h1>
                {description && (
                    <p className="mt-1 text-base text-slate-500">{description}</p>
                )}
            </div>
            {children && <div className="flex items-center gap-3 flex-wrap">{children}</div>}
        </div>
    );
}
