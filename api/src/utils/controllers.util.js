/**
 * This function extract a set of platforms from a list the videogames.
 * @param {*} videogames array of videogames
 */
function extractPlatformsFromVideogames(videogames) {
  let platformsSet = [];
  for (const game of videogames) {
    game.platforms.forEach((element) => {
      if (!platformsSet.some((platform) => platform.id === element.platform.id))
        platformsSet.push(element.platform);
    });
  }
  return [...platformsSet];
}

module.exports = { extractPlatformsFromVideogames };
