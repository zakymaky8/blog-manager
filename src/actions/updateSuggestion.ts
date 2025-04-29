"use server"

import { getAccessToken } from "@/utils/server-only";

export const updateSuggestionStatus = async ( suggId: string, status: string) => {

    const suggData = {
        status,
    }
    const url = `${process.env.API_URL}/api/suggestions/status/${suggId}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(suggData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" : null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
            }
    }
}



export const updateSuggToPostToSugg = async ( suggId: string, postId: string) => {

    const postToSugg = {
        postId,
        suggId
    }
    const url = `${process.env.API_URL}/api/suggestions/post-to-sugg-to-post`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postToSugg)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" : null,
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
            }
    }
}
