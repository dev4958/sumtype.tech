'use strict';

// Flux Components
import dispatcher from '../../fluxDispatcher';
import * as actions from './types';

// Component Actions
export const setUserData = () => dispatcher.dispatch({ type: actions.SET_USER_DATA, payload: null });
export const setRepositoriesData = () => dispatcher.dispatch({ type: actions.SET_REPOSITORIES_DATA, payload: null });
