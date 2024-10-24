import { useState } from "react";
import { Player } from "@/types/opendota";

interface UsePlayerListProps {
  players: Player[];
}

const ITEMS_PER_PAGE = 6;

export const usePlayerList = ({ players }: UsePlayerListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlayers = players.slice(startIndex, endIndex);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentPlayers,
    ITEMS_PER_PAGE,
  };
};
