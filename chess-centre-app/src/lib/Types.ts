export enum Structure {
  Swiss = "swiss",
  RoundRobin = "round-robin",
  Knockout = "knockout",
}

export enum SectionName {
  All = 0,
  Open = 1,
  Major = 2,
  Intermediate = 3,
  Minor = 4,
}

export interface Meta {
  description: string;
  prizeGiving: string,
  nextRoundTime: any,
}

export interface Settings {
  eventStructure: Structure;
  sections: number;
  currentRound: number;
  totalRounds: number;
  roundLive: Boolean;
  showAll: Boolean;
  showPreviousRound: Boolean;
}

export interface ManagedEvent {
  name: string;
  eventId: string;
  meta: Meta;
  settings: Settings;
  players: Player[];
  pairings: Pairing[];
  results: Result[];
}

export type Pairing = {
  round: number;
  pairings: [number, number][];
};

export type Player = {
  id: number;
  memberId: string | null;
  rating: number | null;
  ratingType: string | null;
};

export type Result = {
  round: number;
  pairResults: [number | null, number | null][];
};

export type Section = {
  section: number;
  scores: Result[];
};
