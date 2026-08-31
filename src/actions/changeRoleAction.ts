"use server"

import { getAccessToken } from "@/utils/server-only";



type TRoleChangeInfo = {
    userId: string,
    changedRole: string,
    requestId: string,
    drive: "request" | "random"
}

export const changeRoleAction = async ( info: TRoleChangeInfo) => {

    const roleUpdateInfo = {
        changedRole: info.changedRole,
        requestId: info.requestId,
        userId: info.userId,
        drive: info.drive
    }

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/roles/status-change`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(roleUpdateInfo)
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




export const rejectRoleRequest = async ( requestId: string) => {

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/roles/status-change/reject/${requestId}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${token}`
            }
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
