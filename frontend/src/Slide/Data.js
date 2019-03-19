const data = [
  {
    title: 'Slide 1',
    html: `
      <p>Content for all slides is stored in  <code>/frontend/src/Slide/Data.js</code>.</p>
      <p>You can easily tweak it, change it, or add new slides using a simple HTML.</p>
    `,
    keyword: 'collection',
  },

  {
    title: 'Slide 2',
    html: `
      <p>Every slide has a keyword associated with it, and <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer">Unsplash API</a> is queried based on it to show a random, but relevant photo. </p>

      <p>This slide, for example, should present a beautiful <em>sky</em> photo.</p>
      `,
    keyword: 'sky',
  },

  {
    title: 'Slide 3',
    html: `
      <p>You can find more technical details in the Github repo.</p>
      <p><a href="https://twitter.com/zoranjambor" target="_blank" rel="noopener noreferrer">Zoran Jambor</a></p>
    `,
    keyword: 'code',
  },
];

export default data;
