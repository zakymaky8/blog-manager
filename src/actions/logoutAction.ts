"use server"


import { cookies } from "next/headers"

export const SignOutAction = async () => {
    (await (cookies())).delete("accessToken")
}