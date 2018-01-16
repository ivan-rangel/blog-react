import React from 'react'
import { Route, Switch } from 'react-router-dom'

// Components
import Home from '../components/Home/Home';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'
import Post from '../components/Post/Post/Post'
import PostCreate from '../components/Post/PostCreate/PostCreate'

// Routing
const AppRoutes = () =>
  <main>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/fb-login/:token" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/post/:postId" component={Post} />
      <Route exact path="/post-create" component={PostCreate} />
    </Switch>
    <Footer />
  </main>;

export default AppRoutes;