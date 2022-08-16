import { NextSeo } from "next-seo";
import * as _ from "lodash";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import PWAHead from "../components/PWAHead";
import { getFilteredPostData, getLandingPagePosts } from "../helpers/getPosts";
import { FilteredPost, Post } from "../types/PostResponse";
import { createContext } from "react";

export const PostsContext = createContext<any>(null);

const Home = ({ filteredPosts }: { filteredPosts: Array<FilteredPost> }) => {
  return (
    <div lang="hu">
      <PostsContext.Provider value={filteredPosts}>
        <PWAHead />
        <NextSeo
          title={"Menger Intézet"}
          openGraph={{
            url: `https://menger.hu/`,
            title: `Menger Intézet`,
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
          <LandingPage />
        </Layout>
      </PostsContext.Provider>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await getLandingPagePosts();
  const filteredPosts = await getFilteredPostData(posts);
  
  return { props: { filteredPosts } };
}
