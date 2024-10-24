"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import SearchSection from "./components/SearchSection";
import ResultsSection from "./components/ResultsSection";
import { Player } from "./types";
import { searchPlayers } from "@/services/opendotaApi";

const StatsPage: React.FC = () => {
  const t = useTranslations("StatsPages");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("steamId");
  const [searchResults, setSearchResults] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      const results = await searchPlayers(searchTerm);
      setSearchResults(results);
      setSelectedPlayer(null);
    } catch (error) {
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchResults([]);
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground text-center mb-8">
          {t("title")}
        </h1>

        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
          handleSearch={handleSearch}
          handleReset={handleReset}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-foreground">{t("loading")}</p>
          </div>
        )}

        {!isLoading && (
          <ResultsSection
            searchResults={searchResults}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        )}
      </div>
    </div>
  );
};

export default StatsPage;
