import { useState, useEffect } from "react";
import { RecentMatch, Hero } from "@/types/opendota";
import { getHeroes } from "@/services/opendotaApi";

interface UseProfileOverviewProps {
  profile: {
    profile: {
      account_id: number;
      personaname: string;
      name: string | null;
      plus: boolean;
      cheese: number;
      steamid: string;
      avatar: string;
      avatarmedium: string;
      avatarfull: string;
      profileurl: string;
      last_login: string | null;
      loccountrycode: string | null;
      status: string | null;
      fh_unavailable: boolean;
      is_contributor: boolean;
      is_subscriber: boolean;
    };
    rank_tier: number | null;
    leaderboard_rank: number | null;
  };
  winLoss: {
    win: number;
    lose: number;
  };
  lastMatch: {
    match_id: number;
    start_time: number;
    hero_id: number;
    player_slot: number;
  } | null;
  recentMatches: RecentMatch[];
}

export const useProfileOverview = ({
  profile,
  winLoss,
  lastMatch,
  recentMatches,
}: UseProfileOverviewProps) => {
  const [showRecentMatches, setShowRecentMatches] = useState(false);
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const heroesData = await getHeroes();
      setHeroes(heroesData);
    };
    fetchHeroes();
  }, []);

  const totalGames = winLoss.win + winLoss.lose;
  const winRate =
    totalGames > 0 ? ((winLoss.win / totalGames) * 100).toFixed(2) : "0.00";

  const toggleRecentMatches = () => {
    setShowRecentMatches(!showRecentMatches);
  };

  return {
    showRecentMatches,
    heroes,
    totalGames,
    winRate,
    toggleRecentMatches,
  };
};
