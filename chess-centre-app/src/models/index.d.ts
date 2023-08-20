import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

type EagerS3Object = {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
}

type LazyS3Object = {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
}

export declare type S3Object = LazyLoading extends LazyLoadingDisabled ? EagerS3Object : LazyS3Object

export declare const S3Object: (new (init: ModelInit<S3Object>) => S3Object)



















type EagerMailingList = {
  readonly id: string;
  readonly email: string;
  readonly enabled: boolean;
}

type LazyMailingList = {
  readonly id: string;
  readonly email: string;
  readonly enabled: boolean;
}

export declare type MailingList = LazyLoading extends LazyLoadingDisabled ? EagerMailingList : LazyMailingList

export declare const MailingList: (new (init: ModelInit<MailingList>) => MailingList) & {
  copyOf(source: MailingList, mutator: (draft: MutableModel<MailingList>) => MutableModel<MailingList> | void): MailingList;
}

type EagerBroadcast = {
  readonly id: string;
  readonly buttonName?: string | null;
  readonly isLive?: boolean | null;
  readonly description?: string | null;
  readonly name?: string | null;
  readonly pageUrl?: string | null;
  readonly dgtUrl?: string | null;
}

type LazyBroadcast = {
  readonly id: string;
  readonly buttonName?: string | null;
  readonly isLive?: boolean | null;
  readonly description?: string | null;
  readonly name?: string | null;
  readonly pageUrl?: string | null;
  readonly dgtUrl?: string | null;
}

export declare type Broadcast = LazyLoading extends LazyLoadingDisabled ? EagerBroadcast : LazyBroadcast

export declare const Broadcast: (new (init: ModelInit<Broadcast>) => Broadcast) & {
  copyOf(source: Broadcast, mutator: (draft: MutableModel<Broadcast>) => MutableModel<Broadcast> | void): Broadcast;
}

type EagerResult = {
  readonly id: string;
  readonly pairings?: string | null;
  readonly results?: string | null;
  readonly players?: string | null;
  readonly eventID?: string | null;
  readonly name?: string | null;
  readonly complete?: boolean | null;
  readonly live?: boolean | null;
  readonly winner?: string | null;
  readonly dgtCloudUrl?: string | null;
}

type LazyResult = {
  readonly id: string;
  readonly pairings?: string | null;
  readonly results?: string | null;
  readonly players?: string | null;
  readonly eventID?: string | null;
  readonly name?: string | null;
  readonly complete?: boolean | null;
  readonly live?: boolean | null;
  readonly winner?: string | null;
  readonly dgtCloudUrl?: string | null;
}

export declare type Result = LazyLoading extends LazyLoadingDisabled ? EagerResult : LazyResult

export declare const Result: (new (init: ModelInit<Result>) => Result) & {
  copyOf(source: Result, mutator: (draft: MutableModel<Result>) => MutableModel<Result> | void): Result;
}

type EagerGame = {
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
}

type LazyGame = {
  readonly id: string;
  readonly eventName?: string | null;
  readonly date?: string | null;
  readonly whiteName?: string | null;
  readonly whiteRating?: number | null;
  readonly blackName?: string | null;
  readonly blackRating?: number | null;
  readonly round?: number | null;
  readonly event: AsyncItem<Event | undefined>;
  readonly whiteMember: AsyncItem<Member | undefined>;
  readonly blackMember: AsyncItem<Member | undefined>;
  readonly result?: string | null;
  readonly type?: string | null;
  readonly pgn?: S3Object | null;
  readonly pgnStr?: string | null;
  readonly liChessUrl?: string | null;
}

export declare type Game = LazyLoading extends LazyLoadingDisabled ? EagerGame : LazyGame

export declare const Game: (new (init: ModelInit<Game>) => Game) & {
  copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}

type EagerPlan = {
  readonly id: string;
  readonly key: string;
  readonly stripePriceId: string;
  readonly stripeProductId: string;
}

type LazyPlan = {
  readonly id: string;
  readonly key: string;
  readonly stripePriceId: string;
  readonly stripeProductId: string;
}

export declare type Plan = LazyLoading extends LazyLoadingDisabled ? EagerPlan : LazyPlan

export declare const Plan: (new (init: ModelInit<Plan>) => Plan) & {
  copyOf(source: Plan, mutator: (draft: MutableModel<Plan>) => MutableModel<Plan> | void): Plan;
}

type EagerEventType = {
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
}

type LazyEventType = {
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
}

export declare type EventType = LazyLoading extends LazyLoadingDisabled ? EagerEventType : LazyEventType

export declare const EventType: (new (init: ModelInit<EventType>) => EventType) & {
  copyOf(source: EventType, mutator: (draft: MutableModel<EventType>) => MutableModel<EventType> | void): EventType;
}

type EagerMember = {
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
}

type LazyMember = {
  readonly id: string;
  readonly about?: string | null;
  readonly fideId?: string | null;
  readonly ecfId?: string | null;
  readonly username?: string | null;
  readonly name?: string | null;
  readonly firstName?: string | null;
  readonly surname?: string | null;
  readonly email?: string | null;
  readonly entries: AsyncCollection<Entry>;
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
}

export declare type Member = LazyLoading extends LazyLoadingDisabled ? EagerMember : LazyMember

export declare const Member: (new (init: ModelInit<Member>) => Member) & {
  copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

type EagerEvent = {
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
}

type LazyEvent = {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly rounds?: number | null;
  readonly time?: string | null;
  readonly type: AsyncItem<EventType>;
  readonly startDate: string;
  readonly endDate?: string | null;
  readonly entries: AsyncCollection<Entry>;
  readonly games: AsyncCollection<Game>;
  readonly maxEntries?: number | null;
  readonly entryCount?: number | null;
  readonly complete?: boolean | null;
  readonly cancelled?: boolean | null;
  readonly isLive?: boolean | null;
  readonly isLiveUrl?: string | null;
  readonly isJunior?: boolean | null;
  readonly active?: string | null;
  readonly multipleSections?: boolean | null;
  readonly results: AsyncCollection<Result>;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerEntry = {
  readonly id: string;
  readonly section?: string | null;
  readonly byes?: string | null;
  readonly event?: Event | null;
  readonly member?: Member | null;
}

type LazyEntry = {
  readonly id: string;
  readonly section?: string | null;
  readonly byes?: string | null;
  readonly event: AsyncItem<Event | undefined>;
  readonly member: AsyncItem<Member | undefined>;
}

export declare type Entry = LazyLoading extends LazyLoadingDisabled ? EagerEntry : LazyEntry

export declare const Entry: (new (init: ModelInit<Entry>) => Entry) & {
  copyOf(source: Entry, mutator: (draft: MutableModel<Entry>) => MutableModel<Entry> | void): Entry;
}