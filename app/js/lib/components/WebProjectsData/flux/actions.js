'use strict';

// Flux Components
import dispatcher from '../../fluxDispatcher';
import * as actions from './types';

// Component Actions
export const setWebProjectsData = () => dispatcher.dispatch({ type: actions.SET_WEB_PROJECTS_DATA, payload: null });
