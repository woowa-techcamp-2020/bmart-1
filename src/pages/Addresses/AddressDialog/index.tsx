import React, { useRef, useState } from 'react'
import './style.scss'

export type AddressDialogProps = {
  title: string
  buttonText: string
  address1?: string
  address2?: string
  onSubmit?: (address1: string, address2: string) => void
  onCancel?: () => void
}

const AddressDialog: React.FC<AddressDialogProps> = ({
  title,
  address1: _address1 = '',
  address2: _address2 = '',
  buttonText = '완료',
  onSubmit,
  onCancel,
}) => {
  const [address1, setAddress1] = useState(_address1)
  const [address2, setAddress2] = useState(_address2)
  const bodyRef = useRef<HTMLDivElement>(null)

  function onBackgroundClick({ target }) {
    if (target.closest('.body')) return

    onCancel && onCancel()
  }

  return (
    <div className="address-dialog" onClick={onBackgroundClick}>
      <div className="body" ref={bodyRef}>
        <div className="container">
          <div className="title">{title}</div>
          <input
            className="item"
            placeholder="주 주소"
            onChange={({ target: { value } }) => setAddress1(value)}
            value={address1}
          />
          <input
            className="item"
            placeholder="상세 주소"
            onChange={({ target: { value } }) => setAddress2(value)}
            value={address2}
          />
          <a
            className="button item"
            onClick={() => onSubmit && onSubmit(address1, address2)}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}

export default AddressDialog
