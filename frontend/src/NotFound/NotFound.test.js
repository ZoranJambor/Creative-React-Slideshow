import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import App from '../App/App';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('Page not found should render correctly', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page Not Found')).toBeTruthy();
  });

  test('Not-existing page should return 404 page not found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/f32jih8fh2if']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText('Page Not Found')).toBeTruthy();
  });
});
