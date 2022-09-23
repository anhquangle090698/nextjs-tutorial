import { LayoutProps } from 'models/common';
import Link from 'next/link';
import * as React from 'react';

export function MainLayout({ children }: LayoutProps) {

    React.useEffect(() => {
        console.log('Main layout mounting');
        
        return () => console.log('Main layout unmounting');
        
    }, [])

    return (
        <div>
            <h1>Main Layout</h1>

            <Link href={"/"}>
                <a>Home</a>
            </Link>

            <Link href={"/about"}>
                <a>About</a>
            </Link>

            <div>{children}</div>
        </div>
    );
}
