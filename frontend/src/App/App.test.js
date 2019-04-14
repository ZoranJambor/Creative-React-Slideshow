import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from 'react-testing-library';

import App from './App';
import photo from '../Figure/MockPhoto.js';

afterEach(cleanup);

// Mock fetch
global.fetch = require('jest-fetch-mock');
fetch.mockResponse(JSON.stringify(photo));

// Dirty mock for image.onload, since it's not supported by jsdom
// https://github.com/jsdom/jsdom/issues/1816
Object.defineProperty(global.Image.prototype, 'src', {
  set(src) {
    this.onload();
  },
});

describe('<App />', () => {
  let app;

  beforeEach(() => {
    app = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  test('Loading screen should be shown', () => {
    const { container } = app;
    expect(container.querySelector('.loading')).toBeTruthy();
    expect(container.querySelector('img')).not.toBeTruthy();
    expect(container.querySelector('.loading_hide')).not.toBeTruthy();
  });

  test('When the app is loaded, main sections should be shown and the loading screen should be hidden', async () => {
    const { container } = app;
    await waitForElement(() => container.querySelector('.figure'));
    expect(container.querySelector('.loading_hide')).toBeTruthy();
    expect(container.querySelector('.figure__img')).toBeTruthy();
    expect(container.querySelector('.content_home')).toBeTruthy();
    expect(container.querySelector('.nav')).toBeTruthy();
  });

  test('Navigating to the contact page and back should work', async () => {
    const { container, getByText } = app;

    // Click on the contact button, wait for the contact page to animate in
    const contactButton = getByText('Contact');
    fireEvent.click(contactButton);
    await waitForElement(() =>
      container.querySelector('.content_contact.app__animation-enter-done')
    );
    expect(container.querySelector('.content_home')).not.toBeTruthy();

    // Verify that the contact page is shown
    const contactBack = getByText('Back');
    expect(contactBack).toBeTruthy();
    const contactContent = container.querySelector('.content_contact');
    expect(contactContent).toBeTruthy();
    expect(
      contactContent.querySelector('.content_contact .content__headline')
    ).toBeTruthy();

    // Click on the back button and verify that the home page is shown again
    fireEvent.click(contactButton);
    await waitForElement(() =>
      container.querySelector('.content_home.app__animation-enter-done')
    );
    expect(container.querySelector('.content_contact')).not.toBeTruthy();
    expect(container.querySelector('.content_home')).toBeTruthy();
  });

  test('Navigating to the slide page and back should work', async () => {
    const { container, getByText } = app;

    // Click on the show first slide button and verify slides page is shown
    const showFirstSlideButton = getByText('Show First Slide').parentElement;
    fireEvent.click(showFirstSlideButton);
    await waitForElement(() =>
      container.querySelector('.content_slide.app__animation-enter-done')
    );
    expect(container.querySelector('.content_home')).not.toBeTruthy();
    expect(container.querySelector('.content_slide')).toBeTruthy();

    // Click on the back button and verify that the home page is shown again
    const homeButton = getByText('Home').parentElement;
    fireEvent.click(homeButton);
    await waitForElement(() =>
      container.querySelector('.content_home.app__animation-enter-done')
    );
    expect(container.querySelector('.content_slide')).not.toBeTruthy();
    expect(container.querySelector('.content_home')).toBeTruthy();
  });

  test('Navigating to the contact page and back using keyboard should work', async () => {
    const { container, getByText } = app;

    // Simulate 'c' key press, wait for the contact page to animation in
    fireEvent.keyDown(container, { key: 'c', keyCode: 67 });
    await waitForElement(() =>
      container.querySelector('.content_contact.app__animation-enter-done')
    );
    expect(container.querySelector('.content_home')).not.toBeTruthy();

    // Verify that the contact page is shown
    const contactBack = getByText('Back');
    expect(contactBack).toBeTruthy();
    const contactContent = container.querySelector('.content_contact');
    expect(contactContent).toBeTruthy();
    expect(
      contactContent.querySelector('.content_contact .content__headline')
    ).toBeTruthy();

    // Click on the back button and verify that the home page is shown again
    fireEvent.keyDown(container, { key: 'c', keyCode: 67 });
    await waitForElement(() =>
      container.querySelector('.content_home.app__animation-enter-done')
    );
    expect(container.querySelector('.content_contact')).not.toBeTruthy();
    expect(container.querySelector('.content_home')).toBeTruthy();
  });

  test('Navigating to the slide page and back using keyboard should work', async () => {
    const { container } = app;

    // Click on the show first slide button and verify slides page is shown
    fireEvent.keyDown(container, { key: 'ArrowRight', keyCode: 39 });
    await waitForElement(() =>
      container.querySelector('.content_slide.app__animation-enter-done')
    );
    expect(container.querySelector('.content_home')).not.toBeTruthy();
    expect(container.querySelector('.content_slide')).toBeTruthy();

    // Click on the back button and verify that the home page is shown again
    fireEvent.keyDown(container, { key: 'ArrowLeft', keyCode: 37 });
    await waitForElement(() =>
      container.querySelector('.content_home.app__animation-enter-done')
    );
    expect(container.querySelector('.content_slide')).not.toBeTruthy();
    expect(container.querySelector('.content_home')).toBeTruthy();
  });
});
