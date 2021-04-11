import { DataStore } from '@aws-amplify/datastore';
import { Member } from '../../models';

export const getMemberDataByUsername = async (username) => {
    const record = await DataStore.query(Member, (m) => m.username("eq", username));
    if(Array.isArray(record) && record.length) {
        return record[0];
    }
    return;
}