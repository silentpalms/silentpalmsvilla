import Image from 'next/image'

const Loading = () => {
  return (
    <div className="h-screen bg-green-800 w-full flex justify-center items-center">
      <div className="relative h-20 w-20 rounded-full">
      <Image
            src="/images/logo.jpeg"
            alt="logo"
            fill
            className="rounded-full  animate-pulse"
          />

      </div>
    </div>
  )
}

export default Loading
