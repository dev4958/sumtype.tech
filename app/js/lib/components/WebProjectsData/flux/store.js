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
      projects: null
    };
    this.getState = () => ({
      projects: this.getProjects()
    });
    this.getProjects = () => this.state.projects;
    this.action = this.action.bind(this);
    this.setWebProjectsData = this.setWebProjectsData.bind(this);
  }
  setWebProjectsData() {
    request
      .get('/api/data/projects')
      .end((err, res) => {
        res.body.sort(sortByOrderValue).reverse();
        this.state.projects = res.body;
        this.emit('change');
    });
  }
  action({ type = null, payload = null }) {
    switch (type) {
      case actions.SET_WEB_PROJECTS_DATA:
        this.setWebProjectsData(payload);
        break;
    }
  }
}

const store = new Store();
dispatcher.register(store.action);
export default store;

const sortByOrderValue = (a, b) => parseInt(a.order) - parseInt(b.order);
