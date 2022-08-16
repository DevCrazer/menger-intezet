import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import { faAt, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import styles from "./SharePrompt.module.scss";
import { SharePromptProps } from "./SharePrompt.types";

export default function SharePrompt({
  url,
  text,
  title,
  files,
}: SharePromptProps) {
  const [navigator, setNavigator] = useState<Window["navigator"]>();

  useEffect(() => {
    const nav = window.navigator;
    setNavigator(nav);
  }, [])

  const isMobile = navigator?.canShare();

  async function useNavigatorShare() {
    const shareData = {
      title: title,
      url: url,
    };

    try {
      await navigator?.share(shareData);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  return (
    <div className={styles.shareContainer}>
      {isMobile ? (
        <div className={styles.mobileShare}>
          Oszd meg ezt a bejegyzést:
          <FontAwesomeIcon icon={faShareNodes} onClick={useNavigatorShare} />
        </div>
      ) : (
        <div className={styles.desktopShare}>
          Oszd meg ezt a bejegyzést:
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href={`mailto:?Subject=${title}&body=${url}`} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faAt} />
          </a>
        </div>
      )}
    </div>
  );
}
