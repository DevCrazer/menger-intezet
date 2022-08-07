import { style } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import LandingPage from "../components/landing-page/LandingPage";
import Layout from "../components/Layout";
import MenuDrawer from "../components/menu-drawer/MenuDrawer";
import Menu from "../components/menu/Menu";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {


  return (
    <div className={styles.container} lang="hu">
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
