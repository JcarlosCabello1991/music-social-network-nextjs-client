import React from "react";
import styles from "./styles.module.css";
import SearchAppBar from "../SearchBar/SearchBar";
import Logo from "../Logo/Logo";
import NavbarIcons from "../NavbarIcons/NavbarIcons";

function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <Logo Height={30} Width={100} ClassName={"logoNavbar"} />
        <SearchAppBar />
        <NavbarIcons />
      </div>
    </>
  );
}

export default Navbar;
