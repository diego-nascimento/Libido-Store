import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtm from '../Util/GTM'

const GoogleTagManager = ({ children }:any) => {
  const router = useRouter()

  console.log(gtm)
  return children
}

export default GoogleTagManager