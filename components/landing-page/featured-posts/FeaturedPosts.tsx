/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./FeaturedPosts.module.scss";

const SAMPLE_POSTS = [
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/06/menger_kata_dem2.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (2. rész)",
    excerpt:
      "Az amerikai demokrácia felépítése A huszonegyedik századi amerikaiak demokráciának tekintik a kormányzatukat, és emiatt a demokrácia kritikája Amerika-ellenesnek tűnik számukra. Mégis, az USA alkotmányának vizsgálata azt mutatja, hogy az amerikai alapítók olyan kormányzatot terveztek, amely szándékosan el volt szigetelve a közvéleménytől. ",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kata_dem1.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (1. rész)",
    excerpt:
      "A fordító előszava: Randall G. Holcombe ezt a tanulmányt 2021 elején jelentette meg. Egy év múltán különös aktualitást nyert Magyarországon, ahol zsinórban negyedszer nyert alkotmányozó többséget a jelenlegi kormánypárt az országgyűlési választásokon, és ezt sokan „erős demokratikus felhatalmazásként” értékelik. ",
  },
  {
    author: "Tóth István",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kalkul_ci_s.png",
    title: "A kalkulációs vita. Darabok egy kirakóshoz",
    excerpt:
      "Kornai János emlékére Miként köztudott, Karl Marx és Friedrich Engels, a tudományos szocializmus német megalapítói nem dolgoztak ki a kommunizmus gazdasági berendezkedésére vonatkozóan működési elveket és módszereket; könyvespolcot betöltő prózai munkásságuk nélkülözi az általuk áhított szebb jövő valamennyire is konkrét leírását.",
  },
];

export default function FeaturedPosts() {
  const [pauseAutoHighlight, setPauseAutoHighlight] = useState<boolean>(false);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [currentPost, setCurrentPost] = useState<number>(0);

  useEffect(() => {
    displayNextPost();
  }, []);

  useEffect(() => {
    const timeout = displayNextPost();
    return () => clearTimeout(timeout);
  }, [currentPost, pauseAutoHighlight]);

  const displayNextPost = () => {
    if (pauseAutoHighlight) {
      return;
    }
    const timeout = setTimeout(() => {
      if (posts.length > currentPost + 1) {
        setCurrentPost(currentPost + 1);
        return;
      }
      setCurrentPost(0);
    }, 5000);

    return timeout;
  };

  return (
    <div className={styles.container}>
      <img src={posts[currentPost].image} alt={posts[currentPost].title} />
      <div className={styles.textContainer}>
        {posts.map((post, index) => {
          return (
            <div
              key={index}
              className={
                currentPost === index
                  ? styles.highlightedText
                  : styles.regularText
              }
              onMouseOver={() => {
                setPauseAutoHighlight(true);
                setCurrentPost(index);
              }}
              onMouseLeave={() => setPauseAutoHighlight(false)}
            >
              <h3 className={styles.author}>{post.author}</h3>
              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.excerpt}>{post.excerpt}...</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
