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
      <NextSeo
        title={`${tag} | Menger Intézet`}
        openGraph={{
          url: `https://menger.hu/cimkek/${tag}`,
          title: `#${tag} | Menger Intézet`,
          type: "article",
          images: [
            {
              url: "/assets/images/fb-featured.png",
              width: 1200,
              height: 630,
              type: "image/png",
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

  const fetchedTags = await getAllTags().then((tags) => {
    return tags;
  });

  const filteredPosts = _.map(posts, (post) => {
    const tags = _.map(post.tags, (tag) => {
      const tagData = _.find(fetchedTags, (fetchedTag) => {
        return fetchedTag.id == tag;
      });
      if (!tagData) {
        return { id: 0, name: "", slug: "" };
      }
      return { id: tagData?.id, name: tagData?.name, slug: tagData?.slug };
    });
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      jetpack_featured_media_url: post.jetpack_featured_media_url,
      tags: tags,
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
