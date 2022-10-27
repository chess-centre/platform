// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MailingList, Broadcast, Result, Event, EventType, Entry, Member, Game, Plan, S3Object } = initSchema(schema);

export {
  MailingList,
  Broadcast,
  Result,
  Event,
  EventType,
  Entry,
  Member,
  Game,
  Plan,
  S3Object
};