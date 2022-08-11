import { NextSeo } from "next-seo";
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Contact.module.scss";

export default function Contact() {
  return (
    <>
      <NextSeo
        title={"Kapcsolat | Menger Intézet"}
        openGraph={{
          url: "https://menger.hu/kapcsolat",
          title: "Kapcsolat | Menger Intézet",
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
        <div className={styles.contactContainer}>
          <p>
            Ha bármilyen kérdése, vagy a blogra szánt írása van, írjon nekünk a
            <a href="mailto:carlmengerintezet@gmail.com">
              carlmengerintezet@gmail.com
            </a>
            címen.
          </p>

          <p>
            Kövessen minket a Facebookon is:
            <a href="https://www.facebook.com/mengerhun/">
              https://www.facebook.com/mengerhun/
            </a>
          </p>
        </div>
      </Layout>
    </>
  );
}
