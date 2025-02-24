"use server"

import { getAccessToken } from "@/utils/server-only";
import { TStatus } from "@/utils/type"


export const createPostAction = async (status: TStatus, content: string, formdata: FormData) => {
    const blogData = {
        title: formdata.get("title") as string,
        excerpt: formdata.get("excerpt") as string,
        timeRead: formdata.get("time_read") as string,
        content: content
    }
    const url = `${process.env.API_URL}/api/create_post?status=${status}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(blogData)
        })
        const {success, message } = await response.json();
        return {
                 success: success,
                 message: message,
                 redirectUrl: [401].includes(response.status) ?  "/admin-login" : response.status === 201 ? "/actions" : null
               }
    } catch {
        return {
            success: false,
            message: "Error occured when creating blog!",
            redirectUrl: null
        }
    }
}
