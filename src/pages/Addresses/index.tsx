import React from 'react'
import ParcelIcon from 'src/components/icons/ParcelICon'
import PageHeader from 'src/components/PageHeader'
import './style.scss'

export type AddressesProps = unknown

const Addresses: React.FC<AddressesProps> = () => {
  return (
    <div className="addresses">
      <PageHeader
        Icon={ParcelIcon.bind({}, { widith: '46px' })}
        title="배송지 관리"
      ></PageHeader>
    </div>
  )
}

export default Addresses
