"use client"
import Image from "next/image";
import logout from "../../../public/logout.svg"

import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react";

type TProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>
}

const Logout = ({setIsLogged}:TProps) => {
    const router = useRouter();
    function handleClick() {
        document.cookie = `token=${null}; path=/; secure`
        setIsLogged(false)
        router.replace("/admin-login")
    }
  return (
    <button title="Sign Out" onClick={handleClick} className="bg-white rounded-[50%] h-7 w-7">
      <Image src={logout} alt="Log out" />
    </button>
  )
}

export default Logout