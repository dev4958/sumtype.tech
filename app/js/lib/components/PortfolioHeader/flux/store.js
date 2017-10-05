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
      userData: null
    };
    this.getState = () => ({
      userData: this.getUserData()
    });
    this.getUserData = () => this.state.userData;
    this.action = this.action.bind(this);
    // this.setLinkedinUserData = this.setLinkedinUserData.bind(this);
    this.setGithubUserData = this.setGithubUserData.bind(this);
  }
  // setLinkedinUserData() {
  //   request
  //     .get('http://localhost:4000/api/linkedinUserData')
  //     .end((err, res) => {
  //       if (this.state.userData === null) this.state.userData = {};
  //       this.state.userData['linkedin'] = res.body;
  //       this.emit('change');
  //   });
  // }
  setGithubUserData() {
    request
      .get('http://localhost:4000/api/githubUserData')
      .end((err, res) => {
        if (this.state.userData === null) this.state.userData = {};
        this.state.userData['github'] = res.body;
        this.emit('change');
    });
  }
  action({ type = null, payload = null }) {
    switch (type) {
      // case actions.SET_LINKEDIN_USER_DATA:
      //   this.setLinkedinUserData(payload);
      //   break;
      case actions.SET_GITHUB_USER_DATA:
        this.setGithubUserData(payload);
        break;
    }
  }
}

const store = new Store();
dispatcher.register(store.action);
export default store;
