'use strict';

//Style
const css = require('../css/style.scss');

//Framework
import React from 'react';
import ReactDOM from 'react-dom';

//Components
import UserInterface from './lib/components/UserInterface/UserInterface';

//JSON
// import testJson from '../json/test'; //imports json file as object assigned to var

ReactDOM.render(<UserInterface />, document.getElementById('app'));
