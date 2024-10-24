import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Player } from "@/types/opendota";
import ProfileOverview from "./ProfileOverview";
import { Loader2 } from "lucide-react";
import { usePlayerDetails } from "@/hooks/usePlayerDetails.hook";

interface PlayerDetailsProps {
  player: Player;
  onBack: () => void;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player, onBack }) => {
  const t = useTranslations("StatsPages");
  const { profile, winLoss, lastMatch, recentMatches, isLoading } =
    usePlayerDetails({ player });

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
        <ProfileOverview
          profile={profile}
          winLoss={winLoss}
          lastMatch={lastMatch}
          recentMatches={recentMatches}
        />
      ) : (
        <p className="text-foreground">{t("errorLoadingProfile")}</p>
      )}
    </div>
  );
};

export default PlayerDetails;
