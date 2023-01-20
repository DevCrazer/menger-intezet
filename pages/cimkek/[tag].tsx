import React, {useState} from 'react';
import {getAllTags, getFilteredPostData, getPostsByTag} from '../../helpers/getPosts';
import {FilteredPost, Post} from '../../types/PostResponse';
import * as _ from 'lodash';
import {TagProps} from '../../types/SingleTagPage';
import {NextSeo} from 'next-seo';
import Layout from '../../components/Layout';
import PostGrid from '../../components/posts/post-grid/PostGrid';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import {useRouter} from 'next/router';
import styles from '../../styles/Tag.module.scss';
import {GetServerSideProps} from 'next';

export default function Tag({posts}: TagProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {tag} = router.query;

  return (
    <>
      <NextSeo
        title={`${tag} | Menger Intézet`}
        openGraph={{
          url: `https://menger.hu/cimkek/${tag}`,
          title: `#${tag} | Menger Intézet`,
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
          <h2 className={styles.tagLabel}>#{tag}</h2>
          <PostGrid posts={posts} />
        </div>
        <LoadingBackdrop open={loading} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<TagProps> = async context => {
  const tag = context.params?.tag;
  const tagToDisplay = await getAllTags().then(tags => {
    return _.find(tags, singleTag => {
      return singleTag.name === tag;
    });
  });
  if (!tag || typeof tag !== 'string' || !tagToDisplay) {
    return {
      props: {
        tag: '',
        posts: [],
      },
    };
  }
  const posts: Array<Post> = await getPostsByTag(tagToDisplay.id);
  const filteredPosts = await getFilteredPostData(posts);
  const props: TagProps = {
    tag: tag,
    posts: filteredPosts,
  };
  return {props: props};
};
