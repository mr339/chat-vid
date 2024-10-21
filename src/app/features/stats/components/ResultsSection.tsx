import React from "react";
import PlayerList from "@/app/features/stats/components/PlayerList";
import PlayerDetails from "@/app/features/stats/components/PlayerDetails";
import { Player } from "@/app/features/stats/types";

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
  return (
    <div className="mt-4">
      {searchResults.length > 0 && !selectedPlayer && (
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
