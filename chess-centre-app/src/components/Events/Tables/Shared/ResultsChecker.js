export const resultCheck = (boardPairings, players, results, settings) => {

  const resultBySeed = [];
  boardPairings.slice(0, settings.currentRound).forEach(({ round, pairings }) => {
    const pairingResults = results.find((r) => r.round === round).pairResults;
    pairings.forEach((board, index) => {
      const whitePlayer = board[0];
      const blackPlayer = board[1];
      const whiteResultOfSeed = pairingResults[index][0];
      const blackResultOfSeed = pairingResults[index][1];
      resultBySeed.push(
        {
          seed: whitePlayer,
          result: whiteResultOfSeed,
          opponent: blackPlayer,
          color: 'W',
          round,
        },
        {
          seed: blackPlayer,
          result: blackResultOfSeed,
          opponent: whitePlayer,
          color: 'B',
          round,
        }
      );
    });
  });

  const allRounds = resultBySeed.reduce((player, { seed, result, opponent, color }) => {
    if (!player[seed]) {
      const p = players.find((p) => p.seed === seed);
      player[seed] = {
        rounds: [result],
        seed,
        opponents: [opponent],
        colors: [color],
        total: result || 0,
        name: p.name,
        rating: p.ratingInfo.rating,
        title: p.title ? p.title : "",
      };
    } else {    
      player[seed].rounds.push(result);
      player[seed].opponents.push(opponent);
      player[seed].colors.push(color);
      player[seed].total += result || 0;
    }

    return player;
  }, {});

  const roundByRound = Object.values(allRounds)
              .sort((a, b) => Number(b.total) - Number(a.total));

  return { resultBySeed, roundByRound };
};