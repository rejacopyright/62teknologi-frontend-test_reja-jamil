import { getBusiness } from '@api/business'
import { BusinessCard } from '@components/cards'
import { Searchbox } from '@components/form'
import { ListLoader } from '@components/loader'
import { Modal } from '@components/modal'
import Pagination from '@components/pagination'
import emptyImg from '@images/empty-box.png'
import { debounce, mapValues, omit } from 'lodash'
import qs from 'qs'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

interface BusinessListProps {
  items?: Array<any>
  loading?: boolean
}

const BusinessList: FC<BusinessListProps> = ({ items, loading = false }) => {
  if (loading) {
    return <ListLoader className='my-2' height={75} count={5} />
  } else if (items?.length === 0) {
    return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: '65vh' }}>
        <div className='text-center opacity-50'>
          <img src={emptyImg} height={100} alt='' />
          <div className='mt-3 opacity-75 fw-light fs-7'>Business Not Found !!!</div>
        </div>
      </div>
    )
  }
  return (
    <div className='row m-0 zebra'>
      {items?.map((item: any, key: number) => <BusinessCard data={item} key={key} />)}
    </div>
  )
}

const Index: FC = () => {
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [businesses, setBusinesses] = useState<any>([])
  const [meta, setMeta] = useState<any>({ total: 0, limit: 0 })
  const [businessLoading, setBusinessLoading] = useState<boolean>(false)
  const [searchParams, setSearchParams]: any = useSearchParams({ location: '' })
  const [showModal, setShowModal] = useState<any>(false)
  const [filters, setFilters] = useState<any>([])
  const formRef: any = useRef()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { location: keyword }: any = qs.parse(searchParams?.toString()) || {}
  const query = qs.parse(searchParams?.toString(), { ignoreQueryPrefix: true })
  const { page = 1 }: any = query

  const onSearch = debounce(
    ({ target: { value } }: ChangeEvent & { target: HTMLInputElement }) => {
      setSearchParams({ location: value }, { replace: true })
      setSearchLoading(false)
    },
    1500,
    { leading: false, trailing: true }
  )

  useEffect(() => {
    setBusinessLoading(true)
    if (keyword) {
      getBusiness({
        ...filters,
        location: keyword,
        limit: 10,
        offset: ((page || 1) - 1) * 10,
      })
        .then(({ data: { businesses, total } }: any) => {
          setBusinesses(businesses)
          setMeta({ total, limit: 10 })
        })
        .catch(() => setBusinesses([]))
        .finally(() => setBusinessLoading(false))
    } else {
      setBusinessLoading(false)
      setBusinesses([])
    }
  }, [keyword, page, filters])

  return (
    <div className='m-3'>
      <div className='row'>
        <div className='col'>
          <Searchbox
            defaultValue={keyword}
            loading={searchLoading}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e?.target?.value
              if (val) {
                setSearchLoading(true)
                onSearch(e)
              } else {
                setSearchParams({ location: '' }, { replace: true })
                setSearchLoading(false)
                setBusinessLoading(false)
                setBusinesses([])
              }
            }}
          />
          <div
            className='d-flex align-items-center justify-content-end fs-8'
            style={{ height: 30 }}
          >
            {keyword && (
              <i>
                Showing businesses for <span className='fw-bold'>&ldquo;{keyword}&rdquo;</span>
              </i>
            )}
          </div>
        </div>
        <div className='col-auto ps-0'>
          <div
            className='btn btn-light-primary w-40px h-40px radius-10 border border-primary flex-center'
            onClick={() => setShowModal(true)}
          >
            <i className='las la-filter fs-5' />
          </div>
          <Modal
            size='md'
            theme='primary'
            center={false}
            show={showModal}
            setShow={setShowModal}
            title={`Filter Business`}
            onReset={() => {
              setFilters([])
              setShowModal(false)
            }}
            onSubmit={() => {
              setFilters(
                mapValues(omit(formRef, 'current') || {}, ({ value }: any, key: any) => {
                  let mapVal: any = value
                  if (value === 'true') {
                    mapVal = true
                  } else if (value === 'false') {
                    mapVal = false
                  }
                  if (key === 'attributes') {
                    mapVal = [...formRef?.attributes?.options]
                      ?.filter((m: any) => m?.selected)
                      ?.map(({ value }: any) => value)
                  }
                  return mapVal
                })
              )
              setShowModal(false)
            }}
            buttonText='Delete'
            // onHide={() => setDetail({})}
          >
            <div className='w-100'>
              <div className='row'>
                <div className='col-md-6 mb-3'>
                  <div className='mb-1'>Sort By</div>
                  <select
                    name=''
                    defaultValue={filters?.sort_by}
                    className='form-select form-select-sm'
                    ref={(e: any) => (formRef['sort_by'] = e)}
                  >
                    <option value='best_match'>Best Match</option>
                    <option value='distance'>Distance</option>
                    <option value='rating'>Rating</option>
                    <option value='review_count'>Most Reviewed</option>
                  </select>
                </div>
                <div className='col-md-6 mb-3'>
                  <div className='mb-1'>Radius</div>
                  <select
                    name=''
                    defaultValue={filters?.radius}
                    className='form-select form-select-sm'
                    ref={(e: any) => (formRef['radius'] = e)}
                  >
                    <option value=''>Select Radius</option>
                    <option value={100}>100m</option>
                    <option value={500}>500m</option>
                    <option value={1000}>1Km</option>
                    <option value={5000}>5Km</option>
                    <option value={10000}>10Km</option>
                    <option value={20000}>20Km</option>
                  </select>
                </div>
                <div className='col-md-6 mb-3'>
                  <div className='mb-1'>Category</div>
                  <select
                    name=''
                    defaultValue={filters?.categories}
                    className='form-select form-select-sm'
                    ref={(e: any) => (formRef['categories'] = e)}
                  >
                    <option value=''>Select Category</option>
                    <option value='bars'>Bars</option>
                    <option value='french'>French</option>
                    <option value='discgolf'>Disc Golf</option>
                  </select>
                </div>
                <div className='col-md-6 mb-3'>
                  <div className='mb-1'>Status</div>
                  <select
                    name=''
                    defaultValue={filters?.open_now}
                    className='form-select form-select-sm'
                    ref={(e: any) => (formRef['open_now'] = e)}
                  >
                    <option value=''>Select Status</option>
                    <option value='true'>Open</option>
                    <option value='false'>Close</option>
                  </select>
                </div>
                <div className='col-12 mb-3'>
                  <div className='mb-1'>Type</div>
                  <input
                    type='text'
                    defaultValue={filters?.term}
                    placeholder='e.g. "food", "restaurants", "Starbucks", "Hotel", etc'
                    className='form-control form-control-sm'
                    ref={(e: any) => (formRef['term'] = e)}
                  />
                </div>
                <div className='col-md-6 mb-3'>
                  <div className='mb-1'>Facilities</div>
                  <select
                    name=''
                    defaultValue={filters?.attributes}
                    multiple
                    size={4}
                    className='form-select form-select-sm'
                    ref={(e: any) => (formRef['attributes'] = e)}
                  >
                    <option value='hot_and_new'>Hot & New</option>
                    <option value='reservation'>Reservation</option>
                    <option value='parking_garage'>Parking</option>
                    <option value='wifi_free'>Free Wifi</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className='overflow-auto w-100 mt-3' style={{ height: 'calc(85vh - 75px)' }}>
        <BusinessList items={businesses} loading={businessLoading} />
      </div>
      <div className='text-end mt-3'>
        <Pagination
          className='mt-3 mb-5'
          limit={meta?.limit}
          showLimit={false}
          total={meta?.total > 1000 ? 1000 : meta?.total}
          page={page}
          onChangePage={(e: any) => {
            const queries = mapValues(query || {}, (val: any, key: any) => {
              let mapVal: any = val
              if (key === 'page') {
                mapVal = e
              }
              return mapVal
            })
            if (!Object.hasOwn(queries, 'page')) {
              queries.page = e
            }
            navigate({
              pathname,
              search: `?${qs.stringify(queries)}`,
            })
            setMeta((prev: any) => ({ ...prev, page: e }))
          }}
        />
      </div>
    </div>
  )
}

export default Index
