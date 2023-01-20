/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import {Pagination} from '@mui/material';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Posts.module.scss';
import {Post} from '../../types/PostResponse';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import {NextSeo} from 'next-seo';
import {getFilteredPostData, getNumberOfPages, getPostsByPage} from '../../helpers/getPosts';
import * as _ from 'lodash';
import {PostsProps} from '../../types/PostList';
import PostGrid from '../../components/posts/post-grid/PostGrid';
import {GetServerSideProps} from 'next';
import {QueryTypes} from '../../types/getPosts.types';

const POSTS_PER_PAGE = 9;

export default function Posts({posts, pageCount, page}: PostsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function changePage(newPage: number) {
    setLoading(true);
    router.push(`/bejegyzesek/${newPage}`).then(() => {
      window.scrollTo(0, 0);
      setLoading(false);
    });
  }

  return (
    <>
      <NextSeo
        title={'Bejegyzések | Menger Intézet'}
        openGraph={{
          url: `https://menger.hu/bejegyzesek/${page}`,
          title: 'Bejegyzések | Menger Intézet',
          type: 'article',
          images: [
            {
              url: '/assets/images/fb-featured.png',
              width: 1200,
              height: 630,
              type: 'image/png',
            },
          ],
        }}
      />
      <Layout>
        <div className={styles.postsContainer}>
          <PostGrid posts={posts} />
          <div className={styles.paginationContainer}>
            <Pagination
              defaultPage={page}
              defaultValue={page}
              onChange={(event, page) => changePage(page)}
              count={pageCount}
              shape="rounded"
            />
          </div>
        </div>
        <LoadingBackdrop open={loading} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async context => {
  let page = context.params?.page;
  if (!page || Array.isArray(page) || isNaN(parseInt(page))) {
    page = '1';
  }
  const posts: Array<Post> = await getPostsByPage(parseInt(page), POSTS_PER_PAGE);
  const filteredPosts = await getFilteredPostData(posts);
  const numberOfPages = await getNumberOfPages(QueryTypes.Posts, POSTS_PER_PAGE);
  const props: PostsProps = {
    posts: filteredPosts,
    pageCount: numberOfPages,
    page: parseInt(page),
  };
  return {props};
};
