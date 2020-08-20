export function addCommaToPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Get the latest React state value from
 * its state action function using functional updates
 *
 * @param setStateFunction React SetStateAction
 */
export default function getState<T = unknown>(
  setStateFunction: (value: React.SetStateAction<T>) => void
): Promise<T> {
  return new Promise((resolve) => {
    setStateFunction((prevState) => {
      resolve(prevState)

      return prevState
    })
  })
}
