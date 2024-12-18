"use client"

import { usePathname, useRouter } from "next/navigation"
import { FormEvent } from "react"

const TogglePublish = ({postId, action}: {
    postId: string,
    action: string
    }) => {
        const router = useRouter();
        const pathname = usePathname()

        async function handleSubmit(e: FormEvent<HTMLElement>) {
            e.preventDefault()
            const getTokenFromCookies = () => {
                const cookies = document.cookie.split("; ");
                const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
                return tokenCookie ? tokenCookie.split("=")[1] : null;
            };
            const token = getTokenFromCookies();
            try {
                const res = await fetch(`http://localhost:3456/posts/${postId}/${action.toLowerCase()}?_method=PUT`, {
                    method: "PUT",
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                if (!res.ok) {
                    router.replace("/admin-login")
                } else {
                    router.replace(pathname)
                }
            } catch {
                throw new Error("falied to published")
            }
    }
    return (
        <form onSubmit={handleSubmit}>
            <button
                className="text-[11px] w-fit h-fit p-1"
                type='submit'>
                    {action}
            </button>
        </form>
    )
}

export default TogglePublish