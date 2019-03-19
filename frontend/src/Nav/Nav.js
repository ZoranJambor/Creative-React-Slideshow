import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './Nav.css';

const Nav = props => {
  const { pathname, state } = props.location;
  let to = '/contact';
  let text = 'Contact';
  let classModifier = '';

  // On a contact page the button changes from 'Contact' to 'Back', and
  // takes the user to the previous page (either home or slide/nr).
  // The previous page is passed through
  // router's sate.navigation prop
  if (pathname === '/contact') {
    to = state ? state.navigation : '/';
    text = 'Back';
    classModifier = ' nav__link_back';
  }

  return (
    <header className="nav">
      <h1 className="nav__logo">
        <Link
          to={{
            pathname: '/',
            state: { navigation: pathname },
          }}
          className="nav__link nav__link_logo"
        >
          Zoran Jambor
        </Link>
      </h1>
      <div className="nav__contact">
        <Link
          to={{
            pathname: to,
            state: { navigation: pathname },
          }}
          className={'nav__link' + classModifier}
        >
          {text}
        </Link>
      </div>
    </header>
  );
};

export default withRouter(Nav);
