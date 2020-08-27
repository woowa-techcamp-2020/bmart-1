import { Address } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { getUser } from 'src/apis'
import ParcelIcon from 'src/components/icons/ParcelICon'
import PageHeader from 'src/components/PageHeader'
import AddressItem from './AddressItem'
import './style.scss'

type AddressContainerProps = {
  addresses: Address[]
  defaultAddress: number
}

const AddressContainer: React.FC<AddressContainerProps> = ({
  addresses,
  defaultAddress,
}) => {
  return (
    <>
      {addresses.map((x, idx) => (
        <AddressItem
          {...x}
          key={idx}
          isDefault={x.id === defaultAddress}
        ></AddressItem>
      ))}
    </>
  )
}

export type AddressesProps = unknown

const Addresses: React.FC<AddressesProps> = () => {
  const [addresses, setAddresses] = useState([])
  const [defaultAddress, setDefaultAddress] = useState<number>(0)

  async function getAddresses() {
    const user = await getUser()

    setDefaultAddress(user.defaultAddressId)
    setAddresses(user.addresses)
  }

  useEffect(() => {
    getAddresses()
  }, [])

  return (
    <div className="addresses">
      <PageHeader
        Icon={ParcelIcon.bind({}, { widith: '46px' })}
        title="배송지 관리"
      ></PageHeader>
      <AddressContainer
        addresses={addresses}
        defaultAddress={defaultAddress}
      ></AddressContainer>
    </div>
  )
}

export default Addresses
