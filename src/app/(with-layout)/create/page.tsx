import CreatePostForm from "@/app/_lib/CreatePostForm"
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Create Blog Post"
}


const CreatePost = async ({ searchParams }: {searchParams: Promise<{ suggestion_id: string }>}) => {
  const { suggestion_id } = await searchParams;
  return (
    <>
        <CreatePostForm
            priority="MEDIUM"
            suggestion_id={suggestion_id}
            excerptContent=""
            readTime=""
            post_id=""
            author=""
            action="📢 Publish"
            pageTitle="Create Blog"
            postContent=""
            postTitle=""
          />
    </>
  )
}

export default CreatePost