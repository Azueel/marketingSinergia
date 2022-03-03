import { db } from '../../firebase/firebase-config';

export const confirmAssistance = () => {
	return async (dispatch, getState) => {
		const { uid, name, phone } = getState().auth;

		const finalConfirm = {
			name: name,
			phone: phone,
			date: new Date().getTime(),
		};

		const doc = await db.collection(`${uid}/`).add(finalConfirm);

		console.log(doc);
	};
};
