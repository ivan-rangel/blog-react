import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// import registerServiceWorker from './registerServiceWorker';

import AppRoutes from "./routes/AppRoutes";

ReactDOM.render(
    <BrowserRouter>
        <AppRoutes />        
    </BrowserRouter>

    , document.getElementById('root'));
// registerServiceWorker();
