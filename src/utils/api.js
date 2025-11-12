// Mock API that emits air-quality metrics centered on your provided dummy values
export async function fetchAQMetrics() {
  const now = Date.now();
  const points = 24; // last 24 minutes

  // --- helpers --------------------------------------------------------------
  const mk = (seed, base, amp = Math.max(1, base * 0.12)) =>
    Array.from({ length: points }, (_, i) => ({
      ts: now - (points - i) * 60_000,
      v: Math.max(
        0,
        base +
          Math.sin((i + seed) / 4) * amp +
          (Math.random() * amp * 0.2 - amp * 0.1)
      ),
    }));

  // label helpers return {label, color}
  const L = (label, color) => ({ label, color });

  // Simple, readable bands (tune as you like)
  const classifyPM25 = (v) =>
    v < 30
      ? L("Good", "#10b981")
      : v < 60
      ? L("Moderate", "#f59e0b")
      : v < 90
      ? L("Unhealthy", "#ef4444")
      : v < 150
      ? L("Very Unhealthy", "#b91c1c")
      : L("Hazardous", "#7f1d1d");

  const classifyPM10 = (v) =>
    v < 50
      ? L("Good", "#10b981")
      : v < 100
      ? L("Moderate", "#f59e0b")
      : v < 250
      ? L("Unhealthy", "#ef4444")
      : L("Hazardous", "#7f1d1d");

  const classifyCO2 = (v) =>
    v < 800
      ? L("Good", "#10b981")
      : v < 1200
      ? L("Moderate", "#f59e0b")
      : v < 2000
      ? L("Unhealthy", "#ef4444")
      : L("Hazardous", "#7f1d1d");

  const classifyCO = (v) =>
    v < 9
      ? L("Good", "#10b981")
      : v < 35
      ? L("Moderate", "#f59e0b")
      : v < 50
      ? L("Unhealthy", "#ef4444")
      : L("Hazardous", "#7f1d1d");

  const classifyNO2 = (v) =>
    v < 50
      ? L("Good", "#10b981")
      : v < 100
      ? L("Moderate", "#f59e0b")
      : v < 200
      ? L("Unhealthy", "#ef4444")
      : L("Hazardous", "#7f1d1d");

  const classifyTemp = (v) =>
    v < 18
      ? L("Cold", "#3b82f6")
      : v <= 32
      ? L("Comfortable", "#10b981")
      : L("Hot", "#ef4444");

  const classifyHumidity = (v) =>
    v < 30
      ? L("Dry (Bad)", "#ef4444")
      : v <= 60
      ? L("Healthy", "#10b981")
      : L("Humid (Bad)", "#f59e0b");

  // --- your dummy “current” values ----------------------------------------
  const CURRENT = {
    temperature: 28.6,
    humidity: 65.3,
    co: 276.8, // ppm
    co2: 567, // ppm
    no2: 138.4, // ppb
    pm1: 256, // µg/m³
    pm25: 25, // µg/m³
    pm10: 38, // µg/m³
  };

  // snapshot values for gauges
  const gauges = {
    temperature: Number(CURRENT.temperature.toFixed(1)),
    humidity: Number(CURRENT.humidity.toFixed(1)),
    co: Math.round(CURRENT.co),
    co2: Math.round(CURRENT.co2),
    no2: Math.round(CURRENT.no2),
    pm1: Math.round(CURRENT.pm1),
    pm25: Math.round(CURRENT.pm25),
    pm10: Math.round(CURRENT.pm10),
  };

  // severity labels for each metric
  const labels = {
    temperature: classifyTemp(gauges.temperature),
    humidity: classifyHumidity(gauges.humidity),
    co: classifyCO(gauges.co),
    co2: classifyCO2(gauges.co2),
    no2: classifyNO2(gauges.no2),
    pm1: classifyPM10(gauges.pm1), // demo: treat as coarse PM bands
    pm25: classifyPM25(gauges.pm25),
    pm10: classifyPM10(gauges.pm10),
  };

  return {
    // time-series (for line charts)
    temperature: mk(1, CURRENT.temperature, 2.2),
    humidity: mk(2, CURRENT.humidity, 5),
    co: mk(3, CURRENT.co, 30),
    co2: mk(4, CURRENT.co2, 60),
    no2: mk(5, CURRENT.no2, 16),
    pm1: mk(6, CURRENT.pm1, 28),
    pm25: mk(7, CURRENT.pm25, 8),
    pm10: mk(8, CURRENT.pm10, 10),

    // snapshot values + labels
    gauges,
    labels,

    // stat cards
    counts: {
      gases: 6,
      devices: 12,
      alerts: Math.floor(Math.random() * 3),
    },

    // optional text readout
    readout: [
      "----- Sensor Data -----",
      `Temperature (°C): ${gauges.temperature}  →  ${labels.temperature.label}`,
      `Humidity (%): ${gauges.humidity}  →  ${labels.humidity.label}`,
      `In Air Quality:  CO: ${gauges.co} →  ${labels.co.label}`,
      `CO2 (ppm): ${gauges.co2} →  ${labels.co2.label}`,
      `NO2 (ppb): ${gauges.no2} →  ${labels.no2.label}`,
      `PM1.0 (µg/m³): ${gauges.pm1} →  ${labels.pm1.label}`,
      `PM2.5 (µg/m³): ${gauges.pm25}  →  ${labels.pm25.label}`,
      `PM10 (µg/m³): ${gauges.pm10} →  ${labels.pm10.label}`,
    ],
  };
}
