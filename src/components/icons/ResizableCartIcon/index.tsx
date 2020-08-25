import React from 'react'

export type ResizableCartIconProps = {
  width?: string
}

const ResizableCartIcon: React.FC<ResizableCartIconProps> = ({
  width = '58px',
}: ResizableCartIconProps) => {
  return (
    <svg
      width="49"
      height="42"
      viewBox="0 0 49 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M0.37653 1.7245C0.37653 2.58006 1.08602 3.31042 1.92072 3.31042H8.97388L12.3127 26.2228C12.7509 29.1859 14.3159 31.0431 17.3417 31.0431H41.6939C42.5077 31.0431 43.2172 30.3754 43.2172 29.4781C43.2172 28.5808 42.5077 27.913 41.6939 27.913H17.6964C16.507 27.913 15.7766 27.0783 15.5888 25.8054L15.255 23.6144H41.7356C44.7823 23.6144 46.3473 21.7363 46.7855 18.7523L48.4549 7.71343C48.4967 7.44216 48.5384 7.10828 48.5384 6.92047C48.5384 5.91884 47.7872 5.23022 46.6395 5.23022H12.5839L12.1666 2.58006C11.9579 0.973273 11.3736 0.159446 9.24516 0.159446H1.92072C1.08602 0.159446 0.37653 0.889804 0.37653 1.7245ZM15.5888 37.8042C15.5888 39.7031 17.0913 41.1847 18.9902 41.1847C20.8683 41.1847 22.3707 39.7031 22.3707 37.8042C22.3707 35.9261 20.8683 34.4237 18.9902 34.4237C17.0913 34.4237 15.5888 35.9261 15.5888 37.8042ZM35.0998 37.8042C35.0998 39.7031 36.6231 41.1847 38.5012 41.1847C40.4001 41.1847 41.9026 39.7031 41.9026 37.8042C41.9026 35.9261 40.4001 34.4237 38.5012 34.4237C36.6231 34.4237 35.0998 35.9261 35.0998 37.8042Z"
        fill="#2AC1BC"
      />
    </svg>
  )
}

export default ResizableCartIcon