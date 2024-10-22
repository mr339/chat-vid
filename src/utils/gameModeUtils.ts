const gameModes: { [key: number]: string } = {
  1: "All Pick",
  2: "Captains Mode",
  // Add more game modes...
};

export const getGameModeName = (gameModeId: number) => {
  return gameModes[gameModeId] || "Unknown Mode";
};
