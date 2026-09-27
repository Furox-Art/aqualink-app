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

  it.each([
    ['2024-03-31', '2024-02-29'],
    ['2025-03-31', '2025-02-28'],
    ['2026-01-15', '2025-12-15'],
  ])('keeps calendar-month bounds for %s', (end, start) => {
    expect(buildSiteDetailsUrl(17, end)).toBe(
      `/sites/17?start=${start}&end=${end}`,
    );
  });
});
