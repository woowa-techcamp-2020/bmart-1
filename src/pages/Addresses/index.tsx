import { Address } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import {
  addAddresss,
  deleteAddress,
  getUser,
  setDefaultAddressId,
} from 'src/apis'
import ParcelIcon from 'src/components/icons/ParcelICon'
import PlusIcon from 'src/components/icons/PlusIcon'
import PageHeader from 'src/components/PageHeader'
import AddressModal from './AddressDialog'
import AddressItem from './AddressItem'
import './style.scss'

type AddressContainerProps = {
  addresses: Address[]
  defaultAddress: number
  onDefaultSelect?: (id: number) => void
  onDelete?: (id: number) => void
}

const AddressContainer: React.FC<AddressContainerProps> = ({
  addresses,
  defaultAddress,
  onDelete,
  onDefaultSelect,
}) => {
  return (
    <>
      {addresses.map((x, idx) => (
        <AddressItem
          {...x}
          key={idx}
          isDefault={x.id === defaultAddress}
          onDelete={() => onDelete(x.id)}
          onSelect={() => onDefaultSelect(x.id)}
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

  async function onAddSubmit(address1, address2) {
    console.log(address1, address2)
    await addAddresss({ address1, address2 })
    setAddOpen(false)
    await getAddresses()
  }

  function onEditSubmit(address1, address2) {
    console.log(address1, address2)
    setEditOpen(false)
  }

  async function onDefaultSelect(id) {
    await setDefaultAddressId({ defaultAddressId: id })
    setDefaultAddress(id)
  }

  async function onDelete(id) {
    await deleteAddress({ addressId: id })
    await getAddresses()
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
        onDefaultSelect={onDefaultSelect}
        onDelete={onDelete}
      ></AddressContainer>
      <div className="add" onClick={onAddressPlus}>
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
