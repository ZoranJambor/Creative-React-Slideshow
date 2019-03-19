import React from 'react';
import { render } from 'react-testing-library';
import Contact from './Contact';

test('<Contact />', () => {
  const { getByText } = render(<Contact />);
  expect(
    getByText('Contact', { selector: '.content_contact .content__headline' })
  ).toBeTruthy();
});
