"use client"

import { warnUserAction } from "@/actions/warnUser"
import { TAuthor } from "@/app/_lib/type"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ToggleWarnUser = ({ user }: { user: TAuthor }) => {
    const router = useRouter()
    const [isOn, setIsOn] = useState(false)

    const handleWarningUser = async () => {
        const { success, message, redirectUrl } = await warnUserAction(user.users_id);
        if (!["", null].includes(redirectUrl)) {
            return router.push(redirectUrl!)
        }

        if(success === false && redirectUrl === null ) {
            return alert(message)
        }

        if (success === true) {
            setIsOn(false)
            return router.refresh();
        }

    }


  return (
    <>
    {
        isOn &&
        <div
            className="fixed top-1/2 z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400 py-6 px-8 pt-1 rounded flex flex-col gap-6" style={{boxShadow: "0px 0px 0px 0px "}}
            >
            <p>Confirm {user.isWarned && "Un"}warning the user!</p>
            <div className="flex justify-between items-center gap- flex-wrap -mb-3">
                <button onClick={() => setIsOn(false)} className="py-[5px] px-4">Cancel</button>
                <button onClick={handleWarningUser} className="bg-yellow-800 rounded py-[5px] px-4 hover:bg-yellow-950">{user.isWarned && "un"}warn</button>
            </div>
        </div>
    }
            <div
            onClick={() => setIsOn(false)}
            className={`
                fixed right-0 top-0 w-screen z-10
                min-h-screen bg-[#07283e] opacity-50
                ${isOn ? "block" : "hidden"}
              `}>
        </div>
        <button className="bg-yellow-800 py-2 px-4 hover:bg-yellow-950" onClick={() => setIsOn(true)}>
                {user.isWarned ? "Unwarn User" : "Warn User"}
        </button>
    </>
  )
}

export default ToggleWarnUser