import { types } from '../types/types';
import { firebase } from '../firebase/firebase-config';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';

//register
export const startRegisterWithEmailPasswordName = (
	email,
	password,
	name,
	phone
) => {
	return (dispatch) => {
		dispatch(startLoading());
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({
					displayName: name,
					photoURL: phone,
				});

				dispatch(login(user.uid, user.displayName, user.photoURL));
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Felicidades ya fuiste registrado',
					showConfirmButton: false,
					timer: 1500,
				});
				console.log(user);

				dispatch(finishLoading());
			})
			.catch((e) => {
				console.log(e);
				Swal.fire('Error', 'Este usuario ya esta registrado', 'error');
				dispatch(finishLoading());
			});
	};
};

export const login = (uid, displayName, photoURL) => {
	return {
		type: types.login,
		payload: {
			uid,
			displayName,
			photoURL,
		},
	};
};
