"use client"
import Image from "next/image";
import logout from "../../../public/logout.svg"
import { Dispatch, SetStateAction } from "react";
import { SignOutAction } from "@/actions/logoutAction";
import { useRouter } from "next/navigation";

type TProps = {
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>
}

const Logout = ({setIsLogged}:TProps) => {
  const router = useRouter()
  return (
    <button title="Sign Out"
      onClick={()=>{
        SignOutAction()
        setIsLogged(false)
        router.replace("/admin-login", { scroll: false })
      }}
      className="bg-white rounded-[50%] h-7 w-7">
        <Image src={logout} alt="Log out" />
    </button>
  )
}

export default Logout