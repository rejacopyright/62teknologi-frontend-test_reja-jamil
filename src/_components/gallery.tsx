import { FC, useEffect, useState } from 'react'
import Slider from 'react-slick'

const Index: FC<any> = ({ items, loading }) => {
  const [data, setData] = useState<any>([])
  const settings = {
    dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '30px',
    afterChange: (_current: any) => '',
  }
  useEffect(() => {
    setData(items)
  }, [items])
  if (loading) {
    return <div className='h-200px bg-f5 mx-2 radius-15 mb-3 mt-2' />
  }
  return (
    <div className='mb-3 mt-2'>
      <Slider {...settings}>
        {data?.map((m: any, index: any) => (
          <div key={index} className='h-350px position-relative'>
            <div
              className='h-100 mx-2 radius-15'
              style={{ background: `url(${m}) center / cover no-repeat` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default Index
