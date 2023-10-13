import { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { Cormorant } from "next/font/google";
import axios from "axios";
const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const HeroSlider = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);
  console.log(images);
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  const settings = {
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    fade: true,
    arrows: false,
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("/api/admin/images");

        let returnedImages = res.data.images.filter(
          (image) => image.imageDetails[0].name === "Cover"
        );

        if (returnedImages.length > 0) {
          let imageUrls = returnedImages[0].imageDetails[0].imageUrls;
          let imageArrays = [];
          imageUrls.forEach((image) => {
            imageArrays.push(image.imageUrls[0].url.toString());
          });
          console.log(imageArrays);
          setImages(imageArrays);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  return (
    <Slider {...settings} lazyLoad="progressive">
      {images?.map((image) => (
        <div className="relative h-[500px] md:h-[110vh] w-full md:w-full">
          <Image
            src={image}
            alt="diani resort"
            fill
            className="object-cover"
            onLoad={handleImageLoad}
          />
          {imagesLoaded && (
            <div className="absolute flex flex-col items-center top-[32%] md:top-[35%] w-full left-0 transform -translate-y-1/2 md:-translate-y-1/4">
              <div className="text-white text-center text-[25px] px-5 md:text-[40px] z-10 font-bold">
                <h5 className={`${cormorant.className} uppercase font-bold`}>
                  Experience Serenity At Silent Palms, Diani's Escape!
                </h5>
                <Link
                  href="/reservation"
                  className="text-center bg-green-800 px-5 py-3 w-[150px] text-[16px] mt-4 text-white"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
