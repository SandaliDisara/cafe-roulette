import styles from "./ReceiptCard.module.css";
import paperTexture from "../../assets/images/paper-texture.png";
import CafeIcon from "../../assets/icons/cafe-icon.svg";

const SCALLOP_COUNT = 13;

export default function ReceiptCard({ children }) {
  return (
    <div className={styles.receiptWrap}>
      {/* Card body */}
      <div
        className={styles.receipt}
        style={{ backgroundImage: `url(${paperTexture})` }}
      >
        {/* Icon badge — sits half outside the top edge */}
        <div className={styles.iconBadge}>
          <img src={CafeIcon} className={styles.icon} alt="cafe icon" />
        </div>

        {/* Injected step content */}
        <div className={styles.cardBody}>{children}</div>
      </div>

      {/* Scalloped bottom edge */}
      <div className={styles.scallop}>
        {Array.from({ length: SCALLOP_COUNT }).map((_, i) => (
          <div key={i} className={styles.scallopCircle} />
        ))}
      </div>
    </div>
  );
}
