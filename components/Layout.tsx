import React, { useState, useLayoutEffect } from 'react'
import styles from "./Layout.module.scss"
import MenuDrawer from './menu-drawer/MenuDrawer';
import Menu from './menu/Menu';

export default function Layout({ children }: {children: any}) {
  const [mobileUser, setMobileUser] = useState(false);

  useLayoutEffect(() => {
    checkIsVisitorIsMobileUser();
  }, []);

  function checkIsVisitorIsMobileUser() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setMobileUser(true);
    }
  }
  return (
    <div className={mobileUser ? styles.bodyContainerMobile : styles.bodyContainerDesktop}>
    {mobileUser ? <MenuDrawer /> : <Menu showLogo={true}/>}
    { children }
  </div>
  )
}
