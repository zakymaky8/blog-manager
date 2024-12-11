import DeleteButton from "./DeleteButton";
// import LikeButton from "./LikeButton";
import ReplyButton from "./ReplyButton";

type TProps = {
    postId: string
}

type TComment = {
    content: string;
    createdAt: Date;
    lastUpdate: Date;
    likes: number;
    user_id: string;
    comments_id: string;
    post_id: string;
}

const CommentsCard = async ({postId}: TProps) => {
    const res = await  fetch(`http://localhost:3456/posts/${postId}/comments`);
    const { comments }: {comments: TComment[]} = await res.json();

  return (
    <div>
        {comments.map((comment) => {
            return (
                <div key={comment.comments_id} className="flex flex-col gap-3">
                <div className="flex flex-col  p-3 rounded-xl " style={{maxWidth: "550px"}}>
                  <h1 className="text-sm text-gray-600 hover:underline cursor-pointer">@zakymak</h1>
                  <p className="pt-1 text-xs italic">{comment.content}</p>
                  <div className="self-end flex gap-2 items-start">
                    {/* <LikeButton /> */}
                    <ReplyButton />
                    <DeleteButton postId={postId} commentId={comment.comments_id}/>
                  </div>
                </div>
              </div>
            )
        })}
    </div>
  )
}

export default CommentsCard