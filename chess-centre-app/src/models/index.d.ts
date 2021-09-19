import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class MailingList {
  readonly id: string;
  readonly email: string;
  readonly enabled: boolean;
  constructor(init: ModelInit<MailingList>);
  static copyOf(source: MailingList, mutator: (draft: MutableModel<MailingList>) => MutableModel<MailingList> | void): MailingList;
}

export declare class Broadcast {
  readonly id: string;
  readonly buttonName?: string;
  readonly isLive?: boolean;
  readonly description?: string;
  readonly name?: string;
  readonly pageUrl?: string;
  readonly dgtUrl?: string;
  constructor(init: ModelInit<Broadcast>);
  static copyOf(source: Broadcast, mutator: (draft: MutableModel<Broadcast>) => MutableModel<Broadcast> | void): Broadcast;
}

export declare class Result {
  readonly id: string;
  readonly pairings?: string;
  readonly results?: string;
  readonly players?: string;
  readonly eventID?: string;
  readonly name?: string;
  readonly complete?: boolean;
  readonly live?: boolean;
  readonly winner?: string;
  readonly dgtCloudUrl?: string;
  constructor(init: ModelInit<Result>);
  static copyOf(source: Result, mutator: (draft: MutableModel<Result>) => MutableModel<Result> | void): Result;
}

export declare class Game {
  readonly id: string;
  readonly eventName?: string;
  readonly date?: string;
  readonly whiteName?: string;
  readonly whiteRating?: number;
  readonly blackName?: string;
  readonly blackRating?: number;
  readonly round?: number;
  readonly event?: Event;
  readonly whiteMember?: Member;
  readonly blackMember?: Member;
  readonly result?: string;
  readonly type?: string;
  readonly pgn?: S3Object;
  readonly pgnStr?: string;
  readonly liChessUrl?: string;
  constructor(init: ModelInit<Game>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}

export declare class Event {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly rounds?: number;
  readonly time?: string;
  readonly type: EventType;
  readonly startDate: string;
  readonly endDate?: string;
  readonly entries?: Entry[];
  readonly games?: Game[];
  readonly maxEntries?: number;
  readonly entryCount?: number;
  readonly complete?: boolean;
  readonly cancelled?: boolean;
  readonly isLive?: boolean;
  readonly active?: string;
  readonly results?: (Result | null)[];
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

export declare class EventType {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly url?: string;
  readonly color?: string;
  readonly time?: string;
  readonly maxEntries?: number;
  readonly stripePriceId?: string;
  readonly timeControl?: string;
  readonly eventType?: string;
  readonly defaultPrice?: string;
  readonly canRegister?: boolean;
  constructor(init: ModelInit<EventType>);
  static copyOf(source: EventType, mutator: (draft: MutableModel<EventType>) => MutableModel<EventType> | void): EventType;
}

export declare class Entry {
  readonly id: string;
  readonly event?: Event;
  readonly member?: Member;
  constructor(init: ModelInit<Entry>);
  static copyOf(source: Entry, mutator: (draft: MutableModel<Entry>) => MutableModel<Entry> | void): Entry;
}

export declare class Member {
  readonly id: string;
  readonly about?: string;
  readonly fideId?: string;
  readonly ecfId?: string;
  readonly username?: string;
  readonly name?: string;
  readonly email?: string;
  readonly entries?: Entry[];
  readonly stripeCustomerId?: string;
  readonly stripeCurrentPeriodEnd?: number;
  readonly stripePriceId?: string;
  readonly stripeProductId?: string;
  readonly ecfRating?: string;
  readonly ecfRapid?: string;
  readonly ecfMembership?: string;
  readonly estimatedRating?: string;
  readonly club?: string;
  readonly gender?: string;
  readonly membershipType?: string;
  readonly gameInfo?: string;
  readonly ratingInfo?: string;
  readonly liChessUsername?: string;
  readonly liChessInfo?: string;
  readonly chesscomUsername?: string;
  readonly chesscomInfo?: string;
  constructor(init: ModelInit<Member>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

export declare class Plan {
  readonly id: string;
  readonly key: string;
  readonly stripePriceId: string;
  readonly stripeProductId: string;
  constructor(init: ModelInit<Plan>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan>) => MutableModel<Plan> | void): Plan;
}