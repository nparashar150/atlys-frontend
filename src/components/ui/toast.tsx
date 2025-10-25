import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface Toast {
  id: string
  message: string
  duration?: number
}

const MAX_TOASTS = 3

let toastQueue: Toast[] = []
let listeners: Array<() => void> = []

function notifyListeners() {
  listeners.forEach(listener => listener())
}

export function toast(message: string, duration = 3000) {
  const id = `toast-${Date.now()}-${Math.random()}`
  const newToast = { id, message, duration }

  // If we've reached the max, remove the oldest toast
  if (toastQueue.length >= MAX_TOASTS) {
    toastQueue.shift()
  }

  toastQueue.push(newToast)
  notifyListeners()

  // Auto-remove after duration
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== id)
    notifyListeners()
  }, duration)
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const updateToasts = () => setToasts([...toastQueue])
    listeners.push(updateToasts)

    return () => {
      listeners = listeners.filter(l => l !== updateToasts)
    }
  }, [])

  return createPortal(
    <div className="fixed bottom-4 right-4 z-100 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm max-w-sm pointer-events-auto"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
