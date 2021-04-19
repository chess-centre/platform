import { DataStore } from "@aws-amplify/datastore";
import { FidePlayer, Member } from "../../models";

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
  const response = await fetch(`https://www.ecfrating.org.uk/v2/new/api.php?v2/players/code/${id}`).catch(e => {
    return {};
  });
  if(response.ok) {
    return await response.json();
  }
  return {};
};

export const getMember = async (user) => {
  return await DataStore.query(Member, user.attributes.sub);
};

export const updateChessInfo = async (
  id,
  { newUsername, ecfId, fideId, newAbout }
) => {
  console.log(newUsername, ecfId, fideId, newAbout);
  const record = await DataStore.query(Member, id);
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
