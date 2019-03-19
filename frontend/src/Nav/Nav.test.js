import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Nav from './Nav';

test('<Nav />', () => {
  const { container } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  // Logo
  const logo = container.querySelector('.nav__logo .nav__link');
  expect(logo).toBeTruthy();
  expect(logo.getAttribute('href')).toBe('/');

  // Contact
  const contact = container.querySelector('.nav__contact .nav__link');
  expect(contact).toBeTruthy();
  expect(contact.getAttribute('href')).toBe('/contact');
});
