import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFilterPopup } from "@/hooks/useFilterPopup.hook";
import { X, Check } from "lucide-react";
import { GameLength } from "@/stores/filterStore";

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ isOpen, onClose }) => {
  const {
    heroSearch,
    setHeroSearch,
    filteredHeroes,
    gameLengthOptions,
    statOptions,
    tempLength,
    setTempLength,
    tempHero,
    setTempHero,
    tempDeath,
    setTempDeath,
    tempKills,
    setTempKills,
    tempAssists,
    setTempAssists,
    handleApply,
    handleReset,
    handleRemoveFilter,
  } = useFilterPopup(isOpen);

  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  const onApply = () => {
    handleApply();
    onClose();
  };

  const onReset = () => {
    handleReset();
  };

  const renderFilterOption = (
    label: string,
    isSelected: boolean,
    onClick: () => void,
    onRemove: () => void,
    filterType: string
  ) => (
    <div
      className="block relative"
      onClick={onClick}
      onMouseEnter={() => setHoveredFilter(filterType)}
      onMouseLeave={() => setHoveredFilter(null)}
    >
      <span
        className={`py-1.5 px-3 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors rounded block ${
          isSelected ? "text-primary" : ""
        }`}
      >
        <span className="flex items-center justify-between">
          <span className="mr-2">{label}</span>
          {isSelected &&
            (hoveredFilter === filterType ? (
              <X
                className="h-4 w-4 text-red-500 flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
              />
            ) : (
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
            ))}
        </span>
      </span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[950px] w-[120%] bg-background text-foreground">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-xl font-bold">
            Search filters
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 flex flex-wrap gap-4">
          {/* Game Length Filter */}
          <div className="flex-[1.3] min-w-[180px]">
            <h3 className="text-base font-semibold mb-2">GAME LENGTH</h3>
            <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 mb-2"></div>
            <div className="space-y-2 pl-1">
              {gameLengthOptions.map((option) =>
                renderFilterOption(
                  option.label,
                  tempLength === option.value,
                  () => setTempLength(option.value as GameLength),
                  () => handleRemoveFilter("length"),
                  `length-${option.value}`
                )
              )}
            </div>
          </div>

          {/* Hero Filter */}
          <div className="flex-[0.9] min-w-[180px]">
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
              {filteredHeroes.map((hero) =>
                renderFilterOption(
                  hero.localized_name,
                  tempHero === hero.id,
                  () => setTempHero(hero.id),
                  () => handleRemoveFilter("hero"),
                  `hero-${hero.id}`
                )
              )}
            </div>
          </div>

          {/* Death, Kills, and Assists Filters */}
          {["DEATH", "KILLS", "ASSISTS"].map((stat) => (
            <div key={stat} className="flex-1 min-w-[140px]">
              <h3 className="text-base font-semibold mb-2">{stat}</h3>
              <div className="w-full h-0.5 bg-gray-400 dark:bg-gray-600 mb-2"></div>
              <div className="space-y-2 pl-1">
                {statOptions.map((option) =>
                  renderFilterOption(
                    option.label,
                    (stat === "DEATH" && tempDeath === option.value) ||
                      (stat === "KILLS" && tempKills === option.value) ||
                      (stat === "ASSISTS" && tempAssists === option.value),
                    () => {
                      if (stat === "DEATH") setTempDeath(option.value);
                      if (stat === "KILLS") setTempKills(option.value);
                      if (stat === "ASSISTS") setTempAssists(option.value);
                    },
                    () => handleRemoveFilter(stat.toLowerCase()),
                    `${stat.toLowerCase()}-${option.value}`
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-2">
          <Button
            onClick={onReset}
            size="sm"
            className="text-sm"
            variant="outline"
          >
            Reset
          </Button>
          <Button onClick={onApply} size="sm" className="text-sm">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPopup;
