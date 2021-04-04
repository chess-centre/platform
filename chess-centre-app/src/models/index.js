// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ECFPlayer, FidePlayer, Member, Event } = initSchema(schema);

export {
  ECFPlayer,
  FidePlayer,
  Member,
  Event
};