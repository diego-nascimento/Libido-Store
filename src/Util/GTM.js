export const GTM_ID = 'GTM-P26BSCM';

export const pageview = (url) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
};
