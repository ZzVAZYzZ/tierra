'use client'
import React from 'react'
import backIcon from '../../../assets/images/backicon.png'
import Image from 'next/image'
import Link from 'next/link'
import UserIcon from '../../../assets/icons/user_icon'
import { useSelector } from 'react-redux'

export default function page() {
  const user = useSelector((state) => state.user.user)
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <div className="bg-[#E4E4E4] flex justify-center items-center">
        <div className=' w-[1100px] h-[800px] bg-white mt-[67px] mb-[67px] flex relative flex-col items-center justify-center'>
            <Link href='/' className=' absolute  top-[37px] left-[36px] cursor-pointer '>
                <Image priority  src={backIcon} width={25} height={25} alt="back icon" />
            </Link>
            <div className='w-[500px] h-[600px] flex items-center flex-col'>
              <div className=' border rounded-full'>
                {user?.avatar?(<div className='rounded-full overflow-hidden'><Image width={150} height={150} src={user?.avatar} alt='avatar'/></div>):(<UserIcon width={150} height={150} />)}
              </div>
              <div className='text-[32px] mt-[5px]'><b>{user?.name?<>{user?.name}</>:<>Username</>}</b></div>
              {isEditing?(
                <>
                  <button className='w-[170px] h-[25px] bg-[#D9D9D9] text-[15px] cursor-pointer my-[20px]'>Cập nhật ảnh đại diện</button>
                </>
              ):(
                <>
                  <button onClick={()=>setIsEditing(true)} className='w-[230px] h-[30px] bg-[#D9D9D9] text-[15px] cursor-pointer my-[20px]'>Chỉnh sửa thông tin người dùng</button>
                </>
              )}
              <div className='w-full'>
                <span className=''>Email:</span>

              </div>
            </div>
        </div>
    </div>
  )
}
