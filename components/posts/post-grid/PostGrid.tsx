import React from "react";
import { PostGridProps } from "./PostGrid.types";
import Link from "next/link";
import Image from "next/image";
import sanitize from "sanitize-html";
import parse from "html-react-parser";
import styles from "./PostGrid.module.scss";

export default function PostGrid({ posts }: PostGridProps) {
  return (
    <div className={styles.postCardsContainer}>
      {posts?.map((post, index) => {
        return (
          <div className={styles.postCard} key={index}>
            <Link href={`/posts/${post.slug}`} passHref>
              <a>
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                  width={500}
                  height={500}
                  objectFit={"contain"}
                />
              </a>
            </Link>
            <div className={styles.postAuthor}>{parse(sanitize(post.title.rendered.split(":", 1)[0]))}</div>
            <Link href={`/posts/${post.slug}`} passHref>
              <a>
                <div className={styles.postName}>{parse(sanitize(post.title.rendered.split(":", 2)[1]))}</div>
              </a>
            </Link>
            <div className={styles.tagList}>
              {post.tags.map((tag) => {
                return (
                  <Link href={`/cimkek/${tag.name}`} key={tag.id} passHref>
                    <a>
                      <span className={styles.tagListElement}>#{tag.name}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className={styles.excerptContainer}>
              <div className={styles.postExcerpt} lang="hu">
                {parse(sanitize(post.excerpt.rendered.split('<a class="more-link"', 1)[0] + "..."))}
              </div>
              <Link href={`/posts/${post.slug}`} passHref>
                <a>
                  <div className={styles.readMoreButton}>Tovább »</div>
                </a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
