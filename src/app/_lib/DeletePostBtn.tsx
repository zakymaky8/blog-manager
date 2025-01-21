"use client";

import Image from "next/image"
import deleteBtn from "../../../public/delete.svg"
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const DeletePostBtn = ({postId}: {postId: string}) => {
    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const getTokenFromCookies = () => {
            const cookies = document.cookie.split("; ");
            const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
            return tokenCookie ? tokenCookie.split("=")[1] : null;
        };
        const token = getTokenFromCookies();
        try {
            const res = await fetch(`http://localhost:3456/posts/delete/${postId}?_method=DELETE`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            if (res.ok) {
                router.replace("/delete")
            } else {
                router.replace("/admin-login")
            }
        } catch {
            throw new Error("deletion is not successfull!")
        }
    }
  return (
    <form className="w-fit -mb-[6px]" style={{boxShadow: "0px 0px 0px 0px "}}
        onSubmit={handleSubmit}>
        <button type="submit" className="bg-slate-300 p-0">
            <Image title="delete post" className="h-[20px] w-[20px]" src={deleteBtn} alt="delete button"/>
        </button>
    </form>
  )
}

export default DeletePostBtn