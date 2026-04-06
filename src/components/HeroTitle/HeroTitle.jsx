import styles from "./HeroTitle.module.css";

export default function HeroTitle() {
  return (
    <div className={styles.heroTitle}>
      <div className={styles.line}>
        <span className={styles.serif}>PICK </span>
        <span className={styles.script}>Y</span>
        <span className={styles.serif}>OUR</span>
      </div>
      <div className={styles.line}>
        <span className={styles.script}>C</span>
        <span className={styles.serif}>AFE SPOT</span>
      </div>
    </div>
  );
}
