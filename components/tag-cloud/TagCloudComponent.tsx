import React from "react";
import { TagCloud } from "react-tagcloud";
import { TagCloudDataEntry } from "../../types/TagsPage";
import * as _ from "lodash";
import styles from "./TagCloudComponent.module.scss";
import Link from "next/link";

const TAGS = [
  { value: "verseny", count: 18, key: 1 },
  { value: "szabadpiac", count: 12, key: 2 },
  { value: "tőke", count: 20, key: 3 },
  { value: "vállalkozó", count: 16, key: 4 },
  { value: "szegénység", count: 12, key: 5 },
  { value: "középosztály", count: 13, key: 6 },
  { value: "marx", count: 22, key: 7 },
  { value: "monopólium", count: 18, key: 8 },
  { value: "történelem", count: 14, key: 9 },
  { value: "válság", count: 14, key: 10 },
  { value: "kizsákmányolás", count: 17, key: 11 },
  { value: "menger", count: 18, key: 12 },
  { value: "munkaerő-piac", count: 15, key: 13 },
  { value: "kapitalizmus", count: 24, key: 14 },
  { value: "egyenlőtlenség", count: 15, key: 15 },
];

export default function TagCloudComponent() {
  const customRenderer = (tag: TagCloudDataEntry, size: number, color: string) => {
    return (
      <Link href={`/cimkek/${tag.value}`} key={tag.value}>
        <span style={{ color }} className={styles[`tag-${size}`]}>
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
            luminosity: "bright",
          }}
          disableRandomColor={true}
          renderer={customRenderer}
          shuffle={false}
        />
      </div>
    </>
  );
}
