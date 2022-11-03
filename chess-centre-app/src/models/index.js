// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MailingList, Broadcast, External, Event, EventType, Entry, Member, Game, Result, Plan, S3Object } = initSchema(schema);

export {
  MailingList,
  Broadcast,
  External,
  Event,
  EventType,
  Entry,
  Member,
  Game,
  Result,
  Plan,
  S3Object
};