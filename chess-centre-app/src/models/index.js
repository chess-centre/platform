// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Game, Plan, EventType, Member, Entry, Event } = initSchema(schema);

export {
  Game,
  Plan,
  EventType,
  Member,
  Entry,
  Event
};