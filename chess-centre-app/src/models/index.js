// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Broadcast, Result, Game, Plan, EventType, Member, Entry, Event } = initSchema(schema);

export {
  Broadcast,
  Result,
  Game,
  Plan,
  EventType,
  Member,
  Entry,
  Event
};