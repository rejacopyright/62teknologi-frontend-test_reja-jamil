import { bytesToSize } from '@helpers'
import { ReactComponent as PrevImg } from '@images/Arrow-right.svg'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const BusinessCard: FC<any> = ({ data: detail }) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any>({})
  const [isHover, setIsHover] = useState<boolean>(false)
  useEffect(() => {
    setData(detail)
  }, [detail])
  const { image_url: avatar, name, location: address, distance, is_closed, id } = data || {}
  return (
    <div
      onClick={() => navigate(`${id}/reviews`)}
      className='col-12 py-3 cursor-pointer bg-hover-primary text-hover-white'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className='d-flex align-items-center pe-none'>
        <div
          className='border'
          style={{
            width: 75,
            height: 75,
            borderRadius: 10,
            background: `#fff url(${avatar}) center / cover no-repeat`,
          }}
        />
        <div className='ms-3'>
          <div className='text-capitalize fw-bold fs-7 text-break'>{name}</div>
          <div className='flex-start'>
            <i className='las la-map-marker me-1' />
            <div className='fs-9 text-break'>{address?.display_address?.join(', ')}</div>
          </div>
          <div className='d-flex mt-2'>
            <div className='fs-9 w-75px fw-bold text-break'>{bytesToSize(distance)}</div>
            <div className={`fs-9 fw-bold text-break text-${is_closed ? 'danger' : 'success'}`}>
              {is_closed ? 'Closed' : 'Open'}
            </div>
          </div>
        </div>
        {isHover && (
          <div className='ms-auto'>
            <PrevImg />
          </div>
        )}
      </div>
    </div>
  )
}
