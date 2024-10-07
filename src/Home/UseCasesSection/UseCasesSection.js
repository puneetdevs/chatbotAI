import React from "react";

const cases = [
  {
    title: "Customer Service",
    description: "Automate repetitive tasks and provide quick responses to customer inquiries, freeing up human staff for strategic tasks."
  },
  {
    title: "Customer Engagement",
    description: "Enhance customer interactions with tailored and relevant responses, improving the overall customer experience."
  },
  {
    title: "Topic Research",
    description: "Facilitate efficient and accurate research on various topics by quickly sourcing and synthesizing relevant information."
  },
  {
    title: "Document Research",
    description: "Streamline the process of sifting through documents to find the information you need with powerful semantic analysis."
  },
];

export const UseCasesSection = () => {
  return (
    <div className="mt-20  lg:py-20">
      <h5 className="text-xl text-center font-semibold text-purple">
        USE CASES
      </h5>
      <div className="text-center px-4 md:px-6">
        <div>
          <h2 className="text-3xl text-dark font-bold my-3 md:text-4xl">
            Unleash the Power of MyBot
          </h2>
          <p className="text-[16px] md:text-[18px] leading-6 md:leading-8">
            Elevate Your Capabilities and Streamline Operations with MyBot –
            The Intersection of <br className="hidden md:block" /> Infinite
            Possibilities and Optimal Efficiency
          </p>
        </div>
      </div>
      <div className="hero p-4 md:mt-10 ">
        <div className="max-w-[1300px] mx-auto sm:grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8 ">
          {cases.map((useCase, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
