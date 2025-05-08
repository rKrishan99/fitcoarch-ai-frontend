import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6';

const GithubSignIn = () => {
  return (
    <div className='flex flex-row items-center gap-1 bg-black rounded py-1 px-2 cursor-pointer'>
        <FaGithub className='text-white'/>
        <span className='text-white text-[24px] font-extralight mt-[-4px]'>|</span>
        <span className='text-white text-sm'>Github</span>
    </div>
  )
}

export default GithubSignIn;