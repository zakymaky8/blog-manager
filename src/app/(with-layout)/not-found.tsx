import Link from "next/link"

const RootNotFound = () => {
  return (
    <div className="text-red-950 flex-auto">
        <h1 className="text-9xl text-center">404</h1>
        <p className="text-center italic">No resource found with requested path!</p>
        <Link href="/"><p className="text-center m-5 text-white"><button>Back home</button></p></Link>
    </div>
  )
}

export default RootNotFound