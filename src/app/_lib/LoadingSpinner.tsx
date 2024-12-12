const LoadingSpinner = () => {
  return (
    <div className="relative h-screen w-screen border-2">
        <div className="spinner absolute top-1/3 left-[40%] -translate-x-1/2 -translate-y-1/2 h-20 w-20 border-l-8 border-b-8 border-white rounded-[50%]"></div>
    </div>
  )
}

export default LoadingSpinner