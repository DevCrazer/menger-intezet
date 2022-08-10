import Link from 'next/link'
import React from 'react'
import styles from "./Logo.module.scss"

export default function Logo() {
  return (
    <Link href={'/'}>
      <div className={styles.logoContainer}>
          <div className={styles.firstLine}>Carl Menger</div>
          <div className={styles.secondLine}>intézet</div>
      </div>
    </Link>
  )
}
