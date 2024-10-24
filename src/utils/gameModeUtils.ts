const gameModes: { [key: number]: string } = {
  0: "Unknown",
  1: "All Pick",
  2: "Captains Mode",
  3: "Random Draft",
  4: "Single Draft",
  5: "All Random",
  6: "Intro",
  7: "Diretide",
  8: "Reverse Captains Mode",
  9: "The Greeviling",
  10: "Tutorial",
  11: "Mid Only",
  12: "Least Played",
  13: "Limited Heroes",
  14: "Compendium Matchmaking",
  15: "Custom",
  16: "Captains Draft",
  17: "Balanced Draft",
  18: "Ability Draft",
  19: "Event",
  20: "All Random Death Match",
  21: "1v1 Mid",
  22: "All Draft",
  23: "Turbo",
  24: "Mutation",
  25: "Coaches Challenge",
};

export function getGameModeName(modeId: number): string {
  return gameModes[modeId] || "Unknown";
}

export function isRankedMode(modeId: number): boolean {
  // Ranked modes are typically All Pick (1), Captains Mode (2), and Random Draft (3)
  // All Draft (22) is also used for ranked matches in recent times
  return [1, 2, 3, 22].includes(modeId);
}
