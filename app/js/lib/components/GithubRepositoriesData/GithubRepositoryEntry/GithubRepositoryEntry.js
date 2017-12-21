'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import MorphSVGPlugin from '../../../vendor/gsap/MorphSVGPlugin';

//Images
import cPlusPlusLogo from '../../../../../assets/images/c-plus-plus-logo.png';
import cSharpLogo from '../../../../../assets/images/c-sharp-logo.png';
import javascriptLogo from '../../../../../assets/images/javascript-logo.png';
import shellScriptLogo from '../../../../../assets/images/shell-script-logo.png';
import pythonLogo from '../../../../../assets/images/python-logo.png';
import javaLogo from '../../../../../assets/images/java-logo.png';
import phpLogo from '../../../../../assets/images/php-logo.png';
import typescriptLogo from '../../../../../assets/images/typescript-logo.png';
import scalaLogo from '../../../../../assets/images/scala-logo.png';
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
    TweenMax.to(this.githubRepositoryEntry, this.state.entranceAnimationDuration, { delay: this.state.entranceAnimationDelay, opacity: 1, ease: Linear.easeOut });
  }
  transitionEntered() {}
  transitionExit() {}
  transitionExiting() {
    TweenMax.to(this.githubRepositoryEntry, this.state.exitAnimationDuration, { opacity: 0, ease: Linear.easeOut });
  }
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  copyCloneUrlToClipboard() {
    if (!this.isCopying) {
      this.isCopying = true;
      let cloneUrl = document.createElement('textarea');
      cloneUrl.innerText = this.repositoryCloneUrl.value;
      document.body.appendChild(cloneUrl);
      cloneUrl.select();
      cloneUrl.setSelectionRange(0, cloneUrl.value.length);
      document.execCommand('copy');
      cloneUrl.remove();
      TweenMax.to(this.copiedTextSvg, 0.5, { opacity: 1 });
      TweenMax.to(this.copySvg, 0.5, { morphSVG: this.copiedSvg, onComplete: () => {
        TweenMax.to(this.copiedTextSvg, 1, { delay: 1.5, opacity: 0 })
        TweenMax.to(this.copySvg, 1, { delay: 1.5, morphSVG: this.initCopySvg, onComplete: () => {
          this.isCopying = false;
        } });
      } });
    }
  }
  render() {
    let language = languageLogo(this.state.repository.language);
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={this.state.repository.id} className={this.props.className} ref={c => this.githubRepositoryEntry = c }>
          <section className={'github-repository-header'}>
            { supportsLanguage(this.state.repository.language) ? <img alt={`${language}-logo`} src={language} className={`language-logo${this.state.repository.language === 'PHP' ? ' php-logo' : ''}`}/> : ''}
            <a alt={`Link to ${this.state.repository.name} GitHub repository.`} rel={'noopener'} href={this.state.repository.url} target={'_blank'}><h5 className={'repository-header'}>{this.state.repository.name}</h5></a>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="120" height="16" viewBox="50 0 16 16" className={'clone-link'} src={copyIcon} onClick={this.copyCloneUrlToClipboard}>
              <path ref={c => this.copySvg = c} fill={'#000000'} d={'M10 4v-4h-7l-3 3v9h6v4h10v-12h-6zM3 1.414v1.586h-1.586l1.586-1.586zM1 11v-7h3v-3h5v3l-3 3v4h-5zM9 5.414v1.586h-1.586l1.586-1.586zM15 15h-8v-7h3v-3h5v10z'}></path>
              <text style={{ opacity: 0 }} ref={c => this.copiedTextSvg = c} x={20} y={12} fontFamily={'Roboto'} fontSize={12}>Clone link copied.</text>
              <path ref={c => this.initCopySvg = c} fill={'none'} d={'M10 4v-4h-7l-3 3v9h6v4h10v-12h-6zM3 1.414v1.586h-1.586l1.586-1.586zM1 11v-7h3v-3h5v3l-3 3v4h-5zM9 5.414v1.586h-1.586l1.586-1.586zM15 15h-8v-7h3v-3h5v10z'}></path>
              <path x={0} y={0} ref={c => this.copiedSvg = c}  fill={'none'} d={'M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z'}></path>
            </svg>
            <input className="clone-text" ref={c => this.repositoryCloneUrl = c } value={this.state.repository.cloneUrl} readOnly />
          </section>
          <p className={'github-repository-description'}>{this.state.repository.description}</p>
        </section>
      )} />
    );
  }
}

const supportsLanguage = (language) => {
  if (language && (language === 'JavaScript' || language === 'C++' || language === 'C#' || language === 'Shell' || language === 'Python' || language === 'PHP' || language === 'Java' || language === 'TypeScript' || language === 'Scala')) return true;
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
  if (language === 'Scala') return scalaLogo;
}
