import React, { useState, TouchEvent } from "react";
import styles from "./Layout.module.scss";
import MenuDrawer from "./menu-drawer/MenuDrawer";
import Menu from "./menu/Menu";

export default function Layout({ children }: { children: JSX.Element | Array<JSX.Element> }) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const minSwipeDistance = 50;

  const onTouchStart = (event: TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: TouchEvent) => setTouchEnd(event.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setOpen(true);
    }

    if (isRightSwipe){
      setOpen(false)
    }
  };
  return (
    <>
      <div
        className={styles.bodyContainerMobile}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}>
        <MenuDrawer open={open} setOpen={setOpen} /> {children}
      </div>
      <div className={styles.bodyContainerDesktop}>
        <Menu showLogo={true} /> {children}
      </div>
    </>
  );
}
