import { DataStore } from '@aws-amplify/datastore';
import { FidePlayer, ECFPlayer, Member } from '../../models';

export const getFideData = async (id) => {
    const record = await DataStore.query(FidePlayer, (p) => p.fideId("eq", Number(id)));
    if(Array.isArray(record) && record.length) {
        return record[0];
    }
    return;
}

export const getECFData = async (id) => {
    const record = await DataStore.query(ECFPlayer, (p) => p.ecfId("eq", id));
    if(Array.isArray(record) && record.length) {
        return record[0];
    }
    return;
}

/**
 * @name getOrCreateMember
 * @description ensures we are working with an existing record to assist updating of the whole user profile!
 * @param {*} user 
 * @returns
 */
export const getOrCreateMember = async (user) => {
    const record = await DataStore.query(Member, (m) => m.cognitoId("eq", user.username /* should be the cognito id */));
    if(Array.isArray(record) && record.length) {
        return record[0];
    } else {
        const member = await createMember(user);
        return member; // hand back the ID for future updates!
    }
}

export const updateChessInfo = async (id, { newUsername, ecfId, fideId, newAbout }) => {
    console.log(newUsername, ecfId, fideId, newAbout);
    const record = await DataStore.query(Member, id);
    const updated = await DataStore.save(
        Member.copyOf(record, updated => {
            updated.username = newUsername;
            updated.ecfId = ecfId;
            updated.fideId = fideId;
            updated.about = newAbout;
        })
    );
    return updated;
}

const createMember = async (user) => {
    const member = await DataStore.save(new Member({
        cognitoId: user.username,
        username: createUserName(user), // TODO: ensure is unqiue, duplication issue here!
        promoByEmail: false,
        promoByText: false,
        eventsByEmail: false,
        eventsByText: false
    }));
    return member;
};

const createUserName = user => {
    const { given_name, family_name } = user.attributes;
    return `${given_name.toLowerCase()}-${family_name.toLowerCase()}`;
};