import { Cormorant } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Heading = ({ title, smallHeader }) => {
  return (
    <div>
      {
        smallHeader?(<h2
          className={`${cormorant.className} text-3xl md:text-[32px] font-bold text-green-800 uppercase tracking-[1px] whitespace-pre-wrap`}
        >
          {title}
        </h2>):(<h2
        className={`${cormorant.className} text-3xl md:text-[42px] font-bold text-green-800 uppercase tracking-[1px] whitespace-pre-wrap`}
      >
        {title}
      </h2>)
      }
      
    </div>
  );
};

export default Heading;
