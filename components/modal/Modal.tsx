import { ReactNode } from 'react'

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-4 rounded'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
