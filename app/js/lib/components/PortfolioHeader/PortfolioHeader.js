'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import MorphSVGPlugin from '../../vendor/gsap/MorphSVGPlugin';
import CSSPlugin from '../../vendor/gsap/CSSPlugin';
import ScrambleTextPlugin from '../../vendor/gsap/ScrambleTextPlugin-Modified';
import SplitTextPlugin from '../../vendor/gsap/SplitText';

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
import KeybaseIcon from 'babel-loader!react-svg-loader!../../../../assets/images/keybase-icon.svg';
import PhoneIcon from 'babel-loader!react-svg-loader!../../../../assets/images/phone-icon.svg';
import EmailIcon from 'babel-loader!react-svg-loader!../../../../assets/images/email-icon.svg';


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
    Store.on('change', this.updateComponentState);
  }
  componentWillUnmount() {
    Store.removeListener('change', this.updateComponentState);
  }
  transitionEnter() {
    setGithubUserData();
    if (window.innerWidth <= 675) TweenMax.to('.user-profile-container', 0, { opacity: 1 });
    TweenMax.to([ '#profile-image-desktop', '#profile-image-mobile' ], 0.8, { borderRadius: '50%', ease: Bounce.easeOut, onComplete: () => {
      if (window.innerWidth >= 675) TweenMax.to('.user-profile-container', 1, { opacity: 1, ease: Linear.easeIn });
      TweenMax.to('.user-name', 1, { opacity: 1, ease: Linear.easeIn });
      TweenMax.to([ '.linkedin-icon-link svg', '.github-icon-link svg', '.npm-icon-link svg', '.dockerhub-icon-link svg', '.keybase-icon-link svg', '.phone-svg', '.email-svg' ], 0, { y: 500 });
      setTimeout(() => {
        let jobTitle = new SplitText('.job-title', { type: 'chars' });
        TweenMax.to('.job-title', 0, { opacity: 1 });
        for (let i = 0; i < jobTitle.chars.length; i++) {
          TweenMax.from(jobTitle.chars[i], 0.8 * (i / jobTitle.chars.length + 0.75), { opacity: 0, scrambleText: { chars: '😁😁😉😍😏😣😌😜😒😓😔😖😢😭😱😡😠', revealDelay: 1 * (i / jobTitle.chars.length + 0.75), ease: Linear.easeIn, speed: 0.15 }, onComplete: () => {
            TweenMax.to(jobTitle.chars[i], 0.25, { opacity: 1, ease: Linear.easeOut });
            if (i + 1 === jobTitle.chars.length) {
              jobTitle.revert();
              setTimeout(() => {
                TweenMax.to('.linkedin-icon-link', 0.1, { opacity: 1, ease: Linear.easeOut });
                TweenMax.to('.linkedin-icon-link svg', 0.2, { y: 0, ease: Linear.easeOut });
                TweenMax.to('.github-icon-link', 0.1, { delay: 0.1, opacity: 1, ease: Linear.easeOut });
                TweenMax.to('.github-icon-link svg', 0.2, { delay: 0.1, y: 0, ease: Linear.easeOut });
                TweenMax.to('.npm-icon-link', 0.1, { delay: 0.2, opacity: 1, ease: Linear.easeOut });
                TweenMax.to('.npm-icon-link svg', 0.2, { delay: 0.2, y: 0, ease: Linear.easeOut });
                TweenMax.to('.dockerhub-icon-link', 0.1, { delay: 0.3, opacity: 1, ease: Linear.easeOut });
                TweenMax.to('.dockerhub-icon-link svg', 0.2, { delay: 0.3, y: 0, ease: Linear.easeOut });
                TweenMax.to('.keybase-icon-link', 0.1, { delay: 0.4, opacity: 1, ease: Linear.easeOut });
                TweenMax.to('.keybase-icon-link svg', 0.2, { delay: 0.4, y: 0, ease: Linear.easeOut });
                TweenMax.to('.phone-svg', 0.1, { delay: 0.5, opacity: 0.2, ease: Linear.easeOut });
                TweenMax.to('.phone-svg', 0.2, { delay: 0.5, y: 0, ease: Linear.easeOut });
                TweenMax.to('.email-svg', 0.1, { delay: 0.6, opacity: 0.2, ease: Linear.easeOut });
                TweenMax.to('.email-svg', 0.2, { delay: 0.6, y: 0, ease: Linear.easeOut });
              }, 250);
            }
          }});
        }
      }, 1000);
    }});
  }
  transitionEntering() {}
  transitionEntered() {}
  transitionExit() {}
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
                  <td className={'desktop user-profile-image-container'}>
                    <img alt={'Profile image.'} src={profileImage} className={'profile-image desktop'} id={'profile-image-desktop'} />
                  </td>
                  <td className={'user-profile-container'}>
                    <img alt={'Profile image.'} src={profileImage} className={'profile-image mobile'} id={'profile-image-mobile'} />
                    <section className={'user-header'}>
                      <h1 className={'user-name'}>James Mason</h1>
                      <h5 className={'job-title'}>Web Developer</h5>
                      <section className={'icon-row'}>
                        <a className={'linkedin-icon-link'} alt={'Link to my LinkedIn account.'} rel={'noopener'} href={'https://linkedin.com/in/sumtype'} target={'_blank'}>
                          <LinkedinIcon />
                        </a>
                        <a className={'github-icon-link'} alt={'Link to my GitHub account.'} rel={'noopener'} href={'https://github.com/dev4958'} target={'_blank'}>
                          <GithubIcon />
                        </a>
                        <a className={'npm-icon-link'} alt={'Link to my NPM account.'} rel={'noopener'} href={'https://www.npmjs.com/~sumtype'} target={'_blank'}>
                          <NpmIcon />
                        </a>
                        <a className={'dockerhub-icon-link'} alt={'Link to my DockerHub account.'} rel={'noopener'} href={'https://hub.docker.com/u/sumtype/'} target={'_blank'}>
                          <DockerIcon />
                        </a>
                        <a className={'keybase-icon-link'} alt={'Keybase profile.'} rel={'noopener'} href={'https://keybase.io/sumtype'} target={'_blank'}>
                          <KeybaseIcon />
                        </a>
                        <a href={'tel:+19177027580'} alt={'Contact telephone number.'}>
                          <PhoneIcon onMouseOver={this.showPhoneNumber} onMouseOut={this.hidePhoneNumber} />
                        </a>
                        <a className={'animated-icon-link'} alt={'Email contact.'} href={'mailto:james@sumtype.tech'}>
                          <EmailIcon onMouseOver={this.showEmailAddress} onMouseOut={this.hideEmailAddress} />
                        </a>
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
