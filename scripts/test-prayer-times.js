// Prayer Times & Iqamah Test Script
// Run with: node scripts/test-prayer-times.js
//
// Iqamah rules (from fetchIqamaTimes in lib/utils.ts):
//   Fajr:    adhan + 25 min
//   Dhuhr:   adhan + 15 min
//   Asr:     adhan + 15 min
//   Maghrib: adhan + 10 min
//   Isha:    21:15 during Ramadan, else adhan + 15 min
//
// Qiyam ul Layl rules (last 10 nights of Ramadan only):
//   Fixed at 02:30 — must be after Isha iqamah and before Fajr adhan

const data = require("../public/data/prayertimes_2026.json");

const IQAMAH_OFFSETS = { Fajr: 25, Dhuhr: 15, Asr: 15, Maghrib: 10, Isha: 15 };
const RAMADAN_ISHA_FIXED = "21:15";
const QIYAM_TIME = "02:30";

function isLast10Nights(hijri) {
  const parts = hijri.split(" ");
  const day = parseInt(parts[0], 10);
  return hijri.toLowerCase().includes("rmdn") && day >= 21;
}

function addMinutes(time, minutes) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  const hh = String(Math.floor(total / 60) % 24).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function isRamadanMonth(hijri) {
  return hijri.toLowerCase().includes("rmdn");
}

const issues = [];
const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

let prevDate = null;
let prevTimes = null;

for (const [date, entry] of Object.entries(data)) {
  const { prayerTimes, info } = entry;
  const ramadan = isRamadanMonth(info.hijri);

  // 1. Check all prayers exist
  for (const prayer of prayers) {
    if (!prayerTimes[prayer]) {
      issues.push(`[${date}] MISSING adhan time for ${prayer}`);
    }
  }

  // 2. Check prayers are in ascending order
  for (let i = 1; i < prayers.length; i++) {
    const prev = prayers[i - 1];
    const curr = prayers[i];
    if (prayerTimes[prev] && prayerTimes[curr]) {
      if (toMinutes(prayerTimes[curr]) <= toMinutes(prayerTimes[prev])) {
        issues.push(
          `[${date}] ${curr} (${prayerTimes[curr]}) is not after ${prev} (${prayerTimes[prev]})`
        );
      }
    }
  }

  // 3. Compute iqamah and check iqamah > adhan
  for (const prayer of prayers) {
    if (!prayerTimes[prayer]) continue;
    const iqamah =
      prayer === "Isha" && ramadan
        ? RAMADAN_ISHA_FIXED
        : addMinutes(prayerTimes[prayer], IQAMAH_OFFSETS[prayer]);

    if (toMinutes(iqamah) <= toMinutes(prayerTimes[prayer])) {
      issues.push(
        `[${date}] ${prayer} iqamah (${iqamah}) is not after adhan (${prayerTimes[prayer]})`
      );
    }
  }

  // 4. Check Ramadan Isha fixed time is after adhan
  if (ramadan) {
    const ishaAdhan = prayerTimes["Isha"];
    if (ishaAdhan && toMinutes(RAMADAN_ISHA_FIXED) <= toMinutes(ishaAdhan)) {
      issues.push(
        `[${date}] Ramadan: fixed Isha iqamah (${RAMADAN_ISHA_FIXED}) is not after adhan (${ishaAdhan}) — adhan is too late`
      );
    }
  }

  // 5. Qiyam ul Layl checks (last 10 nights only)
  if (isLast10Nights(info.hijri)) {
    const ishaIqamah = ramadan ? RAMADAN_ISHA_FIXED : addMinutes(prayerTimes["Isha"], IQAMAH_OFFSETS["Isha"]);
    const fajrAdhan = prayerTimes["Fajr"];

    // Qiyam must be after Isha iqamah — Qiyam is after midnight so add 1440 min for comparison
    const qiyamMins = toMinutes(QIYAM_TIME) + 1440;
    if (qiyamMins <= toMinutes(ishaIqamah)) {
      issues.push(
        `[${date}] Qiyam ul Layl (${QIYAM_TIME}) is not after Isha iqamah (${ishaIqamah})`
      );
    }

    // Qiyam must be before Fajr adhan
    if (fajrAdhan && toMinutes(QIYAM_TIME) >= toMinutes(fajrAdhan)) {
      issues.push(
        `[${date}] Qiyam ul Layl (${QIYAM_TIME}) is not before Fajr adhan (${fajrAdhan}) — Qiyam time needs to be moved earlier`
      );
    }
  }

  // 6. Check day-to-day continuity (prayer times shouldn't jump by more than 5 min)
  if (prevTimes) {
    for (const prayer of prayers) {
      if (!prayerTimes[prayer] || !prevTimes[prayer]) continue;
      const diff = Math.abs(toMinutes(prayerTimes[prayer]) - toMinutes(prevTimes[prayer]));
      if (diff > 5) {
        issues.push(
          `[${date}] ${prayer} jumped ${diff} min from previous day (${prevTimes[prayer]} → ${prayerTimes[prayer]})`
        );
      }
    }
  }

  prevTimes = prayerTimes;
  prevDate = date;
}

// Print results
console.log("=".repeat(60));
console.log("PRAYER TIMES TEST — 2026");
console.log("=".repeat(60));
console.log(`Dates checked: ${Object.keys(data).length}`);
console.log(`Issues found:  ${issues.length}`);
console.log("=".repeat(60));

if (issues.length === 0) {
  console.log("\n✓ All checks passed. No issues found.\n");
} else {
  console.log("\nISSUES:\n");
  issues.forEach((issue) => console.log("  ✗ " + issue));
  console.log();
}

// Print sample: today's times
const today = new Date();
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const todayKey = `${String(today.getDate()).padStart(2, "0")} ${months[today.getMonth()]} ${today.getFullYear()}`;
const todayData = data[todayKey];

if (todayData) {
  const ramadan = isRamadanMonth(todayData.info.hijri);
  console.log(`Today (${todayKey}) — ${todayData.info.hijri}`);
  console.log("-".repeat(40));
  console.log("Prayer".padEnd(10) + "Adhan".padEnd(10) + "Iqamah");
  console.log("-".repeat(40));
  for (const prayer of prayers) {
    const adhan = todayData.prayerTimes[prayer];
    const iqamah =
      prayer === "Isha" && ramadan
        ? RAMADAN_ISHA_FIXED
        : addMinutes(adhan, IQAMAH_OFFSETS[prayer]);
    console.log(prayer.padEnd(10) + adhan.padEnd(10) + iqamah);
  }
  if (isLast10Nights(todayData.info.hijri)) {
    console.log("Qiyam".padEnd(10) + QIYAM_TIME.padEnd(10) + "(no iqamah)");
  }
  console.log();
}
