import React from 'react'
import './style.scss'

export type AddressItemProps = {
  address1: string
  address2: string
}

const AddressItem: React.FC<AddressItemProps> = ({ address1, address2 }) => {
  return (
    <div className="address-item">
      <div className="row">
        <a>수정</a>
        <a>삭제</a>
      </div>
      <div className="address1">{address1}</div>
      <div className="address1">{address2}</div>
    </div>
  )
}

export default AddressItem
