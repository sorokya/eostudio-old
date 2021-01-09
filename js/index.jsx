// import('eo').then(eo => {
//     console.log(eo);
// }).catch(console.error);

import '../scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';

ReactDOM.render(<Welcome />, document.getElementById('container'))