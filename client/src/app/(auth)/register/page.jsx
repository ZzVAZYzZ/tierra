'use client'
import React from 'react'
import background from '../../../assets/images/background.png'
import logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import loginImage from '../../../assets/images/tay.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRegister } from '../../../hook/useRegister'

export default function page() {
  const router = useRouter()
  const { message, loading, error, handleRegister, resetAll } = useRegister()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister(email, password, confirmPassword)
  }

  return (
    <div className='w-full h-screen flex justify-center items-center relative'>
      <img src={background.src} alt='background' className='absolute w-full h-full top-0 left-0' />
      <div className='flex flex-row justify-between w-[1000px] h-[800px] bg-[#fff] absolute top-[50%] left-[50%] transform translate-x-[-500px] translate-y-[-400px] rounded-[20px]'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center w-[464px] h-full'
        >
          <Image width={200} height={150} src={logo.src} alt='logo' />
          <label htmlFor='email' className='mb-[16px]'>
            <input
              type='email'
              placeholder='Nhập email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px]'
            />
          </label>
          
          <label htmlFor='password' className='mb-[16px]'>
            <input
              type='password'
              placeholder='Nhập mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px]'
            />
          </label>
          <label htmlFor='repassword'>
            <input
              type='password'
              placeholder='Nhập lại mật khẩu'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px]'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='w-[350px] h-[60px] bg-[#9B8D6F] text-white mt-[69px] rounded-[10px]'
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>

          {/* {message && (
            <p className='text-green-600 mt-3'>
              {typeof message === 'string' ? message : message.message}
            </p>
          )} */}
          {error && (
            <p className='text-red-500 mt-3'>
              {typeof error === 'string' ? error : error.message}
            </p>
          )}

          <div className='w-full text-center mt-[26px]'>
            Bạn đã có tài khoản?{' '}
            <Link href={'/login'}>
              <span className='cursor-pointer text-[#9B8D6F]'>
                <strong>Đăng nhập</strong>
              </span>
            </Link>
          </div>
        </form>

        <div className='w-[536px] h-full flex'>
          <img
            src={loginImage.src}
            alt='background'
            className='w-full h-full rounded-tr-[20px] rounded-br-[20px]'
          />
        </div>
      </div>
    </div>
  )
}