import Image from "next/image";
import localFont from "next/font/local";

const poppinsBlack = localFont({
  src: "../public/fonts/poppins/Poppins-Black.ttf",
});

const Card = ({ image, title }) => {
  return (
    <div className="group h-56 md:h-80 overflow-hidden cursor-pointer relative hover:shadow-xl hover:shadow-black/50 transition-shadow">
      <div className="h-56 md:h-80 relative hover:scale-125 ">
        <Image
          src={image}
          alt
          fill
          className="group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:to-green-800/70 sc transition-all"></div>
      <div className="absolute inset-0 flex flex-col px-3 max-w-[500px] translate-y-[80%] group-hover:translate-y-[70%] md:group-hover:translate-y-[70%] transition-all">
        <h1
          className={`${poppinsBlack.className} text-xl md:text-3xl font-bold text-yellow-300`}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Card;
