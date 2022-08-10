import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link href={"/"}>
        <a>
          <Image
            src={"/assets/images/logo.png"}
            width={300}
            height={100}
            objectFit={"contain"}
            alt={"Carl Menger Intézet"}
          />
        </a>
      </Link>
    </div>
  );
}
