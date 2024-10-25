import { useMemo } from "react";
import { RecentMatch } from "@/types/opendota";
import { useFilterStore } from "@/stores/filterStore";

export const useFilteredMatches = (matches: RecentMatch[]) => {
  const {
    selectedLength,
    selectedHero,
    selectedDeath,
    selectedKills,
    selectedAssists,
  } = useFilterStore();

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Game Length Filter
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

      // Hero Filter
      if (selectedHero !== null && match.hero_id !== selectedHero) {
        return false;
      }

      // Death Filter
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

      // Kills Filter
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

      // Assists Filter
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

      return true;
    });
  }, [
    matches,
    selectedLength,
    selectedHero,
    selectedDeath,
    selectedKills,
    selectedAssists,
  ]);

  return filteredMatches;
};
