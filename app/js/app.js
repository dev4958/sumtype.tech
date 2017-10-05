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

console.log("%c\nsumtype.tech\n%cSoftware Development Portfolio\n\n","padding: 0; color:#000000; line-height:30px; font-size: 18px; font-family: 'Roboto', sans-serif;","padding:0px;color:#000000;line-height:20px;font-size:12px;font-family: 'Roboto', sans-serif;")

ReactDOM.render(<UserInterface delay="500" />, document.getElementById('app'));
