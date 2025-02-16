import { getAccessToken } from "@/utils/server-only"
import UpdatePost from "../_lib/UpdatePost"
import { redirect } from "next/navigation";

const UpdatePostPage = () => {
  const token = getAccessToken();
    if (!token) {
      redirect("/admin-login")
    }
    return (
      <>
        <UpdatePost />
      </>
    )
  }
  
  export default UpdatePostPage