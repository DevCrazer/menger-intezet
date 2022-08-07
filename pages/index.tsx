import type { NextPage } from "next";
import Head from "next/head";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {


  return (
    <div lang="hu">
      <Head>
        <title>Menger Intézet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LandingPage />
      </Layout>
    </div>
  );
};

export default Home;
