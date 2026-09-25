import { format, isValid, parseISO, subMonths } from 'date-fns';

/**
 * Build the detail-page URL for a site selected from the historical map.
 * The site charts accept an inclusive start/end range, so use the month
 * leading up to the selected day and keep that day as the range end.
 */
export const buildSiteDetailsUrl = (
  siteId: number,
  historicalDate?: string | null,
): string => {
  const sitePath = `/sites/${siteId}`;
  if (!historicalDate) return sitePath;

  const selectedDate = parseISO(historicalDate);
  if (!isValid(selectedDate)) return sitePath;

  const params = new URLSearchParams({
    start: format(subMonths(selectedDate, 1), 'yyyy-MM-dd'),
    end: format(selectedDate, 'yyyy-MM-dd'),
  });

  return `${sitePath}?${params.toString()}`;
};
