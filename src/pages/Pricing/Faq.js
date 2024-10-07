import React, { useState } from "react";
import minusIcon from "../../assets/pricing/minusIcon.svg";
import plusIcon from "../../assets/pricing/plusIcon.svg";
const Faq = () => {
  const faqData = [
    {
      question: "What is a copy?",
      answer:
        "Yes, you can write long articel for your blog posts, product descriptions or any long article with CopyGen. We're always updating our template and tools, so let us know what are expecting!",
    },
    {
      question: "Does CopyGen to write long articles?",
      answer:
        "Yes, you can write long articel for your blog posts, product descriptions or any long article with CopyGen. We're always updating our template and tools, so let us know what are expecting!",
    },
    {
      question: "Is the generated content original?",
      answer:
        "Yes, you can write long articel for your blog posts, product descriptions or any long article with CopyGen. We're always updating our template and tools, so let us know what are expecting!",
    },
    {
      question: "Do you have wordpress plugin?",
      answer:
        "Yes, you can write long articel for your blog posts, product descriptions or any long article with CopyGen. We're always updating our template and tools, so let us know what are expecting!",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="mt-20">
      <div className="text-center">
        <h5 className="text-xl font-semibold text-purple">FAQ'S</h5>

        <h2 className="text-3xl text-dark font-bold my-3 md:text-4xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ */}
      <div className="md:w-1/2 md:mx-auto p-4 mt-3 md:mt-10">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-4  border-b-[1px] border-opacity-25 border-grayText"
          >
            <div
              className="flex justify-between items-center text-grayText my-6  cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h6 className="text-grayText text-base">{faq.question}</h6>
              {/* <div
                className={`${openIndex === index ? "rotate-180" : "rotate-0"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-5 transition duration-300 group-open:-rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  ></path>
                </svg>
              </div> */}
              {openIndex !== index ? (
                <img className="w-3" src={plusIcon} alt="plus icon" />
              ) : (
                <img className="w-3" src={minusIcon} alt="minus icon" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-grayText text-sm mb-3 ">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
