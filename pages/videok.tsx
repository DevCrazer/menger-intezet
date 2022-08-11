/* eslint-disable react/no-unknown-property */
import { NextSeo } from "next-seo";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Videos.module.scss";

export default function Videos() {
  return (
    <>
      <NextSeo
        title={"Videók | Menger Intézet"}
        openGraph={{
          url: `https://menger.hu/videok`,
          title: `Videók | Menger Intézet`,
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
        <div className={styles.videosContainer}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=UUR9ZpmR-YA-XRjhx2NRTJVw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Layout>
    </>
  );
}
