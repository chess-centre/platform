// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FidePlayer, Member, Event } = initSchema(schema);

export {
  FidePlayer,
  Member,
  Event
};