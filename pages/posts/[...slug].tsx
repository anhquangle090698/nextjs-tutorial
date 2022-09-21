import { useRouter } from 'next/router';
import * as React from 'react';

export interface SlugPostPageProps {
}

export default function SlugPostPage(props: SlugPostPageProps) {
    const router = useRouter();
    return (
        <div>
            Slug Post Page
            <br />
            Route Params: {JSON.stringify(router.query)}
        </div>
    );
}
