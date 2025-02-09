"use client"

import Link from "next/link";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { getTokenFromCookies } from "./utils";
import create from "../../../public/create.svg"
import Image from "next/image";
import { TAuthor } from "./type";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<TAuthor>({users_id: "", firstname: "", lastname: "", username: "", password: "", Role: ""})

    useEffect(() => {
        const token = getTokenFromCookies();
        const checkLoginStatus = async function() {
          const res = await fetch(`http://localhost:3456/auth/`, {headers: { "authorization": `Bearer ${token}`}});
          if (!res.ok) {
            setIsLogged(false)
          } else {
            const {user} = await res.json()
            setIsLogged(true)
            setUser(user)
          }
        }
      checkLoginStatus()

    },[])

  return (
    <div className="flex justify-between items-center min-h-28 bg-gray-900 shadow-inner p-4 flex-wrap gap-4">
        <Link href="/" className="no-underline text-white opacity-80"><h1>Blog Manager </h1></Link>
        <div className="flex gap-2 items-center justify-between">
            <Link href="/"><button className="bg-transparent text-[22px]"> 🏠︎ </button></Link>
            {isLogged && 
            <>
              <Link href="/create"><Image src={create} alt="create" className="bg-white rounded-[50%]"/></Link>
              <Logout isLogged={isLogged} setIsLogged={setIsLogged} />
              <span>{user.username}</span>
            </>}

            { !isLogged && <Link href="/admin-login"><button> Get In </button></Link>}
        </div>
    </div>
  )
}
