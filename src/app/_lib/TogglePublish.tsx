"use client"

import { togglePublishAction } from "@/actions/updatePost"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const TogglePublish = ({postId, action}: {
    postId: string,
    action: string
    }) => {

    const router = useRouter();
    const actionWrapper = async () =>  await togglePublishAction(action.toLowerCase(), postId)
    const [ state, formAction ] = useActionState(actionWrapper, { success: "", message: "", redirectUrl: "" } )

    useEffect(() => {
        if (state.success === true) {
          router.refresh();
        }
        state.success = ""
      }, [state, router]);



    if (!["", null].includes(state.redirectUrl)) {
        router.push(state.redirectUrl!)
    }

    if(state.success === false && state.redirectUrl === null ) {
        alert(state.message)
    }
    return (
        <form action={formAction}>
            <button
                title="toggle post status"
                className="text-[11px] w-fit h-fit py-[6px] px-4"
                type='submit'
                onClick={() => {
                    if (state.success) {
                        router.replace("", {scroll: false})
                    }
                }}
                >
                    {action}
            </button>
        </form>
    )
}

export default TogglePublish