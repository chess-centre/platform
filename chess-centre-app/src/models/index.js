// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MailingList, Broadcast, Result, Game, Plan, EventType, Member, Event, Entry, S3Object } = initSchema(schema);

export {
  MailingList,
  Broadcast,
  Result,
  Game,
  Plan,
  EventType,
  Member,
  Event,
  Entry,
  S3Object
};