import { getBusinessDetail, getBusinessReviews } from '@api/business'
import Gallery from '@components/gallery'
import Reviews from '@components/reviews'
import { ReactComponent as BackImg } from '@images/Arrow-left.svg'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

const HeaderCard: FC<any> = ({ detail, loading }: any) => {
  const navigate = useNavigate()
  const [data, setData] = useState<any>({})
  useEffect(() => {
    setData(detail)
  }, [detail])
  return (
    <div className='position-absolute top-0 start-0 w-100 h-75px d-flex align-items-center'>
      <div className='d-flex w-100 align-items-center cursor-pointer'>
        <div className='col-auto ps-3 pe-2' onClick={() => navigate(-1)}>
          <BackImg />
        </div>
        <div
          className='col-auto'
          onClick={() => navigate(-1)}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            background: `#eee url(${data?.image_url}) center / cover no-repeat`,
          }}
        />
        <div className='col ps-2'>
          <div className='text-capitalize fw-bold fs-5 lh-1 text-truncate-2 pe-none'>
            {data?.name || '-'}
          </div>
          <Rating readonly size={20} initialValue={detail?.rating || 0} />
        </div>
        <div className='col-auto ms-auto pe-3 ps-2'>
          <div
            onClick={() => {
              const lat: any = detail?.coordinates?.latitude
              const lng: any = detail?.coordinates?.longitude
              if (lat && lng) {
                window.open(`https://www.google.com/maps/place/${lat},${lng}`)
              }
            }}
            className={`btn btn-sm ${loading ? 'bg-cc' : 'btn-primary'} text-white fs-7`}
          >
            See on maps
          </div>
        </div>
      </div>
    </div>
  )
}

const Index: FC = () => {
  const { business_id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true)
  const [detail, setDetail] = useState<any>({})
  const [reviews, setReviews] = useState<any>([])
  useEffect(() => {
    setLoading(true)
    if (business_id) {
      getBusinessDetail(business_id)
        .then(({ data }: any) => {
          setDetail(data)
        })
        .catch(() => setDetail([]))
        .finally(() => setLoading(false))

      getBusinessReviews(business_id)
        .then(({ data }: any) => {
          setReviews(data?.reviews || [])
        })
        .catch(() => setDetail([]))
        .finally(() => setLoadingReviews(false))
    } else {
      setLoading(false)
      setLoadingReviews(false)
      setDetail({})
    }
  }, [business_id])
  return (
    <div className='' style={{ paddingTop: 75 }}>
      <HeaderCard loading={loading} detail={detail} />
      <div className='overflow-auto' style={{ height: '85vh' }}>
        <Gallery loading={loading} items={detail?.photos || []} />
        <Reviews loading={loadingReviews} items={reviews} />
      </div>
    </div>
  )
}

export default Index
