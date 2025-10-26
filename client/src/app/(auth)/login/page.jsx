'use client'
import React from 'react'
import background from '../../../assets/images/background.png'
import logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import loginImage from '../../../assets/images/tay.png'
import googleIcon from '../../../assets/images/google_icon.png'
import Link from 'next/link'
import { useLogin } from '../../../hook/useLogin'
import { useAuth } from '../../../hook/useAuth'
import { useRedirect } from '../../../hook/useRedirect'
import { useRefresh } from '../../../hook/useRefresh'

export default function Page() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { user, loading, error, handleLogin, handleGoogleLogin } = useLogin()
  const [isClick, setIsClick] = React.useState(false)
  // useRefresh()
  useAuth()
  useRedirect()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ email và mật khẩu!')
      return
    }
    await handleLogin({ email, password })
  }

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      {/* Background */}
      <img
        src={background.src}
        alt="background"
        className="absolute w-full h-full top-0 left-0 object-cover"
      />

      {/* Container */}
      <div className="flex flex-row justify-between w-[1000px] h-[800px] bg-white absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] rounded-[20px] shadow-lg">
        
        {/* Left side (form) */}
        <div className="flex flex-col items-center justify-center w-[464px] h-full relative">
          <Image width={200} height={150} src={logo.src} alt="logo" />

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {/* Email */}
            <label htmlFor="email" className="mb-[16px]">
              <input
                type="text"
                placeholder="Nhập tài khoản"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px] outline-none"
              />
            </label>

            {/* Password */}
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px] outline-none"
              />
            </label>

            {/* Remember me */}
            <label
              htmlFor="remember"
              className="w-[350px] flex items-center justify-start mt-[13px]"
            >
              <input
                type="checkbox"
                name="remember"
                className="accent-[#9B8D6F] mr-[3px] cursor-pointer"
              />
              <span className="text-[#9B8D6F] text-[14px]">Nhớ mật khẩu</span>
            </label>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-[350px] h-[60px] mt-[69px] rounded-[10px] text-white cursor-pointer ${
                loading
                  ? 'bg-[#c4b89f] cursor-not-allowed'
                  : 'bg-[#9B8D6F] hover:bg-[#8b7d63]'
              }`}
              onClick={() => setIsClick(true)}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Error message */}
          { isClick && error && (
            <p className="text-red-500 text-sm mt-3">Lỗi: {error}</p>
          )}

          {/* Or separator */}
          <div className="relative flex justify-center w-full h-[22px] mt-[21px] mb-[21px]">
            <div className="w-[32px] absolute z-[2] bg-white text-center text-[15px] text-[#9B8D6F]">
              or
            </div>
            <hr className="absolute border w-[242px] h-[1px] top-[50%] z-[1]" />
          </div>
          <div className=''></div>
          {/* Google login */}
          <button onClick={handleGoogleLogin} className="w-[350px] h-[60px] border border-[#9B8D6F] rounded-[10px] flex flex-row justify-center items-center gap-[8px] hover:bg-[#f5f5f5] transition cursor-pointer">
            <Image src={googleIcon.src} width={30} height={30} alt="google icon" />
            <span>Đăng nhập với Google</span>
          </button>

          {/* Register link */}
          <div className="w-full text-center mt-[26px]">
            Bạn chưa có tài khoản?{' '}
            <Link href="/register">
              <span className="cursor-pointer text-[#9B8D6F] font-bold">
                Đăng ký
              </span>
            </Link>
          </div>
        </div>

        {/* Right side (image) */}
        <div className="w-[536px] h-full flex">
          <img
            src={loginImage.src}
            alt="background"
            className="w-full h-full rounded-tr-[20px] rounded-br-[20px] object-cover"
          />
        </div>
      </div>
    </div>
  )
}