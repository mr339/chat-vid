import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilterPopup } from "@/hooks/useFilterPopup.hook";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose }) => {
  const {
    selectedLength,
    setSelectedLength,
    selectedHero,
    setSelectedHero,
    selectedDeath,
    setSelectedDeath,
    selectedKills,
    setSelectedKills,
    selectedAssists,
    setSelectedAssists,
    heroSearch,
    setHeroSearch,
    filteredHeroes,
    gameLengthOptions,
    statOptions,
  } = useFilterPopup();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-background text-foreground">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-bold">
            Search filters
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 flex flex-wrap gap-4">
          {/* Game Length Filter */}
          <div className="flex-1 min-w-[120px]">
            <h3 className="text-base font-semibold mb-2">GAME LENGTH</h3>
            <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 mb-2"></div>
            <div className="space-y-2 pl-1">
              {gameLengthOptions.map((option) => (
                <div
                  key={option.value}
                  className="block"
                  onClick={() => setSelectedLength(option.value)}
                >
                  <span
                    className={`py-1.5 px-3 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
                      selectedLength === option.value ? "text-primary" : ""
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Filter */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-base font-semibold mb-2">HERO</h3>
            <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 mb-2"></div>
            <Input
              type="text"
              placeholder="Search heroes..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              className="mb-2"
            />
            <div className="space-y-2 pl-1 max-h-40 overflow-y-auto">
              {filteredHeroes.map((hero) => (
                <div
                  key={hero.id}
                  className="block"
                  onClick={() => setSelectedHero(hero.id)}
                >
                  <span
                    className={`py-1.5 px-3 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
                      selectedHero === hero.id ? "text-primary" : ""
                    }`}
                  >
                    {hero.localized_name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Death, Kills, and Assists Filters */}
          {["DEATH", "KILLS", "ASSISTS"].map((stat) => (
            <div key={stat} className="flex-1 min-w-[120px]">
              <h3 className="text-base font-semibold mb-2">{stat}</h3>
              <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 mb-2"></div>
              <div className="space-y-2 pl-1">
                {statOptions.map((option) => (
                  <div
                    key={option.value}
                    className="block"
                    onClick={() => {
                      if (stat === "DEATH") setSelectedDeath(option.value);
                      if (stat === "KILLS") setSelectedKills(option.value);
                      if (stat === "ASSISTS") setSelectedAssists(option.value);
                    }}
                  >
                    <span
                      className={`py-1.5 px-3 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
                        (stat === "DEATH" && selectedDeath === option.value) ||
                        (stat === "KILLS" && selectedKills === option.value) ||
                        (stat === "ASSISTS" && selectedAssists === option.value)
                          ? "text-primary"
                          : ""
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-2">
          <Button onClick={onClose} size="sm" className="text-sm">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;
