import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class EventType {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly url?: string;
  readonly color?: string;
  readonly time?: string;
  readonly maxEntries?: number;
  constructor(init: ModelInit<EventType>);
  static copyOf(source: EventType, mutator: (draft: MutableModel<EventType>) => MutableModel<EventType> | void): EventType;
}

export declare class ECFPlayer {
  readonly id: string;
  readonly ecfId?: string;
  readonly club?: string;
  readonly currentRating?: string;
  constructor(init: ModelInit<ECFPlayer>);
  static copyOf(source: ECFPlayer, mutator: (draft: MutableModel<ECFPlayer>) => MutableModel<ECFPlayer> | void): ECFPlayer;
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
  readonly eventsByEmail?: boolean;
  readonly promoByEmail?: boolean;
  readonly eventsByText?: boolean;
  readonly promoByText?: boolean;
  readonly cognitoId?: string;
  constructor(init: ModelInit<Member>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
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
  readonly entries?: number;
  readonly maxEntries?: number;
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}