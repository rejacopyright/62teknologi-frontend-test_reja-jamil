import 'react-loading-skeleton/dist/skeleton.css'

import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface loaderProps {
  count?: number
  height?: number
  className?: string | undefined
  icon?: boolean
}

const randomString = () => {
  const rand: any =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  return rand
}

export const ListLoader: FC<loaderProps> = ({ count = 3, height = 25, className = '' }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 && (
        <div className='row m-0 align-items-center'>
          {Array(count)
            ?.fill(count)
            ?.map(() => {
              const random: number = Math.round(Math.random() * (10 - 7) + 7) // random 70% to 100%
              return (
                <div key={randomString()} className={`row m-0 w-100 ${className}`}>
                  <div className='col-auto ps-0' style={{ lineHeight: height / 2 + 'px' }}>
                    <Skeleton className='my-0 radius-10' width={height} height={height} count={1} />
                  </div>
                  <div className='col mt-1' style={{ lineHeight: height / 2 + 'px' }}>
                    <Skeleton
                      className='my-0'
                      width={random * 10 + '%'}
                      height={height / 4}
                      count={1}
                    />
                    <Skeleton
                      className='my-0'
                      width={random * 5 + '%'}
                      height={height / 3}
                      count={1}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </SkeletonTheme>
  )
}

export const CardLoader: FC<loaderProps> = ({
  count = 3,
  height = 100,
  className = '',
  icon = true,
}) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 &&
        Array(count)
          ?.fill(count)
          ?.map(() => {
            const random: number = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
            return (
              <div className={className} key={randomString()}>
                <div className='row m-0'>
                  <div className='col-12 mb-1' style={{ lineHeight: '20px' }}>
                    <div className='row align-items-center'>
                      {icon && (
                        <div className='col-auto' style={{ lineHeight: '15px' }}>
                          <Skeleton className='my-0' width={30} height={30} count={1} circle />
                        </div>
                      )}
                      <div className={`col ${icon ? 'ps-0' : ''}`} style={{ lineHeight: '15px' }}>
                        <Skeleton
                          className='my-0'
                          width={random * 10 + '%'}
                          height={10}
                          count={1}
                        />
                        <Skeleton className='my-0' height={10} count={1} />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 m-0' style={{ lineHeight: '20px' }}>
                    <Skeleton className='my-0 radius-10' height={height} count={1} />
                  </div>
                </div>
              </div>
            )
          })}
    </SkeletonTheme>
  )
}
