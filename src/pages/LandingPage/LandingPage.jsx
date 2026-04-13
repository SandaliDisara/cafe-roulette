import { useState } from "react";
import styles from "./LandingPage.module.css";

import bgMobile from "../../assets/images/bg-mobile.png";
import bgDesktop from "../../assets/images/bg-desktop.png";

import HeroTitle from "../../components/HeroTitle/HeroTitle";
import ReceiptCard from "../../components/ReceiptCard/ReceiptCard";
import ModeSelect from "../../components/ModeSelect/ModeSelect";
import CitySearch from "../../components/CitySearch/CitySearch";

// import LocationSearch from '../../components/LocationSearch/LocationSearch'

export default function LandingPage() {
  const [mode, setMode] = useState(null); // null | 'city' | 'location'
  const [hasResult, setHasResult] = useState(false); // fades title when result shows

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
        {/* Title fades out smoothly when result is showing */}
        <div className={hasResult ? styles.titleHidden : styles.titleVisible}>
          <HeroTitle />
        </div>

        <ReceiptCard>
          {!mode && <ModeSelect onSelect={setMode} />}
          {mode === "city" && (
            <CitySearch
              onBack={() => setMode(null)}
              onResultChange={setHasResult}
            />
          )}
          {/* {mode === 'location' && (
            <LocationSearch
              onBack={() => setMode(null)}
              onResultChange={setHasResult}
            />
          )} */}
        </ReceiptCard>
      </div>
    </div>
  );
}
