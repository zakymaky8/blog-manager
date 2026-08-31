"use client"

import Link from "next/link";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import create from "../../../public/create.svg"
import Image from "next/image";
// import { TAuthor } from "./type";
import { checkLogInStatus } from "@/actions/authActions";
import { TAuthor } from "./type";

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<TAuthor>()


    useEffect(() => {
      const IsUserLoggedIn = async () => {
        const { success, user } = await checkLogInStatus()
        if (success) {
          setIsLogged(true)
          setUser(user)
        } else {
          setIsLogged(false)
        }
      }

      IsUserLoggedIn()

    },[])

  return (
    <div className="flex justify-between items-center min-h-28 bg-gray-900 shadow-inner p-4 flex-wrap gap-4 pt-6">
        <Link href="/" className="no-underline text-white opacity-80"><h1>Blog Manager </h1></Link>
        <div className="flex flex-col items-center gap-5">
          {
            isLogged &&
            <div className="flex flex-col items-center gap-1">
              <span className="text-[#59ff00]">{ user?.username }</span>
              <span className="text-[9px]">{user?.Role}</span>
            </div>

          }
          <div className="flex gap-6 items-center justify-between">
              <Link href="/"><button className="bg-transparent text-[22px]"> 🏠︎ </button></Link>
              {isLogged &&
              <>
                <Link href="/create"><Image src={create} alt="create" className="bg-white rounded-[50%]"/></Link>
                <Link href="/read/drafts"><button className="bg-transparent p-1 text-[20px]"> 📝 </button></Link>
                <Logout isLogged={isLogged} setIsLogged={setIsLogged} />
              </>}

              { !isLogged && <Link href="/admin-login"><button> Get In </button></Link>}
          </div>
        </div>
    </div>
  )
}