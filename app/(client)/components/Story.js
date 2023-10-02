import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "./Heading";

const Story = () => {
  return (
    <div className="h-full relative w-full md:pr-4">
      <div className="w-full flex flex-col md:flex-row items-center mt-0 bg-green-50 ">
        <div className="w-full md:w-1/2 h-full md:flex justify-center items-center">
          <div className="py-12 px-4 md:px-12 text-center md:text-left">
            <div className="relative w-full md:w-fit">
              <motion.h2
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 1 }}
                transition={{ duration: 0.9 }}
                className="text-center"
              >
                <Heading title="Our Story" smallHeader />
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className=" mt-8 mb-4"
            >
              Silent Palms Villa, located in South Coast Mombasa, Kenya, offers
              luxurious two-bedroom units amidst beautiful green gardens,
              providing a serene and tranquil environment. Situated just a few
              meters away from the stunning Diani beach, this prime location
              ensures easy access to the pristine shoreline.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className=" mb-4"
            >
              The villa boasts a roof terrace that offers absolute privacy and
              breathtaking views of the ocean. Each unit features en-suite
              bedrooms, spacious open-plan living areas, and a large terrace
              that overlooks the surrounding palm trees. Each unit accommodates
              4-6 guests on a self-catering basis, allowing for a comfortable
              and enjoyable stay.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 1 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className=""
            >
              Designed with privacy in mind, Silent Palms Villa is an ideal
              choice for families, couples, and group holidays. Whether you're
              seeking a relaxing retreat or an adventure-filled getaway, this
              luxury residence caters to your needs. Additionally, long-term
              stay packages are available for those interested in an extended
              stay.
            </motion.p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="h-[50vh] md:h-[80vh] relative w-full md:w-1/2 rounded-lg md:rounded-none  "
        >
          <Image
            src="/images/story.jpg"
            alt="image"
            fill
            className="px-4 md:px-0 rounded-lg md:rounded-none object-cover "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Story;
