/**
 * This function extract a set of platforms from a list the videogames.
 * @param {*} videogames array of videogames
 */
function extractPlatformsFromVideogames(videogames) {
  let platformsSet = [];
  for (const game of videogames) {
    game.platforms.forEach((element) => {
      if (!platformsSet.some((platform) => platform === element))
        platformsSet.push(element);
    });
  }
  return [...platformsSet];
}

module.exports = { extractPlatformsFromVideogames };
