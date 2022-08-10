/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../../components/Layout";
import useParsePost from "../../hooks/useParsePost";
import styles from "../../styles/Post.module.scss";
import parse from "html-react-parser";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { FilteredPost, Post } from "../../types/PostResponse";
import { getAllPosts, getPostBySlug } from "../../helpers/getPosts";
import * as _ from "lodash";
import { NextSeo } from "next-seo";
import { MetaTags, SinglePostParams, SinglePostProps } from "../../types/SinglePost";

export default function SinglePost({ post, metaTags }: SinglePostProps) {
  const { author, title, content, image, loading } = useParsePost(post);
  const pageTitle = `${title} | ${author}`;

  return (
    <>
      <NextSeo
        title={pageTitle}
        openGraph={{
          url: metaTags.url,
          title: metaTags.title,
          description: metaTags.excerpt,
          type: "article",
          images: [
            {
              url: metaTags.image,
              width: 1000,
              height: 1000,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Layout>
        <div className={styles.singlePostContainer}>
          <div className={styles.metaInfoContainer}>
            <div className={styles.author}>{author}</div>
            <div className={styles.title}>{title}</div>
          </div>
          <img className={styles.featuredImage} src={image} alt={title} />
          <div className={`${styles.content} singlePostContent`} lang="hu">
            {parse(content)}
          </div>
        </div>
      </Layout>
      <LoadingBackdrop open={loading} />
    </>
  );
}

export async function getStaticProps({ params }: SinglePostParams) {
  const post: Post = await getPostBySlug(params.postSlug).then((post) => {
    return post;
  });
  const metaTags: MetaTags = {
    title: `${post.title.rendered}`,
    image: post.jetpack_featured_media_url,
    url: `https://menger.vercel.app/posts/${post.slug}`,
    excerpt: post.excerpt.rendered,
    site_name: "Menger Intézet",
  };
  const filteredPost: FilteredPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    jetpack_featured_media_url: post.jetpack_featured_media_url,
  };
  return { props: { filteredPost, metaTags } };
}

export async function getStaticPaths() {
  const posts: Array<Post> = await getAllPosts().then((posts) => {
    return posts;
  });
  const postSlugs = _.map(posts, "slug");
  const paths: Array<SinglePostParams> = _.map(postSlugs, (slug) => {
    return { params: { postSlug: slug } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
