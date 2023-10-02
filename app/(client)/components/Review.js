import { Cormorant } from "next/font/google";
import { useState, useRef } from "react";
import axios from "axios";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Review = () => {
  const [val, setVal] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const [showReview, setShowReview] = useState(true);
  const [showOutstanding, setShowOutstanding] = useState(false);
  const [showImpressive, setShowImpressive] = useState(false);
  const [showAverage, setShowAverage] = useState(false);
  const [showDissapointed, setShowDissapointed] = useState(false);
  const [showTerrible, setShowTerrible] = useState(false);
  const [closeReview, setCloseReview] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);

  const handleEmojiClicked = (inputRef) => {
    setActiveLabel(inputRef.current.id);
    setShow(true);
    const inputValue = inputRef.current.value;
    const numericalValue = parseInt(inputValue);
    setVal(numericalValue);

    if (numericalValue <= 3) {
      setPlaceholder("What can we do to improve ?");
    } else {
      setPlaceholder(`What did you enjoy and what improvements can we make ?`);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (name && message === "") {
      alert("Please fill all fields");
    } else {
      const review = {
        user: name,
        rating: val,
        message: message,
      };
      await axios.post("/api/reviews", review);
      setName("");
      setMessage("");
      setShow(false);
      setActiveLabel(null);
      setShowReview(false);
    }
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (1000 / 15);

    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };

  const handleCloseReview = () => {
    setCloseReview(true);
    scrollToTop();
  };

  return (
    <div>
      {!closeReview && (
        <>
          <div className="flex flex-col h-full w-full md:items-center md:mb-32 mb-16">
            <h4
              className={`${cormorant.className} text-[30px] md:text-[40px] font-bold text-green-800 text-center`}
            >
              Leave a review
            </h4>
            {showReview ? (
              <>
                <p className="mb-5 mt-3 text-center px-4">
                  Enjoyed your stay ? Leave a feedback below to help us improve
                  our services.
                </p>
                <div>
                  <form
                    className="flex flex-col px-4 w-full"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="flex md:space-x-3 justify-between mb-4">
                      <div>
                        <input
                          type="radio"
                          id="extraHappy"
                          value={5}
                          ref={inputRef1}
                          className="hidden"
                        />
                        <label
                          htmlFor="extraHappy"
                          onClick={() => handleEmojiClicked(inputRef1)}
                        >
                          <p
                            onMouseEnter={() => setShowOutstanding(true)}
                            onMouseLeave={() => setShowOutstanding(false)}
                            className={`text-4xl md:text-5xl grayscale cursor-pointer  hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                              activeLabel === "extraHappy"
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-50"
                            }`}
                          >
                            &#129321;
                          </p>
                        </label>

                        <p
                          className={`hidden md:flex text-center text-xs pt-2 transition-opacity duration-200 ease-in-out ${
                            showOutstanding ? "opacity-75" : "opacity-0"
                          } `}
                        >
                          Outstanding
                        </p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value={4}
                          className="hidden"
                          ref={inputRef2}
                          id="grining"
                        />
                        <label
                          htmlFor="grining"
                          onClick={() => handleEmojiClicked(inputRef2)}
                        >
                          <p
                            onMouseEnter={() => setShowImpressive(true)}
                            onMouseLeave={() => setShowImpressive(false)}
                            className={`text-4xl md:text-5xl grayscale cursor-pointer  hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                              activeLabel === "grining"
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-50"
                            }`}
                          >
                            &#128522;
                          </p>
                        </label>
                        <p
                          className={`hidden md:flex text-center text-xs pt-2 transition-opacity duration-200 ease-in-out ${
                            showImpressive ? "opacity-75" : "opacity-0"
                          } `}
                        >
                          Impressive
                        </p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value={3}
                          className="hidden"
                          ref={inputRef3}
                          id="expressionless"
                        />
                        <label
                          htmlFor="expressionless"
                          onClick={() => handleEmojiClicked(inputRef3)}
                        >
                          <p
                            onMouseEnter={() => setShowAverage(true)}
                            onMouseLeave={() => setShowAverage(false)}
                            className={`text-4xl md:text-5xl grayscale cursor-pointer  hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                              activeLabel === "expressionless"
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-50"
                            }`}
                          >
                            &#128529;
                          </p>
                        </label>
                        <p
                          className={`hidden md:flex text-center text-xs pt-2 transition-opacity duration-200 ease-in-out ${
                            showAverage ? "opacity-75" : "opacity-0"
                          } `}
                        >
                          Average
                        </p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value={2}
                          className="hidden"
                          ref={inputRef4}
                          id="dissapointed"
                        />
                        <label
                          htmlFor="dissapointed"
                          onClick={() => handleEmojiClicked(inputRef4)}
                        >
                          <p
                            onMouseEnter={() => setShowDissapointed(true)}
                            onMouseLeave={() => setShowDissapointed(false)}
                            className={`text-4xl md:text-5xl grayscale cursor-pointer  hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                              activeLabel === "dissapointed"
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-50"
                            }`}
                          >
                            &#128543;
                          </p>
                        </label>
                        <p
                          className={`hidden md:flex text-center text-xs pt-2 transition-opacity duration-200 ease-in-out ${
                            showDissapointed ? "opacity-75" : "opacity-0"
                          } `}
                        >
                          Dissapointed
                        </p>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value={1}
                          className="hidden"
                          ref={inputRef5}
                          id="angry"
                        />
                        <label
                          htmlFor="angry"
                          onClick={() => handleEmojiClicked(inputRef5)}
                        >
                          <p
                            onMouseEnter={() => setShowTerrible(true)}
                            onMouseLeave={() => setShowTerrible(false)}
                            className={`text-4xl md:text-5xl grayscale cursor-pointer  hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 ${
                              activeLabel === "angry"
                                ? "grayscale-0 opacity-100"
                                : "grayscale opacity-50"
                            }`}
                          >
                            &#128547;
                          </p>
                        </label>

                        <p
                          className={`hidden md:flex text-center text-xs pt-2 transition-opacity duration-200 ease-in-out ${
                            showTerrible ? "opacity-75" : "opacity-0"
                          } `}
                        >
                          Terrible
                        </p>
                      </div>
                    </div>
                    <div>
                      {show && (
                        <div className="transition duration-300 ease-in">
                          <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="text-sm">
                              Name
                            </label>
                            <input
                              type="text"
                              className="px-2 py-2 outline-none border border-gray-200 w-full md:w-[400px]"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col mb-5">
                            <label htmlFor="message" className="text-sm">
                              Message
                            </label>
                            <textarea
                              type="text"
                              className="px-2 py-2 outline-none border border-gray-200 w-full md:w-[400px] h-[100px]"
                              placeholder={placeholder}
                              required
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-2 py-2 bg-green-700 w-full md:w-[400px] text-white"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="border border-gray-300  py-7 mt-6 shadow-2xl">
                <div className="px-4 flex flex-col  justify-center items-center space-y-10">
                  <h4 className="font-bold text-2xl text-center">
                    Thank you for submitting your feedback
                  </h4>
                  <p className="text-5xl">🎉</p>
                  <button
                    type="button"
                    className="px-2 py-2 bg-green-700 w-[100px] text-white cursor-pointer"
                    onClick={handleCloseReview}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
