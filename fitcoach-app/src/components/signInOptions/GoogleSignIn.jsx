import React from 'react'
import { FaGoogle } from 'react-icons/fa6';

const GoogleSignIn = () => {
  return (
    <div className='flex flex-row items-center gap-1 bg-red-600 hover:bg-red-700 rounded py-1 px-2 cursor-pointer'>
        <FaGoogle className='text-white'/>
        <span className='text-white text-[24px] font-extralight mt-[-4px]'>|</span>
        <span className='text-white text-sm'>Google</span>
    </div>
  )
}

export default GoogleSignIn;