"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Loader2 } from "lucide-react";

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
  isLoading: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
  handleSearch,
  handleReset,
  isLoading,
}) => {
  const t = useTranslations("StatsPages");

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-r-none bg-background text-foreground border-r-0"
              disabled={isLoading}
            >
              {t(searchType)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSearchType("steamId")}>
              {t("steamId")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchType("username")}>
              {t("username")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-input text-foreground rounded-r-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            disabled={isLoading}
          />
          {searchTerm && !isLoading && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={handleReset}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin absolute right-3 top-1/2 transform -translate-y-1/2" />
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchSection;
