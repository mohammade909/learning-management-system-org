import React from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import Course from "../components/Course";
import About from "../components/About";
import Join from "../components/Join";
import Why from "../components/Why";
import Counter from "../components/Counter";
import Testimonal from "../components/Testimonal";
import Logos from "../components/logos";
import Stats from "../components/Stats";
import Blogs from "../components/Blogs";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
const Home = () => {
  return (
    <>
      <div className="z-0">
        <div className="relative mx-auto px-4 pt-4 sm:max-w-xl md:max-w-full md:px-8 lg:py-8 xl:px-20">
          <div className="mx-auto max-w-xl lg:max-w-screen-xl">
            <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
              <div className="mb-6 max-w-xl">
                <div>
                  <p className="bg-teal-accent-400 text-white mb-4 inline-block rounded-full bg-[#f4a636] px-3 py-px text-sm font-semibold tracking-wider text-green-900">
                  Develop Your Future with Modern 
                </p>
                </div>
                <h2 className="mb-2 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl sm:leading-snug">
                Develop Your Future with Modern 
                  <span className="inline-block text-[#f4a636]">
                  Technological Skills
                  </span>
                </h2>
                <p className="text-base text-gray-700 md:text-lg text-justify">
                Join our vibrant community and learn the skills required to succeed in the digital age. Our expert-led courses are designed to provide you with practical experience and real-world knowledge.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
                <a
                  href="/"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#f4a636] px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-black focus:ring sm:w-auto"
                >
                  {" "}
                  Join Now{" "}
                </a>
              </div>
              </div>
            <div className="hidden h-full justify-center overflow-hidden lg:absolute lg:bottom-0 lg:right-0 top-12 lg:flex lg:w-1/2 lg:items-end lg:justify-start">
              <img src="./Education.gif" className="w-[100%] img-position" />
            </div>
          </div>
        </div>
      </div>
      <About />
      {/* <Course /> */}
      <Categories />
      <Why />
      <Counter />
      <Join />
      <Testimonal />
      <Blogs />
      <Logos />
      {/* <Stats /> */}
      <Newsletter />
      {/* <Slider/> */}
    </>
  );
};

export default Home;
