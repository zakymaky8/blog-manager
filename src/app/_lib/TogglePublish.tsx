

const TogglePublish = ({postId, action}: {
    postId: string,
    action: string
    }) => {

    return (
        <form action={`http://localhost:3456/posts/${postId}/${action.toLowerCase()}?_method=PUT`} method='POST'>
            <button className="text-[11px] w-fit h-fit p-1" type='submit'>{action}</button>
        </form>
    )
}

export default TogglePublish