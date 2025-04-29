import ViewManage from "../../_lib/ViewManage"

const ReadPost = async ({ searchParams }: { searchParams: Promise<{ page: number, limit: number, search: string }> }) => {
    return (
      <>
        <ViewManage searchParams={searchParams} />
      </>
    )
  }
  
  export default ReadPost