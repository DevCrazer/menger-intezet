import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../menu/Menu";

export default function MenuDrawer() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <MenuIcon
        onClick={() => setOpen((open) => !open)}
      />
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <Menu/>
      </Drawer>
    </div>
  );
}
