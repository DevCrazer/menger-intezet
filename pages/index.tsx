import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import PWAHead from "../components/PWAHead";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div lang="hu">
      <Head>
        <PWAHead title={'Menger Intézet'} image={''} url={'https://mengerblog.com'} />
      </Head>
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  );
};

export default Home;
