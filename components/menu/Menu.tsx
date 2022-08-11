/* eslint-disable @next/next/no-img-element */
import {
  faFacebookSquare,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import LoadingBackdrop from "../LoadingBackdrop";
import Logo from "../logo/Logo";
import TagCloudComponent from "../tag-cloud/TagCloudComponent";
import styles from "./Menu.module.scss";
import { MenuProps } from "./Menu.types";

const LIST_ITEMS = [
  { name: "Főoldal", route: "" },
  { name: "Bejegyzések", route: "bejegyzesek" },
  { name: "Cikksorozatok", route: "cikksorozatok" },
  { name: "Videók", route: "videok" },
  { name: "Szerzőink", route: "szerzoink" },
  { name: "Kapcsolat", route: "kapcsolat" },
];

const SOCIAL_MEDIA_LINKS = [
  {
    name: "facebook",
    icon: faFacebookSquare,
    link: "https://www.facebook.com/mengerhun/",
  },
  {
    name: "youtube",
    icon: faYoutube,
    link: "https://www.youtube.com/channel/UCR9ZpmR-YA-XRjhx2NRTJVw",
  },
  {
    name: "email",
    icon: faEnvelope,
    link: "mailto:carlmengerintezet@gmail.com",
  },
];

export default function Menu({ showLogo }: MenuProps) {
  const [currentItem, setCurrentItem] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useRouter();

  function onClick(route: string) {
    setCurrentItem(route);
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
            const highlightMenuItem: boolean =
              (item.route.length && currentItem?.includes(item.route)) ||
              (currentItem === "/" && item.name === "Főoldal");
            return (
              <Link href={`/${item.route}`} key={item.route}>
                <li
                  className={`${styles.navigationElement} ${
                    highlightMenuItem
                      ? styles.activeElement
                      : styles.inactiveElement
                  }`}
                  onClick={() => onClick(item.route)}
                >
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className={styles.socials}>
          {SOCIAL_MEDIA_LINKS.map((data) => {
            return (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                key={data.name}
              >
                <FontAwesomeIcon icon={data.icon} />
              </a>
            );
          })}
        </div>
        <div className={styles.tagsContainer}>
          <TagCloudComponent />
        </div>
      </div>
      <LoadingBackdrop open={loading} />
    </>
  );
}
