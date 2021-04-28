// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Plan, EventType, FidePlayer, Member, Entry, Event } = initSchema(schema);

export {
  Plan,
  EventType,
  FidePlayer,
  Member,
  Entry,
  Event
};