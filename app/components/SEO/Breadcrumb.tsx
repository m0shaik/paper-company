import Link from 'next/link';
import { ChevronRightIcon } from '@radix-ui/react-icons';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-gray-900 transition-colors duration-200"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-900 font-medium" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
