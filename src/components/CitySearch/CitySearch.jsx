import styles from "./CitySearch.module.css";

export default function CitySearch({ onBack }) {
  return (
    <div className={styles.citySearch}>
      {/* Back button */}
      <button className={styles.back} onClick={onBack}>
        ‹ Back
      </button>

      {/* Description */}
      <p className={styles.description}>
        Tell us the city, and we'll
        <br />
        find the perfect cafe!
      </p>

      {/* Input */}
      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type="text"
          placeholder="Colombo, Kandy..."
        />
        <span className={styles.searchIcon}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9a9a9a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>

      {/* Generate button */}
      <button className={styles.generateBtn}>Generate</button>
    </div>
  );
}
