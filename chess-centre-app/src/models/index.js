// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EventPairings, Plan, EventType, FidePlayer, Member, Entry, Event } = initSchema(schema);

export {
  EventPairings,
  Plan,
  EventType,
  FidePlayer,
  Member,
  Entry,
  Event
};