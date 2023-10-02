import localFont from "next/font/local";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "./Heading";
import Card from "./Card";

const Activities = [
  {
    title: "Immerse in Beach Life",
    image: "/images/beach.jpg",
  },
  {
    title: "Snorkelling",
    image: "/images/snorka.jpg",
  },
  {
    title: "Kayaking",
    image: "/images/raft.jpg",
  },
  {
    title: "Jetskiing",
    image: "/images/jetsky.jpg",
  },
  {
    title: "Tour Tsavo",
    image: "/images/wild.jpg",
  },
];

function Things() {
  return (
    <div className="w-full h-full px-4">
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center py-10 md:py-20"
        >
          <Heading title="Things To do while in Diani" />
          <div className="bg-yellow-400 w-[50px] h-[3px] absolute left-1/2 -translate-x-1/2 bottom-8  md:bottom-16"></div>
        </motion.h1>
        <p></p>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {Activities.slice(0, 1).map((activity, index) => (
          <Card title={activity.title} image={activity.image} />
        ))}
        <div className="grid grid-cols-2 gap-2">
          {Activities.slice(1, 3).map((activity, index) => (
            <Card title={activity.title} image={activity.image} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {Activities.slice(3, 5).map((activity, index) => (
          <Card title={activity.title} image={activity.image} />
        ))}
      </div>
    </div>
  );
}

export default Things;
