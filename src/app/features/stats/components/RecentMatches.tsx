import React from "react";
import { useTranslations } from "next-intl";
import { RecentMatch } from "@app/features/stats/types";
import { formatDuration, formatTimeAgo } from "@utils/dateUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Image from "next/image";
import { getHeroName, getHeroImage } from "@utils/heroUtils";
import { getGameModeName } from "@utils/gameModeUtils";

interface RecentMatchesProps {
  matches: RecentMatch[];
}

const RecentMatches: React.FC<RecentMatchesProps> = ({ matches }) => {
  const t = useTranslations("StatsPages");

  const isWin = (match: RecentMatch) => {
    return match.player_slot < 128 === match.radiant_win;
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">{t("recentMatches")}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("hero")}</TableHead>
            <TableHead>{t("result")}</TableHead>
            <TableHead>{t("type")}</TableHead>
            <TableHead>{t("duration")}</TableHead>
            <TableHead>{t("kda")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.match_id}>
              <TableCell>
                <div className="flex items-center">
                  <Image
                    src={getHeroImage(match.hero_id)}
                    alt={getHeroName(match.hero_id)}
                    width={64}
                    height={36}
                    className="mr-2"
                  />
                  <div>
                    <div className="font-medium text-foreground">
                      {getHeroName(match.hero_id)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {/* {t("rankTier", { rank: match.rank_tier || t("unknown") })} */}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div
                  className={isWin(match) ? "text-green-500" : "text-red-500"}
                >
                  {isWin(match) ? t("wonMatch") : t("lostMatch")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatTimeAgo(match.start_time)}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-foreground">
                  {getGameModeName(match.game_mode)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {t("allPick")}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-foreground">
                  {formatDuration(match.duration)}
                </div>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentMatches;
