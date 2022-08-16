import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Donate.module.scss";
import * as _ from "lodash";
import { faPatreon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

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
        <div className={styles.donatePageContainer}>
          <div className={styles.donateHeader}>
            Támogasd a Menger Intézetet!
          </div>
          <div className={styles.donateOptions}>
            <a
              target="_blank"
              href="https://www.patreon.com/andrastoth"
              rel="noopener noreferrer"
            >
              <div>
                <FontAwesomeIcon icon={faPatreon} /> Patreonon keresztül
              </div>
            </a>
          </div>
        </div>
      </Layout>
    </>
  );
}
