import React, { useState } from 'react';

import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);
	const { loading } = useSelector((state) => state.ui);

	//leer el formulario
	const [formValues, handleinputChange] = useForm({
		name: '',
		email: '',
		phone: '',
		password: '123456789',
	});

	//desestructuracion del form
	const { name, email, password, phone } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			dispatch(
				startRegisterWithEmailPasswordName(email, password, name, phone)
			);
		}
	};

	//validacion del formulario
	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('nombre es requirido'));
			return false;
		} else if (!validator.isEmail(email)) {
			//validator es una instalacion que permite verificar emails
			dispatch(setError('email no valido'));
			return false;
		} else if (phone.trim().length === 0) {
			dispatch(setError('Debes Ingresar Un Numero de Telefono'));
			return false;
		}
		dispatch(removeError());
		return true;
	};

	return (
		<>
			<h3 className="auth__title">
				Registrarse al Curso de Marketing, Sinergia
			</h3>

			<form onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<input
					className="auth__input"
					type="text"
					placeholder="Nombre Completo"
					name="name"
					autoComplete="off"
					value={name}
					onChange={handleinputChange}
				/>

				<input
					className="auth__input"
					type="number"
					placeholder="Telefono"
					name="phone"
					autoComplete="off"
					value={phone}
					onChange={handleinputChange}
				/>

				<input
					className="auth__input"
					type="email"
					placeholder="Email"
					name="email"
					autoComplete="off"
					value={email}
					onChange={handleinputChange}
				/>

				<button
					type="submit"
					className="btn btn-primary btn-block "
					disabled={loading}
				>
					Crear Usuario
				</button>
			</form>
		</>
	);
};
