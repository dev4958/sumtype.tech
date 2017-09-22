'use strict';

//Native Node Modules
import EventEmitter from 'events';

//NPM Modules
const request = require('superagent');

//Flux
import dispatcher from '../../fluxDispatcher';
import * as actions from './types';

class Store extends EventEmitter {
  constructor() {
    super();
    this.state = {
      username: null,
      repositories: null
    };
    this.getState = () => ({
      username: this.getUsername(),
      repositories: this.getRepositories()
    });
    this.getUsername = () => this.state.username;
    this.getRepositories = () => this.state.repositories;
    this.action = this.action.bind(this);
    this.setUserData = this.setUserData.bind(this);
    this.setRepositoriesData = this.setRepositoriesData.bind(this);
  }
  setUserData(user) {
    if (user !== null) {
      this.state.username = user;
      this.emit('change');
    }
  }
  setRepositoriesData() {
    request
      .get('http://localhost:4000/api/githubUserData')
      .end((err, res) => {
        this.state.repositories = res.body;
        this.emit('change');
    });
  }
  action({ type = null, payload = null }) {
    switch (type) {
      case actions.SET_USER_DATA:
        this.setUserData(payload);
        break;
      case actions.SET_REPOSITORIES_DATA:
        this.setRepositoriesData(payload);
        break;
    }
  }
}

const store = new Store();
dispatcher.register(store.action);
export default store;
