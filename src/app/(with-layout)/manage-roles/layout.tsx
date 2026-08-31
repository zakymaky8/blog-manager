import React, { ReactNode } from 'react'
import ManageRoleNav from './_cpts/ManageRoleNav'

const ManageRolesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex flex-col items-center'>
        <ManageRoleNav />

        <div>
            { children }
        </div>
    </section>
  )
}

export default ManageRolesLayout