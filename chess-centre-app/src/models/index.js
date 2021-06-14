// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Result, Game, Plan, EventType, Member, Entry, Event } = initSchema(schema);

export {
  Result,
  Game,
  Plan,
  EventType,
  Member,
  Entry,
  Event
};