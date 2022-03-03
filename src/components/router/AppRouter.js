import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { firebase } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { ConfirmScreen } from '../confirm/ConfirmScreen';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
	const dispatch = useDispatch();
	const [cheking, setCheking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//mantenemos los datos aunque se refresce la pagina
	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName, user.photoURL));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setCheking(false);
		});
	}, [dispatch, setCheking, setIsLoggedIn]);

	if (cheking) {
		return <h1>Espere...</h1>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<PublicRoute
						path="/auth"
						isAuthenticated={isLoggedIn}
						component={AuthRouter}
					/>

					<PrivateRoute
						exact
						path="/"
						isAuthenticated={isLoggedIn}
						component={ConfirmScreen}
					/>

					<Redirect to="/auth/register" />
				</Switch>
			</div>
		</Router>
	);
};
