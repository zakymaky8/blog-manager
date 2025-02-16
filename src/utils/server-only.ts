import "server-only";
import { cookies } from "next/headers";


export const getAccessToken = async () => {
    return (await cookies()).get("accessToken")?.value
}
