import { Cormorant } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Rate = () => {
  return (
    <div className="w-full flex flex-col items-center space-y-5 my-20">
      <p
        className={`${cormorant.className} text-[20px] md:text-[20px]  text-green-800`}
      >
        How would you Rate us?
      </p>
    </div>
  );
};

export default Rate;
