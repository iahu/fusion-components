export function PromiseLike(callback?: (...args: unknown[]) => void): {
  then(nextCallback?: ((...args: unknown[]) => void) | undefined): void
} {
  const result = callback?.()

  return {
    then(nextCallback?: (...args: unknown[]) => void) {
      nextCallback?.(result)
    },
  }
}
PromiseLike.resolve = PromiseLike

export const delay = (wait = 100): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), wait)
  })
}
