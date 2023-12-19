import { lazy } from 'react'
const router: any = [
  { index: true, element: lazy(() => import('@pages/home')) },
  { path: ':business_id/reviews', element: lazy(() => import('@pages/home/detail')) },
]
export default router
