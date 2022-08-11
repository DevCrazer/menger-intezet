import { NextSeo } from "next-seo";
import * as _ from "lodash";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import PWAHead from "../components/PWAHead";
import { getLandingPagePosts } from "../helpers/getPosts";
import { FilteredPost, Post } from "../types/PostResponse";
import { createContext } from "react";

export const PostsContext = createContext<any>(null);

const Home = ({ filteredPosts }: { filteredPosts: Array<FilteredPost> }) => {
  return (
    <div lang="hu">
      <PostsContext.Provider value={filteredPosts}>
        <PWAHead />
        <NextSeo title={"Menger Intézet"} />
        <Layout>
          <LandingPage />
        </Layout>
      </PostsContext.Provider>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await getLandingPagePosts().then((posts) => {
    return posts;
  });

  const filteredPosts: Array<FilteredPost> = _.map(posts, (post: Post) => {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      jetpack_featured_media_url: post.jetpack_featured_media_url,
    };
  });
  return { props: { filteredPosts } };
}
