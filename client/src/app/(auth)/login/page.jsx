'use client'
import React from 'react'
import background from '../../../assets/images/background.png'
import logo from '../../../assets/images/logo.png'
import Image from 'next/image'
import loginImage from '../../../assets/images/tay.png'
import googleIcon from '../../../assets/images/google_icon.png'
import Link from 'next/link'
import { useFetchProducts } from '../../../hook/useFetchProducts'


export default function page() {
  const { products, loading, error } = useFetchProducts()


  return (
    <div className='w-full h-screen flex justify-center items-center relative'>
      <img src={background.src} alt="background"  className=' absolute w-full h-full top-0 left-0'/>
      <div className='flex flex-row justify-between w-[1000px] h-[800px] bg-[#fff] absolute top-[50%] left-[50%] tranform translate-x-[-500px] translate-y-[-400px]  rounded-[20px] '>
        <div className=' flex flex-col items-center justify-center w-[464px]  h-full'>
          <div>
            <Image width={200} height={150} src={logo.src} alt="logo" />
          </div>
          <label htmlFor="email" className='mb-[16px]'>
            <input type="text" placeholder='Nhập tài khoản' className='pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px]'/>
          </label>
          <label htmlFor="password" >
            <input type="password" placeholder='Nhập mật khẩu' className='pl-[19px] w-[350px] h-[60px] bg-[#F3F3F3] rounded-[10px]'/>
          </label>
          <label htmlFor="remember" className="w-[350px] flex items-center justify-start mt-[13px] ">
            <input type="checkbox" name="remember" className='accent-[#9B8D6F] mr-[3px] cursor-pointer'/> <span className='text-[#9B8D6F] text-[14px]'>Nhớ mật khẩu</span>
          </label>
          <button className=' w-[350px] h-[60px] bg-[#9B8D6F] text-white mt-[69px] rounded-[10px]'>Đăng nhập</button>
          <div className='relative flex justify-center w-full h-[22px] top-[0] left-[0] mt-[21px] mb-[21px]'>
            <div className='w-[32px] absolute z-[2] bg-[#fff] text-center text-[15px] text-[#9B8D6F]'>or</div>
            <hr className='absolute border w-[242px] h-[1px] top-[50%] z-[1]'/>
          </div>
          <button className=' w-[350px] h-[60px] border border-[#9B8D6F] rounded-[10px] flex flex-row justify-center items-center gap-[8px]'>
            <div><Image src={googleIcon.src} width={30} height={30} alt='google icon'/></div>
            <div>Đăng nhập với Google</div>
          </button>
          <div className=' w-full text-center mt-[26px]'>Bạn chưa có tài khoản? <Link href={"/register"}><span  className='cursor-pointer text-[#9B8D6F]'><strong>Đăng ký</strong></span></Link></div>
        </div>
        <div className=' w-[536px] h-full flex '>
          <img src={loginImage.src} alt="background" className=' w-full h-full rounded-tr-[20px] rounded-br-[20px]'/>
        </div>
      </div>
    </div>
    
  )
}
