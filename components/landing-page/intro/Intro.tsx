/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      <img src="/assets/images/menger.png" alt="Carl Menger" />
      <div className={styles.textContainer}>
        <h2>Carl Menger Intézet</h2>
        <p>
          A Carl Menger Intézet legfőbb célja, hogy névadója szellemében
          elősegítse a polgári értékek terjedését Magyarországon: a személyes
          szabadságét, a politikától nem függő szabad vállalkozásét, a
          tulajdonjog védelméét. Fontosnak tartjuk az állami jelenlét
          csökkentését a szabadon szerveződő társadalom életében és a
          gazdaságban.
        </p>
      </div>
    </div>
  );
}
