import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Home from './Home';

test('<Home />', () => {
  const { container } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(
    container.querySelector('.content_home .content__headline')
  ).toBeTruthy();
});
