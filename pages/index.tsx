import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer/Footer";
import LandingPage from "../components/landing-page/LandingPage";
import Menu from "../components/menu/Menu";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Menger Intézet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bodyContainer}>
        <Menu />
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
