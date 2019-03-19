import React from 'react';

const NotFound = props => (
  <section className="content content_not-found">
    <article className="content__article">
      <h2 className="content__headline">Page Not Found</h2>
      <div className="content__text">
        <p>Hm, the page you were looking for doesn't seem to exist.</p>
        <p>
          Instead, feast your eyes on this beautiful Unsplash photo in the
          background.
        </p>
      </div>
    </article>
  </section>
);

export default NotFound;
