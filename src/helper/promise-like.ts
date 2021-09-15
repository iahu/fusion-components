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
