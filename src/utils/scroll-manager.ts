export const memoScroll = (
  key: string,
  scrollPosition: number,
  direction: 'left' | 'top'
): void => {
  window.localStorage.setItem(
    `scroll-${key}`,
    JSON.stringify({
      scrollPosition,
      direction,
    })
  )
}

export const restoreScroll = (key: string, element: HTMLElement): void => {
  const memory = JSON.parse(
    window.localStorage.getItem(`scroll-${key}`) ?? '{}'
  )

  console.log(memory)
  console.log(element)

  if (memory.direction === 'top') {
    element.scrollTo({
      top: memory.scrollPosition ?? 0,
    })
  } else if (memory.direction === 'left') {
    element.scrollTo({
      left: memory.scrollPosition ?? 0,
    })
  }
}
