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
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/login" :  null
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null
            }
    }
}

export const dislikePostAction = async (postId: string) => {
    const url =  `${process.env.API_URL}/api/posts/${postId}?action=dislike_undo_dislike`
    const token = await getAccessToken();

    return await commonFetch(url, token!)
}


export const dislikeCommentAction = async (postId: string, commentId: string) => {
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}?action=dislike_undo_dislike`
    const token = await getAccessToken()

    return await commonFetch(url, token!)
}


export const dislikeReplyAction = async (postId: string, commentId: string, replyId: string) => {
    const url = `${process.env.API_URL}/api/posts/${postId}/comments/${commentId}/replies/${replyId}?action=dislike_undo_dislike`
    const token = await getAccessToken()
    return await commonFetch(url, token!)
}