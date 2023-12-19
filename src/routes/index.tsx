import PageNotFound from '@pages/pageNotFound'
import { isValidElement } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from 'src/App'

import { Element } from './_element'
import user from './_user'

const routesMapper: any = (moduleRoutes: any) =>
  moduleRoutes?.map((level1: any) => {
    if (level1?.element && !isValidElement(level1?.element)) {
      level1.element = <Element el={level1.element} />
    }
    return level1
  })

const routes = [
  {
    path: '/*',
    Component: App,
    children: routesMapper(user),
  },
  // 404
  {
    path: '*',
    index: true,
    element: <PageNotFound />,
  },
]

const BrowserRouter: any = () => {
  const router: any = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export { BrowserRouter }
