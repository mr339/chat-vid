import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose }) => {
  const t = useTranslations("StatsPages");
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const gameLengthOptions = [
    { value: "under20", label: "Under 20 minutes" },
    { value: "20to40", label: "20 - 40 minutes" },
    { value: "40to60", label: "40 - 60 minutes" },
    { value: "over60", label: "Over 60 minutes" },
  ];

  const heroOptions = [
    { value: "antimage", label: "Anti-Mage" },
    { value: "axe", label: "Axe" },
    { value: "necro", label: "Necrophos" },
    { value: "undying", label: "Undying" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] bg-background text-foreground">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-bold">
            {t("searchFilters")}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 flex space-x-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{t("gameLength")}</h3>
            <div className="space-y-2">
              {gameLengthOptions.map((option) => (
                <div
                  key={option.value}
                  className="block"
                  onClick={() => setSelectedLength(option.value)}
                >
                  <span
                    className={`py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
                      selectedLength === option.value ? "text-primary" : ""
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{t("hero")}</h3>
            <div className="space-y-2">
              {heroOptions.map((option) => (
                <div
                  key={option.value}
                  className="block"
                  onClick={() => setSelectedHero(option.value)}
                >
                  <span
                    className={`py-2 px-4 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
                      selectedHero === option.value ? "text-primary" : ""
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button onClick={onClose}>{t("apply")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;
