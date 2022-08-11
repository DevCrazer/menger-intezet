import React, { useState, useEffect } from "react";
import styles from "./Layout.module.scss";
import MenuDrawer from "./menu-drawer/MenuDrawer";
import Menu from "./menu/Menu";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className={styles.bodyContainerMobile}>
        <MenuDrawer /> {children}
      </div>
      <div className={styles.bodyContainerDesktop}>
        <Menu showLogo={true} /> {children}
      </div>
    </>
  );
}
