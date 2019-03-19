import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { MemoryRouter, Route } from 'react-router-dom';

import Slide from './Slide';
jest.mock('./Data');

afterEach(cleanup);

describe('<Slide />', () => {
  test('First Slide', async () => {
    const { getByText, queryByText } = render(
      <MemoryRouter
        initialEntries={['/slide/1/#mock-keyword-1']}
        initialIndex={0}
      >
        <Route path="/slide/:slideId" component={Slide} />
      </MemoryRouter>
    );

    // Ensure the first slide is shown
    const nextSlideButton = getByText('Next Slide');
    expect(nextSlideButton).toBeTruthy();
    expect(queryByText('Previous Slide')).not.toBeTruthy();
    expect(getByText('Mock Slide 1')).toBeTruthy();
    expect(getByText('Mock Text 1')).toBeTruthy();

    // Move to next slide (previous slide button should be present now)
    fireEvent.click(nextSlideButton);
    expect(getByText('Mock Slide 2')).toBeTruthy();
    expect(getByText('Mock Text 2')).toBeTruthy();
    expect(getByText('Previous Slide')).toBeTruthy();

    // Move to next (last) slide (next slide button should not be present)
    fireEvent.click(nextSlideButton);
    expect(getByText('Mock Slide 3')).toBeTruthy();
    expect(getByText('Mock Text 3')).toBeTruthy();
    expect(queryByText('Next Slide')).not.toBeTruthy();

    // Move to previous slide
    fireEvent.click(getByText('Previous Slide'));
    expect(getByText('Mock Slide 2')).toBeTruthy();
    expect(getByText('Mock Text 2')).toBeTruthy();
    expect(getByText('Next Slide')).toBeTruthy();
  });

  test('Second Slide Initialized', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/slide/1', '/slide/2']} initialIndex={2}>
        <Route
          path="/slide/:slideId"
          render={props => <Slide {...props} changePhoto={() => {}} />}
        />
      </MemoryRouter>
    );

    expect(getByText('Next Slide')).toBeTruthy();
    expect(getByText('Previous Slide')).toBeTruthy();
  });
});
