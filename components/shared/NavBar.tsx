'use client'
import Image from 'next/image'
import { useContext } from 'react'
import { Appcontext } from '@/context/appcontext'
import dynamic from 'next/dynamic'
const Profile=dynamic(()=>import('@/components/shared/Profile'),{ssr:false});

const NavBar = () => {
  const {token}:{token:string | null}=useContext(Appcontext)
  return (
    <div className=' p-3 px-6  border-b-[0.5px]   border-gray-300 w-full  h-16 flex justify-between items-center'>
       <Image src='/navlogo.png' width={50} height={30} alt='logo'/>
       <p className=' font-bold text-lg'>Breadth Selection Guide</p>
       {
          token && <Profile/>
       }
    </div>
  )
}

export default NavBar