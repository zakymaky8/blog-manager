"use client"

import {  useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { rejectRoleRequest } from "@/actions/changeRoleAction"
import { TRequest } from "@/utils/type"



const RejectRoleReuest = ({ request }:  { request: TRequest }) => {
    const router = useRouter()
    const [isOn, setIsOn] = useState(false)

    const actionWrapper = async () => {
            return await rejectRoleRequest(request.request_id)
    }


    const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "" } )

    useEffect(() => {
        
             
        if (state.redirectUrl) {
            router.push(state.redirectUrl)
            return
        }
        
        if (state.success) {
            router.refresh()
            setIsOn(false)
        }
        
        if (state.success === false && state.message) {
            alert(state.message)
        }

        state.success = ""
    }, [state, router]);

  return (
    <>
    {
        isOn &&
        <form
            className="fixed w-[300px] sm:w-[500px] md:w-[600px] py-10 top-1/2 z-30 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-400 px-8 pt-1 rounded flex flex-col gap-6 bg-opacity-100" style={{boxShadow: "0px 0px 0px 0px "}}
            action={ formAction }
            >
            <p className="text-lg">Confirm The Rejection to { request.role.name } Role Request. Action cannot be undone later!</p>
            <div className="flex justify-between items-center gap-6 flex-wrap -mb-3">
                <button onClick={() => setIsOn(false)} className="py-2 px-8">Cancel</button>
                <button type="submit" className="bg-red-600 text-red-950 rounded py-2 px-8">Confirm</button>
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
        <button className="px-2 py-[3px] text-red-700 border-[1px] hover:border-[2px] border-black bg-transparent" disabled={ request.status === "REJECTED" || request.status === "APPROVED"  } onClick={() => setIsOn(true)}> Reject </button>
    </>
    )
}

export default RejectRoleReuest