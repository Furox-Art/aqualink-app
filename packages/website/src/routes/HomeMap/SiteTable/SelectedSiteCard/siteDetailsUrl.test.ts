import { buildSiteDetailsUrl } from './siteDetailsUrl';

describe('buildSiteDetailsUrl', () => {
  it('keeps live site links unchanged', () => {
    expect(buildSiteDetailsUrl(17)).toBe('/sites/17');
    expect(buildSiteDetailsUrl(17, null)).toBe('/sites/17');
  });

  it('opens the site charts on a historical window ending on the selected date', () => {
    expect(buildSiteDetailsUrl(17, '2026-09-25')).toBe(
      '/sites/17?start=2026-08-25&end=2026-09-25',
    );
  });

  it('leaves the live link unchanged for an invalid date', () => {
    expect(buildSiteDetailsUrl(17, '2026-99-25')).toBe('/sites/17');
  });
});
