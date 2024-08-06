import React from 'react'
import { Link } from 'react-router-dom'
// import GetinTouch from './GetinTouch'
import ContactUs from './ContactUs'

const WebDesgin = ({data}) => {
  console.log(data)
  return (
   <>
      <section className="text-gray-600 body-font bg-slate-800 ">
        <div className="px-12 flex md:py-10 md:flex-row flex-col items-center">
          <div className="mt-5 md:mt-0 lg:pr-4 md:pr-15 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center sm:w-full w-full lg:w-4/6  md:w-6/12">
            <p class="text-sm font-semibold text-[#e19426] mb-3">
              {data?.[0].small_text}
            </p>
            <h1 className="text-2xl font-extrabold   mb-3 text-white dark:text-gray-100 sm:text-3xl  md:text-4xl ">
           {data?.[0].name}
            </h1>
            <ul class="sm:flex lg:flex block gap-4 mb-2">
    <li class="flex items-center justify-start">
        {/* <span class="mr-2 text-gray-500">
            <i aria-hidden="true" class="fas fa-circle"></i>
        </span> */}
        <span class="text-[#e19426]">
            Duration: <strong class="font-semibold">{data?.[0].duration_One}</strong>
        </span>
    </li>
    <li class="flex items-center mt-0">
        {/* <span class="mr-2 text-gray-500">
            <i aria-hidden="true" class="fas fa-circle"></i>
        </span> */}
        <span class="text-[#e19426]">
            Mode: <strong class="font-semibold">Offline</strong>
        </span>
    </li>
    <li class="flex items-center mt-0">
        {/* <span class="mr-2 text-gray-500">
            <i aria-hidden="true" class="fas fa-circle"></i>
        </span> */}
        <span class="text-[#e19426]">
            Eligibility: <strong class="font-semibold">After 10th Class</strong>
        </span>
    </li>
</ul>

            <p className="mb-5 md:pl-0  pl-2 pr-2  text-white text-justify">
             {data?.[0].description}
            </p>

            <img src={data?.[0].image} className="mb-5" alt={data?.[0].alt}/>
            <div className="flex justify-center">
              <Link
                to="#"
                className="inline-flex text-white bg-[#d58a1e] border-0 py-2 px-6 focus:outline-none hover:bg-emerald-600 rounded text-lg"
              >
               {data?.[0].join_btn}
              </Link>
              {/* <a
                href="#"
                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Read articles
              </a> */}
            </div>
          </div>
          <div className="md:w-6/12  mb-5 md:mb-0 lg:w-1/2 sm:w-full w-full">
            <div className=" flex flex-col justify-center  sm:px-6 lg:px-8">
              <div className="">
                <div className="bg-white py-8 px-4 shadow-lg  border sm:rounded-lg sm:px-10">
                  <p className="py-2 mb-5 text-lg font-semibold text-white text-center bg-[#e19426] ">
                    Quick Enquiry
                  </p>
                  <form className="" action="#" method="POST">
                    <div className="sm:flex lg:flex block mb-3 ">
                      <div className="pr-2">
                        <label
                          htmlFor="name"
                          className="text-justify block text-sm font-medium text-gray-700 "
                        >
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="Last Name"
                          className="text-justify block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="LName"
                            name="LName"
                            type="LName"
                            autoComplete="Last Name"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:flex lg:flex block mt-0">
                      <div className="pr-2">
                        <label
                          htmlFor="email"
                          className="text-justify block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="Number"
                          className=" text-justify block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <div className="mt-1">
                          <input
                            id="Number"
                            name="Number"
                            type="Number"
                            autoComplete="Number"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="selector mt-4 mb-2">
                      <p>
                        <span className="">
                          <select
                            className=" w p-2 border border-gray-300 rounded-md w-full text-sm  placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            aria-required="true"
                            aria-invalid="false"
                            name="your-subject"
                          >
                            <option value="Full Stack Development">
                              Full Stack Development
                            </option>
                            <option value="Digital Marketing">
                              Digital Marketing
                            </option>
                            <option value="Web Designing">Web Designing</option>
                            <option value="Graphic Designing">
                              Graphic Designing
                            </option>
                            <option value="Deep Learning">Deep Learning</option>
                            <option value="UI/UX Designing">
                              UI/UX Designing
                            </option>
                            <option value="Data Science">Data Science</option>
                            <option value="Machine Learning">
                            Machine Learning
                            </option>
                            <option value="App Development">
                            App Development
                            </option>
                            <option value="AI">
                            AI
                            </option>
                            <option value="Python">
                            Python
                            </option>
                            {/* <option value="Python">
                            Python
                            </option> */}
                          </select>
                        </span>
                      </p>
                    </div>
                    <div>
                    <label class="mb-2 mt-0 text-sm font-medium text-gray-700" for="comment">Your Massage</label>
                    <textarea rows="4" class="mb-4 px-3 py-2 border-2 border-gray-300 rounded-lg w-[100%]" id="comment" name="comment" placeholder="write massage"></textarea>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Send Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
     
    </>

  )
}

export default WebDesgin

