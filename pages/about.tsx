import { MainLayout } from 'components/layout';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';

const Header = dynamic(() => import('../components/common/Header'), { ssr: false });
export interface AboutPageProps {
}

interface Post {
    id: string,
    title: string,
    author: string,
    description: string,
    createdAt: number,
    updatedAt: number,
    imageUrl: string
}

export default function AboutPage(props: AboutPageProps) {

    const router = useRouter();
    const [postList, setPostList] = React.useState([]);

    console.log('About query', router.query);
    const page = router.query?.page;

    React.useEffect(() => {

        if (!page) return;

        const getPostList = async () => {
            const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
            const data = await response.json();

            setPostList(data.data);
        }

        getPostList();
    }, [page]);

    const handleNextClick = () => {
        router.push({
            pathname: '/about',
            query: {
                page: (Number(page) || 0) + 1
            }
        }, undefined, { shallow: true })
    }

    return (
        <div>
            <br/>
            About Page

            <Header></Header>

            <ul>
                {
                    postList.map((post: Post) => <li key={post.id}>{post.title}</li>)
                }
            </ul>

            <br />
            <button onClick={handleNextClick}>Next page</button>
        </div>
    );
}

AboutPage.Layout = MainLayout

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    return {
        props: {}
    }
}