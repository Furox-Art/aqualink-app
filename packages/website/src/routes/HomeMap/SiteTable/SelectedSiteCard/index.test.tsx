import React from 'react';
import configureStore from 'redux-mock-store';
import { waitFor } from '@testing-library/react';

import { mockSite } from 'mocks/mockSite';
import { renderWithProviders } from 'utils/test-utils';
import siteServices from 'services/siteServices';
import SelectedSiteCard from '.';

const site = {
  details: mockSite,
};

const mockStore = configureStore([]);

const store = mockStore({
  selectedSite: site,
  homepage: {
    siteOnMap: site,
  },
  surveyList: {
    list: [],
  },
  survey: {
    selectedSurvey: {
      details: null,
    },
  },
});

store.dispatch = vi.fn();

test('renders as expected', () => {
  process.env.REACT_APP_FEATURED_SITE_ID = '2';

  const { container } = renderWithProviders(<SelectedSiteCard />, { store });
  expect(container).toMatchSnapshot();
});

test('renders loading as expected', () => {
  process.env.REACT_APP_FEATURED_SITE_ID = '4';
  const { container } = renderWithProviders(<SelectedSiteCard />, { store });
  expect(container).toMatchSnapshot();
});

test('preserves the selected map date in links to the site detail page', async () => {
  vi.spyOn(siteServices, 'getSiteDailyData').mockImplementation(
    () => Promise.resolve({ data: [] }) as never,
  );

  const { container } = renderWithProviders(
    <SelectedSiteCard historicalDate="2026-09-25" />,
    { store },
  );
  await waitFor(() =>
    expect(container.textContent).toContain(
      'No daily data recorded on Sep 25, 2026',
    ),
  );
  const siteLinks = container.querySelectorAll('a[href^="/sites/"]');

  expect(siteLinks.length).toBeGreaterThan(0);
  siteLinks.forEach((link) => {
    expect(link.getAttribute('href')).toBe(
      '/sites/1?start=2026-08-25&end=2026-09-25',
    );
  });
});
