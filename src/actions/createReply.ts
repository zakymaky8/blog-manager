"use server"

import { getAccessToken } from "@/utils/server-only"



export const createReplyToCommentAction = async (postId: string, commentId:string, action:string ,formData: FormData) => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies?action=${action}`

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
        const { success, message, reply } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [401, 403].includes(response.status) ?  "/admin-login" :  null,
                reply
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                reply: null
            }
    }
}



export const createReplyToReplyAction = async (postId: string, commentId:string, replyId: string, action:string ,formData: FormData) => {

    const token = await getAccessToken();
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies/${replyId}?action=${action}`

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
        const { success, message, reply } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [401, 403].includes(response.status) ?  "/admin-login" :  null,
                reply
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                reply: null
            }
    }
}