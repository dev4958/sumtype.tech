'use strict';

//NPM Modules
import React from 'react';
import { TweenMax } from 'gsap';

//Components
import GithubRepositoriesData from '../GithubRepositoriesData/GithubRepositoriesData';
import PortfolioHeader from '../PortfolioHeader/PortfolioHeader';

export default class UserInterface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      TweenMax.to('#loader', 1, { opacity: 0, ease: Linear.easeOut, onComplete: () => {
        document.getElementById('loader').remove();
        this.setState({ show: true });
      } });
    }, this.props.delay);
  }
  render() {
    return (
      <section className="user-interface" style={{ display: this.state.show ? 'block' : 'none' }}>
        <PortfolioHeader id="portfolio-header"></PortfolioHeader>
        <main>
          <section className="user-interface-container-table">
            <section className="user-interface-container">
              <GithubRepositoriesData id="github-repositories-data"></GithubRepositoriesData>
            </section>
          </section>
        </main>
      </section>
    );
  }
}
