import { useState, useEffect } from "react";
import { Post } from "../types/PostResponse";
import sanitizeHtml from "sanitize-html";

const useParsePost = (post: Post) => {
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const image = post?.jetpack_featured_media_url;

  useEffect(() => {
    parsePost();
  }, [post]);

  function parsePost() {
    if (!post) return;
    const author = post.title.rendered.split(":", 1)[0];
    const title = post.title.rendered.split(":", 2)[1];
    const excerpt = post.excerpt.rendered.split('<a class="more-link"', 1)[0] + "...";
    setAuthor(sanitizeHtml(author));
    setTitle(sanitizeHtml(title));
    setExcerpt(sanitizeHtml(excerpt));
  }

  return { author, title, excerpt, image };
};

export default useParsePost;

export interface ParsedPosts {
    title: string,
    author: string,
    excerpt: string,
    image: string,
}