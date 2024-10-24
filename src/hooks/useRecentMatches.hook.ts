import { useState } from "react";
import { RecentMatch, Hero } from "@/types/opendota";
import { isRankedMode } from "@/utils/gameModeUtils";

interface UseRecentMatchesProps {
  matches: RecentMatch[];
  heroes: Hero[];
}

export const useRecentMatches = ({
  matches,
  heroes,
}: UseRecentMatchesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const MATCHES_PER_PAGE = 6;

  const isWin = (match: RecentMatch) => {
    return match.player_slot < 128 === match.radiant_win;
  };

  const getTeamImage = (playerSlot: number) => {
    return playerSlot < 128 ? "/images/radiant.png" : "/images/dire.png";
  };

  const getHeroName = (heroId: number) => {
    const hero = heroes.find((h) => h.id === heroId);
    return hero ? hero.localized_name : "Unknown Hero";
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredMatches = matches.filter((match) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every((filter) => {
      switch (filter) {
        case "wins":
          return isWin(match);
        case "losses":
          return !isWin(match);
        case "radiant":
          return match.player_slot < 128;
        case "dire":
          return match.player_slot >= 128;
        case "ranked":
          return isRankedMode(match.game_mode);
        case "unranked":
          return !isRankedMode(match.game_mode);
        default:
          return true;
      }
    });
  });

  const totalPages = Math.ceil(filteredMatches.length / MATCHES_PER_PAGE);
  const startIndex = (currentPage - 1) * MATCHES_PER_PAGE;
  const endIndex = startIndex + MATCHES_PER_PAGE;
  const currentMatches = filteredMatches.slice(startIndex, endIndex);

  return {
    currentPage,
    setCurrentPage,
    activeFilters,
    toggleFilter,
    filteredMatches,
    currentMatches,
    totalPages,
    isWin,
    getTeamImage,
    getHeroName,
  };
};
