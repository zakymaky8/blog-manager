import { getAccessToken } from "@/utils/server-only"
import UpdatePost from "../../_lib/UpdatePost"
import { redirect } from "next/navigation";

const UpdatePostPage = ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {
  const token = getAccessToken();
    if (!token) {
      redirect("/admin-login")
    }
    return (
      <>
        <UpdatePost searchParams={searchParams} />
      </>
    )
  }
  
  export default UpdatePostPage