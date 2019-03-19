import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  // App is initialized when the first photo is loaded,
  // so we're passing this to the <Figure /> component
  initializeApp = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <section className="app">
        <Loading hide={!this.state.loading} />
        <Nav />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.pathname}
            timeout={{ enter: 2000, exit: 1000 }}
            classNames={'app__animation'}
          >
            <Switch location={this.props.location}>
              <Route exact path="/" component={Home} />
              <Route path="/slide/:slideId" component={Slide} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Figure initializeApp={this.initializeApp} />
      </section>
    );
  }
}

export default withRouter(App);
