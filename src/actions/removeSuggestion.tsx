"use server"

import { getAccessToken } from "@/utils/server-only"


export const deleteSuggestionAction = async (suggId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/suggestions/${suggId}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/login" :  null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
            }
    }
}

