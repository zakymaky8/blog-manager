import { fetchSinglePost } from "@/actions/fetchsAction";
import CreatePostForm from "@/app/_lib/CreatePostForm"
import Inconvienence from "@/app/_lib/Inconveinence";
import { redirect } from "next/navigation";

const UpdatePostForm = async ({params, searchParams}: {
    params: Promise<{postId: string}>,
    searchParams: Promise<{ suggestion_id: string }>

}) => {

  const { postId } = await params;
  const { suggestion_id } = await searchParams;
  const { success, redirectUrl, data, status, message } = await fetchSinglePost(postId)
  if (redirectUrl !== null && !success) {
    redirect(redirectUrl)
  }

  if (status === false || !success) {
    return <Inconvienence message={message} />
  }
  const {post, author} = data;

  return (
    <CreatePostForm
          suggestion_id={suggestion_id ?? null}
          priority={post.priority}
          excerptContent={post.excerpt}
          readTime={post.readTime}
          author={author}
          action="Update"
          post_id={postId}
          pageTitle="Update Post"
          postContent={post.content}
          postTitle={post.title}
      />
  )
}

export default UpdatePostForm