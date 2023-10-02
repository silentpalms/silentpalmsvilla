import { motion } from "framer-motion";
import Slider from "react-slick";
import Heading from "./Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  const settings = {
    infinite: true,
    speed: 3000,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    autoplay: true,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get("/api/client/reviews");
        const allReviews = response.data.reviews;
        const approvedReviews = allReviews.filter(
          (review) => review.reviewStatus === "Approved"
        );
        setReviews(approvedReviews);
      } catch (error) {
        console.log("Error in getting reviews");
      }
    };
    getReviews();
  }, []);
  return (
    <div className="w-full h-full md:mb-10   relative px-4">
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center py-10 md:pt-20"
        >
          <Heading title="Testimonials" />
          <div className="bg-yellow-400 w-[50px] h-[3px] absolute left-1/2  -translate-x-1/2 bottom-8  md:bottom-5"></div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="text-center mb-10 text-lg"
        >
          Here are some kind words from our customers
        </motion.p>
      </div>
      <div>
        <Slider {...settings} lazyLoad="progressive">
          {reviews.map((review) => {
            return (
              <TestimonialCard
                name={review.user}
                description={review.message}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
