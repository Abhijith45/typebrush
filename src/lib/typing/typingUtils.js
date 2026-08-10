import { standardPassages, numberPassages } from "./typingConstants";

/**
 * Selects a passage based on the typing mode, avoiding repetition if possible.
 * 
 * @param {string} mode - "standard" or "number"
 * @param {string} lastId - ID of the last passage taken
 * @returns {Object} Selected passage object
 */
export function getPassage(mode, lastId = null) {
  const collection = mode === "number" ? numberPassages : standardPassages;
  if (collection.length === 0) return { id: "empty", text: "" };
  if (collection.length === 1) return collection[0];
  
  const pool = collection.filter((p) => p.id !== lastId);
  const selectedPool = pool.length > 0 ? pool : collection;
  const randomIndex = Math.floor(Math.random() * selectedPool.length);
  return selectedPool[randomIndex];
}

/**
 * Gets the current timestamp in milliseconds.
 * Encapsulated to keep React hooks pure according to compile rules.
 * 
 * @returns {number} Timestamp.
 */
export function getCurrentTime() {
  return Date.now();
}
