"use server"

import { getAccessToken } from "@/utils/server-only"

export const createCommentAction = async (postId: string, formData: FormData) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}/comments`

    const commentData = {
        content: formData.get("content")
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(commentData)
        })
        const { success, message, comment } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [401, 403].includes(response.status) ?  "/admin-login" :  null,
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