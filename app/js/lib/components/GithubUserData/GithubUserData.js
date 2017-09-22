'use strict';

//NPM Modules
import React from 'react';
import uuid from 'uuid/v4';

//Components
import GithubRepositoryEntry from './GithubRepositoryEntry/GithubRepositoryEntry';

//Store
import Store from './flux/store';

//Actions
import { setUserData, setRepositoriesData } from './flux/actions';

export default class GithubUserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid(),
      repositories: null
    };
    this.updateComponentState = this.updateComponentState.bind(this);
  }
  updateComponentState() {
    this.setState(Store.getState());
  }
  componentDidMount() {
    Store.on('change', this.updateComponentState);
    setRepositoriesData();
  }
  render() {
    let repositoryIndex = 0;
    const repositoryEntries = this.state.repositories !== null ? this.state.repositories.map((repository) => {
      repositoryIndex++;
      return (
        <GithubRepositoryEntry key={repository.id.toString()} className="github-repository-entry" index={repositoryIndex} repository={repository}></GithubRepositoryEntry>
      );
    }) : 'Loading Entries...';
    return (
      <section id={this.props.id}>
        <h2 className={'github-repositories-header'}>Github Repos</h2>
        <section>
          {repositoryEntries}
        </section>
      </section>
    );
  }
}
