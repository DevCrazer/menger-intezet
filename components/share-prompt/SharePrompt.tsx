import {
  faFacebook,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import { faAt, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type } from "os";
import React, { useEffect, useState } from "react";
import styles from "./SharePrompt.module.scss";
import { SharePromptProps } from "./SharePrompt.types";

export default function SharePrompt({
  url,
  text,
  title,
  files,
}: SharePromptProps) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window.navigator.canShare === "function") {
      setCanShare(true);
    }
  }, []);

  async function useNavigatorShare() {
    const shareData = {
      title: title,
      url: url,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  return (
    <div className={styles.shareContainer}>
      {canShare ? (
        <div className={styles.mobileShare}>
          Oszd meg ezt a bejegyzést:
          <FontAwesomeIcon icon={faShareNodes} onClick={useNavigatorShare} />
        </div>
      ) : (
        <div className={styles.desktopShare}>
          Oszd meg ezt a bejegyzést:
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href={`mailto:?Subject=${title}&body=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faAt} />
          </a>
        </div>
      )}
    </div>
  );
}
