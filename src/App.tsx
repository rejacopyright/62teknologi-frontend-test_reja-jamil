import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
    <div className='container-fluid vh-100'>
      <div className='row justify-content-center align-items-center h-100'>
        <div className='col col-md-6'>
          <div className='border rounded position-relative' style={{ maxHeight: '95vh' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
