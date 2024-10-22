// This is a placeholder. You should replace this with actual hero data.
const heroes: { [key: number]: { name: string; image: string } } = {
  1: { name: "Anti-Mage", image: "/images/heroes/anti-mage.png" },
  // Add more heroes...
};

export const getHeroName = (heroId: number) => {
  return heroes[heroId]?.name || "Unknown Hero";
};

export const getHeroImage = (heroId: number) => {
  return heroes[heroId]?.image || "/images/heroes/unknown.png";
};
