import React, { useState } from 'react'
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

  return (
    <div className="address-dialog">
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
          <a
            className="button"
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
