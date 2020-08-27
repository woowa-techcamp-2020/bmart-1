import { ExecFileOptionsWithStringEncoding } from 'child_process'
import React from 'react'

export type CheckIconProps = {
  width?: ExecFileOptionsWithStringEncoding
}

const CheckIcon: React.FC<CheckIconProps> = ({ width = '20px' }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M9.42212 17.4736C14.054 17.4736 17.8889 13.6304 17.8889 9.00684C17.8889 4.375 14.0457 0.540039 9.41382 0.540039C4.79028 0.540039 0.955322 4.375 0.955322 9.00684C0.955322 13.6304 4.79858 17.4736 9.42212 17.4736ZM8.48413 13.0659C8.2019 13.0659 7.96948 12.9497 7.75366 12.6592L5.67017 10.1025C5.54565 9.93652 5.47095 9.75391 5.47095 9.56299C5.47095 9.18945 5.76147 8.88232 6.13501 8.88232C6.37573 8.88232 6.55835 8.95703 6.76587 9.23096L8.45093 11.4058L11.9954 5.71143C12.1531 5.4624 12.3689 5.32959 12.5847 5.32959C12.95 5.32959 13.2903 5.57861 13.2903 5.96875C13.2903 6.15137 13.1824 6.34229 13.0828 6.5166L9.1814 12.6592C9.00708 12.9331 8.76636 13.0659 8.48413 13.0659Z"
        fill="#9A47ED"
      />
    </svg>
  )
}

export default CheckIcon
