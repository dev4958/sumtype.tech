'use strict';

//NPM Modules
import React from 'react';
import Transition from 'react-transition-group/Transition';
import { TweenMax } from 'gsap';
import DrawSVGPlugin from '../../vendor/gsap/DrawSVGPlugin';
import AttrPlugin from '../../vendor/gsap/AttrPlugin';

//Components
import PastClientEntry from './PastClientEntry/PastClientEntry';
import PastClientsSvg from 'babel-loader!react-svg-loader!../../../../assets/images/past-clients.svg';

//Images
import loaderIcon from '../../../../assets/images/loader.gif';

//Store
import Store from './flux/store';

//Actions
import { setPastClientsData } from './flux/actions';

export default class PastClientsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: null,
      animate: false,
      entranceAnimationDuration : 30,
      loaderAnimationDuration: 1,
      loaderExited: false
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
    if (this.state.loaderExited === false && this.state.clients !== null) this.endLoaderAnimation();
  }
  componentDidMount() {
    if (this.state.clients === null) this.startIntroAnimation();
    Store.on('change', this.updateComponentState);
  }
  componentWillUnmount() {
    Store.removeListener('change', this.updateComponentState);
  }
  transitionEnter() {
      setTimeout(() => {
        TweenMax.to('.past-clients-header-svg-path', 0, { drawSVG: '0%', opacity: 1, ease: Linear.easeOut });
        TweenMax.to('#past-clients-data', 0.5, { opacity: 1, ease: Linear.easeOut, onComplete: () => {
          TweenMax.to('.past-clients-header-svg-path', this.state.entranceAnimationDuration, { drawSVG: '100%', opacity: 1, ease: Linear.easeOut });
          TweenMax.to('.past-clients-data-loader', 0.75, { delay: 1, opacity: 0.5 });
          TweenMax.to('.past-clients-header-svg-path', this.state.entranceAnimationDuration / 10, { delay: (this.state.entranceAnimationDuration / 10) / 4, attr: { fill: '#000000', stroke: '#FFFFFF' }, ease: Linear.easeOut, onComplete: () => {
            setPastClientsData();
          } });
        } });
      }, 3800);
  }
  transitionEntering() {}
  transitionEntered() {}
  transitionExit() {
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
    let clientIndex = 0;
    let clients = null;
    if (this.state.clients !== null && this.state.loaderExited) {
      TweenMax.to('.past-clients-data-loader', 0.25, { opacity: 0, onComplete: () => {
        TweenMax.to('.past-clients-data-loader', 0, { display: 'none' });
      } });
      clients = this.state.clients.map((client) => {
        clientIndex++;
        return (
          <PastClientEntry key={client.order.toString()} className="past-client-entry" index={clientIndex} client={client}></PastClientEntry>
        );
      });
    }
    return (
      <Transition in={this.state.animate} timeout={{ enter: this.state.entranceAnimationDuration * 1000, exit: this.state.exitAnimationDuration * 1000 }} onEnter={this.transitionEnter} onEntering={this.transitionEntering} onEntered={this.transitionEntered} onExit={this.transitionExit} onExiting={this.transitionExiting} onExited={this.transitionExited} children={() => (
        <section id={this.props.id} className={this.props.className}>
          <h2 className={'past-clients-header'}>
            <PastClientsSvg />
            <img alt={'Loading past clients data.'} className={'past-clients-data-loader'} src={loaderIcon} />
          </h2>
          <section className={'past-clients-container'}>
            {clients}
          </section>
        </section>
      )} />
    );
  }
}
