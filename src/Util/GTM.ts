export const GA_TRACKING_ID = 'GTM-P26BSCM';

export const pageview = (url: URL) => {
  window.gtag && window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number,
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag && window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
