import { useState, useEffect } from "react";
import { FilteredPost, Post } from "../types/PostResponse";
import sanitizeHtml from "sanitize-html";

const useParsePost = (fetchedData?: Post | FilteredPost) => {
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fetchedData) {
      parsePost(fetchedData);
      return;
    }
  }, [fetchedData]);

  function parsePost(post: Post | FilteredPost) {
    if (!post) return;
    const author = parseAuthor(post?.title?.rendered);
    const title = parseTitle(post?.title?.rendered);
    const excerpt = parseExcerpt(post?.excerpt?.rendered);
    const content = parseContent(post?.content?.rendered);
    const image = post?.jetpack_featured_media_url;
    setAuthor(author);
    setTitle(title);
    setExcerpt(excerpt);
    setContent(content);
    setImage(image);
  }

  function parseAuthor(author: string): string {
    return sanitizeHtml(author.split(":", 1)[0]);
  }

  function parseTitle(title: string): string {
    return sanitizeHtml(title.split(":", 2)[1]);
  }

  function parseExcerpt(excerpt: string): string {
    return sanitizeHtml(excerpt.split('<a class="more-link"', 1)[0] + "...");
  }

  function parseContent(content: string): string {
    const sanitizeOptions = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        p: ["class", "id"],
        a: ["href", "id"],
      },
    };

    let html = sanitizeHtml(content, sanitizeOptions).replaceAll(
      'href="#_ftn',
      'class="footnote-number" href="#_ftn'
    );

    return html;
  }

  return { loading, author, title, excerpt, content, image };
};

export default useParsePost;

export interface ParsedPosts {
  title: string;
  author: string;
  excerpt: string;
  image: string;
}
