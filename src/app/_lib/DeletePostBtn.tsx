"use client";

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSinglePostAction } from "@/actions/deletePost";

const DeletePostBtn = ({postId}: {postId: string}) => {
    const router = useRouter()
    const [isOn, setIsOn] = useState(false)

    const actionWrapper = async () =>  await deleteSinglePostAction(postId)

    const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "", post: "" } )

    if (!["", null].includes(state.redirectUrl)) {
        router.push(state.redirectUrl!)
    }
    if(state.success === false && state.redirectUrl === null ) {
        alert(state.message)
    }

    useEffect(() => {
        if (state.success === true) {
            router.refresh();
        }
        state.success = ""
    }, [state, router]);
  return (
    <>
    {
        isOn &&
        <form
            className="fixed top-1/2 z-20 left-1/2 -translate-x-1/2 text-white -translate-y-1/2 bg-red-400 py-6 px-8 pt-1 w-[300px] md:w-[400px] lg:w-[450px] rounded flex flex-col gap-6" style={{boxShadow: "0px 0px 0px 0px "}}
            action={formAction}
            >
            <p>Confirm removing the item!</p>
            <div className="flex justify-between items-center gap-6 flex-wrap -mb-3">
                <button onClick={() => setIsOn(false)} className="py-[5px] px-4">Cancel</button>
                <button type="submit" className="bg-red-600 text-red-950 rounded py-[5px] px-4">Delete</button>
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
        <button className="bg-slate-300 p-0 hover:bg-slate-700" onClick={() => setIsOn(true)}>
                <Image title="delete" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
        </button>
    </>
  )
}

export default DeletePostBtn