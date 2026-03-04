"use client"

import { useEffect, useRef, useState } from "react"

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const initialRef = useRef(initialValue)
  const [state, setState] = useState<T>(initialRef.current)

  useEffect(() => {
    const raw = window.localStorage.getItem(key)
    if (!raw) return

    try {
      setState(JSON.parse(raw) as T)
    } catch {
      setState(initialRef.current)
    }
  }, [key])

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}
