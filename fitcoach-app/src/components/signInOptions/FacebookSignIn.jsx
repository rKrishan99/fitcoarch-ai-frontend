import React from 'react'
import { FaFacebook } from 'react-icons/fa6';

const FacebookSignIn = () => {
  return (
    <div className='flex flex-row items-center gap-1 bg-blue-600 hover:bg-blue-700 rounded py-1 px-2 cursor-pointer'>
        <FaFacebook className='text-white'/>
        <span className='text-white text-[24px] font-extralight mt-[-4px]'>|</span>
        <span className='text-white text-sm'>Facebook</span>
    </div>
  )
}

export default FacebookSignIn;