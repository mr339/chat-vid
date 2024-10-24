import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { getRankImage, getRankName } from "../../../../utils/rankUtils";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";
import { formatLastMatchTime } from "../../../../utils/dateUtils";
import RecentMatches from "./RecentMatches";

interface ProfileOverviewProps {
  profile: {
    profile: {
      account_id: number;
      personaname: string;
      name: string | null;
      plus: boolean;
      cheese: number;
      steamid: string;
      avatar: string;
      avatarmedium: string;
      avatarfull: string;
      profileurl: string;
      last_login: string | null;
      loccountrycode: string | null;
      status: string | null;
      fh_unavailable: boolean;
      is_contributor: boolean;
      is_subscriber: boolean;
    };
    rank_tier: number | null;
    leaderboard_rank: number | null;
  };
  winLoss: {
    win: number;
    lose: number;
  };
  lastMatch: {
    match_id: number;
    start_time: number;
    hero_id: number;
    player_slot: number;
  } | null;
  recentMatches: any[]; // Add this prop
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile,
  winLoss,
  lastMatch,
  recentMatches, // Add this prop
}) => {
  const t = useTranslations("StatsPages");
  const [showRecentMatches, setShowRecentMatches] = useState(false);

  const totalGames = winLoss.win + winLoss.lose;
  const winRate =
    totalGames > 0 ? ((winLoss.win / totalGames) * 100).toFixed(2) : "0.00";

  const rankImageSrc = getRankImage(profile.rank_tier);
  const rankName = getRankName(profile.rank_tier);

  const toggleRecentMatches = () => {
    setShowRecentMatches(!showRecentMatches);
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-md dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.2),0_2px_4px_-2px_rgba(255,255,255,0.2)] relative">
      <div className="flex items-center mb-4">
        <img
          src={profile.profile.avatarfull}
          alt={profile.profile.personaname}
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {profile.profile.personaname}
          </h2>
          <p className="text-muted-foreground">
            ID: {profile.profile.account_id}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-foreground">
            {t("steamId")}: {profile.profile.steamid}
          </p>
          <div className="flex items-center mt-2">
            <Image
              src={rankImageSrc}
              alt={rankName}
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-foreground">{rankName}</span>
          </div>
        </div>
        <div>
          <p className="text-foreground">
            {t("country")}: {profile.profile.loccountrycode || t("unknown")}
          </p>
          <p className="text-foreground">
            {t("leaderboardRank")}:{" "}
            {profile.leaderboard_rank || t("notApplicable")}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-foreground">
          {t("totalGames")}: {totalGames}
        </p>
        <p className="text-foreground">
          {t("winRate")}: {winRate}%
        </p>
        {lastMatch && (
          <p className="text-foreground">
            {t("lastMatch")}: {formatLastMatchTime(lastMatch.start_time)}
          </p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          className="relative"
          variant="default"
          onClick={toggleRecentMatches}
        >
          {showRecentMatches ? t("hideDetails") : t("moreDetails")}
        </Button>
      </div>

      <div className="mt-2 mb-2">
        {showRecentMatches && <RecentMatches matches={recentMatches} />}
      </div>
    </div>
  );
};

export default ProfileOverview;
