import { LayoutProps } from 'models/common';
import * as React from 'react';

export function EmptyLayout({ children }: LayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}  
