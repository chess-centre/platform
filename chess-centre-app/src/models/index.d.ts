import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Plan {
  readonly id: string;
  readonly key: string;
  readonly stripePriceId: string;
  readonly stripeProductId: string;
  constructor(init: ModelInit<Plan>);
  static copyOf(source: Plan, mutator: (draft: MutableModel<Plan>) => MutableModel<Plan> | void): Plan;
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

export declare class FidePlayer {
  readonly id: string;
  readonly fideId?: number;
  readonly federation?: string;
  readonly title?: string;
  readonly currentRating?: number;
  constructor(init: ModelInit<FidePlayer>);
  static copyOf(source: FidePlayer, mutator: (draft: MutableModel<FidePlayer>) => MutableModel<FidePlayer> | void): FidePlayer;
}

export declare class Member {
  readonly id: string;
  readonly about?: string;
  readonly fideId?: number;
  readonly ecfId?: string;
  readonly username?: string;
  readonly name?: string;
  readonly email?: string;
  readonly eventsByEmail?: boolean;
  readonly promoByEmail?: boolean;
  readonly eventsByText?: boolean;
  readonly promoByText?: boolean;
  readonly entries?: Entry[];
  readonly stripeCustomerId?: string;
  readonly stripeCurrentPeriodEnd?: number;
  readonly stripePriceId?: string;
  readonly stripeProductId?: string;
  constructor(init: ModelInit<Member>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}

export declare class Entry {
  readonly id: string;
  readonly event?: Event;
  readonly member?: Member;
  constructor(init: ModelInit<Entry>);
  static copyOf(source: Entry, mutator: (draft: MutableModel<Entry>) => MutableModel<Entry> | void): Entry;
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
  readonly maxEntries?: number;
  readonly entryCount?: number;
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}