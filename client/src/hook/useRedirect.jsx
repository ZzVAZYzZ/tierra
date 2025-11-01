'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

export const useRedirect = () => {
  const router = useRouter()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/dashboard')
      } else if (user.role === 'user') {
        router.push('/')
      }
    }
  }, [user, router])
}
