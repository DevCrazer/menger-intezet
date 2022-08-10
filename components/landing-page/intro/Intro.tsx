/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      <Image
        src="/assets/images/menger.png"
        alt="Carl Menger"
        width={1000}
        height={500}
        objectFit={"contain"}
      />
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
