import React from 'react';

const Contact = props => (
  <section className="content content_contact">
    <article className="content__article">
      <h2 className="content__headline">Contact</h2>
      <div className="content__text">
        <p>
          You can reach me on my{' '}
          <a
            href="https://zoranjambor.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            blog
          </a>
          {', '}
          <a
            href="https://twitter.com/zoranjambor"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          {', or '}
          <a
            href="https://www.linkedin.com/in/zoranjambor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          .
        </p>
        <p>
          I'd greatly appreciate if you check out my projects{' '}
          <a
            href="https://css-weekly.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            CSS Weekly
          </a>{' '}
          and{' '}
          <a
            href="https://inspiration-bits.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inspiration Bits
          </a>
          .
        </p>

        <p>
          Hope to hear from you,
          <br />
          Zoran Jambor
        </p>
      </div>
    </article>
  </section>
);

export default Contact;
