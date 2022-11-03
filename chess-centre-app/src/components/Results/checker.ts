export type RatingInfo = {
  eventRating: number,
  isPartial?: boolean,
  key: string,
  rating: number,
  sort: number,
  value: number 
}

export type Player = {
  chessResulsSeed?: number,
  seed?: number,
  crName?: string,
  id: number,
  memberId: string,
  name: string,
  ratingInfo: RatingInfo,
  section: string, 
}

export type Perf = {
  average: string,
  tpr: string,
  games: number
}

export type RoundObj = {
  rounds: number[],
  chessResulsSeed?: number,
  seed?: number,
  colors: string[],
  memberId: string,
  name: string,
  opponents: number[],
  rating: number | string,
  title: string,
  total: number
  details: Player[]
  perf: Perf
}

export const resultCheckCongress = (boardPairings, players: any[], results: any[], settings) => {
  const resultBySeed: any[] = [];
  boardPairings
    .slice(0, settings.currentRound)
    .forEach(({ round, pairings }) => {
      const pairingResults = results.find((r) => r.round === round).pairResults;
      pairings.forEach((board, index) => {
        const whitePlayer = board[0];
        const blackPlayer = board[1];
        const whiteResultOfSeed = pairingResults[index][0];
        const blackResultOfSeed = pairingResults[index][1];
        resultBySeed.push(
          {
            chessResulsSeed: whitePlayer,
            result: whiteResultOfSeed,
            opponent: blackPlayer,
            color: "W",
            round,
          },
          {
            chessResulsSeed: blackPlayer,
            result: blackResultOfSeed,
            opponent: whitePlayer,
            color: "B",
            round,
          }
        );
      });
    });

  const allRounds = resultBySeed.reduce(
    (player, { result, opponent, color, chessResulsSeed }) => {
      const o = players.find(p => p.chessResulsSeed === opponent);
      if (!player[chessResulsSeed]) {
        const p = players.find((p) => p.chessResulsSeed === chessResulsSeed);
        if (p) {
          player[chessResulsSeed] = {
            rounds: [result],
            chessResulsSeed,
            opponents: [opponent],
            details: [o],
            colors: [color],
            total: result || 0,
            name: p.name,
            memberId: p.memberId,
            rating: p.ratingInfo.rating,
            title: p.title ? p.title : "",
          };
        }
      } else {   
        player[chessResulsSeed].rounds.push(result);
        player[chessResulsSeed].opponents.push(opponent);
        player[chessResulsSeed].details.push(o);
        player[chessResulsSeed].colors.push(color);
        player[chessResulsSeed].total += result || 0;
      }
      return player;
    },
    {}
  );

  const roundByRound = Object.values(allRounds).sort(
    (a: any, b:any) => Number(b.total) - Number(a.total)
  );
  return { resultBySeed, roundByRound: roundByRound as RoundObj[] } 
};

export const resultCheck = (boardPairings, players: any[], results: any[], settings) => {

  const resultBySeed: any[] = [];
  boardPairings
    .slice(0, settings.currentRound)
    .forEach(({ round, pairings }) => {
      const pairingResults = results.find((r) => r.round === round).pairResults;
      pairings.forEach((board: any, index: number) => {
        const whitePlayer = board[0];
        const blackPlayer = board[1];
        const whiteResultOfSeed = pairingResults[index][0];
        const blackResultOfSeed = pairingResults[index][1];
        resultBySeed.push(
          {
            seed: whitePlayer,
            result: whiteResultOfSeed,
            opponent: blackPlayer,
            color: "W",
            round,
          },
          {
            seed: blackPlayer,
            result: blackResultOfSeed,
            opponent: whitePlayer,
            color: "B",
            round,
          }
        );
      });
    });

  const allRounds = resultBySeed.reduce(
    (player, { seed, result, opponent, color }) => {
      const o = players.find((p) => p.seed === opponent);
      if (!player[seed]) {
        const p = players.find((p) => p.seed === seed);
        if (p) {
          player[seed] = {
            rounds: [result],
            seed,
            opponents: [opponent],
            details: [o],
            colors: [color],
            total: result || 0,
            name: p.name,
            memberId: p.memberId,
            rating: p.ratingInfo.rating,
            title: p.title ? p.title : "",
          };
        }
      } else {
        player[seed].rounds.push(result);
        player[seed].opponents.push(opponent);
        player[seed].details.push(o);
        player[seed].colors.push(color);
        player[seed].total += result || 0;
      }

      return player;
    },
    {}
  );

  const roundByRound = Object.values(allRounds).sort(
    (a: any, b: any) => Number(b.total) - Number(a.total)
  );

  return { resultBySeed, roundByRound: roundByRound as RoundObj[] } 
};
