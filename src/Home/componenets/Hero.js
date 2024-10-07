import React from "react";
import heroImg from "../../assets/home/heroImg.png";

import { Container } from "./ui/Container";

const Hero = () => {
  return (
    <div className="bg-blue-500 text-white text-center p-12">
      <h1 className="text-4xl font-bold mb-4">Turn Chaos into Knowledge</h1>
      <p className="text-xl mb-6">Harness the combined power of LLMs and Symbolic AI with MyBot.</p>
      <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold transition duration-300 ease-in-out hover:bg-gray-100">Get Started</button>
    </div>
  );
};

export default Hero;
