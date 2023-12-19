import { CardLoader } from '@components/loader'
import emptyImg from '@images/empty-box.png'
import { FC, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface DetailProps {
  loading?: boolean
  items?: Array<any>
}

const Index: FC<DetailProps> = ({ items, loading }) => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    setData(items)
  }, [items])
  return (
    <div className=''>
      {loading ? (
        <CardLoader height={50} className='my-4' />
      ) : items?.length === 0 ? (
        <div className='d-flex align-items-center justify-content-center' style={{ height: 350 }}>
          <div className='text-center opacity-50'>
            <img src={emptyImg} height={100} alt='' />
            <div className='mt-3 opacity-75 fw-light fs-7'>No reviews !!!</div>
          </div>
        </div>
      ) : (
        <div className='row m-0'>
          {data?.map(({ text, rating, time_created, user }: any, key: number) => (
            <div className='col-12 mb-3' key={key}>
              <div className='border border-f5 rounded p-3 shadow-sm mb-2'>
                <div className='row mb-2'>
                  <div className='col-auto'>
                    <div
                      className='h-40px w-40px radius-40'
                      style={{
                        background: `#fff url(${user?.image_url}) center / cover no-repeat`,
                      }}
                    />
                  </div>
                  <div className='col ps-0'>
                    <div className='fw-bold fs-7 text-break'>{user?.name}</div>
                    <Rating readonly size={15} initialValue={rating} />
                  </div>
                </div>
                <div className='fw-light fs-8 text-break'>{text}</div>
              </div>
              <div className='text-end fs-9 text-aa'>{time_created}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Index
