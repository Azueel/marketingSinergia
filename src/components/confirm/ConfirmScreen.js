import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { confirmAssistance } from '../auth/confirm';

export const ConfirmScreen = () => {
	const dispatch = useDispatch();
	const [btnBlock, setBtnBlock] = useState(false);

	const handleConfirm = () => {
		dispatch(confirmAssistance());
		setBtnBlock(true);

		Swal.fire({
			position: 'center',
			icon: 'success',
			title: `Felicidades Fuiste Registrad@ Correctamente`,
			showConfirmButton: false,
			timer: 3500,
		});
	};

	return (
		<div className="auth__main">
			<div className="auth__box-container">
				<h3 className="mb-5">Capacitacion de Marketing</h3>
				<h4 className="mb-5">Fecha: 13 de Marzo </h4>
				<h4 className="mb-5">Lugar: Academia Sinergia</h4>
				<h4 className="mb-5">Profesora: Andrea Calderon</h4>
				<h4 className="mb-5">Horario: 15:00hs</h4>
				<button
					className="btn btn-primary btn-block"
					onClick={handleConfirm}
					disabled={btnBlock}
				>
					Confirmar Asistencia
				</button>
			</div>
		</div>
	);
};
