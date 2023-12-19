import { FC, useState } from 'react'
import { Modal as MODAL } from 'react-bootstrap'

const Modal: FC<any> = ({
  show,
  setShow,
  title = '',
  body = 'Content',
  bodyClass = 'd-flex flex-center',
  children = '',
  buttonSave = true,
  loading = false,
  disabled = false,
  onSubmit,
  onReset,
  header = true,
  footer = true,
  size = 'md',
  isFullScreen = false,
  onHide,
  backdrop = true, // boolean or string 'static'
  theme = 'primary',
  center = true,
  scrollable = true,
}) => {
  const [fullscreen, setFullscreen] = useState<any>(false)

  const onClose = () => {
    setShow(false)
    onHide && onHide()
    setTimeout(() => {
      setFullscreen(false)
    }, 1000)
  }

  return (
    <MODAL
      dialogClassName={`modal-${size}`}
      centered={center}
      fullscreen={fullscreen}
      scrollable={scrollable}
      backdrop={backdrop}
      show={show}
      onHide={onClose}
    >
      {header && (
        <MODAL.Header className='p-3 border-0'>
          <div className='row m-0 w-100 flex-center flex-nowrap'>
            {title && <div className={`col fw-600 text-${theme} text-uppercase`}>{title}</div>}
            <div className='col-auto ms-auto me-n3'>
              {isFullScreen && (
                <div
                  className='btn btn-icon btn-light-success same-25px rounded-circle me-2'
                  onClick={() => setFullscreen(!fullscreen)}
                >
                  <i className={`las la-angle-double-${fullscreen ? 'down' : 'up'}`} />
                </div>
              )}
              <div
                className='btn btn-sm flex-center btn-light-danger same-25px radius-50'
                onClick={onClose}
              >
                <i className='las la-times' />
              </div>
            </div>
          </div>
        </MODAL.Header>
      )}
      <MODAL.Body className={bodyClass}>{children || body}</MODAL.Body>
      {footer && (
        <MODAL.Footer className='p-3 border-0'>
          <button className='btn btn-sm btn-light' dir='left' disabled={loading} onClick={onClose}>
            Close
          </button>
          <button className='btn btn-sm btn-light' dir='left' disabled={loading} onClick={onReset}>
            Reset
          </button>
          {buttonSave && (
            <button
              className='btn btn-sm btn-primary text-white'
              dir='left'
              disabled={disabled}
              onClick={onSubmit}
            >
              Filter
            </button>
          )}
        </MODAL.Footer>
      )}
    </MODAL>
  )
}

export { Modal }
