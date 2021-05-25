// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Game, EventPairing, Plan, EventType, FidePlayer, Member, Entry, Event } = initSchema(schema);

export {
  Game,
  EventPairing,
  Plan,
  EventType,
  FidePlayer,
  Member,
  Entry,
  Event
};