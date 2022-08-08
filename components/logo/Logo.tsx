import { useRouter } from 'next/router'
import React from 'react'
import styles from "./Logo.module.scss"

export default function Logo() {
  const router = useRouter();

  function onClick() {
    router.push('/');
  }
  return (
    <div className={styles.logoContainer} onClick={onClick}>
        <div className={styles.firstLine}>Carl Menger</div>
        <div className={styles.secondLine}>intézet</div>
    </div>
  )
}
