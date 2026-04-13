import styles from "./ModeSelect.module.css";

export default function ModeSelect({ onSelect }) {
  return (
    <div className={styles.modeSelect}>
      <p className={styles.description}>
        End the &apos;I don&apos;t know, you pick&apos; debate. Tell us where
        you are, and we&apos;ll handle the rest.
      </p>

      <p className={styles.subDescription}>
        Discover a new spot nearby or search by city.
      </p>

      <div className={styles.buttons}>
        <button className={styles.btnFilled} onClick={() => onSelect("city")}>
          City Search
        </button>
        <button
          className={styles.btn}
          disabled
          onClick={() => onSelect("location")}
        >
          Location Based
        </button>
      </div>
    </div>
  );
}
