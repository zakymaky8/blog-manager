import { getAccessToken } from '@/utils/server-only'
import { redirect } from 'next/navigation'
import React from 'react'

const ManageRolesPage = async () => {

  const token = await getAccessToken()

  if (!token) {
      redirect("/admin-login")
  }
  
  return (
    <div>ManageRolesPage</div>
  )
}

export default ManageRolesPage