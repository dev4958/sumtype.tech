'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import MorphSVGPlugin from '../../vendor/gsap/MorphSVGPlugin';

//Store
import Store from './flux/store';

//Actions
import { setGithubUserData } from './flux/actions';

//Images
import profileImage from '../../../../assets/images/profile-image.png';
import LinkedinIcon from 'babel-loader!react-svg-loader!../../../../assets/images/linkedin-icon.svg';
import GithubIcon from 'babel-loader!react-svg-loader!../../../../assets/images/github-icon.svg';
import DockerIcon from 'babel-loader!react-svg-loader!../../../../assets/images/docker-icon.svg';
import NpmIcon from 'babel-loader!react-svg-loader!../../../../assets/images/npm-icon.svg';
import PhoneIcon from 'babel-loader!react-svg-loader!../../../../assets/images/phone-icon.svg';
// ref={c => this.phoneIconDesktop = c}ref={c => this.phoneNumberDesktop = c}
import EmailIcon from 'babel-loader!react-svg-loader!../../../../assets/images/email-icon.svg';
 // onMouseOver={this.showEmailAddressDesktop} onMouseOut={this.hideEmailAddressDesktop} ref={c => this.emailDesktop = c} ref={c => this.emailIconDesktop = c}ref={c => this.emailAddressDesktop = c}


export default class PortfolioHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null
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
    this.showPhoneNumber = this.showPhoneNumber.bind(this);
    this.hidePhoneNumber = this.hidePhoneNumber.bind(this);
    this.showEmailAddress = this.showEmailAddress.bind(this);
    this.hideEmailAddress = this.hideEmailAddress.bind(this);
  }
  updateComponentState() {
    this.setState(Store.getState());
    if (this.state.loaderExited === false && this.state.repositories !== null) this.endLoaderAnimation();
  }
  componentDidMount() {
    if (this.state.userData === null) this.startIntroAnimation();
    // this.loaderSuffixAnimation = setInterval(() => {
    //   if (this.state.loaderSuffix.length < 3) {
    //     this.setState({ loaderSuffix: this.state.loaderSuffix + '.' });
    //   } else {
    //     this.setState({ loaderSuffix: '' });
    //   }
    // }, 500);
    Store.on('change', this.updateComponentState);
  }
  componentWillUnmount() {
    Store.removeListener('change', this.updateComponentState);
  }
  transitionEnter() {
    setGithubUserData();
      // TweenMax.fromTo(this.githubReposSvg, this.state.entranceAnimationDuration, { drawSVG: '0%', opacity: 1, ease: Linear.easeOut }, { drawSVG: '100%', opacity: 1, ease: Linear.easeOut });
      // TweenMax.fromTo(this.loader, this.state.loaderAnimationDuration, { opacity: 0, onComplete: () => {
      //   setRepositoriesData();
      // } }, { opacity: 1 });
  }
  transitionEntering() {}
  transitionEntered() {}
  transitionExit() {
    // TweenMax.fromTo(this.loader, this.state.loaderAnimationDuration, { opacity: 1 }, { opacity: 0, onComplete: () => {
    //   clearInterval(this.loaderSuffixAnimation);
    //   this.setState({ loaderExited: true });
    // } });
  }
  transitionExiting() {}
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  endLoaderAnimation() {
    this.setState({ animate: false });
  }
  showPhoneNumber() {
    let phoneIcons = document.getElementsByClassName('phone');
    for (let i = 0; i < phoneIcons.length; i++) phoneIcons[i].setAttribute('stroke', '#000000');
    TweenMax.to('.phone', 0.25, { morphSVG: '.phone-number', ease: Linear.easeOut });
  }
  hidePhoneNumber() {
    let phoneIcons = document.getElementsByClassName('phone');
    for (let i = 0; i < phoneIcons.length; i++) phoneIcons[i].setAttribute('stroke', 'none');
    TweenMax.to('.phone', 0.25, { morphSVG: '.phone-number-icon', ease: Linear.easeOut });
  }
  showEmailAddress() {
    let emailIcons = document.getElementsByClassName('email');
    for (let i = 0; i < emailIcons.length; i++) emailIcons[i].setAttribute('stroke', '#000000');
    TweenMax.to('.email', 0.25, { morphSVG: '.email-address', ease: Linear.easeOut });
  }
  hideEmailAddress() {
    let emailIcons = document.getElementsByClassName('email');
    for (let i = 0; i < emailIcons.length; i++) emailIcons[i].setAttribute('stroke', 'none');
    TweenMax.to('.email', 0.25, { morphSVG: '.email-icon', ease: Linear.easeOut });
  }
  render() {
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <header id={this.props.id} className={'user-data-header'}>
          <section>
            <table>
              <tbody>
                <tr>
                  <td className={'desktop'}>
                    <img alt={'Profile image.'} src={profileImage} className={'profile-image desktop'} />
                  </td>
                  <td>
                    <img alt={'Profile image.'} src={profileImage} className={'profile-image mobile'}/>
                    <section className={'user-header'}>
                      <h1>James Mason</h1>
                      <h5>Web Developer</h5>
                      <section className={'icon-row'}>
                        <a alt={'Link to my LinkedIn account.'} rel={'noopener'} href={'https://linkedin.com/in/sumtype'} target={'_blank'}>
                          <LinkedinIcon />
                        </a>
                        <a alt={'Link to my GitHub account.'} rel={'noopener'} href={'https://github.com/dev4958'} target={'_blank'}>
                          <GithubIcon />
                        </a>
                        <a alt={'Link to my NPM account.'} rel={'noopener'} href={'https://www.npmjs.com/~sumtype'} target={'_blank'}>
                          <NpmIcon />
                        </a>
                        <a alt={'Link to my DockerHub account.'} rel={'noopener'} href={'https://hub.docker.com/u/sumtype/'} target={'_blank'}>
                          <DockerIcon />
                        </a>
                        <PhoneIcon onMouseOver={this.showPhoneNumber} onMouseOut={this.hidePhoneNumber} />
                        <EmailIcon onMouseOver={this.showEmailAddress} onMouseOut={this.hideEmailAddress} />
                      </section>
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </header>
      )} />
    );
  }
}
