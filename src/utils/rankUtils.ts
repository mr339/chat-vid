export const getRankImage = (rank_tier: number | null): string => {
  if (rank_tier === null) return "/images/medals/unranked.png";
  const tier = Math.floor(rank_tier / 10);
  const stars = rank_tier % 10;
  const tierNames = [
    "herald",
    "guardian",
    "crusader",
    "archon",
    "legend",
    "ancient",
    "divine",
    "immortal",
  ];
  return `/images/medals/${tierNames[tier - 1]}${stars}.png`;
};

export const getRankName = (rank_tier: number | null): string => {
  if (rank_tier === null) return "Unranked";
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
