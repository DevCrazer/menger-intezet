/* eslint-disable @next/next/no-img-element */
import {
  faFacebookSquare,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import styles from "./Menu.module.scss";

const LIST_ITEMS = [
  { name: "Főoldal", route: "fooldal" },
  { name: "Bejegyzések", route: "bejegyzesek" },
  { name: "Cikksorozatok", route: "kollekciok" },
  { name: "Videók", route: "videok" },
  { name: "Szerzőink", route: "szerzoink" },
  { name: "Kapcsolat", route: "kapcsolat" },
];

const SOCIAL_MEDIA_LINKS = [
  { name: "facebook", icon: faFacebookSquare, link: "" },
  { name: "youtube", icon: faYoutube, link: "" },
  { name: "email", icon: faEnvelope, link: "" },
];

export default function Menu() {
  return (
    <>
      <div className={styles.menuContainer}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <ul className={styles.navigation}>
          {LIST_ITEMS.map((item) => {
            return (
              <li key={item.route} className={styles.navigationElement}>
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className={styles.socials}>
          {SOCIAL_MEDIA_LINKS.map((data) => {
            return <FontAwesomeIcon key={data.name} icon={data.icon} />;
          })}
        </div>
      </div>
    </>
  );
}
