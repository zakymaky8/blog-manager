"user server"

import { getAccessToken } from "@/utils/server-only"



export const fetchWithNoCache = async (url: string, token: string | undefined) => {
    return await fetch(url, {
        cache: "no-cache",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}


export const commonFetch = async (url: string, token: string | undefined) => {
    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
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

//  all published posts
export const fetchPublishedPosts = async () => {

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts`

    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, posts } = await response.json()
        return {
            success,
            message,
            redirectUrl: [400, 401].includes(response.status) ? "/admin-login" : null,
            posts
        }
    } catch {
        return {
            success: false,
            message: "Error Occured!",
            redirectUrl: null,
            posts: null
        }
    }
}


//  single published post

export const fetchSinglePost = async (postId: string) => {

    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}`

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            message,
            redirectUrl: [400, 401].includes(response.status) ? "/admin-login" : null,
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


// all published and unpublished post


export const fetchAllPosts = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/manage_posts/`;

    return await commonFetch(url, token)
}

// fetch posts' comments

export const fetchPostsComments = async (postId: string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/posts/${postId}/comments`;

    return await commonFetch(url, token)
}


export const fetchDraftPosts = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/manage_posts/drafts/`;

    return await commonFetch(url, token)
}


export const fetchALlUsers = async () => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/users/`;

    return await commonFetch(url, token)
}


export const fetchSingleUser = async (userId:string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/${userId}`;

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            status: response.status,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            status: null,
            message: "Error Occured!",
            redirectUrl: null,
            data: null
        }
    }
}


export const fetchSingleUserActivities = async (userId:string) => {
    const token = await getAccessToken()
    const url = `${process.env.API_URL}/api/user/${userId}/activities`;

    try {
        const response = await fetchWithNoCache(url, token);

        const { success, message, data } = await response.json()
        return {
            success,
            status: response.status,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            status: null,
            message: "Error Occured!",
            redirectUrl: null,
            data: null
        }
    }
}

