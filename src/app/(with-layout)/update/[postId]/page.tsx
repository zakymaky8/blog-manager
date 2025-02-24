import { fetchSinglePost } from "@/actions/fetchsAction";
import CreatePostForm from "@/app/_lib/CreatePostForm"
import { redirect } from "next/navigation";

const UpdatePostForm = async ({params}: {
    params: {
        postId: string
    }

}) => {

  const { postId } = await params;
  const { success, redirectUrl, data } = await fetchSinglePost(postId)
  if (redirectUrl !== null && !success) {
    redirect(redirectUrl)
  }
  const {post, author} = data;

  return (
    <CreatePostForm
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