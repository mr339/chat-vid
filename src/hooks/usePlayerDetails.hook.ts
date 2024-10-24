import { useState, useEffect } from "react";
import { Player } from "@/types/opendota";
import {
  getPlayerProfile,
  getPlayerWinLoss,
  fetchRecentMatches,
} from "@/services/opendotaApi";

interface UsePlayerDetailsProps {
  player: Player;
}

export const usePlayerDetails = ({ player }: UsePlayerDetailsProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [winLoss, setWinLoss] = useState<any>(null);
  const [lastMatch, setLastMatch] = useState<any>(null);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      setIsLoading(true);
      try {
        const [profileData, winLossData, recentMatchesData] = await Promise.all(
          [
            getPlayerProfile(player.account_id.toString()),
            getPlayerWinLoss(player.account_id.toString()),
            fetchRecentMatches(player.account_id),
          ]
        );
        setProfile(profileData);
        setWinLoss(winLossData);
        setRecentMatches(recentMatchesData);
        setLastMatch(recentMatchesData[0] || null);
      } catch (error) {
        console.error("Error fetching player details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [player.account_id]);

  return {
    profile,
    winLoss,
    lastMatch,
    recentMatches,
    isLoading,
  };
};
