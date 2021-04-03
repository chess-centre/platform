import { DataStore } from '@aws-amplify/datastore';
import { FidePlayer, Member } from '../../models';

export const getFideData = async (id) => {
    const record = await DataStore.query(FidePlayer, (p) => p.fideId("eq", Number(id)));
    if(Array.isArray(record) && record.length) {
        return record[0];
    } else {
        return;
    }
}

export const getOrCreateMember = async (user) => {
    const record = await DataStore.query(Member, (m) => m.cognitoId("eq", user.username));
    if(Array.isArray(record) && record.length) {
        return record[0];
    } else {
        const m = await createMember(user);
        return m;
    }
}

const createMember = async (user) => {
    const member = await DataStore.save(new Member({
        cognitoId: user.username,
        username: createUserName(user),
        promoByEmail: false,
        promoByText: false,
        eventsByEmail: false,
        eventsByText: false
    }));
    return member;
}

const createUserName = user => {
    const { given_name, family_name,  } = user.attributes;
    return `${given_name.toLowerCase()}-${family_name.toLowerCase()}`;
} 