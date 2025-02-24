"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteUserAction } from "@/actions/deleteAccount"

const DeleteAccount = ({userId}: {userId: string}) => {
    const router = useRouter();

      const actionWrapper = async () =>  await deleteUserAction(userId)

      const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", data: "" } )

      if (!["", null].includes(state.redirectUrl)) {
          router.push(state.redirectUrl!)
      }
      if(state.success === false && state.redirectUrl === null ) {
          alert(state.message)
      }

      useEffect(() => {
      if (state.success === true) {
          router.back();
      }
      state.success = ""
      }, [state, router]);

  return (
    <form action={formAction} className="bg-red-700 rounded-md flex justify-center">
      <button className="bg-red-700 hover:bg-red-950">terminate user account</button>
    </form>
  )
}

export default DeleteAccount
