import { useState } from "react";
import styles from "./CitySearch.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CafeResult from "../CafeResult/CafeResult";
import { getRandomCafe } from "../../services/placesService";

export default function CitySearch({ onBack, onResultChange }) {
  const [cityInput, setCityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!cityInput.trim()) return;
    setError(null);
    setIsLoading(true);
    onResultChange?.(true); // tell LandingPage to fade the title
    try {
      const cafe = await getRandomCafe(cityInput.trim());
      setResult(cafe);
    } catch (err) {
      setError(err.message);
      onResultChange?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAgain = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const cafe = await getRandomCafe(cityInput.trim());
      setResult(cafe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
    setCityInput("");
    onResultChange?.(false); // restore title
    onBack();
  };

  const handleBackToSearch = () => {
    setResult(null);
    setError(null);
    onResultChange?.(false);
  };

  // ── LOADING STATE ──
  if (isLoading) return <LoadingSpinner />;

  // ── RESULT STATE ──
  if (result) {
    return (
      <CafeResult
        cafe={result}
        onBack={handleBackToSearch}
        onGenerateAgain={handleGenerateAgain}
      />
    );
  }

  // ── INPUT STATE ──
  return (
    <div className={styles.citySearch}>
      <button className={styles.back} onClick={handleBack}>
        ‹ Back
      </button>

      <p className={styles.description}>
        Tell us the city, and we'll
        <br />
        find the perfect cafe!
      </p>

      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          type="text"
          placeholder="Colombo, Kandy..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
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

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.generateBtn}
        onClick={handleGenerate}
        disabled={!cityInput.trim()}
      >
        Generate
      </button>
    </div>
  );
}
