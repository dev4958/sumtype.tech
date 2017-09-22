'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax, TimelineLite } from 'gsap';

//Images
import cPlusPlusLogo from '../../../../../assets/images/c-plus-plus-logo.png';
import cSharpLogo from '../../../../../assets/images/c-sharp-logo.png';
import javascriptLogo from '../../../../../assets/images/javascript-logo.png';
import shellScriptLogo from '../../../../../assets/images/shell-script-logo.png';
import pythonLogo from '../../../../../assets/images/python-logo.png';
import javaLogo from '../../../../../assets/images/java-logo.png';
import phpLogo from '../../../../../assets/images/php-logo.png';
import typescriptLogo from '../../../../../assets/images/typescript-logo.png';
import copyIcon from '../../../../../assets/images/copy-icon.png';

export default class GithubRepositoryEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: this.props.repository,
      animate: false,
      entranceAnimationDuration : 1,
      entranceAnimationDelay: this.props.index * 0.2,
      exitAnimationDuration : 1
    };
    this.timeline = new TimelineLite({});
    this.transitionEnter = this.transitionEnter.bind(this);
    this.transitionEntering = this.transitionEntering.bind(this);
    this.transitionEntered = this.transitionEntered.bind(this);
    this.transitionExit = this.transitionExit.bind(this);
    this.transitionExiting = this.transitionExiting.bind(this);
    this.transitionExited = this.transitionExited.bind(this);
    this.startIntroAnimation = this.startIntroAnimation.bind(this);
    this.copyCloneUrlToClipboard = this.copyCloneUrlToClipboard.bind(this);
  }
  updateComponentState() {
    this.setState(Store.getState());
  }
  componentDidMount() {
    this.startIntroAnimation();
  }
  componentDidUpdate(prevProps) {}
  componentWillUnmount() {
    Store.removeListener('change', this.updateComponentState);
  }
  transitionEnter() {}
  transitionEntering() {
    this.timeline.to(this.githubRepositoryEntry, this.state.entranceAnimationDuration, { delay: this.state.entranceAnimationDelay, opacity: 1, ease: Linear.easeIn });
  }
  transitionEntered() {}
  transitionExit() {}
  transitionExiting() {
    this.timeline.to(this.githubRepositoryEntry, this.state.exitAnimationDuration, { opacity: 0, ease: Linear.easeOut });
  }
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  copyCloneUrlToClipboard() {
    let cloneUrl = document.createElement('textarea');
    cloneUrl.innerText = this.repositoryCloneUrl.value;
    document.body.appendChild(cloneUrl);
    cloneUrl.select();
    cloneUrl.setSelectionRange(0, cloneUrl.value.length);
    document.execCommand('copy');
    cloneUrl.remove();
  }
  render() {
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={this.state.repository.id} className={this.props.className} ref={c => this.githubRepositoryEntry = c }>
          <section className={'github-repository-header'}>
            { supportsLanguage(this.state.repository.language) ? <img src={languageLogo(this.state.repository.language)} className={`language-logo${this.state.repository.language === 'PHP' ? ' php-logo' : ''}`}/> : ''}
            <a href={this.state.repository.url} target={'_blank'}><h4 className={'repository-header'}>{this.state.repository.name}</h4></a><img className={'clone-link'} src={copyIcon} onClick={this.copyCloneUrlToClipboard} /><input className="clone-text" ref={c => this.repositoryCloneUrl = c } value={this.state.repository.cloneUrl} readOnly />
          </section>
          <p>{this.state.repository.description}</p>
        </section>
      )} />
    );
  }
}

const supportsLanguage = (language) => {
  if (language && (language === 'JavaScript' || language === 'C++' || language === 'C#' || language === 'Shell' || language === 'Python' || language === 'PHP' || language === 'Java' || language === 'TypeScript')) return true;
  return false;
}

const languageLogo = (language) => {
  if (language === 'JavaScript') return javascriptLogo;
  if (language === 'C++') return cPlusPlusLogo;
  if (language === 'C#') return cSharpLogo;
  if (language === 'Shell') return shellScriptLogo;
  if (language === 'Python') return pythonLogo;
  if (language === 'PHP') return phpLogo;
  if (language === 'Java') return javaLogo;
  if (language === 'TypeScript') return typescriptLogo;
}
