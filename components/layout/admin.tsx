import { LayoutProps } from 'models/common';
import Link from 'next/link';
import * as React from 'react';


export function AdminLayout({ children }: LayoutProps) {
    return (
        <div>
            <h1>Main Layout</h1>
            <div>Sidebar</div>

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
