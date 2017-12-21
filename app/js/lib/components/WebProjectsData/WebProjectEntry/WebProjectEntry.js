'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import MorphSVGPlugin from '../../../vendor/gsap/MorphSVGPlugin';

export default class WebProjectEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
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
    TweenMax.to(this.webProjectEntry, this.state.entranceAnimationDuration, { delay: this.state.entranceAnimationDelay, opacity: 1, ease: Linear.easeOut });
  }
  transitionEntered() {}
  transitionExit() {}
  transitionExiting() {
    TweenMax.to(this.webProjectEntry, this.state.exitAnimationDuration, { opacity: 0, ease: Linear.easeOut });
  }
  transitionExited() {}
  startIntroAnimation() {
    this.setState({ animate: true });
  }
  render() {
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={`${this.state.project.title.toLowerCase().replace(/ /g,'-')}`} className={this.props.className} ref={c => this.webProjectEntry = c }>
          <section className={'web-entry-header'}>
            <a alt={`Link to ${this.state.project.title}, web project or company.`} rel={'noopener'} href={this.state.project.url} target={'_blank'}><h5 className={'project-header'}>{this.state.project.title} </h5><h6>{this.state.project.years}</h6></a>
          </section>
          <p className={'project-description'}>{this.state.project.description}</p>
          <p className={'project-technology-header'}>Technology</p>
          <p className={'project-technology'}>{this.state.project.languages}, {this.state.project.librariesFrameworks}</p>
        </section>
      )} />
    );
  }
}
