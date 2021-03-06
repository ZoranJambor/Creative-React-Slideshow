import React from 'react';
import { Link } from 'react-router-dom';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import data from '../Slide/Data';
import './Home.css';

const Home = props => {
  const button = React.createRef();
  return (
    <section className="content content_home">
      <Link
        to={'/slide/1/#' + data[0].keyword}
        className="nav__arrow nav__arrow_next"
        innerRef={button}
      >
        <span className="visuallyhidden">Show First Slide</span>
      </Link>
      <KeyboardEventHandler
        handleFocusableElements={true}
        handleKeys={['right']}
        onKeyEvent={() => button.current.click()}
      />

      <article className="content__article">
        <h1 className="content__headline">Creative Slideshow</h1>
        <div className="content__text">
          <p>
            A simple slideshow built in React that shows a different (random)
            background image for each slide.
          </p>
          <p>All images are pulled directly from the Unsplash API.</p>
        </div>
      </article>
    </section>
  );
};

export default Home;
