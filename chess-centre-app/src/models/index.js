// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { EventType, ECFPlayer, FidePlayer, Member, Event } = initSchema(schema);

export {
  EventType,
  ECFPlayer,
  FidePlayer,
  Member,
  Event
};