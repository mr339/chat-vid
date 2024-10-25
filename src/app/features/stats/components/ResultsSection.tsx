import React from "react";
import PlayerList from "@/app/features/stats/components/PlayerList";
import PlayerDetails from "@/app/features/stats/components/PlayerDetails";
import { Player } from "@/app/features/stats/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ResultsSectionProps {
  searchResults: Player[];
  selectedPlayer: Player | null;
  setSelectedPlayer: (player: Player | null) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  searchResults,
  selectedPlayer,
  setSelectedPlayer,
}) => {
  const t = useTranslations("StatsPages");

  if (searchResults.length === 0) {
    return (
      <div className="mt-4 text-center py-8">
        <Image
          src="/images/notFound.png"
          alt="No players found"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-4 text-foreground">
          {t("searchResults")}
        </h2>
        <p className="text-lg text-muted-foreground">{t("noPlayersFound")}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {!selectedPlayer && (
        <PlayerList
          players={searchResults}
          onSelectPlayer={setSelectedPlayer}
        />
      )}
      {selectedPlayer && (
        <PlayerDetails
          player={selectedPlayer}
          onBack={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
};

export default ResultsSection;
