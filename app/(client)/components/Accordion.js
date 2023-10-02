import localFont from "next/font/local";

  

const melodrama = localFont({
  src: "../../../public/fonts/melodrama/Melodrama-Semibold.ttf",
});

import { useState } from "react";
import { Collapse } from "react-collapse";

const faqs = [
  {
    title: "What is the distance to the beach ?",
    desc: "Silent Palms is approximately 800m to the beach around 8 mins walk",
  },
  {
    title: "Where are we located ?",
    desc: "Located along Beach road a few KMS from Ukunda Shopping Center (Mwisho wa Lami) ",
  },
  {
    title: "What Payments do we accept ?",
    desc: "At the moment we only accept payments via Mpesa and Bank Deposit. For bank deposits call our helpline +254798024710",
  },
  {
    title: "What are the nearby places and Activities available",
    desc: "Silent Palms is located in close proximity to various shopping centers, such as malls, supermarkets and entertainment beaches. The beach life in this area is vibrant and exciting, with easy access to Port Drive, jet ski rides, deep sea diving, dolphin viewing, kayaking, and even mysterious waterfalls caves. Moreover, visitors can conveniently access the Ukunda Airstrip and the Moi International Airport. For those interested in wildlife, they can head to Tsavo National Park or Shimba Hills to experience some of the most stunning wildlife in the region.",
  },
  {
    title: "Do you provide dinner or breakfast ?",
    desc: "Our facility is on self catering basis, however breakfast can be arranged on request. We can also arrange for a chef at a small fee on request.",
  },
];

const Accordion = (open) => {
  const [accordion, setActiveAccordion] = useState(-1);

  function toggleAccordion(index) {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  }
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <span
          className={`${melodrama.className} text-[30px] font-extrabold mb-3`}
        >
          Frequently asked questions
        </span>
        <h1>Lets answer some of your questions</h1>
      </div>

      <div className="space-y-2">
        {faqs.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white shadow-lg px-4 py-4"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`${
                    accordion === index ? "active" : ""
                  } font-bold text-xl `}
                >
                  {item.title}
                </h3>
                <div>
                  {accordion === index ? (
                    <>
                      <span>-</span>
                    </>
                  ) : (
                    <>
                      <span>+</span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Collapse isOpened={open}>
                  <p className={accordion === index ? "active" : "inactive"}>
                    {item.desc}
                  </p>
                </Collapse>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
