import CreatePostForm from "@/app/_lib/CreatePostForm"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UpdatePostForm = async ({params}: {
    params: {
        postId: string
    }

}) => {
  const { postId } = await params
  const cookieStore =  cookies();
  const token = (await cookieStore).get("token")?.value;
  const res = await fetch(`http://localhost:3456/posts/${postId}`, {
      headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
      }
    })
    if (!res.ok) {
      redirect("/admin-login")
  }
    const { data } = await res.json();
    const [post, author] = data;
  return (
    <CreatePostForm excerptContent={post.excerpt} author={author} action="Update" post_id={postId}  pageTitle="Update Post" postContent={post.content} postTitle={post.title}/>
  )
}

export default UpdatePostForm