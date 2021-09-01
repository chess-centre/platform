// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MailingList, Broadcast, Result, Game, Event, EventType, Entry, Member, Plan, S3Object } = initSchema(schema);

export {
  MailingList,
  Broadcast,
  Result,
  Game,
  Event,
  EventType,
  Entry,
  Member,
  Plan,
  S3Object
};