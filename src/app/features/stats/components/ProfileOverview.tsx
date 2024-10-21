import React from "react";
import { useTranslations } from "next-intl";

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
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile,
  winLoss,
}) => {
  const t = useTranslations("StatsPages");
  const totalGames = winLoss.win + winLoss.lose;
  const winRate =
    totalGames > 0 ? ((winLoss.win / totalGames) * 100).toFixed(2) : "0.00";

  const getRankTier = (rank_tier: number | null) => {
    if (rank_tier === null) return t("unranked");
    const tier = Math.floor(rank_tier / 10);
    const stars = rank_tier % 10;
    const tierNames = [
      "Herald",
      "Guardian",
      "Crusader",
      "Archon",
      "Legend",
      "Ancient",
      "Divine",
      "Immortal",
    ];
    return `${tierNames[tier - 1]} ${stars}`;
  };

  return (
    <div className="bg-background p-6 rounded-lg shadow-md">
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
          <p className="text-foreground">
            {t("rank")}: {getRankTier(profile.rank_tier)}
          </p>
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
      </div>
    </div>
  );
};

export default ProfileOverview;
