import { useState, useEffect } from "react";
import { Hero } from "@/types/opendota";
import { getHeroes } from "@/services/opendotaApi";

export const useFilterPopup = () => {
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedHero, setSelectedHero] = useState<number | null>(null);
  const [selectedDeath, setSelectedDeath] = useState<string | null>(null);
  const [selectedKills, setSelectedKills] = useState<string | null>(null);
  const [selectedAssists, setSelectedAssists] = useState<string | null>(null);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroSearch, setHeroSearch] = useState("");

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroData = await getHeroes();
        setHeroes(heroData);
      } catch (error) {
        console.error("Failed to fetch heroes:", error);
      }
    };
    fetchHeroes();
  }, []);

  const filteredHeroes = heroes.filter((hero) =>
    hero.localized_name.toLowerCase().includes(heroSearch.toLowerCase())
  );

  const gameLengthOptions = [
    { value: "under20", label: "Under 20 minutes" },
    { value: "20to40", label: "20 - 40 minutes" },
    { value: "40to60", label: "40 - 60 minutes" },
    { value: "over60", label: "Over 60 minutes" },
  ];

  const statOptions = [
    { value: "zero", label: "Zero" },
    { value: "lessThan5", label: "Less than 5" },
    { value: "moreThan10", label: "More than 10" },
  ];

  return {
    selectedLength,
    setSelectedLength,
    selectedHero,
    setSelectedHero,
    selectedDeath,
    setSelectedDeath,
    selectedKills,
    setSelectedKills,
    selectedAssists,
    setSelectedAssists,
    heroes,
    heroSearch,
    setHeroSearch,
    filteredHeroes,
    gameLengthOptions,
    statOptions,
  };
};
