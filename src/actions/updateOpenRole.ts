"use server"

import { getAccessToken } from "@/utils/server-only";

export const updateOpenRoleAction = async ( openId: string, formdata: FormData) => {

    const updatedOpenRoleData = {
        title: formdata.get("title")?.toString(),
        description: formdata.get("description")?.toString(),
        notes: formdata.get("notes")?.toString(),
        slots: formdata.get("slots")?.toString(),
        role: formdata.get("role")?.toString(),
        isActive: formdata.get("isActive")?.toString(),
    }

    const url = `${process.env.API_URL}/api/roles/open-roles/${openId}`;
    const token = await getAccessToken()

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedOpenRoleData)
        })
        const { success, message, data } = await response.json();
        return {
                success: success,
                message: message,
                redirectUrl: [400, 401, 403].includes(response.status) ?  "/admin-login" : null,
                data
               }

    } catch {
        return {
                success: false,
                message: "Error Occured!",
                redirectUrl: null,
                data: null
               }
    }
}
