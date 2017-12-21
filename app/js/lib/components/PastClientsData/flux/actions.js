'use strict';

// Flux Components
import dispatcher from '../../fluxDispatcher';
import * as actions from './types';

// Component Actions
export const setPastClientsData = () => dispatcher.dispatch({ type: actions.SET_PAST_CLIENTS_DATA, payload: null });
