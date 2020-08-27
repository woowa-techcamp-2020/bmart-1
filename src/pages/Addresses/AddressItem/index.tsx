import $ from 'classnames'
import React from 'react'
import './style.scss'

export type AddressItemProps = {
  address1: string
  address2: string
  isDefault?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

const AddressItem: React.FC<AddressItemProps> = ({
  address1,
  address2,
  isDefault = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={$(['address-item', { default: isDefault }])}>
      <div className="row">
        <a onClick={() => onEdit && onEdit()}>수정</a>
        <a onClick={() => onDelete && onDelete()}>삭제</a>
      </div>
      <div className="address1">{address1}</div>
      <div className="address1">{address2}</div>
    </div>
  )
}

export default AddressItem
