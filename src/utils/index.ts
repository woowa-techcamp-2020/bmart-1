export const isDev = process.env.NODE_ENV === 'development'

export function getItemNumbersInRow(gridElement: HTMLDivElement): number {
  const gridWidth = gridElement.getBoundingClientRect().width
  const itemWidth = gridElement.firstElementChild.getBoundingClientRect().width

  return Math.floor(gridWidth / itemWidth)
}

export function getRowNumber(idx, itemNumbersInRow) {
  return Math.floor(idx / itemNumbersInRow)
}
