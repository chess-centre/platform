import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Event {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly rounds?: number;
  readonly entries?: number;
  constructor(init: ModelInit<Event>);
  static copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}