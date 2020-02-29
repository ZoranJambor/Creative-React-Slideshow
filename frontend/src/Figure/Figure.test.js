import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import { config } from 'react-transition-group';

import Figure from './Figure';
import photo from './MockPhoto.js';
global.fetch = require('jest-fetch-mock');

// Disable transitions from 'react-transition-group'
config.disabled = true;

afterEach(cleanup);

test('<Figure />', async () => {
  fetch.mockResponseOnce(JSON.stringify(photo));

  // Dirty mock for image.onload, since it's not supported by jsdom
  // https://github.com/jsdom/jsdom/issues/1816
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src) {
      this.onload();
    },
  });

  const { container } = render(
    <MemoryRouter>
      <Figure setLoading={() => {}} />
    </MemoryRouter>
  );
  expect(container).toBeTruthy();

  const img = await waitForElement(() => container.querySelector('img'));
  expect(img).toBeTruthy();
  expect(img.getAttribute('src')).toMatch(/^https:\/\/images.unsplash.com\/.+/);
  expect(img.getAttribute('alt')).toBeTruthy();
});
