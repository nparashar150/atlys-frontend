/**
 * Checks if HTML content is empty or contains only whitespace
 * @param html - The HTML string to check
 * @returns true if content is empty or whitespace-only
 */
export function isEmptyContent(html: string): boolean {
  if (!html || !html.trim()) return true

  // Create a temporary element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = html

  // Get text content (strips HTML tags)
  const text = temp.textContent || temp.innerText || ''

  // Check if text is empty or only whitespace
  return !text.trim()
}
