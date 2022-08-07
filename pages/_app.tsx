import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { Post } from "../types/PostResponse";
import * as _ from "lodash";

export const PostsContext = createContext<any>(null);
const POSTS_LINK = "https://public-api.wordpress.com/wp/v2/sites/mengerblog.com/posts?per_page=100";

function MengerApp({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchBlogposts(`${POSTS_LINK}&page=${page}`);
  }, []);

  function fetchBlogposts(url: string) {
    let currentPosts: Array<any> = posts;
    fetch(url)
      .then((res) => res.json())
      .then((data: Array<Post>) => {
        if (!data || !data.length) {
          return;
        }
        currentPosts.push(data);
        setPosts(_.flatten(currentPosts));
        if (data.length === 100) {
          fetchBlogposts(`${POSTS_LINK}&page=${page + 1}`);
          setPage(page + 1);
        }
      });
  }

  return (
    <PostsContext.Provider value={posts}>
      <Component {...pageProps} />
    </PostsContext.Provider>
  );
}

export default MengerApp;
