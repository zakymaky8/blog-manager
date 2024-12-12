"use client"

import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useState } from "react";

const AddCommentSec = ({postId}: {postId: string}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [value, setValue] = useState("");

    async function handleSubmit(e:FormEvent<HTMLFormElement>) {
        setValue("")
        e.preventDefault();
        const getTokenFromCookies = () => {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
            return tokenCookie ? tokenCookie.split("=")[1] : null;
        };
        const token = getTokenFromCookies();
        
        const formData = new FormData(e.target as HTMLFormElement);
        const commentData = {
            content: formData.get("content")
        }
        const res = await fetch(`http://localhost:3456/posts/${postId}/comments/`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commentData)
        })
        if (res.ok) {
            router.replace(pathname)
        } else {
            router.replace("/admin-login")
        }

    }
  return (
    <form
        onSubmit={handleSubmit}
        // action={`http://localhost:3456/posts/${params.postId}/comments/`}
        // method="POST"
        className="mb-6 flex justify-center flex-wrap items-center p-2 gap-2">
            <input value={value} onChange={(e) => setValue(e.target.value)} type="text" name="content" id="addcomment" className="max-w-[200px] text-white pl-2 pr-2 h-8 bg-slate-600 rounded-[2px]" placeholder="add your comment ..." required/>
            <button type="submit" className="h-8 text-white text-[12px] w-16">Add</button>
</form>
  )
}

export default AddCommentSec