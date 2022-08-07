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
import { MenuProps } from "./Menu.types";

const LIST_ITEMS = [
  { name: "Főoldal", route: "/" },
  { name: "Bejegyzések", route: "/bejegyzesek" },
  { name: "Cikksorozatok", route: "/cikksorozatok" },
  { name: "Videók", route: "/videok" },
  { name: "Szerzőink", route: "/szerzoink" },
  { name: "Kapcsolat", route: "/kapcsolat" },
];

const SOCIAL_MEDIA_LINKS = [
  { name: "facebook", icon: faFacebookSquare, link: "" },
  { name: "youtube", icon: faYoutube, link: "" },
  { name: "email", icon: faEnvelope, link: "" },
];

export default function Menu({ showLogo }: MenuProps) {
  return (
    <>
      <div className={styles.menuContainer}>
        {showLogo ? (
          <div className={styles.logoContainer}>
            <Logo />
          </div>
        ) : null}
        <ul className={styles.navigation}>
          {LIST_ITEMS.map((item) => {
            return (
              <a href={item.route} key={item.route}>
                <li className={styles.navigationElement}>{item.name}</li>
              </a>
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
