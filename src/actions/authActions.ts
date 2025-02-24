"use server"

import { getAccessToken } from "@/utils/server-only";
import { cookies } from "next/headers";


type TSignInState = {
    success?: boolean,
    message?: string,
}


export const SignInAction = async (prevstate: TSignInState, formdata: FormData) => {

    const userCredential = {
        username: formdata.get("username")!.toString(),
        password: formdata.get("password")!.toString(),
        admin_pwd: formdata.get("admin_pwd")!.toString()
    }

    const url = `${process.env.API_URL}/api/admin/auth/login`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(userCredential)
        })
    
        const { message, success, token } = await response.json()
    
        if (response.ok) {
            (await cookies()).set("accessToken", token, {
                httpOnly: true,
                path: "/",
                maxAge: 3600
            })
            return {
                ...prevstate,
                success: success,
                message: message
            }
        }

        return {
            ...prevstate,
            success: false,
            message: message
        }
    } catch {
        return {
            ...prevstate,
            success: false,
            message: "Error, occured!"
        }
    }
}


export const checkLogInStatus = async () => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/auth`;

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
        })
    
        const { success, message, user} = await response.json();
    
        return {
            success: success,
            message: message,
            user: user
        }
    } catch {
        return {
            success: false,
            message: "Error occured!",
            user: null
        }
    }
}