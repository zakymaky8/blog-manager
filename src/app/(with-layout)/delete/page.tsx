import DeletePost from "@/app/_lib/DeletePost"
import { getAccessToken } from "@/utils/server-only"
import { redirect } from "next/navigation"

const DeletePostPage = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {

    const token = getAccessToken()
    if (!token) {
      redirect("/admin-login")
    }

    return (
      <>
        <DeletePost searchParams={searchParams} />
      </>
    )
  }

  export default DeletePostPage