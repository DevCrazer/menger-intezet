import React, { useContext } from "react";
import { PostsContext } from "../../../pages/_app";
import PostListElement from "../post-list-element/PostListElement";
import { Post } from "../../../types/PostResponse";
import { PostListProps } from "./PostList.types";

const SAMPLE_POSTS = [
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/06/menger_kata_dem2.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (2. rész)",
    excerpt:
      " Az amerikai demokrácia felépítése A huszonegyedik századi amerikaiak demokráciának tekintik a kormányzatukat, és emiatt a demokrácia kritikája Amerika-ellenesnek tűnik számukra. Mégis, az USA alkotmányának vizsgálata azt mutatja, hogy az amerikai alapítók olyan kormányzatot terveztek, amely szándékosan el volt szigetelve a közvéleménytől. A Függetlenségi Nyilatkozat a szabadságot elidegeníthetetlen jognak nyilvánítja, ami",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kata_dem1.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (1. rész)",
    excerpt:
      "A fordító előszava: Randall G. Holcombe ezt a tanulmányt 2021 elején jelentette meg. Egy év múltán különös aktualitást nyert Magyarországon, ahol zsinórban negyedszer nyert alkotmányozó többséget a jelenlegi kormánypárt az országgyűlési választásokon, és ezt sokan „erős demokratikus felhatalmazásként” értékelik. A hidegháború korszakában – az 1950-es évektől az 1980-as évekig – globális ideológiai szakadék volt a",
  },
  {
    author: "Tóth István",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kalkul_ci_s.png",
    title: "A kalkulációs vita. Darabok egy kirakóshoz",
    excerpt:
      "Kornai János emlékére Miként köztudott, Karl Marx és Friedrich Engels, a tudományos szocializmus német megalapítói nem dolgoztak ki a kommunizmus gazdasági berendezkedésére vonatkozóan működési elveket és módszereket; könyvespolcot betöltő prózai munkásságuk nélkülözi az általuk áhított szebb jövő valamennyire is konkrét leírását. Marx egyáltalán nem kívánt „recepteket írni a jövendő lacikonyhája számára”, miként azt A tőke",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/06/menger_kata_dem2.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (2. rész)",
    excerpt:
      " Az amerikai demokrácia felépítése A huszonegyedik századi amerikaiak demokráciának tekintik a kormányzatukat, és emiatt a demokrácia kritikája Amerika-ellenesnek tűnik számukra. Mégis, az USA alkotmányának vizsgálata azt mutatja, hogy az amerikai alapítók olyan kormányzatot terveztek, amely szándékosan el volt szigetelve a közvéleménytől. A Függetlenségi Nyilatkozat a szabadságot elidegeníthetetlen jognak nyilvánítja, ami",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kata_dem1.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (1. rész)",
    excerpt:
      "A fordító előszava: Randall G. Holcombe ezt a tanulmányt 2021 elején jelentette meg. Egy év múltán különös aktualitást nyert Magyarországon, ahol zsinórban negyedszer nyert alkotmányozó többséget a jelenlegi kormánypárt az országgyűlési választásokon, és ezt sokan „erős demokratikus felhatalmazásként” értékelik. A hidegháború korszakában – az 1950-es évektől az 1980-as évekig – globális ideológiai szakadék volt a",
  },
  {
    author: "Tóth István",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kalkul_ci_s.png",
    title: "A kalkulációs vita. Darabok egy kirakóshoz",
    excerpt:
      "Kornai János emlékére Miként köztudott, Karl Marx és Friedrich Engels, a tudományos szocializmus német megalapítói nem dolgoztak ki a kommunizmus gazdasági berendezkedésére vonatkozóan működési elveket és módszereket; könyvespolcot betöltő prózai munkásságuk nélkülözi az általuk áhított szebb jövő valamennyire is konkrét leírását. Marx egyáltalán nem kívánt „recepteket írni a jövendő lacikonyhája számára”, miként azt A tőke",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/06/menger_kata_dem2.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (2. rész)",
    excerpt:
      " Az amerikai demokrácia felépítése A huszonegyedik századi amerikaiak demokráciának tekintik a kormányzatukat, és emiatt a demokrácia kritikája Amerika-ellenesnek tűnik számukra. Mégis, az USA alkotmányának vizsgálata azt mutatja, hogy az amerikai alapítók olyan kormányzatot terveztek, amely szándékosan el volt szigetelve a közvéleménytől. A Függetlenségi Nyilatkozat a szabadságot elidegeníthetetlen jognak nyilvánítja, ami",
  },
  {
    author: "Randall G. Holcombe",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kata_dem1.png",
    title: "A demokrácia és a szabadság bonyolult viszonya (1. rész)",
    excerpt:
      "A fordító előszava: Randall G. Holcombe ezt a tanulmányt 2021 elején jelentette meg. Egy év múltán különös aktualitást nyert Magyarországon, ahol zsinórban negyedszer nyert alkotmányozó többséget a jelenlegi kormánypárt az országgyűlési választásokon, és ezt sokan „erős demokratikus felhatalmazásként” értékelik. A hidegháború korszakában – az 1950-es évektől az 1980-as évekig – globális ideológiai szakadék volt a",
  },
  {
    author: "Tóth István",
    image:
      "https://mengerblogcom.files.wordpress.com/2022/05/menger_kalkul_ci_s.png",
    title: "A kalkulációs vita. Darabok egy kirakóshoz",
    excerpt:
      "Kornai János emlékére Miként köztudott, Karl Marx és Friedrich Engels, a tudományos szocializmus német megalapítói nem dolgoztak ki a kommunizmus gazdasági berendezkedésére vonatkozóan működési elveket és módszereket; könyvespolcot betöltő prózai munkásságuk nélkülözi az általuk áhított szebb jövő valamennyire is konkrét leírását. Marx egyáltalán nem kívánt „recepteket írni a jövendő lacikonyhája számára”, miként azt A tőke",
  },
];

export default function PostList({ displayImages }: PostListProps) {
  const posts = useContext(PostsContext);

  return (
    <>
      {posts.map((post: Post, index: number) => {
        return (
          <PostListElement
            post={post}
            displayImages={displayImages}
            key={index}
          />
        );
      })}
    </>
  );
}
