import { DataStore } from "@aws-amplify/datastore";
import { FidePlayer, ECFPlayer, Member } from "../../models";

export const getFideData = async (id) => {
  const record = await DataStore.query(FidePlayer, (p) =>
    p.fideId("eq", Number(id))
  );
  if (Array.isArray(record) && record.length) {
    return record[0];
  }
  return;
};

export const getECFData = async (id) => {
  const record = await DataStore.query(ECFPlayer, (p) => p.ecfId("eq", id));
  if (Array.isArray(record) && record.length) {
    return record[0];
  }
  return;
};

/**
 * @name getMember
 * @description ensures we are working with an existing record to assist updating of the whole user profile!
 * @returns
 */
export const getMember = async () => {
  const record = await DataStore.query(Member);

  if (Array.isArray(record) && record.length) {
    return record[0];
  } else {
    // DataStore may be stale
    await DataStore.start();
    return await getMember();
  }
};

export const updateChessInfo = async (
  id,
  { newUsername, ecfId, fideId, newAbout }
) => {
  console.log(newUsername, ecfId, fideId, newAbout);
  const record = await DataStore.query(Member);
  const updated = await DataStore.save(
    Member.copyOf(record, (updated) => {
      updated.username = newUsername;
      updated.ecfId = ecfId;
      updated.fideId = fideId;
      updated.about = newAbout;
    })
  );
  return updated;
};
