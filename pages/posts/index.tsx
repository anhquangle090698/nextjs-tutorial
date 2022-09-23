import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface Post {
    id: string,
    title: string,
    author: string
}
export interface PostPageProps {
    posts : Post[],
}

export default function PostsPage({ posts }: PostPageProps) {
    
    if(!posts) return <p>Not found post!!</p>

    return (
        <div>
            <h2>Posts Page</h2>

            <ul>
                {
                    posts.map((post: Post) => <li key={post.id}><Link href={`/posts/${post.id}`}><a>{post.title}</a></Link></li>)
                }
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (context: GetStaticPropsContext) => {
    
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();

    const posts = data.data?.map((d: Post) => ({id: d.id, title: d.title, author: d.author}));

    return {
        props: {
            posts: posts
        }
    }
}