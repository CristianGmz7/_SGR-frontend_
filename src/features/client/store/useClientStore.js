import { create } from 'zustand'

export const useClientStore = create((set, get) => ({
  recentlyRegistered: false,
  setRecentlyRegistered: () => {
    set({recentlyRegistered: true})
  },
  setNotRecentlyRegistered: () => {
    set({recentlyRegistered: false})
  }
}))