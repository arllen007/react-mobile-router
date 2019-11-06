import React from 'react';
import { BrowserRouter, Route } from '../src/index';

import { UserPage } from './pages/user/userpage';

export class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route path={'/'} component={UserPage}></Route>
            </BrowserRouter>
        );
    }
}
