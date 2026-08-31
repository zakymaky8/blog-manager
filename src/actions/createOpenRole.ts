"use server"

import { getAccessToken } from "@/utils/server-only";


export const createOpenRole = async (prevState: { success: boolean, message: string, redirectUrl: string | null }, formdata: FormData) => {
    const openRoleData = {
        title: formdata.get("title")?.toString(),
        description: formdata.get("description")?.toString(),
        notes: formdata.get("notes")?.toString(),
        slots: formdata.get("slots")?.toString(),
        role: formdata.get("role")?.toString(),
        isActive: formdata.get("isActive")?.toString(),
    }


    const url = `${process.env.API_URL}/api/roles/open-roles`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(openRoleData)
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
            message: "Error occured when creating open role!",
            redirectUrl: null
        }
    }
}
