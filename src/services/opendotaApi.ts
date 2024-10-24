import { Hero, RecentMatch } from "@/types/opendota";

const BASE_URL = process.env.NEXT_PUBLIC_OPENDOTA_API_URL?.replace(/\/$/, "");
console.log("BASE_URL", BASE_URL);

export async function searchPlayers(query: string) {
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to search players");
  }
  return response.json();
}

export async function getPlayerProfile(accountId: string) {
  const response = await fetch(`${BASE_URL}/players/${accountId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch player profile");
  }
  return response.json();
}

export async function getPlayerWinLoss(accountId: string) {
  const response = await fetch(`${BASE_URL}/players/${accountId}/wl`);
  if (!response.ok) {
    throw new Error("Failed to fetch player win/loss");
  }
  return response.json();
}

export async function getPlayerHeroStats(accountId: string) {
  const response = await fetch(`${BASE_URL}/players/${accountId}/heroes`);
  if (!response.ok) {
    throw new Error("Failed to fetch hero stats");
  }
  return response.json();
}

// Add this new function to fetch recent matches
export const fetchRecentMatches = async (
  accountId: number
): Promise<RecentMatch[]> => {
  const response = await fetch(
    `${BASE_URL}/players/${accountId}/recentMatches`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recent matches");
  }
  return response.json();
};

export const getHeroes = async (): Promise<Hero[]> => {
  const response = await fetch(`${BASE_URL}/heroes`);
  if (!response.ok) {
    throw new Error("Failed to fetch heroes");
  }
  const data = await response.json();
  console.log("Hero data:", data[0]); // Log the first hero to see its structure
  return data;
};
