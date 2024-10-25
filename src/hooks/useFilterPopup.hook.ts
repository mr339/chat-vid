import { useState, useEffect } from "react";
import { Hero } from "@/types/opendota";
import { getHeroes } from "@/services/opendotaApi";
import { useFilterStore, GameLength } from "@/stores/filterStore";

export const useFilterPopup = (isOpen: boolean) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroSearch, setHeroSearch] = useState("");

  const {
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
    resetFilters,
  } = useFilterStore();

  // Temporary state for filters
  const [tempLength, setTempLength] = useState<GameLength>(selectedLength);
  const [tempHero, setTempHero] = useState<number | null>(selectedHero);
  const [tempDeath, setTempDeath] = useState<string | null>(selectedDeath);
  const [tempKills, setTempKills] = useState<string | null>(selectedKills);
  const [tempAssists, setTempAssists] = useState<string | null>(
    selectedAssists
  );

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

  // Reset temporary state when the popup opens
  useEffect(() => {
    if (isOpen) {
      setTempLength(selectedLength);
      setTempHero(selectedHero);
      setTempDeath(selectedDeath);
      setTempKills(selectedKills);
      setTempAssists(selectedAssists);
    }
  }, [
    isOpen,
    selectedLength,
    selectedHero,
    selectedDeath,
    selectedKills,
    selectedAssists,
  ]);

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

  const handleApply = () => {
    setSelectedLength(tempLength);
    setSelectedHero(tempHero);
    setSelectedDeath(tempDeath);
    setSelectedKills(tempKills);
    setSelectedAssists(tempAssists);
  };

  const handleReset = () => {
    resetFilters();
    setTempLength(null);
    setTempHero(null);
    setTempDeath(null);
    setTempKills(null);
    setTempAssists(null);
    setHeroSearch("");
  };

  const handleRemoveFilter = (filterType: string) => {
    switch (filterType) {
      case "length":
        setTempLength(null);
        break;
      case "hero":
        setTempHero(null);
        break;
      case "death":
        setTempDeath(null);
        break;
      case "kills":
        setTempKills(null);
        break;
      case "assists":
        setTempAssists(null);
        break;
    }
  };

  return {
    heroSearch,
    setHeroSearch,
    filteredHeroes,
    gameLengthOptions,
    statOptions,
    tempLength,
    setTempLength,
    tempHero,
    setTempHero,
    tempDeath,
    setTempDeath,
    tempKills,
    setTempKills,
    tempAssists,
    setTempAssists,
    handleApply,
    handleReset,
    handleRemoveFilter,
  };
};
