/* eslint-disable @next/next/no-img-element */
import { faFacebookSquare, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
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
  { name: "facebook", icon: faFacebookSquare, link: "https://www.facebook.com/mengerhun/" },
  { name: "youtube", icon: faYoutube, link: "https://www.youtube.com/channel/UCR9ZpmR-YA-XRjhx2NRTJVw" },
  { name: "email", icon: faEnvelope, link: "mailto:carlmengerintezet@gmail.com" },
];

export default function Menu({ showLogo }: MenuProps) {
  const [currentItem, setCurrentItem] = useState<string>();
  const router = useRouter();
  const { pathname } = useRouter();

  function onClick(route: string) {
    setCurrentItem(route);
    router.push(route);
  }

  useEffect(() => {
    setCurrentItem(pathname);
  }, []);

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
              <li
                className={`${styles.navigationElement} ${
                  item.route === currentItem ? styles.activeElement : styles.inactiveElement
                }`}
                key={item.route}
                onClick={() => onClick(item.route)}>
                {item.name}
              </li>
            );
          })}
        </ul>
        <div className={styles.socials}>
          {SOCIAL_MEDIA_LINKS.map((data) => {
            return (
              <a href={data.link} target="_blank" rel="noopener noreferrer" key={data.name}>
                <FontAwesomeIcon icon={data.icon} />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
