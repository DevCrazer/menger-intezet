import React from "react";
import { TagCloud } from "react-tagcloud";
import { TagCloudDataEntry } from "../../types/TagsPage";
import * as _ from "lodash";
import styles from "./TagCloudComponent.module.scss";
import Link from "next/link";

const TAGS = [
  { value: "kapitalizmus", count: 24 },
  { value: "marx", count: 22 },
  { value: "tőke", count: 20 },
  { value: "menger", count: 18 },
  { value: "monopólium", count: 18 },
  { value: "verseny", count: 18 },
  { value: "kizsákmányolás", count: 17 },
  { value: "vállalkozó", count: 16 },
  { value: "szocializmus", count: 16 },
  { value: "munkaerő-piac", count: 15 },
  { value: "egyenlőtlenség", count: 15 },
  { value: "történelem", count: 14 },
  { value: "válság", count: 14 },
  { value: "középosztály", count: 13 },
  { value: "szegénység", count: 12 },
  { value: "szabadpiac", count: 12 },
];

export default function TagCloudComponent() {
  const customRenderer = (tag: TagCloudDataEntry, size: number, color: string) => {
    return (
      <Link href={`/cimkek/${tag.value}`}>
        <span key={tag.value} style={{ color }} className={styles[`tag-${size}`]}>
          {tag.value}
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className={styles.tagCloudComponentContainer}>
        <TagCloud
          minSize={12}
          maxSize={24}
          tags={TAGS}
          colorOptions={{
            hue: "#09C778",
            luminosity: "light",
          }}
          disableRandomColor={true}
          renderer={customRenderer}
        />
        {/* <Link href={`/cimkek/`}>
          <div className={styles.ctaButton}>Továbbiak »</div>
        </Link> */}
      </div>
    </>
  );
}
