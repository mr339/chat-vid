import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Player } from "@/app/features/stats/types";
import { getPlayerProfile, getPlayerWinLoss } from "@/services/opendotaApi";
import ProfileOverview from "./ProfileOverview";
import { Loader2 } from "lucide-react";

interface PlayerDetailsProps {
  player: Player;
  onBack: () => void;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player, onBack }) => {
  const t = useTranslations("StatsPages");
  const [profile, setProfile] = useState<any>(null);
  const [winLoss, setWinLoss] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      setIsLoading(true);
      try {
        const [profileData, winLossData] = await Promise.all([
          getPlayerProfile(player.account_id.toString()),
          getPlayerWinLoss(player.account_id.toString()),
        ]);
        setProfile(profileData);
        setWinLoss(winLossData);
      } catch (error) {
        console.error("Error fetching player details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [player.account_id]);

  return (
    <div>
      <Button onClick={onBack} className="mb-4">
        {t("backToResults")}
      </Button>
      {isLoading ? (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-foreground">{t("loading")}</p>
        </div>
      ) : profile && winLoss ? (
        <ProfileOverview profile={profile} winLoss={winLoss} />
      ) : (
        <p className="text-foreground">{t("errorLoadingProfile")}</p>
      )}
    </div>
  );
};

export default PlayerDetails;
