"use server"

import { getAccessToken } from "@/utils/server-only";

export const deleteSinglePostAction = async (post_id: string) => {

    const token = await getAccessToken();

    const url = `${process.env.API_URL}/api/posts/${post_id}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message, post } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" :  null,
                post
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                post: null
            }
    }
}