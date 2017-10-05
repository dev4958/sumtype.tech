'use strict';

// Flux Components
import dispatcher from '../../fluxDispatcher';
import * as actions from './types';

// Component Actions
// export const setLinkedinUserData = () => dispatcher.dispatch({ type: actions.SET_LINKEDIN_USER_DATA, payload: null });
export const setGithubUserData = () => dispatcher.dispatch({ type: actions.SET_GITHUB_USER_DATA, payload: null });
