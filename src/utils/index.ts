export const isDev = process.env.NODE_ENV === 'development'

export function getItemNumbersInRow(gridElement: HTMLDivElement): number {
  const gridWidth = gridElement.getBoundingClientRect().width
  const itemWidth = gridElement.firstElementChild.getBoundingClientRect().width

  return Math.floor(gridWidth / itemWidth)
}

export function getRowNumber(idx, itemNumbersInRow) {
  return Math.floor(idx / itemNumbersInRow)
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

if (typeof window !== 'undefined') {
  HTMLElement.prototype.$sel = $sel
  HTMLElement.prototype.$$sel = $$sel
  Document.prototype.$sel = $sel
  Document.prototype.$$sel = $$sel
}

export const sanitizeNan = (value: number): number => (isNaN(value) ? 0 : value)
