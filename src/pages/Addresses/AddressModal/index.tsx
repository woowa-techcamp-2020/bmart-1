import React, { useState } from 'react'
import './style.scss'

export type AddressModalProps = {
  title: string
  buttonText: string
  address1: string
  address2: string
  onSubmit?: () => void
  onCancel?: () => void
}

const AddressModal: React.FC<AddressModalProps> = ({
  title,
  address1: _address1,
  address2: _address2,
  buttonText = '완료',
  onSubmit,
  onCancel,
}) => {
  const [address1, setAddress1] = useState(_address1)
  const [address2, setAddress2] = useState(_address2)

  return (
    <div className="address-modal">
      <div className="background" onClick={() => onCancel && onCancel()}></div>
      <div className="body">
        <div className="title">{title}</div>
        <div>
          <input
            onChange={({ target: { value } }) => setAddress1(value)}
            value={address1}
          />
        </div>
        <div>
          <input
            onChange={({ target: { value } }) => setAddress2(value)}
            value={address2}
          />
        </div>
        <div>
          <a className="button" onClick={() => onSubmit && onSubmit()}>
            완료
          </a>
        </div>
      </div>
    </div>
  )
}

export default AddressModal
