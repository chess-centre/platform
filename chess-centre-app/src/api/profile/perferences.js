import { DataStore } from '@aws-amplify/datastore';
import { Member } from '../../models';

export const updatePreferencesInfo = async (id, { eByEmail, pByEmail, eByText, pByText }) => {
    console.log(eByEmail, pByEmail, eByText, pByText);
    const record = await DataStore.query(Member, id);
    const updated = await DataStore.save(
        Member.copyOf(record, updated => {
            updated.eventsByEmail = eByEmail;
            updated.promoByEmail = pByEmail;
            updated.eventsByText = eByText;
            updated.promoByText = pByText;
        })
    );
    return updated;
}