import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Post, PostPageProps } from '.';

export interface PostDetailPageProps {
    post: {
        id: string,
        title: string,
        author: string,
        description: string
    }
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
    
    const router = useRouter()

    if(router.isFallback) return <p>Loading....</p>
    return (
        <div>
            <h2>Post Detail Page</h2>

            <p>{post.id}</p>
            <h2>{post.title}</h2>
            <h3>{post.author}</h3>
            <p>{post.description}</p>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data = await response.json();

    const paths = data.data.map((d : Post) => ({params: { postId: d.id}}));

    return {
        paths: paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
    
    const postId = context.params?.postId;
    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data = await response.json();

    const {id, title, author, description} = data;
    const post = {id, title, author, description}; 

    return {
        props: {
            post: post
        },
        revalidate: 5,
    }
}