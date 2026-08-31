"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';

const ManageRoleNav = () => {
    const pathname = usePathname();
    const isActive = (str: string) => pathname.includes(str)
  return (
        <nav className='flex justify-center gap-10 py-3 my-10 text-lg'>
            <Link href="/manage-roles/open-roles" className={`${isActive("open-roles") ? "border-b-2 border-yellow-500" : ""} pb-2 text-[18px] text-blue-950 font-bold hover:opacity-60 no-underline`}>Open Role</Link>
            <Link href="/manage-roles/requests" className={`${isActive("requests") ? "border-b-2 border-yellow-500" : ""} pb-2 text-[18px] text-blue-950 font-bold hover:opacity-60 no-underline`}>Requests</Link>
        </nav>
  )
}

export default ManageRoleNav
