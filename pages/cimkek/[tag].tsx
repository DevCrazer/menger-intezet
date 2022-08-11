import React, { useState } from "react";
import { getAllTags, getPostsByTag } from "../../helpers/getPosts";
import { FilteredPost, Post } from "../../types/PostResponse";
import * as _ from "lodash";
import { TagProps } from "../../types/SingleTagPage";
import { NextSeo } from "next-seo";
import Layout from "../../components/Layout";
import PostGrid from "../../components/posts/post-grid/PostGrid";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import { useRouter } from "next/router";
import styles from "../../styles/Tag.module.scss";

export default function Tag({ posts }: TagProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <NextSeo title={`${tag} | Menger Intézet`} />
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

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const tagToDisplay = await getAllTags().then((tags) => {
    return _.find(tags, (singleTag) => {
      return singleTag.name === params.tag;
    });
  });

  if (!tagToDisplay) {
    return;
  }

  const posts: Array<Post> = await getPostsByTag(tagToDisplay.id).then((posts) => {
    return posts;
  });

  const filteredPosts: Array<FilteredPost> = _.map(posts, (post) => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      jetpack_featured_media_url: post.jetpack_featured_media_url,
    };
  });

  const props: TagProps = {
    tag: params.tag,
    posts: filteredPosts,
  };

  return { props: props };
}

export async function getStaticPaths() {
  const tags = await getAllTags().then((posts) => {
    return posts;
  });
  const paths = _.map(tags, (tag) => {
    return { params: { tag: tag.name } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
