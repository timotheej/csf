import { useLayoutEffect, type RefObject } from 'react'

const MARGIN = 20

/**
 * Scroll-aware sticky for a sidebar taller than the viewport:
 * pins to the viewport bottom while scrolling down, to the top while
 * scrolling up, and travels with the page in between — no inner scrollbar.
 */
export function useSmartSticky(
  wrapperRef: RefObject<HTMLDivElement | null>,
  elementRef: RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const el = elementRef.current
    if (!wrapper || !el) return

    let lastY = window.scrollY
    let mode: 'absolute' | 'fixedTop' | 'fixedBottom' = 'absolute'
    let absTop = 0

    const apply = () => {
      const wRect = wrapper.getBoundingClientRect()
      if (mode === 'fixedTop' || mode === 'fixedBottom') {
        Object.assign(el.style, {
          position: 'fixed',
          top: mode === 'fixedTop' ? `${MARGIN}px` : 'auto',
          bottom: mode === 'fixedBottom' ? `${MARGIN}px` : 'auto',
          left: `${wRect.left}px`,
          width: `${wrapper.offsetWidth}px`,
        })
      } else {
        Object.assign(el.style, {
          position: 'absolute',
          top: `${absTop}px`,
          bottom: 'auto',
          left: '0px',
          width: '100%',
        })
      }
    }

    const update = () => {
      const y = window.scrollY
      const goingDown = y > lastY
      const goingUp = y < lastY
      lastY = y

      const vh = window.innerHeight
      const maxAbs = Math.max(0, wrapper.offsetHeight - el.offsetHeight)
      const wRect = wrapper.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      // Unpin and keep the sidebar exactly where it currently appears.
      const release = () => {
        mode = 'absolute'
        absTop = Math.min(Math.max(elRect.top - wRect.top, 0), maxAbs)
      }

      if (goingDown && mode !== 'fixedBottom') {
        if (elRect.bottom <= vh - MARGIN + 1) mode = 'fixedBottom'
        else if (mode === 'fixedTop') release()
      } else if (goingUp && mode !== 'fixedTop') {
        if (elRect.top >= MARGIN - 1) mode = 'fixedTop'
        else if (mode === 'fixedBottom') release()
      }

      // Never overflow the wrapper (start of page / footer area).
      if (mode === 'fixedTop' && wRect.top > MARGIN) release()
      if (mode === 'fixedBottom' && wRect.bottom < vh - MARGIN) release()
      if (mode === 'absolute') absTop = Math.min(Math.max(absTop, 0), maxAbs)

      apply()
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(wrapper)
    observer.observe(el)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [wrapperRef, elementRef])
}
