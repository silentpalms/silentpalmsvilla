import Image from "next/image"

const Poster = () => {
  return (
    <div className="w-full">
        <div className="relative h-[150px] md:h-[300px] w-full">
            <Image src="/images/1.png"alt="poster" fill />
        </div>
    </div>
  )
}

export default Poster