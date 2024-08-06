import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
   <>


<div className="h-full bg-gray-400 dark:bg-gray-900">
  {/* Container */}
  <div className="mx-auto">
    <div className="flex justify-center px-6 py-5">
      {/* Row */}
      <div className="w-full xl:w-3/4 lg:w-11/12 flex">
        {/* Col */}
        <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg opacity-20" style={{backgroundImage: 'url("/reg.jpg")'}} />
        {/* Col */}
        <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
        <div className='flex justify-center'>
        <Link to ="/">
        <img src="/cyberw.png" alt='' className='w-[200px] item'/>
        </Link>
        </div>
          <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
          <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0 w-full sm:w-full md:w-2/4 lg:w-2/4 xl:w-2/4 xxl:w-2/4">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                  First Name
                </label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
              </div>
              <div className="md:ml-2 w-full sm:w-full md:w-2/4 lg:w-2/4 xl:w-2/4 xxl:w-2/4">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                  Last Name
                </label>
                <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                Email
              </label>
              <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
            </div>
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0 w-full sm:w-full md:w-2/4 lg:w-2/4 xl:w-2/4 xxl:w-2/4 ">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                  Password
                </label>
                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
              </div>
              <div className="md:ml-2 w-full sm:w-full md:w-2/4 lg:w-2/4 xl:w-2/4 xxl:w-2/4">
                <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                  Confirm Password
                </label>
                <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="c_password" type="password" placeholder="******************" />
              </div>
            </div>
            <div className="mb-6 text-center ">
              <button className="w-full px-4 py-2 font-bold text-white bg-black rounded-full hover:bg-black dark:bg-black dark:text-white dark:hover:bg-[#f4a636] focus:outline-none focus:shadow-outline" type="button">
                Register Account
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link  className="inline-block text-sm text-[#f4a636] dark:text-[#f4a636] align-baseline hover:text-white" to="#">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center">
              <Link className="inline-block text-sm text-[#f4a636] dark:text-[#f4a636] align-baseline hover:text-white" to="/login">
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

   </>
  )
}

export default Register
