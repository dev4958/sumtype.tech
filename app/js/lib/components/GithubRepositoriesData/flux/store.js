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
      repositories: null
    };
    this.getState = () => ({
      repositories: this.getRepositories()
    });
    this.getRepositories = () => this.state.repositories;
    this.action = this.action.bind(this);
    this.setRepositoriesData = this.setRepositoriesData.bind(this);
  }
  setRepositoriesData() {
    request
      .get('http://localhost:4000/api/githubRepositoriesData')
      .end((err, res) => {
        this.state.repositories = res.body;
        this.emit('change');
    });
  }
  action({ type = null, payload = null }) {
    switch (type) {
      case actions.SET_REPOSITORIES_DATA:
        this.setRepositoriesData(payload);
        break;
    }
  }
}

const store = new Store();
dispatcher.register(store.action);
export default store;
