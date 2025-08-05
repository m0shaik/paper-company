import React from 'react';

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
    children,
    className = ""
}) => {
    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
            {children}
        </div>
    );
};
