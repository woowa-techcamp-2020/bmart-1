import React from 'react'
import CouponLower from 'src/assets/images/banners/coupon-lower.png'
import CouponUpper from 'src/assets/images/banners/coupon-upper.png'
import './style.scss'

export type CouponsProps = unknown

const Coupons: React.FC<CouponsProps> = () => {
  return (
    <div className="coupons">
      <img src={CouponUpper} className="coupon upper" alt="coupon" />
      <img src={CouponLower} className="coupon lower" alt="coupon" />
    </div>
  )
}

export default Coupons
