"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteUserAction } from "@/actions/deleteAccount"

const DeleteAccount = ({userId}: {userId: string}) => {
    const router = useRouter();
    const [isOn, setIsOn] = useState(false)
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
    <>
    {
        isOn &&
        <form
            className="fixed top-1/2 z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400 py-6 px-8 pt-1 rounded flex flex-col gap-6" style={{boxShadow: "0px 0px 0px 0px "}}
            action={formAction}
            >
            <p>Confirm removing the account!</p>
            <div className="flex justify-between items-center gap-6 flex-wrap -mb-3">
                <button onClick={() => setIsOn(false)} className="py-[5px] px-4">Cancel</button>
                <button type="submit" className="bg-red-600 text-red-950 rounded py-[5px] px-4">terminate</button>
            </div>
        </form>
    }
            <div
            onClick={() => setIsOn(false)}
            className={`
                fixed right-0 top-0 w-screen z-10
                min-h-screen bg-[#07283e] opacity-50
                ${isOn ? "block" : "hidden"}
              `}>
        </div>
        <button className="bg-red-600 p-0 hover:bg-red-900 py-2 px-4" onClick={() => setIsOn(true)}>
                Terminate user account
        </button>
    </>
  )
}

export default DeleteAccount
