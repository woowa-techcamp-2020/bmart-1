export function addCommaToPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const isDev = process.env.NODE_ENV === 'development'
