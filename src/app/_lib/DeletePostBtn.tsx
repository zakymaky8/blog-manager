"use client";

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteSinglePostAction } from "@/actions/deletePost";

const DeletePostBtn = ({postId}: {postId: string}) => {
    const router = useRouter()

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
        router.back();
    }
    state.success = ""
    }, [state, router]);
  return (
    <form
        action={formAction}
        className="w-fit -mb-[6px]" style={{boxShadow: "0px 0px 0px 0px "}}
       >
        <button type="submit" className="bg-slate-300 p-0">
            <Image title="delete post" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
        </button>
    </form>
  )
}

export default DeletePostBtn