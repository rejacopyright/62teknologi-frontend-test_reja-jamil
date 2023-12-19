import '@styles/app.scss'

import { createRoot } from 'react-dom/client'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from './routes'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<BrowserRouter />)

reportWebVitals()
