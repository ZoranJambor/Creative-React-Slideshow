import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import FallbackPhotos from './FallbackPhotos';
import './Figure.css';

class Figure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Keeps track of the overall app loading state
      // (it's set to true once the
      // initial photo is loaded)
      appLoaded: false,

      // Keeps track of the current photo state
      // (it's set to true once we get a new
      // photo from the API and preload
      // the image)
      photoLoading: false,

      // Current photo object, as returned
      // from the Unsplash API
      photo: { id: null },
    };
  }

  /**
   * Preloads an image
   *
   * @param {String} url
   * @return {Promise}
   */
  photoPreload = url => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = e => resolve(url);
      img.src = url;
    });
  };

  /**
   * Gets a random photo from the Unsplash API based
   * on the keyword coming from URL hash or URL path
   *
   * @param {Object} location, from react router
   * @return {Mixed} void / false
   */
  fetchPhoto = async (location = this.props.location) => {
    // Don't fetch a new photo if a request is already pending
    if (this.state.photoLoading === true) {
      return false;
    }

    this.setState({ photoLoading: true });

    // Build the API URL
    const { orientation } = this.getScreenOptions();
    const { hash, pathname } = location;

    // Use just the string part of the URL
    const query =
      hash.replace('#', '') || pathname.replace('/', '') || 'wallpaper';

    // Fetch a random photo from the backend proxy, which pings the Unsplash API
    // with the appropriate Authorization header containg Client-ID
    const response = await fetch(
      `/api/photos/random?query=${query}&orientation=${orientation}`
    );

    // In case rate limit is reached or authorization token is wrong,
    // Unsplash will return non-200 response,
    if (response.status !== 200) {
      return this.photoFallback(response);
    }

    // Wait for the Unsplash API response,
    // then preload the photo
    const photo = await response.json();
    photo.url = photo.urls.raw + this.getQueryParams();
    await this.photoPreload(photo.url);

    this.setState({
      photoLoading: false,
      photo,
    });
  };

  /**
   * Ensures we don't serve the same
   * fallback photo twice in a row
   *
   * @param {Array} photos
   * @return {Object}
   */
  random = photos => {
    const result = photos[Math.floor(Math.random() * photos.length)];
    if (result.id === this.state.photo.id) return this.random(photos);
    return result;
  };

  /**
   * Gets a random photo from ./FallbackPhotos.js
   * preloads it, and puts it into state
   *
   * @param {Object} response
   * @return {Void}
   */
  photoFallback = async response => {
    const photo = this.random(FallbackPhotos);

    // Create the photo URL based on the current
    // screen size and DPI, then preload it
    photo.url = photo.urls.raw + this.getQueryParams();
    await this.photoPreload(photo.url);

    this.setState({
      photoLoading: false,
      photo,
    });

    console.error(
      'Error fetching Unsplash photo, using fallback one instead:',
      response.statusText
    );
  };

  /**
   * Gets the screen width, height,
   * orientation and dpi
   *
   * @return {Object}
   */
  getScreenOptions() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const dpi = window.devicePixelRatio || 1;
    const orientation = width >= height ? 'landscape' : 'portrait';

    return { width, height, dpi, orientation };
  }

  /**
   * Builds the image dimensions string
   * for the Unsplash API
   *
   * @return {String}
   */
  getQueryParams() {
    const { width, height, dpi, orientation } = this.getScreenOptions();
    const size = orientation === 'landscape' ? `w=${width}` : `h=${height}`;
    return `&${size}&dpi=${dpi}&orientation=${orientation}`;
  }

  // Render the component only when the photo
  // or the loading state actually changes
  shouldComponentUpdate(nextProps, nextState) {
    const { photo, photoLoading } = this.state;
    if (
      photo.id === nextState.photo.id &&
      photoLoading === nextState.photoLoading
    ) {
      return false;
    }

    return true;
  }

  // Set the app state to loaded once
  // the fist photo finishes loading
  componentDidUpdate() {
    const { appLoaded, photoLoading } = this.state;
    if (appLoaded === false && photoLoading === false) {
      this.setState({ appLoaded: true });
      this.props.initializeApp();
    }
  }

  // Changes the background photo each
  // time a new page is opened
  componentWillMount() {
    // history.listen returns an unlisten function
    // that we'll later (in unmounting stage)
    // use to remove this listener
    this.unlisten = this.props.history.listen((location, action) => {
      if (this.props.location.pathname !== location.pathname) {
        this.fetchPhoto(location);
      }
    });

    // Get the initial photo
    this.fetchPhoto();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { appLoaded, photoLoading, photo } = this.state;
    const { user } = photo;

    // Ensure a photo is loaded before
    // rendering the photo
    if (!appLoaded && photoLoading) {
      return '';
    }

    // Loading spinner is shown next to the photo description
    // when the photo is loading (API request + image.onload)
    const spinner =
      photoLoading === true ? <div className="spinner spinner_figure" /> : '';

    //
    const linkAttributes = {
      className: 'figure__link',
      target: '_blank',
      rel: 'noopener noreferrer',
    };
    const hrefUser =
      user.links.html + '?utm_source=creative-slideshow&utm_medium=referral';
    const hrefUnsplash =
      'https://unsplash.com/?utm_source=creative-slideshow&utm_medium=referral';

    return (
      <figure className="figure">
        <TransitionGroup className="figure__img-container">
          <CSSTransition
            key={photo.id}
            timeout={{ enter: 500, exit: 500 }}
            classNames={'figure__img-animation'}
          >
            <img
              src={photo.url}
              className="figure__img"
              alt={photo.description}
            />
          </CSSTransition>
        </TransitionGroup>

        {spinner}
        <TransitionGroup className="figure__caption-container">
          <CSSTransition
            key={photo.id}
            timeout={{ enter: 2000, exit: 2000 }}
            classNames={'figure__caption-animation'}
          >
            <div className="figure__caption-content">
              <figcaption className="figure__caption">
                {'Photo by '}
                <a href={hrefUser} {...linkAttributes}>
                  {user.name}
                </a>
                <br />
                {' on '}
                <a href={hrefUnsplash} {...linkAttributes}>
                  Unsplash
                </a>
              </figcaption>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </figure>
    );
  }
}

export default withRouter(Figure);
