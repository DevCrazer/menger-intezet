import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import PWAHead from "../components/PWAHead";

const Home: NextPage = () => {
  return (
    <div lang="hu">
      <Head>  
        <PWAHead />      
      </Head>
      <NextSeo title={'Menger Intézet'} />
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  );
};

export default Home;
