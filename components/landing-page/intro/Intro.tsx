/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./Intro.module.scss";

export default function Intro() {
  return (
    <div className={styles.introContainer}>
      <img src="/assets/images/menger.png" alt="Carl Menger" />
      <div className={styles.textContainer}>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          natus aspernatur quam voluptatibus, mollitia ad sequi culpa! Sed,
          voluptate esse.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus ut tenetur sint maiores voluptatem. Iure dolore
          molestias reiciendis? Enim sapiente soluta, adipisci, obcaecati, ipsum
          fuga praesentium quis officiis sequi eos minus alias repellendus
          accusamus eligendi? Perferendis quidem dicta maxime iure, nobis
          voluptatum ad ullam aliquid voluptas quas odit, reiciendis assumenda
          recusandae. Ullam corrupti reiciendis quos rem dolores quis eveniet
          enim veritatis nesciunt vero itaque ea repellendus, doloremque
          consequatur, harum, expedita dignissimos qui officiis minus iste
          autem?
        </p>
      </div>
    </div>
  );
}
