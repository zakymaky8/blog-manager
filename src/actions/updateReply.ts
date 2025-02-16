"use server"

import { getAccessToken } from "@/utils/server-only";

export const updateReplyAction = async ( postId: string, commentId: string, replyId: string, formdata: FormData) => {

    const replyData = {
        content: formdata.get("content")
    }
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies/${replyId}?action=update_content`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(replyData)
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
