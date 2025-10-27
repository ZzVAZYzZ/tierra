'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, resetUserState, loginByGoogle  } from '../redux/features/userSlice'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const dispatch = useDispatch()
  const { user, loading, error, status  } = useSelector((state) => state.user)
  const router = useRouter()
  
  const handleLogin = (credentials) => {
    dispatch(login(credentials))
  }

   const handleGoogleLogin = () => {
    // dispatch(loginByGoogle())
    window.location.href = 'http://localhost:8000/api/users/google'
  }


  const resetAll = () => {
    dispatch(resetUserState())
  }

  return { user, loading, error, status , handleLogin, resetAll, handleGoogleLogin }
}
