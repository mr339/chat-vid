import { useState, useMemo } from "react";
import { RecentMatch, Hero } from "@/types/opendota";
import { isRankedMode } from "@/utils/gameModeUtils";
import { useFilterStore } from "@/stores/filterStore";

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
  const {
    selectedLength,
    selectedHero,
    selectedDeath,
    selectedKills,
    selectedAssists,
  } = useFilterStore();

  const itemsPerPage = 10;

  const isWin = (match: RecentMatch) => {
    return match.player_slot < 128 === match.radiant_win;
  };

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Apply FilterPopup filters
      if (selectedLength) {
        const durationInMinutes = match.duration / 60;
        switch (selectedLength) {
          case "under20":
            if (durationInMinutes >= 20) return false;
            break;
          case "20to40":
            if (durationInMinutes < 20 || durationInMinutes >= 40) return false;
            break;
          case "40to60":
            if (durationInMinutes < 40 || durationInMinutes >= 60) return false;
            break;
          case "over60":
            if (durationInMinutes < 60) return false;
            break;
        }
      }

      if (selectedHero !== null && match.hero_id !== selectedHero) {
        return false;
      }

      if (selectedDeath) {
        switch (selectedDeath) {
          case "zero":
            if (match.deaths !== 0) return false;
            break;
          case "lessThan5":
            if (match.deaths >= 5) return false;
            break;
          case "moreThan10":
            if (match.deaths <= 10) return false;
            break;
        }
      }

      if (selectedKills) {
        switch (selectedKills) {
          case "zero":
            if (match.kills !== 0) return false;
            break;
          case "lessThan5":
            if (match.kills >= 5) return false;
            break;
          case "moreThan10":
            if (match.kills <= 10) return false;
            break;
        }
      }

      if (selectedAssists) {
        switch (selectedAssists) {
          case "zero":
            if (match.assists !== 0) return false;
            break;
          case "lessThan5":
            if (match.assists >= 5) return false;
            break;
          case "moreThan10":
            if (match.assists <= 10) return false;
            break;
        }
      }

      // Apply RecentMatches filters
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
  }, [
    matches,
    selectedLength,
    selectedHero,
    selectedDeath,
    selectedKills,
    selectedAssists,
    activeFilters,
  ]);

  const currentMatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMatches, currentPage]);

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

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

  return {
    currentPage,
    setCurrentPage,
    activeFilters,
    toggleFilter,
    currentMatches,
    totalPages,
    isWin,
    getTeamImage,
    getHeroName,
    filteredMatches,
  };
};
