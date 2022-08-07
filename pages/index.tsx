import { style } from "@mui/system";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LandingPage from "../components/landing-page/LandingPage";
import MenuDrawer from "../components/menu-drawer/MenuDrawer";
import Menu from "../components/menu/Menu";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [mobileUser, setMobileUser] = useState(false);

  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setMobileUser(true);
    }
  }, []);

  return (
    <div className={styles.container} lang="hu">
      <Head>
        <title>Menger Intézet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={mobileUser ? styles.bodyContainerMobile : styles.bodyContainerDesktop}>
        {mobileUser ? <MenuDrawer /> : <Menu/>}
        <LandingPage />
      </div>
    </div>
  );
};

export default Home;
