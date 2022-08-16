import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Donate.module.scss";
import * as _ from "lodash";

export default function Donate() {


  return (
    <>
      <NextSeo
        title={"Támogatás | Menger Intézet"}
        openGraph={{
          url: `https://menger.hu/tamogatas/`,
          title: `Támogatás | Menger Intézet`,
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
        <div className={styles.donatePageContainer}>Támogatás</div>
      </Layout>
    </>
  );
}
