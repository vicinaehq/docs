'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'
import clsx from 'clsx'

export function ImageZoom({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={clsx('cursor-zoom-in hover:opacity-70', className)}
        onClick={() => setIsOpen(true)}
        {...props}
      />

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition duration-100 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative max-h-full max-w-full transform-gpu transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-full cursor-zoom-out rounded-lg object-contain shadow-2xl"
              onClick={() => setIsOpen(false)}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 rounded-full bg-zinc-900/50 p-2 text-white transition hover:bg-zinc-900/75"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
