import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import renderHTML from 'react-render-html';

import data from './Data';

export default class Slide extends Component {
  /**
   * Returns the current slide number based on the URL
   * @return {Mixed} integer / string
   */
  getCurrentSlide = () => {
    const { slideId } = this.props.match.params;

    let currentSlide = parseInt(slideId, 10);
    if (isNaN(currentSlide) || !data[currentSlide - 1]) {
      return 'slide-not-found';
    }

    return parseInt(currentSlide, 10);
  };

  /**
   * Renders out the Next Slide button
   * @return {Mixed} Component / String
   */
  nextSlideButton = () => {
    const currentSlide = this.getCurrentSlide();
    const slidesLength = data.length;
    const nextSlide = currentSlide < slidesLength ? currentSlide + 1 : '';

    if (nextSlide === '') {
      return '';
    }

    return (
      <Link
        to={'/slide/' + nextSlide + '/#' + data[nextSlide - 1].keyword}
        className="nav__arrow nav__arrow_next"
      >
        <span className="visuallyhidden">Next Slide</span>
      </Link>
    );
  };

  /**
   * Renders out the Previous Slide button
   * @return {Mixed} Component / String
   */
  prevSlideButton = () => {
    const currentSlide = this.getCurrentSlide();
    const prevSlide = currentSlide > 1 ? currentSlide - 1 : '';
    let text = 'Home';
    let to = '/';

    if (prevSlide !== '') {
      text = 'Previous Slide';
      to = '/slide/' + prevSlide + '/#' + data[prevSlide - 1].keyword;
    }

    return (
      <Link to={to} className="nav__arrow nav__arrow_prev">
        <span className="visuallyhidden">{text}</span>
      </Link>
    );
  };

  render() {
    // If a slide doesn't exist redirect to the 404 page
    const currentSlide = this.getCurrentSlide();
    if (currentSlide === 'slide-not-found') {
      return <Redirect to="/404-page-not-found" />;
    }

    // Data is zero-based, slide numbers are not
    const { title, html } = data[currentSlide - 1];

    return (
      <section className="content content_slide">
        <nav>
          {this.prevSlideButton()}
          {this.nextSlideButton()}
        </nav>
        <article className="content__article">
          <h2 className="content__headline">{title}</h2>
          <div className="content__text">{renderHTML(html)}</div>
        </article>
      </section>
    );
  }
}
