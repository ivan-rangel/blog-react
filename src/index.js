import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { IntlProvider } from 'react-intl';


// import registerServiceWorker from './registerServiceWorker';

import AppRoutes from "./routes/AppRoutes";

ReactDOM.render(
    <IntlProvider locale="en">
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </IntlProvider>

    , document.getElementById('root'));
// registerServiceWorker();
