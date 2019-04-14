import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import './Nav.css';

const Nav = props => {
  const { pathname, state } = props.location;
  const contactButton = React.createRef();
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
          innerRef={contactButton}
        >
          {text}
        </Link>
      </div>

      <KeyboardEventHandler
        handleFocusableElements={true}
        handleKeys={['c', 'up', 'down']}
        onKeyEvent={() => contactButton.current.click()}
      />
    </header>
  );
};

export default withRouter(Nav);
