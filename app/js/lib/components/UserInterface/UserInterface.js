'use strict';

//NPM Modules
import React from 'react';
import { TweenMax } from 'gsap';
import Masonry from 'masonry-layout';

//Components
import GithubRepositoriesData from '../GithubRepositoriesData/GithubRepositoriesData';
import WebProjectsData from '../WebProjectsData/WebProjectsData';
import PastClientsData from '../PastClientsData/PastClientsData';
import PortfolioHeader from '../PortfolioHeader/PortfolioHeader';

export default class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      masonry: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      TweenMax.to('#loader', 1, { opacity: 0, ease: Linear.easeOut, onComplete: () => {
        document.getElementById('loader').remove();
        this.setState({ show: true });
        const masonryInterface = new Masonry(this.userInterfaceContainer, { itemSelector: '.interface-container-block', columnWidth: 0, fitWidth: true });
        this.setState({ masonry: masonryInterface });
      } });
    }, this.props.delay);
  }
  render() {
    const portfolioHeader = (() => {
      return (
        <PortfolioHeader id={'portfolio-header'}></PortfolioHeader>
      )
    })();
    const pastClientsData = (() => {
      return (
        <PastClientsData id={'past-clients-data'} className={'interface-container-block'} masonry={this.state.masonry}></PastClientsData>
      )
    })();
    const githubRepositoriesData = (() => {
      return (
        <GithubRepositoriesData id={'github-repositories-data'} className={'interface-container-block'} masonry={this.state.masonry}></GithubRepositoriesData>
      )
    })();
    const webProjectsData = (() => {
      return (
        <WebProjectsData id={'web-projects-data'} className={'interface-container-block'} masonry={this.state.masonry}></WebProjectsData>
      )
    })();
    return (
      <section className={'user-interface'} style={{ display: this.state.show ? 'block' : 'none' }}>
        { this.state.show ? portfolioHeader : null }
        <main>
          <section className={'user-interface-container-table'}>
            <section className={'user-interface-container'} ref={c => this.userInterfaceContainer = c}>
              { this.state.show ? pastClientsData : null }
              { this.state.show ? githubRepositoriesData : null }
              { this.state.show ? webProjectsData : null }
            </section>
          </section>
        </main>
      </section>
    );
  }
}
