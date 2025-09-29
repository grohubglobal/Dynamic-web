import type React from "react";
import Image from "next/image";
import styles from "./Banner.module.css";

export const Banner = () => (
  <div
    className={styles.header}
    style={{ background: "linear-gradient(135deg, #4D0E98 31%, #190532 100%)" }}
  >
    <div className={styles.content}>
      <div className={styles.logoContainer}>
        <Image
          src={`${process.env.NEXT_PUBLIC_APP_URL}/Dynamic-web/grohub-logo.png`}
          width={160}
          height={160}
          alt="Grohub Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Grohub.</h1>
      </div>
    </div>
  </div>
);
