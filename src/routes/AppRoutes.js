import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Home from '../components/Home/Home';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

// Routing

const AppRoutes = () =>
    <main>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
        </Switch>
        <Footer />
    </main>;


export default AppRoutes;