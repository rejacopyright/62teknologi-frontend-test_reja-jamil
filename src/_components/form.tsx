import { ChangeEventHandler, FC, useEffect, useState } from 'react'

interface SearchboxProps {
  onChange?: ChangeEventHandler
  loading?: boolean
  defaultValue?: string
}

export const Searchbox: FC<SearchboxProps> = ({ onChange, loading = false, defaultValue = '' }) => {
  const [val, setVal] = useState<string>('')
  useEffect(() => {
    setVal(defaultValue)
  }, [defaultValue])
  return (
    <>
      <div className='form-group position-relative'>
        <input
          type='text'
          defaultValue={val}
          className='form-control'
          placeholder='Enter location'
          onChange={onChange}
        />
        {loading && (
          <div className='position-absolute end-0 bottom-0 pb-2 pe-3'>
            <span className='spinner-border spinner-border-sm border-2 opacity-25'></span>
          </div>
        )}
      </div>
      {/* <button type='button' className='btn w-100 btn-primary'>
        Search
      </button> */}
    </>
  )
}
