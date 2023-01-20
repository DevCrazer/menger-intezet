/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Layout from '../../components/Layout';
import useParsePost from '../../hooks/useParsePost';
import styles from '../../styles/Post.module.scss';
import parse from 'html-react-parser';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import {FilteredPost, Post} from '../../types/PostResponse';
import {getFilteredPostData, getPostBySlug} from '../../helpers/getPosts';
import * as _ from 'lodash';
import {NextSeo} from 'next-seo';
import {MetaTags, SinglePostProps} from '../../types/SinglePost';
import Image from 'next/image';
import SharePrompt from '../../components/share-prompt/SharePrompt';
import {convert} from 'html-to-text';
import {GetServerSideProps} from 'next';

export default function SinglePost({post, metaTags}: SinglePostProps) {
  const {author, title, content, image, loading} = useParsePost(post);

  return (
    <>
      <NextSeo
        title={metaTags.title}
        openGraph={{
          url: metaTags.url,
          title: metaTags.title,
          description: metaTags.excerpt,
          type: 'article',
          images: [
            {
              url: metaTags.image,
              width: 1000,
              height: 1000,
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <Layout>
        <div className={styles.singlePostContainer}>
          <SharePrompt title={metaTags.title} url={metaTags.url} />
          <div className={styles.metaInfoContainer}>
            {title ? <div className={styles.author}>{author}</div> : null}
            <div className={styles.title}>{title ? title : author}</div>
          </div>
          {image ? (
            <div className={styles.imageContainer}>
              <Image src={image} alt={title} width={700} height={700} objectFit={'contain'} />
            </div>
          ) : null}
          <div className={`${styles.content} singlePostContent`} lang="hu">
            {parse(content)}
          </div>
        </div>
      </Layout>
      <LoadingBackdrop open={loading} />
    </>
  );
}

interface PostProps {
  post: FilteredPost;
  metaTags: MetaTags;
}

export const getServerSideProps: GetServerSideProps<PostProps> = async context => {
  const slug = context.params?.postSlug;
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }
  const post: Post = await getPostBySlug(slug);
  const filteredPost = await getFilteredPostData([post]);
  const title = convert(post.title.rendered);
  const excerpt = convert(post.excerpt.rendered);

  const metaTags: MetaTags = {
    title: title,
    image: post.jetpack_featured_media_url,
    url: `https://menger.hu/posts/${post.slug}`,
    excerpt: excerpt,
    site_name: 'Menger Intézet',
  };

  return {props: {post: filteredPost[0], metaTags}};
};
