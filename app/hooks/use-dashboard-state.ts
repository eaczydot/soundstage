import { create } from 'zustand'

interface DashboardState {
  isCompact: boolean
  showMobileDrawer: boolean
  activeTab: 'notifications' | 'messages'
  setIsCompact: (value: boolean) => void
  setShowMobileDrawer: (value: boolean) => void
  setActiveTab: (tab: 'notifications' | 'messages') => void
  toggleCompact: () => void
  toggleMobileDrawer: () => void
}

export const useDashboardState = create<DashboardState>((set) => ({
  isCompact: false,
  showMobileDrawer: false,
  activeTab: 'notifications',
  setIsCompact: (value) => set({ isCompact: value }),
  setShowMobileDrawer: (value) => set({ showMobileDrawer: value }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleCompact: () => set((state) => ({ isCompact: !state.isCompact })),
  toggleMobileDrawer: () => set((state) => ({ showMobileDrawer: !state.showMobileDrawer })),
})) 