"use server"

import { getAccessToken } from "@/utils/server-only"


export const commonFetch = async (url: string, token: string) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" :  null
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null
            }
    }
}

export const likePostAction = async (postId: string) => {
    const url =  `http://localhost:3456/api/posts/${postId}?action=like_unlike`
    const token = await getAccessToken();

    return await commonFetch(url, token!)
}


export const likeCommentAction = async (postId: string, commentId: string) => {
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}?action=like_unlike`
    const token = await getAccessToken()

    return await commonFetch(url, token!)
}


export const likeReplyAction = async (postId: string, commentId: string, replyId: string) => {
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies/${replyId}?action=like_unlike`
    const token = await getAccessToken()
    return await commonFetch(url, token!)
}