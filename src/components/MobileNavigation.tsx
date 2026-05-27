'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { Suspense, createContext, useContext } from 'react'
import { create } from 'zustand'

import { DocsModeSwitch } from '@/components/DocsMode'
import { Header } from '@/components/Header'
import { Navigation } from '@/components/Navigation'

const IsInsideMobileNavigationContext = createContext(false)

function MobileNavigationDialog({
  isOpen,
  close,
}: {
  isOpen: boolean
  close: () => void
}) {
  return (
    <Dialog
      transition
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 top-14 bg-black/60 backdrop-blur-sm data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <DialogPanel>
        <TransitionChild>
          <Header className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
        </TransitionChild>

        <TransitionChild>
          <motion.div
            layoutScroll
            className="fixed top-14 bottom-0 left-0 w-full overflow-y-auto bg-ink-900 px-4 pt-6 pb-4 shadow-lg ring-1 ring-sand-700/20 duration-500 ease-in-out data-closed:-translate-x-full min-[416px]:max-w-sm sm:px-6 sm:pb-10"
          >
            <div className="mb-6">
              <DocsModeSwitch />
            </div>
            <Navigation />
          </motion.div>
        </TransitionChild>
      </DialogPanel>
    </Dialog>
  )
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create<{
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function MobileNavigation() {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  let ToggleIcon = isOpen ? X : Menu

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition-colors duration-200 hover:bg-ink-700"
        aria-label="Toggle navigation"
        onClick={toggle}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <ToggleIcon className="h-4 w-4 text-stone-300" />
      </button>
      {!isInsideMobileNavigation && (
        <Suspense fallback={null}>
          <MobileNavigationDialog isOpen={isOpen} close={close} />
        </Suspense>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}
