"use server"

import { getAccessToken } from "@/utils/server-only";

export const updatePostAction = async ( post_id: string, action:string, content: string, formdata: FormData) => {
    const blogData = {
        title: formdata.get("title") as string,
        excerpt: formdata.get("excerpt") as string,
        timeRead: formdata.get("time_read") as string,
        content: content,
        priority: formdata.get("priority") as string
    }

    const url = `${process.env.API_URL}/api/posts/${post_id}?action=${action.toLowerCase()}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(blogData)
        })
        const { success, message } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401].includes(response.status) ?  "/admin-login" : response.status === 200 ? "/actions" : null
               }

    } catch {
        return {
                success: false,
                message: "Error Occured when upadting blog post!",
                redirectUrl: null
               }
    }
}


export const togglePublishAction = async (action: string, post_id: string) => {

    const token = await getAccessToken();

    const url = `${process.env.API_URL}/api/posts/${post_id}?action=${action.toLowerCase()}`;

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
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" :  ""
               }

    } catch {
        return {
                success: false,
                message: "Error occured when toggling publish status!",
                redirectUrl: null
            }
    }
}