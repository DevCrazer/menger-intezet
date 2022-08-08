/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/Authors.module.scss";
import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

const AUTHORS_DATA = [
  {
    name: "Némethné Dr. Pál Katalin",
    image: "/assets/images/authors/1.jpg",
    description:
      '<p>1956-ban született Budapesten. 1979-ben végezte el a Marx Károly Közgazdaságtudományi Egyetemet ipar szakon. Állami nagyvállaltoknál, illetve a rendszerváltás idején állami iparfinanszírozással foglalkozó banknál dolgozott. 1995-től a GKI Gazdaságkutató Zrt. kutatásvezetője. Kutatási területei: ipar, mezőgazdaság, vállalati magatartás, innováció. A Magyar Közgazdasági Társaság tagja, sok éven át az Ipari és Vállalkozási Szakosztály titkára, itt végzett munkáját 2008-ban Közgazdász-díjjal ismerték el. A HVG Kapitalizmus blogján <a href="https://kapitalizmus.hvg.hu/author/ansinn/">Ansinn néven publikált</a>, megkülönböztetve cikkeit a GKI színeiben megjelent tudományos írásaitól.</p> ',
  },
  {
    name: "Németh Imre",
    image: "/assets/images/authors/2.jpg",
    description:
      "<p>1955-ben született Budapesten. A Hunfalvy János Közgazdasági Szakközépiskola elvégzése után 1973-ban a TESCO Nemzetközi Műszaki-Tudományos Együttműködési Iroda alkalmazásába került. 1997-től,&nbsp; egyészen a 2019-es nyugdíjazásáig a közigazgatásban, a&nbsp; NAV Kelet-budapesti Adóigazgatóságán dolgozott különböző beosztásokban. A HVG Kapitalizmus blogján <a href='https://kapitalizmus.hvg.hu/author/grunfeld-bela/'>Nekule néven publikálta írásait</a>.</p>",
  },
  {
    name: "Tóth András",
    image: "/assets/images/authors/3.jpg",
    description:
      "<p>Szociológus (PhD), a Carl Menger Intézet alapító igazgatója. 2008 óta foglalkoztatja az osztrák közgazdasági iskolával, azóta számos írásban <a href='https://kapitalizmus.hvg.hu/author/tothandras/'>a HVG Kapitalizmus blogján</a> és a Menger Intézet blogján írt a piacgazdaság fontosságáról és ismertette az osztrák iskola nézeteit. Az osztrák iskola nézeteit ismertető előadásai megtalálhatók <a href='https://www.youtube.com/channel/UCR9ZpmR-YA-XRjhx2NRTJVw'>a YouTube-on</a>.</p>",
  },
  {
    name: "Madlovics Bálint",
    image: "/assets/images/authors/4.jpg",
    description:
      "<p>1993-ban született Budapesten. 2013-2016 között a Budapesti Corvinus Egyetem közgazdász hallgatója, 2016-2018 között a Közép-Európai Egyetemen (CEU) tanult politikatudományt. 2020-ban jelenik meg Magyar Bálinttal közösen írt könyve a posztkommunista térség rendszereiről (The Anatomy of Post-Communist Regimes, Budapest: CEU Press). Közéleti témákban írásai jelentek meg <a href='https://www.es.hu/szerzo/45104/madlovics-balint'>az Élet és Irodalomban</a> és a Magyar Narancsban <a href='https://magyarnarancs.hu/szerzo/madlovics-balint//15863?order=datum&amp;page=4'>a Republikon Intézet blogján</a>.</p>",
  },
];

export default function Authors() {
  return (
    <Layout>
      <div className={styles.authorsContainer}>
        {AUTHORS_DATA.map((author, index) => {
          return (
            <div key={index} className={styles.singleAuthor}>
              <img src={author.image} alt={author.name} />
              <div className={styles.authorText}>
                <div className={styles.authorName}>{author.name}</div>
                <div className={styles.authorDescription}>{parse(sanitizeHtml(author.description))}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
