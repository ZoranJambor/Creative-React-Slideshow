import React, { useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import renderHTML from 'react-render-html';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import data from './Data';

const Slide = props => {
  const prevButton = useRef(null);
  const nextButton = useRef(null);

  /**
   * Returns the current slide number based on the URL
   * @return {Mixed} integer / string
   */
  const getCurrentSlide = () => {
    const { slideId } = props.match.params;

    let currentSlide = parseInt(slideId, 10);
    if (isNaN(currentSlide) || !data[currentSlide - 1]) {
      return 'slide-not-found';
    }

    return parseInt(currentSlide, 10);
  };

  /**
   * Renders the Next Slide button
   * @return {Mixed} Component / String
   */
  const nextSlideButton = () => {
    const currentSlide = getCurrentSlide();
    const slidesLength = data.length;
    const nextSlide = currentSlide < slidesLength ? currentSlide + 1 : '';

    if (nextSlide === '') {
      return '';
    }

    return (
      <React.Fragment>
        <Link
          to={'/slide/' + nextSlide + '/#' + data[nextSlide - 1].keyword}
          className="nav__arrow nav__arrow_next"
          innerRef={nextButton}
        >
          <span className="visuallyhidden">Next Slide</span>
        </Link>
        <KeyboardEventHandler
          handleFocusableElements={true}
          handleKeys={['right']}
          onKeyEvent={() => nextButton.current.click()}
        />
      </React.Fragment>
    );
  };

  /**
   * Renders the Previous Slide button
   * @return {Mixed} Component / String
   */
  const prevSlideButton = () => {
    const currentSlide = getCurrentSlide();
    const prevSlide = currentSlide > 1 ? currentSlide - 1 : '';
    let text = 'Home';
    let to = '/';

    if (prevSlide !== '') {
      text = 'Previous Slide';
      to = '/slide/' + prevSlide + '/#' + data[prevSlide - 1].keyword;
    }

    return (
      <React.Fragment>
        <Link
          to={to}
          className="nav__arrow nav__arrow_prev"
          innerRef={prevButton}
        >
          <span className="visuallyhidden">{text}</span>
        </Link>
        <KeyboardEventHandler
          handleFocusableElements={true}
          handleKeys={['left']}
          onKeyEvent={() => prevButton.current.click()}
        />
      </React.Fragment>
    );
  };

  // If a slide doesn't exist redirect to the 404 page
  const currentSlide = getCurrentSlide();
  if (currentSlide === 'slide-not-found') {
    return <Redirect to="/404-page-not-found" />;
  }

  // Data is zero-based, slide numbers are not
  const { title, html } = data[currentSlide - 1];

  return (
    <section className="content content_slide">
      <nav>
        {prevSlideButton()}
        {nextSlideButton()}
      </nav>
      <article className="content__article">
        <h2 className="content__headline">{title}</h2>
        <div className="content__text">{renderHTML(html)}</div>
      </article>
    </section>
  );
};

export default Slide;
