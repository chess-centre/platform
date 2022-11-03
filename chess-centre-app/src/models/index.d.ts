import { ModelInit, MutableModel } from "@aws-amplify/datastore";

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
  readonly buttonName?: string | null;
  readonly isLive?: boolean | null;
  readonly description?: string | null;
  readonly name?: string | null;
  readonly pageUrl?: string | null;
  readonly dgtUrl?: string | null;
  constructor(init: ModelInit<Broadcast>);
  static copyOf(source: Broadcast, mutator: (draft: MutableModel<Broadcast>) => MutableModel<Broadcast> | void): Broadcast;
}

export declare class External {
  readonly id: string;
  readonly event?: Event | null;
  readonly chessdotcom?: string | null;
  readonly lichess?: string | null;
  readonly chess24?: string | null;
  readonly chessresults?: string | null;
  readonly dgtlive?: string | null;
  readonly ecfratings?: string | null;
  readonly ecflms?: string | null;
  constructor(init: ModelInit<External>);
  static copyOf(source: External, mutator: (draft: MutableModel<External>) => MutableModel<External> | void): External;
}

export declare class Event {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly rounds?: number | null;
  readonly time?: string | null;
  readonly type: EventType;
  readonly startDate: string;
  readonly endDate?: string | null;
  readonly entries?: Entry[] | null;
  readonly games?: Game[] | null;
  readonly maxEntries?: number | null;
  readonly entryCount?: number | null;
  readonly complete?: boolean | null;
  readonly cancelled?: boolean | null;
  readonly isLive?: boolean | null;
  readonly isLiveUrl?: string | null;
  readonly isJunior?: boolean | null;
  readonly active?: string | null;
  readonly multipleSections?: boolean | null;
  readonly results?: (Result | null)[] | null;
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

export declare class EventType {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly url?: string | null;
  readonly color?: string | null;
  readonly time?: string | null;
  readonly maxEntries?: number | null;
  readonly stripePriceId?: string | null;
  readonly timeControl?: string | null;
  readonly eventType?: string | null;
  readonly defaultPrice?: string | null;
  readonly canRegister?: boolean | null;
  readonly memberEntry?: boolean | null;
  constructor(init: ModelInit<EventType>);
  static copyOf(source: EventType, mutator: (draft: MutableModel<EventType>) => MutableModel<EventType> | void): EventType;
}

export declare class Entry {
  readonly id: string;
  readonly section?: string | null;
  readonly byes?: string | null;
  readonly event?: Event | null;
  readonly member?: Member | null;
  constructor(init: ModelInit<Entry>);
  static copyOf(source: Entry, mutator: (draft: MutableModel<Entry>) => MutableModel<Entry> | void): Entry;
}

export declare class Member {
  readonly id: string;
  readonly about?: string | null;
  readonly fideId?: string | null;
  readonly ecfId?: string | null;
  readonly username?: string | null;
  readonly name?: string | null;
  readonly firstName?: string | null;
  readonly surname?: string | null;
  readonly email?: string | null;
  readonly entries?: Entry[] | null;
  readonly stripeCustomerId?: string | null;
  readonly stripeCurrentPeriodEnd?: number | null;
  readonly stripePriceId?: string | null;
  readonly stripeProductId?: string | null;
  readonly stripeFriendlyProductName?: string | null;
  readonly ecfRating?: string | null;
  readonly ecfRapid?: string | null;
  readonly fideRating?: string | null;
  readonly ecfMembership?: string | null;
  readonly ecfRapidPartial?: boolean | null;
  readonly ecfRatingPartial?: boolean | null;
  readonly estimatedRating?: string | null;
  readonly chessTitle?: string | null;
  readonly club?: string | null;
  readonly gender?: string | null;
  readonly membershipType?: string | null;
  readonly gameInfo?: string | null;
  readonly ratingInfo?: string | null;
  readonly liChessUsername?: string | null;
  readonly liChessInfo?: string | null;
  readonly chesscomUsername?: string | null;
  readonly chesscomInfo?: string | null;
  readonly chesscomLastUpdated?: number | null;
  readonly lichessLastUpdated?: number | null;
  readonly ecfLastUpdated?: number | null;
  readonly isJunior?: boolean | null;
  constructor(init: ModelInit<Member>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

export declare class Game {
  readonly id: string;
  readonly eventName?: string | null;
  readonly date?: string | null;
  readonly whiteName?: string | null;
  readonly whiteRating?: number | null;
  readonly blackName?: string | null;
  readonly blackRating?: number | null;
  readonly round?: number | null;
  readonly event?: Event | null;
  readonly whiteMember?: Member | null;
  readonly blackMember?: Member | null;
  readonly result?: string | null;
  readonly type?: string | null;
  readonly pgn?: S3Object | null;
  readonly pgnStr?: string | null;
  readonly liChessUrl?: string | null;
  constructor(init: ModelInit<Game>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}

export declare class Result {
  readonly id: string;
  readonly resultInfo?: string | null;
  readonly event?: Event | null;
  readonly eventType?: string | null;
  readonly name?: string | null;
  readonly complete?: boolean | null;
  readonly isLive?: boolean | null;
  readonly winners?: string | null;
  readonly dgtCloudUrl?: string | null;
  readonly ecfLMSUrl?: string | null;
  readonly chess24Url?: string | null;
  readonly chessDotComUrl?: string | null;
  readonly externalId?: string | null;
  readonly external?: External | null;
  constructor(init: ModelInit<Result>);
  static copyOf(source: Result, mutator: (draft: MutableModel<Result>) => MutableModel<Result> | void): Result;
}

export declare class Plan {
  readonly id: string;
  readonly key: string;
  readonly stripePriceId: string;
  readonly stripeProductId: string;
  constructor(init: ModelInit<Plan>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan>) => MutableModel<Plan> | void): Plan;
}