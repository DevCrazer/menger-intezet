import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../menu/Menu";
import styles from "./MenuDrawer.module.scss";
import Logo from "../logo/Logo";

export default function MenuDrawer() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.menuDrawerContainer}>
        <Logo />
        <MenuIcon
          onClick={() => setOpen((open) => !open)}
          sx={{ cursor: "pointer" }}
        />
        <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
          <Menu showLogo={false} />
        </Drawer>
      </div>
    </>
  );
}
