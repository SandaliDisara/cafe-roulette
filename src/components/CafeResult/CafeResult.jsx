import styles from "./CafeResult.module.css";

export default function CafeResult({ cafe, onBack, onGenerateAgain }) {
  return (
    <div className={styles.cafeResult}>
      {/* Back button */}
      <button className={styles.back} onClick={onBack}>
        <span className={styles.backChevron}>‹</span> Back
      </button>

      {/* Inner info card */}
      <div className={styles.infoCard}>
        {/* Photo */}
        {cafe.photoUrl ? (
          <img src={cafe.photoUrl} className={styles.photo} alt={cafe.name} />
        ) : (
          <div className={styles.photoPlaceholder}>☕</div>
        )}

        {/* Details */}
        <div className={styles.details}>
          <p className={styles.row}>
            <span className={styles.label}>Name: </span>
            <span className={styles.value}>{cafe.name}</span>
          </p>
          <p className={styles.row}>
            <span className={styles.label}>Location: </span>
            <span className={styles.value}>{cafe.address}</span>
          </p>
          {cafe.rating && (
            <p className={styles.row}>
              <span className={styles.label}>Rating: </span>
              <span className={styles.value}>
                {cafe.rating} ⭐
                {cafe.ratingCount && (
                  <span className={styles.ratingCount}>
                    {" "}
                    ({(cafe.ratingCount / 1000).toFixed(1)}K)
                  </span>
                )}
              </span>
            </p>
          )}
        </div>

        {/* Google + Maps buttons */}
        <div className={styles.linkButtons}>
          <a
            href={cafe.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            <span className={styles.linkIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            Google
          </a>
          <a
            href={cafe.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
          >
            <span className={styles.linkIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </span>
            Maps
          </a>
        </div>
      </div>

      {/* Generate Again */}
      <button className={styles.generateBtn} onClick={onGenerateAgain}>
        Generate Again
      </button>
    </div>
  );
}
