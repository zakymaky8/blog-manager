"use client"

import { useRouter } from "next/navigation"

const Logout = () => {
    const router = useRouter();
    function handleClick() {
        document.cookie = `token=${null}; path=/; secure`
        router.replace("/")
    }
  return (
    <button onClick={handleClick}>Logout</button>
  )
}

export default Logout