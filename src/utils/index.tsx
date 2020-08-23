export function addCommaToPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Get the latest React state value from
 * its state action function using functional updates
 *
 * @param setStateFunction React SetStateAction
 */
export default function getState<T = unknown>(
  setStateFunction: React.Dispatch<React.SetStateAction<T>>
): Promise<T> {
  return new Promise((resolve) => {
    setStateFunction((prevState) => {
      resolve(prevState)

      return prevState
    })
  })
}

/**
 * Returns a element matched with the given query
 */
export function $sel<T extends HTMLElement>(query: string): T {
  return ((this as HTMLElement) ?? document).querySelector<T>(query)
}

/**
 * Returns an array of elements matched with the given query
 */
export function $$sel<T extends HTMLElement>(query: string): T[] {
  return Array.from(
    ((this as HTMLElement) ?? document).querySelectorAll<T>(query)
  )
}

declare global {
  interface HTMLElement {
    $sel: typeof $sel
    $$sel: typeof $$sel
  }

  interface Document {
    $sel: typeof $sel
    $$sel: typeof $$sel
  }
}

HTMLElement.prototype.$sel = $sel
HTMLElement.prototype.$$sel = $$sel
Document.prototype.$sel = $sel
Document.prototype.$$sel = $$sel
