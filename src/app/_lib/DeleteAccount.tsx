"use client"

import { FormEvent } from "react"
import { getTokenFromCookies } from "./utils"
import { useRouter } from "next/navigation"

const DeleteAccount = ({userId}: {userId: string}) => {
    const router = useRouter();

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const confirmed = confirm("are you sure You wanted to delete user?")

        if (confirmed) {
            const token = getTokenFromCookies()
    
            const res= await fetch(`http://localhost:3456/user/${userId}?action=delete-account`, {
                method: "DELETE",
                headers: {"authorization": `Bearer ${token}`}
            });
            if (!res.ok) {
                alert("Unable to delete!")
            } else {
                router.replace("/user")
            }
        }
        else alert("deletion canceled")
    }
  return (
    <form onSubmit={handleSubmit} className="bg-red-700 rounded-md flex justify-center">
      <button className="bg-red-700 hover:bg-red-950">terminate user account</button>
    </form>
  )
}

export default DeleteAccount
