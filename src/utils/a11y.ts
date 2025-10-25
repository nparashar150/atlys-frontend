import { toast } from '@/components/ui/toast'

/**
 * Announces a message to screen readers using a live region
 * @param message - The message to announce
 * @param showToast - Whether to also show a visual toast (default: false for non-intrusive SR-only announcements)
 */
export function announceToScreenReader(message: string, showToast = false): void {
  // Show visual toast for sighted users (opt-in)
  if (showToast) {
    toast(message)
  }

  // Create or get the live region for screen readers
  let liveRegion = document.getElementById('a11y-announcer')

  if (!liveRegion) {
    liveRegion = document.createElement('div')
    liveRegion.id = 'a11y-announcer'
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;'
    document.body.appendChild(liveRegion)
  }

  // Clear and set new message
  liveRegion.textContent = ''
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message
    }
  }, 100)
}
