import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Loading from '../Loading/Loading';
import Nav from '../Nav/Nav';
import Figure from '../Figure/Figure';
import Home from '../Home/Home';
import Slide from '../Slide/Slide';
import Contact from '../Contact/Contact';
import NotFound from '../NotFound/NotFound';
import './App.css';

const App = props => {
  // App is initialized when the first photo is loaded,
  // so we're passing this to the <Figure /> component
  const [loading, setLoading] = useState(true);

  return (
    <section className="app">
      <Loading hide={!loading} />
      <Nav />
      <TransitionGroup className="content-container">
        <CSSTransition
          key={props.location.pathname}
          timeout={{ enter: 2000, exit: 1000 }}
          classNames={'app__animation'}
        >
          <Switch location={props.location}>
            <Route exact path="/" component={Home} />
            <Route path="/slide/:slideId" component={Slide} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Figure setLoading={setLoading} />
    </section>
  );
};

export default withRouter(App);
