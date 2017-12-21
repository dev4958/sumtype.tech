'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import DrawSVGPlugin from '../../vendor/gsap/DrawSVGPlugin';
import AttrPlugin from '../../vendor/gsap/AttrPlugin';

//Components
import GithubRepositoryEntry from './GithubRepositoryEntry/GithubRepositoryEntry';
import Repos from 'babel-loader!react-svg-loader!../../../../assets/images/repos.svg';

//Images
import loaderIcon from '../../../../assets/images/loader.gif';

//Store
import Store from './flux/store';

//Actions
import { setUserData, setRepositoriesData } from './flux/actions';

export default class GithubRepositoriesData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: null,
      animate: false,
      entranceAnimationDuration : 30,
      loaderAnimationDuration: 1,
      loaderExited: false,
      loaderSuffix: ''
    };
    this.updateComponentState = this.updateComponentState.bind(this);
    this.transitionEnter = this.transitionEnter.bind(this);
    this.transitionEntering = this.transitionEntering.bind(this);
    this.transitionEntered = this.transitionEntered.bind(this);
    this.transitionExit = this.transitionExit.bind(this);
    this.transitionExiting = this.transitionExiting.bind(this);
    this.transitionExited = this.transitionExited.bind(this);
    this.startIntroAnimation = this.startIntroAnimation.bind(this);
    this.endLoaderAnimation = this.endLoaderAnimation.bind(this);
  }
  updateComponentState() {
    this.setState(Store.getState());
    if (this.state.loaderExited === false && this.state.repositories !== null) this.endLoaderAnimation();
  }
  componentDidMount() {
    if (this.state.repositories === null) this.startIntroAnimation();
    this.loaderSuffixAnimation = setInterval(() => {
      if (this.state.loaderSuffix.length < 3) {
        this.setState({ loaderSuffix: this.state.loaderSuffix + '.' });
      } else {
        this.setState({ loaderSuffix: '' });
      }
    }, 500);
    Store.on('change', this.updateComponentState);
  }
  componentWillUnmount() {
    Store.removeListener('change', this.updateComponentState);
  }
  transitionEnter() {
      setTimeout(() => {
        TweenMax.to('.github-repositories-header-svg-path', 0, { drawSVG: '0%', opacity: 1, ease: Linear.easeOut });
        TweenMax.to('#github-repositories-data', 0.5, { opacity: 1, ease: Linear.easeOut, onComplete: () => {
          TweenMax.to('.github-repositories-header-svg-path', this.state.entranceAnimationDuration, { drawSVG: '100%', opacity: 1, ease: Linear.easeOut });
          TweenMax.to('.github-data-loader', 0.75, { delay: 1, opacity: 0.5 });
          TweenMax.to('.github-repositories-header-svg-path', this.state.entranceAnimationDuration / 10, { delay: (this.state.entranceAnimationDuration / 10) / 4, attr: { fill: '#000000', stroke: '#FFFFFF' }, ease: Linear.easeOut, onComplete: () => {
            setRepositoriesData();
          } });
        } });
      }, 3800);
  }
  transitionEntering() {}
  transitionEntered() {}
  transitionExit() {
    clearInterval(this.loaderSuffixAnimation);
    this.setState({ loaderExited: true });
  }
  transitionExiting() {}
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  endLoaderAnimation() {
    this.setState({ animate: false });
    this.props.masonry.layout();
  }
  render() {
    let repositoryIndex = 0;
    let dots = '.';
    let repositoryEntries = null;
    if (this.state.repositories !== null && this.state.loaderExited) {
      TweenMax.to('.github-data-loader', 0, { display: 'none' });
      repositoryEntries = this.state.repositories.map((repository) => {
        repositoryIndex++;
        return (
          <GithubRepositoryEntry key={repository.id.toString()} className="github-repository-entry" index={repositoryIndex} repository={repository}></GithubRepositoryEntry>
        );
      });
    }
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={this.props.id} ref={c => this.githubUserData = c} className={this.props.className}>
          <h2 className={'github-repositories-header'}>
            <Repos />
            <img alt={'Loading GitHub repositories data.'} className={'github-data-loader'} src={loaderIcon} />
          </h2>
          <section className={'github-repositories-container'}>
            {repositoryEntries}
          </section>
        </section>
      )} />
    );
  }
}
