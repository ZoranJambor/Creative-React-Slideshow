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
      <p>You can also navigate using your keyboard. <em>Right Arrow</em> will take you to the next slide, and <em>Left Arrow</em> will take you to the previous one.</p>

      <p>To open the contact page, press <em>c</em> key or <em>Arrow Up</em> and to return to the slides, press <em>c</em> key again or <em>Arrow Down</em>.</p>
      `,
    keyword: 'keyboard',
  },

  {
    title: 'Slide 4',
    html: `
      <p>You can find more technical details on the <a href="https://github.com/ZoranJambor/Creative-React-Slideshow" target="_blank">Github</a>.</p>
      <p><a href="https://twitter.com/zoranjambor" target="_blank" rel="noopener noreferrer">Zoran Jambor</a></p>
    `,
    keyword: 'code',
  },
];

export default data;
