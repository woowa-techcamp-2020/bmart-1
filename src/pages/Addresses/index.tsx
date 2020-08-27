import { Address } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { getUser } from 'src/apis'
import ParcelIcon from 'src/components/icons/ParcelICon'
import PlusIcon from 'src/components/icons/PlusIcon'
import PageHeader from 'src/components/PageHeader'
import AddressItem from './AddressItem'
import AddressModal from './AddressModal'
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
  const [isEditOpen, setEditOpen] = useState(false)
  const [isAddOpen, setAddOpen] = useState(false)

  async function getAddresses() {
    const user = await getUser()

    setDefaultAddress(user.defaultAddressId)
    setAddresses(user.addresses)
  }

  useEffect(() => {
    getAddresses()
  }, [])

  function onAddressPlus() {
    setAddOpen(true)
  }

  function onAddSubmit(address1, address2) {
    console.log(address1, address2)
    setAddOpen(false)
  }

  function onEditSubmit(address1, address2) {
    console.log(address1, address2)
    setEditOpen(false)
  }

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
      <div onClick={() => onAddressPlus()}>
        <PlusIcon></PlusIcon>
      </div>

      {isAddOpen && (
        <AddressModal
          title="배송지 추가"
          buttonText="추가"
          onCancel={() => setAddOpen(false)}
          onSubmit={onAddSubmit}
        ></AddressModal>
      )}
      {isEditOpen && (
        <AddressModal
          title="배송지 수정"
          buttonText="수정"
          onCancel={() => setEditOpen(false)}
          onSubmit={onEditSubmit}
        ></AddressModal>
      )}
    </div>
  )
}

export default Addresses
