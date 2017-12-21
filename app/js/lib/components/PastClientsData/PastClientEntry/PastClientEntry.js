'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import MorphSVGPlugin from '../../../vendor/gsap/MorphSVGPlugin';

export default class PastClientEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: this.props.client,
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
    TweenMax.to(this.pastClientEntry, this.state.entranceAnimationDuration, { delay: this.state.entranceAnimationDelay, opacity: 1, ease: Linear.easeOut });
  }
  transitionEntered() {}
  transitionExit() {}
  transitionExiting() {
    TweenMax.to(this.pastClientEntry, this.state.exitAnimationDuration, { opacity: 0, ease: Linear.easeOut });
  }
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  render() {
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={`${this.state.client.title.toLowerCase().replace(/ /g,'-')}`} className={this.props.className} ref={c => this.pastClientEntry = c }>
          <section className={'web-entry-header'}>
            <a alt={`Link to ${this.state.client.title}.`} rel={'noopener'} href={this.state.client.url} target={'_blank'}><h5 className={'client-header'}>{this.state.client.title}</h5></a>
          </section>
          {this.state.client.description ? <p className={'client-description'}>{this.state.client.description}</p> : null}
          {this.state.client.services ? <p className={'client-service'}>{this.state.client.services}</p> : null}
        </section>
      )} />
    );
  }
}
