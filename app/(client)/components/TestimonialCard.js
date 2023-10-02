import localFont from "next/font/local";

import { FaQuoteLeft } from "react-icons/fa";

const melodrama = localFont({
  src: "../../../public/fonts/melodrama/Melodrama-Semibold.ttf",
});
const TestimonialCard = ({ name, description }) => {
  return (
    <div>
      <div className="mb-5 md:mb-10 min-h-[200px] ml-2  bg-green-700 p-4 relative">
        <div className=" w-full md:-mt-0 ">
          <p
            className={`${melodrama.className}flex justify-between w-full text-yellow-400 text-xs`}
          >
            <FaQuoteLeft />
          </p>
          <p className=" text-white line-clamp-5">{description}</p>
          <div className="w-full absolute bottom-4">
            <p className="font-bold mt-2 text-yellow-400">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
