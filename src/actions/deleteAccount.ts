"use server"

import { getAccessToken } from "@/utils/server-only";

export const deleteUserAction = async (userId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/${userId}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message, data } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" :  null,
                data
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                data: null
            }
    }
}