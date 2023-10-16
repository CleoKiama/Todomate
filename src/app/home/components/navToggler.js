"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { navStatus } from "@/app/provider.js";
import { useContext } from "react";
import Image from "next/image";
export default function NavToggler(props) {

  const {showNav,setShowNav } = useContext(navStatus);
  function handleClick() {
    setShowNav((prev) => {
      return !prev;
    });
  }

  return (
    <div className={styles.nav_toggler_container}>
      <Image
        type="image"
        src={showNav?"/cancel_close_delete_icon.svg":"/hamburger_icon.svg"}
        width="25"
        height="25"
        onClick={handleClick}
       alt='hamburger icon'
      />
    </div>
  );
}
