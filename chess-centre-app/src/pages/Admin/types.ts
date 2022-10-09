export type MemberItem = {
  id: string | null;
  name: string | null;
  timeStamp: number;
  ecfId: string;
};

export type Rating = {
  rating: string;
  value: string;
  sort: number;
  isPartial: boolean | null;
  key: string;
  seed?: number;
};

export type Entry = {
  id: string;
  section: string;
  memberId: string;
  name: string;
  ratingInfo: Rating;
};

export type Section = {
  section: string;
  title: string;
  icon: string;
};

export type Pairing = {
  round: number;
  pairings: Array<[number, number] | []>;
};

export type SectionPairings = {
  section: string,
  count: number,
  pairings: Pairing[]
}