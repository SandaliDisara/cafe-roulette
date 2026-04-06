import { useState } from "react";
import styles from "./LandingPage.module.css";

import bgMobile from "../../assets/images/bg-mobile.png";
import bgDesktop from "../../assets/images/bg-desktop.png";

import HeroTitle from "../../components/HeroTitle/HeroTitle";
import ReceiptCard from "../../components/ReceiptCard/ReceiptCard";
import ModeSelect from "../../components/ModeSelect/ModeSelect";

export default function LandingPage() {
  const [mode, setMode] = useState(null); // null | 'city' | 'location'

  return (
    <div className={styles.page}>
      {/* Background */}
      <div className={styles.bg}>
        <img src={bgMobile} className={styles.bgMobile} alt="" />
        <img src={bgDesktop} className={styles.bgDesktop} alt="" />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.layout}>
        <HeroTitle />

        <ReceiptCard>{!mode && <ModeSelect onSelect={setMode} />}</ReceiptCard>
      </div>
    </div>
  );
}
