import { useState, useEffect } from "react";
import { Post } from "../types/PostResponse";
import sanitizeHtml from "sanitize-html";

const useParsePost = (postID: string | number) => {
  const [postData, setPostData] = useState<Post>();
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    console.log(postID);
    const postIDisString: boolean = postID?.toString().includes("-");
    if (!postIDisString) {
      fetchPostByID();
    }
    if (postIDisString) {
      fetchPostBySlug();
    }
  }, [postID]);

  async function fetchPostByID() {
    await fetch(`https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts/${postID}`)
      .then((res) => res.json())
      .then((data: Post) => {
        if (data.title) {
          setPostData(data);
          parsePost(data);
        }
      });
  }

  async function fetchPostBySlug() {
    await fetch(`https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts?slug=${postID}`)
      .then((res) => res.json())
      .then((data: Array<Post>) => {
        if (data[0].title) {
          setPostData(data[0]);
          parsePost(data[0]);
        }
      });
  }

  function parsePost(post: Post) {
    if (!post) return;
    const author = post?.title?.rendered.split(":", 1)[0];
    const title = post?.title?.rendered.split(":", 2)[1];
    const excerpt = post?.excerpt?.rendered.split('<a class="more-link"', 1)[0] + "...";
    const content = post?.content?.rendered;
    const image = post?.jetpack_featured_media_url;
    setAuthor(sanitizeHtml(author));
    setTitle(sanitizeHtml(title));
    setExcerpt(sanitizeHtml(excerpt));
    setContent(sanitizeHtml(content));
    setImage(image);
  }

  return { author, title, excerpt, content, image };
};

export default useParsePost;

export interface ParsedPosts {
  title: string;
  author: string;
  excerpt: string;
  image: string;
}
