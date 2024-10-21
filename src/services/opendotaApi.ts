const BASE_URL = process.env.NEXT_PUBLIC_OPENDOTA_API_URL;
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

export async function getPlayerRecentMatches(accountId: string) {
  const response = await fetch(
    `${BASE_URL}/players/${accountId}/recentMatches`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recent matches");
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
