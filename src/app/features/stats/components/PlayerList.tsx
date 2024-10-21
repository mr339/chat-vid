import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Player } from "@/app/features/stats/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PlayerListProps {
  players: Player[];
  onSelectPlayer: (player: Player) => void;
}

const ITEMS_PER_PAGE = 6;

const PlayerList: React.FC<PlayerListProps> = ({ players, onSelectPlayer }) => {
  const t = useTranslations("StatsPages");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlayers = players.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-foreground">
        {t("searchResults")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {currentPlayers.map((player) => (
          <Card
            key={player.account_id}
            className="overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/25 cursor-pointer"
            onClick={() => onSelectPlayer(player)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={player.avatarfull}
                  alt={player.personaname}
                  className="w-16 h-16 rounded-full border-2 border-primary"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {player.personaname}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ID: {player.account_id}
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              >
                {t("viewStats")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`cursor-pointer text-foreground hover:text-primary ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
                className={`cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`cursor-pointer text-foreground hover:text-primary ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PlayerList;
