"use server"

import { getAccessToken } from "@/utils/server-only"


export const deleteReplyAction = async (postId: string, commentId: string, replyId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies/${replyId}`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message, comment } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" :  null,
                comment
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                comment: null
            }
    }
}

