import $ from 'classnames'
import React, { useRef } from 'react'
import CheckIcon from 'src/components/icons/CheckIcon'
import './style.scss'

export type AddressItemProps = {
  address1?: string
  address2?: string
  isDefault?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onSelect?: () => void
  isSkeleton?: boolean
}

const SkeletonUI: React.FC = () => {
  return (
    <div className="address-item">
      <div className="check">
        <CheckIcon width="20px"></CheckIcon>
      </div>
      <div className="row">
        <span className="edit">
          <span className="mock">수정</span>
        </span>
        <span className="delete">
          <span className="mock red">삭제</span>
        </span>
      </div>
      <div className="address">
        <span className="mock">dfdfddddd</span>
      </div>
      <div className="address">
        <span className="mock">dfdfdaaa</span>
      </div>
    </div>
  )
}

const AddressItem: React.FC<AddressItemProps> = ({
  address1,
  address2,
  isDefault = false,
  isSkeleton = false,
  onEdit,
  onDelete,
  onSelect,
}) => {
  const checkRef = useRef<HTMLDivElement>(null)

  function onEditClick(event: React.MouseEvent) {
    event.stopPropagation()
    onEdit && onEdit()
  }

  function onDeleteClick(event: React.MouseEvent) {
    event.stopPropagation()
    onDelete && onDelete()
  }

  function onItemClick() {
    onSelect && onSelect()
  }

  return isSkeleton ? (
    <SkeletonUI></SkeletonUI>
  ) : (
    <div
      className={$(['address-item', { default: isDefault }])}
      onClick={onItemClick}
    >
      <div className="check" ref={checkRef}>
        <CheckIcon width="20px"></CheckIcon>
      </div>
      <div className="row">
        <span className="edit" onClick={onEditClick}>
          수정
        </span>
        <span className="delete" onClick={onDeleteClick}>
          삭제
        </span>
      </div>
      <div className="address">{address1}</div>
      <div className="address">{address2}</div>
    </div>
  )
}

export default AddressItem
