import React from "react";
import styles from "@/styles/Home.module.scss";

import Header from "@/components/Header";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header/>
      </div>
      <div className={styles.body}>
        <Body/>
      </div>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
}