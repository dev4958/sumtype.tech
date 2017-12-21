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
      clients: null
    };
    this.getState = () => ({
      clients: this.getClients()
    });
    this.getClients = () => this.state.clients;
    this.action = this.action.bind(this);
    this.setPastClientsData = this.setPastClientsData.bind(this);
  }
  setPastClientsData() {
    request
      .get('/api/data/clients')
      .end((err, res) => {
        res.body.sort(sortByOrderValue).reverse();
        this.state.clients = res.body;
        this.emit('change');
    });
  }
  action({ type = null, payload = null }) {
    switch (type) {
      case actions.SET_PAST_CLIENTS_DATA:
        this.setPastClientsData(payload);
        break;
    }
  }
}

const store = new Store();
dispatcher.register(store.action);
export default store;

const sortByOrderValue = (a, b) => parseInt(a.order) - parseInt(b.order);
