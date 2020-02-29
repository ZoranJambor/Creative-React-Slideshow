import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import FallbackPhotos from './FallbackPhotos';
import './Figure.css';

const Figure = props => {
  // Holds the current photo object, as
  // returned from the Unsplash API
  const [photo, setPhoto] = useState({ id: null });

  // Background photos are switched
  // based on url changes
  const history = useHistory();

  useEffect(() => {
    // Keeps track of the component status, because we want to prevent setting
    // state if component unmounts before API request finishes
    let isSubscribed = true;

    // Keeps track of the current photo state (it's set to true once we get a
    // new photo from the API and preload the image)
    let isPhotoLoading = false;

    /**
     * Gets a random photo from the Unsplash API based
     * on the keyword coming from URL hash or URL path
     *
     * @param {Object} location, from react router
     * @return {Mixed} void / false
     */
    const fetchPhoto = async keyword => {
      // Don't fetch a new photo if a request is already pending
      if (isPhotoLoading === true) {
        return false;
      }

      // Put the photo in a loading state
      isPhotoLoading = true;

      // Build the API URL
      const { orientation } = getScreenOptions();
      const query = keyword || 'wallpaper';

      // Fetch a random photo from the backend proxy, which pings the Unsplash API
      // with the appropriate Authorization header containing Client-ID
      const response = await fetch(
        `/api/photos/random?query=${query}&orientation=${orientation}`
      );

      // In case rate limit is reached or authorization token is wrong,
      // Unsplash will return non-200 response,
      if (response.status !== 200) {
        return fetchPhotoFallback(response);
      }

      // Wait for the Unsplash API response,
      // then preload the photo
      const photo = await response.json();
      photo.url = photo.urls.raw + getQueryParams();
      await preloadPhoto(photo.url);
      isPhotoLoading = false;

      // Put the new photo into the state if the
      // component wasn't already unmounted
      if (isSubscribed) {
        setPhoto(photo);
      }
    };

    /**
     * Gets the screen width, height,
     * orientation and dpi
     *
     * @return {Object}
     */
    const getScreenOptions = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const dpi = window.devicePixelRatio || 1;
      const orientation = width >= height ? 'landscape' : 'portrait';

      return { width, height, dpi, orientation };
    };

    /**
     * Gets a random photo from ./FallbackPhotos.js
     * preloads it, and puts it into state
     *
     * @param {Object} response
     * @return {Void}
     */
    const fetchPhotoFallback = async response => {
      const photo = random(FallbackPhotos);

      // Create the photo URL based on the current
      // screen size and DPI, then preload it
      photo.url = photo.urls.raw + getQueryParams();
      await preloadPhoto(photo.url);
      console.error(
        'Error fetching Unsplash photo, using fallback one instead:',
        response.statusText
      );
      isPhotoLoading = false;

      // Put the new photo into the state if the
      // component wasn't already unmounted
      if (isSubscribed) {
        setPhoto(photo);
      }
    };

    /**
     * Builds the image dimensions string
     * for the Unsplash API
     *
     * @return {String}
     */
    const getQueryParams = () => {
      const { width, height, dpi, orientation } = getScreenOptions();
      const size = orientation === 'landscape' ? `w=${width}` : `h=${height}`;
      return `&${size}&dpi=${dpi}&orientation=${orientation}`;
    };

    /**
     * Preloads an image
     *
     * @param {String} url
     * @return {Promise}
     */
    const preloadPhoto = url => {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = e => resolve(url);
        img.src = url;
      });
    };

    /**
     * Ensures we don't serve the same
     * fallback photo twice in a row
     *
     * @param {Array} photos
     * @return {Object}
     */
    let prevPhoto = null;
    const random = photos => {
      const result = photos[Math.floor(Math.random() * photos.length)];
      if (result.id === prevPhoto) return random(photos);
      prevPhoto = result.id;
      return result;
    };

    // Change photo when the user navigates
    const unlisten = history.listen(location => {
      const { hash, pathname } = location;

      // Use only the string part of the URL
      const keyword =
        hash.replace('#', '') || pathname.replace('/', '') || 'wallpaper';

      fetchPhoto(keyword);
    });

    // Gwt the intial photo
    fetchPhoto();

    return () => {
      isSubscribed = false;
      unlisten();
    };
  }, [history]);

  // Ensure a photo is loaded before hiding the app loader
  if (!photo || !photo.id) return '';
  props.setLoading(false);

  // Loading spinner is shown next to the photo description
  // when the photo is loading (API request + image.onload)
  const spinner = !photo ? <div className="spinner spinner_figure" /> : '';

  // Build attribution properties
  const linkAttributes = {
    className: 'figure__link',
    target: '_blank',
    rel: 'noopener noreferrer',
  };
  const { user } = photo;
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
};

export default Figure;
