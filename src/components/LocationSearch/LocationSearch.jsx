import { useState } from "react";
import styles from "./LocationSearch.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CafeResult from "../CafeResult/CafeResult";
import { getRandomCafeByLocation } from "../../services/placesService";

const RADIUS_STEPS = [
  { label: "1 km", value: 1000 },
  { label: "2 km", value: 2000 },
  { label: "5 km", value: 5000 },
  { label: "8 km", value: 8000 },
  { label: "10 km", value: 10000 },
  { label: "Any", value: 50000 },
];

export default function LocationSearch({ onBack, onResultChange }) {
  const [step, setStep] = useState("idle");
  const [coords, setCoords] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(1); // default: 2km (index 1)
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const selectedRadius = RADIUS_STEPS[sliderIndex];

  // ── REQUEST GPS ──────────────────────────────────────
  const handleRequestLocation = () => {
    setStep("locating");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStep("picking");
      },
      (err) => {
        console.log("Geolocation error code:", err.code, err.message);
        setError(
          "Location access denied. Please enable location permissions and try again.",
        );
        setStep("error");
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 60000 },
    );
  };

  // ── GENERATE ─────────────────────────────────────────
  const handleGenerate = async () => {
    setError(null);
    setStep("loading");
    onResultChange?.(true);
    try {
      const cafe = await getRandomCafeByLocation(
        coords.lat,
        coords.lng,
        selectedRadius.value,
      );
      setResult(cafe);
      setStep("result");
    } catch (err) {
      setError(err.message);
      setStep("error");
      onResultChange?.(false);
    }
  };

  // ── GENERATE AGAIN ────────────────────────────────────
  const handleGenerateAgain = async () => {
    setError(null);
    setStep("loading");
    try {
      const cafe = await getRandomCafeByLocation(
        coords.lat,
        coords.lng,
        selectedRadius.value,
      );
      setResult(cafe);
      setStep("result");
    } catch (err) {
      setError(err.message);
      setStep("error");
    }
  };

  const handleBackFromResult = () => {
    setResult(null);
    setStep("picking");
    onResultChange?.(false);
  };

  const handleBack = () => {
    setResult(null);
    setCoords(null);
    setError(null);
    setStep("idle");
    onResultChange?.(false);
    onBack();
  };

  // ── LOADING ───────────────────────────────────────────
  if (step === "loading") return <LoadingSpinner />;

  // ── RESULT ────────────────────────────────────────────
  if (step === "result") {
    return (
      <CafeResult
        cafe={result}
        onBack={handleBackFromResult}
        onGenerateAgain={handleGenerateAgain}
      />
    );
  }

  // ── IDLE ──────────────────────────────────────────────
  if (step === "idle") {
    return (
      <div className={styles.locationSearch}>
        <button className={styles.back} onClick={handleBack}>
          <span className={styles.backChevron}>‹</span> Back
        </button>
        <p className={styles.description}>
          Let us find the perfect cafe
          <br />
          right around you.
        </p>
        <div className={styles.locationIconWrap}>
          <span className={styles.locationIcon}>📍</span>
        </div>
        <button className={styles.generateBtn} onClick={handleRequestLocation}>
          Use My Location
        </button>
      </div>
    );
  }

  // ── LOCATING ──────────────────────────────────────────
  if (step === "locating") {
    return (
      <div className={styles.locatingWrap}>
        <div className={styles.locatingIcon}>📍</div>
        <p className={styles.locatingText}>
          Getting your location
          <span className={styles.dots} />
        </p>
      </div>
    );
  }

  // ── ERROR ─────────────────────────────────────────────
  if (step === "error") {
    return (
      <div className={styles.locationSearch}>
        <button className={styles.back} onClick={handleBack}>
          <span className={styles.backChevron}>‹</span> Back
        </button>
        <p className={styles.error}>{error}</p>
        <button className={styles.generateBtn} onClick={() => setStep("idle")}>
          Try Again
        </button>
      </div>
    );
  }

  // ── PICKING — radius slider ───────────────────────────
  return (
    <div className={styles.locationSearch}>
      <button className={styles.back} onClick={handleBack}>
        <span className={styles.backChevron}>‹</span> Back
      </button>

      <p className={styles.description}>
        How far are you willing
        <br />
        to travel for a great cafe?
      </p>

      <div className={styles.sliderWrap}>
        {/* Selected radius display */}
        <div className={styles.radiusDisplay}>
          <span className={styles.radiusValue}>{selectedRadius.label}</span>
          <span className={styles.radiusUnit}>
            {selectedRadius.value === 50000 ? "no limit" : "radius"}
          </span>
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={RADIUS_STEPS.length - 1}
          step={1}
          value={sliderIndex}
          onChange={(e) => setSliderIndex(Number(e.target.value))}
          className={styles.slider}
          style={{
            background: `linear-gradient(to right, #3C613F ${(sliderIndex / (RADIUS_STEPS.length - 1)) * 100}%, rgba(61,107,88,0.2) ${(sliderIndex / (RADIUS_STEPS.length - 1)) * 100}%)`,
          }}
        />

        {/* Tick labels */}
        <div className={styles.ticks}>
          {RADIUS_STEPS.map((option, i) => (
            <span
              key={option.value}
              className={i === sliderIndex ? styles.tickActive : styles.tick}
              onClick={() => setSliderIndex(i)}
            >
              {option.label}
            </span>
          ))}
        </div>
      </div>

      <button className={styles.generateBtn} onClick={handleGenerate}>
        Generate
      </button>
    </div>
  );
}
