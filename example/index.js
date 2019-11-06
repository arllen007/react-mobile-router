import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App.js';

const render = () => ReactDom.render(<App />, document.getElementById('root'));

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}
