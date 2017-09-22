'use strict';

//NPM Modules
import React from 'react';

//Components
import GithubUserData from '../GithubUserData/GithubUserData';

export default class UserInterface extends React.Component {
  render() {
    return (
      <section className="user-interface">
        <table className="user-interface-container-table">
          <tbody>
            <tr>
              <td className="user-interface-container">
                <GithubUserData id="github-user-data"></GithubUserData>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
