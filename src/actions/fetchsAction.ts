"user server"

import { formatApiUrl } from "@/app/_lib/utils"
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

        const { success, message, data, meta } = await response.json()
        return {
            success,
            message,
            status: true,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Error Occured while fetching data!",
            redirectUrl: null,
            data: null,
            meta: null
        }
    }
}

//  all published posts
export const fetchPublishedPosts = async (page: number, limit: number, search: string) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts`, page, search, limit)

    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, posts, meta } = await response.json()
        return {
            success,
            message,
            status: true,
            redirectUrl: [400, 401].includes(response.status) ? "/admin-login" : null,
            posts,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Error Occured while fetching posts!",
            redirectUrl: null,
            posts: null,
            meta: null
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
            status: response.status,
            redirectUrl: [400, 401].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            status: null,
            message: "Error Occured while getting a post's information!",
            redirectUrl: null,
            data: null
        }
    }
}


// all published and unpublished post


export const fetchAllPosts = async (page: number, limit: number, search: string) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/manage_posts/`, page, search, limit, undefined);

    return await commonFetch(url, token)
}

// fetch posts' comments

export const fetchPostsComments = async (postId: string, search: string, page: number, limit: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/${postId}/comments`, page, search, limit)

    return await commonFetch(url, token)
}


export const fetchDraftPosts = async (page: number, limit: number, search: string) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/manage_posts/drafts/`, page, search, limit, undefined)

    return await commonFetch(url, token)
}



// posts views likes and replies

export const fetchPostLikes = async (postId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/likes/${postId}`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}


export const fetchPostDislikes = async (postId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/dislikes/${postId}`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}


export const fetchPostViews = async (postId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/views/${postId}`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}



// comments views likes and replies
export const fetchCommentsLikes = async (postId: string, commentId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/${postId}/comments/${commentId}/likes`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}


export const fetchCommentsDislikes = async (postId: string, commentId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/${postId}/comments/${commentId}/dislikes`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}


export const fetchCommentsReplies = async (postId: string, commentId: string, page?: number, limit?: number) => {
    const token = await getAccessToken()
    const url = formatApiUrl(process.env.API_URL, `/api/posts/${postId}/comments/${commentId}/replies`, page, undefined, limit, undefined)

    return await commonFetch(url, token)
}


export const fetchALlUsers = async (page: number, search: string, limit: number) => {
    const token = await getAccessToken()
    const url =  formatApiUrl(process.env.API_URL, `/api/users/`, page, search, limit)

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
            fetchstatus: true,
            status: response.status,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            fetchstatus: false,
            status: null,
            message: "Error Occured while getting a user!",
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
            fetchstatus: true,
            message,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            data
        }
    } catch {
        return {
            success: false,
            status: null,
            fetchstatus: false,
            message: "Error Occured while fetching activities!",
            redirectUrl: null,
            data: null
        }
    }
}



export const fetchAllSuggestions = async (search?: string, page?: number, limit?: number) => {
    const token = await getAccessToken();
    const url = formatApiUrl(`${process.env.API_URL}`, `/api/suggestions/all-suggestions`, page ?? 1, search, limit ?? 4, undefined);
    try {
        const response = await fetchWithNoCache(url, token);
        const { success, message, suggestions, meta, users } = await response.json();
        return {
            success,
            message,
            status: true,
            redirectUrl: [400, 401, 403].includes(response.status) ? "/admin-login" : null,
            suggestions,
            users,
            meta
        }
    } catch {
        return {
            success: false,
            status: false,
            message: "Failed to fetch suggestions!",
            redirectUrl: null,
            suggestions: null,
            users: null,
            meta: null
        }
    }
}
