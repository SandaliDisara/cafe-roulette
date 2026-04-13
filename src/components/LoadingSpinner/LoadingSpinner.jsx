import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cupWrap}>
        <span className={styles.cup}>☕</span>
        <div className={styles.steam}>
          <span className={styles.steamLine} />
          <span className={styles.steamLine} />
          <span className={styles.steamLine} />
        </div>
      </div>
      <p className={styles.text}>
        Finding your perfect spot
        <span className={styles.dots} />
      </p>
    </div>
  );
}
