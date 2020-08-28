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
  if (!element) {
    return
  }

  const memory = JSON.parse(
    window.localStorage.getItem(`scroll-${key}`) ?? '{}'
  )

  if (memory.direction === 'top') {
    element?.scrollTo({
      top: memory.scrollPosition ?? 0,
    })
  } else if (memory.direction === 'left') {
    element?.scrollTo({
      left: memory.scrollPosition ?? 0,
    })
  }
}
