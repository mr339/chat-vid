import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { RecentMatch, Hero } from "@/types/opendota";
import { formatDuration, formatTimeAgo } from "@/utils/dateUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGameModeName, isRankedMode } from "@/utils/gameModeUtils";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useRecentMatches } from "@/hooks/useRecentMatches.hook";
import { SlidersHorizontal } from "lucide-react";
import FilterPopup from "./FilterPopup";

interface RecentMatchesProps {
  matches: RecentMatch[];
  heroes: Hero[];
}

const RecentMatches: React.FC<RecentMatchesProps> = ({ matches, heroes }) => {
  const t = useTranslations("StatsPages");
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const {
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
  } = useRecentMatches({ matches, heroes });

  return (
    <div className="mt-6 text-foreground">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        {t("recentMatches")}
      </h3>
      <div className="flex items-center justify-between mb-4 overflow-x-auto">
        <div className="flex space-x-1">
          {["wins", "losses", "radiant", "dire", "ranked", "unranked"].map(
            (filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                onClick={() => toggleFilter(filter)}
                className={`px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                  activeFilters.includes(filter)
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {t(filter)}
              </Button>
            )
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 text-xs font-medium transition-colors duration-200 whitespace-nowrap"
          onClick={() => setIsFilterPopupOpen(true)}
        >
          <SlidersHorizontal className="mr-1 h-3 w-3" />
          {t("filters")}
        </Button>
      </div>
      {filteredMatches.length > 0 ? (
        <>
          <Table className="border-collapse border border-gray-200 dark:border-gray-700">
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableHead className="text-foreground">{t("team")}</TableHead>
                <TableHead className="text-foreground">{t("hero")}</TableHead>
                <TableHead className="text-foreground">{t("result")}</TableHead>
                <TableHead className="text-foreground">{t("type")}</TableHead>
                <TableHead className="text-foreground">
                  {t("duration")}
                </TableHead>
                <TableHead className="text-foreground">{t("kda")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMatches.map((match) => {
                const gameModeName = getGameModeName(match.game_mode);
                const isRanked = isRankedMode(match.game_mode);
                return (
                  <TableRow
                    key={match.match_id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="text-foreground">
                      <div className="flex items-center justify-center">
                        <Image
                          src={getTeamImage(match.player_slot)}
                          alt={match.player_slot < 128 ? "Radiant" : "Dire"}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {getHeroName(match.hero_id)}
                    </TableCell>
                    <TableCell>
                      <div
                        className={
                          isWin(match) ? "text-green-500" : "text-red-500"
                        }
                      >
                        {isWin(match) ? t("wonMatch") : t("lostMatch")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTimeAgo(match.start_time)}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      <div>{gameModeName}</div>
                      <div className="text-sm text-muted-foreground">
                        {isRanked ? t("ranked") : t("unranked")}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">
                      {formatDuration(match.duration)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-green-500">{match.kills}</span>
                        <span className="text-foreground mx-1">/</span>
                        <span className="text-red-500">{match.deaths}</span>
                        <span className="text-foreground mx-1">/</span>
                        <span className="text-blue-500">{match.assists}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
        </>
      ) : (
        <div className="text-center py-8 text-foreground">
          <Image
            src="/images/notFound.png"
            alt="No matches found"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <p className="text-lg font-semibold">{t("noMatchesFound")}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {t("tryDifferentFilters")}
          </p>
        </div>
      )}
      <FilterPopup
        isOpen={isFilterPopupOpen}
        onClose={() => setIsFilterPopupOpen(false)}
      />
    </div>
  );
};

export default RecentMatches;
