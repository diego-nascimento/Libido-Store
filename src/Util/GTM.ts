export const GA_TRACKING_ID = 'GTM-P26BSCM'

export const event = (data: any) => {
  // @ts-ignore
  window.dataLayer = window.dataLayer || []
  // @ts-ignore
  return window.dataLayer.push(data)
}
