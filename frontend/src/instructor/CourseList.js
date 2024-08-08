import {useSelector, useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import {getcourseByInstructor} from '../actions/course'
import { Link } from 'react-router-dom'
  export default function CourseList() {
    const dispatch = useDispatch()
    const {courses} = useSelector((state)=>state.courses)
    const {auth} = useSelector((state)=>state.auth)
    useEffect(()=>{
      dispatch(getcourseByInstructor(auth?.user_id))
    },[dispatch])

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Courses</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {courses?.map((course) => (
                <article key={course.course_id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt=""
                      src={`/courses/${course?.course_image}`}
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={course.created_at} className="text-gray-500">
                        {course.created_at}
                      </time>
                      <Link
                        to={`/instructor/course/${course.course_id}`}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {course.course_category}
                      </Link>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link
                        to={`/instructor/course/${course.course_id}`}>
                          <span className="absolute inset-0" />
                          {course.course_name}
                        </Link>
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600">{course.course_description}</p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        <img alt="" src={`/default_user.jpg`} className="h-10 w-10 rounded-full bg-gray-50" />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            
                              <span className="absolute inset-0" />
                              {auth.first_name+" "+auth.last_name}
                           
                          </p>
                          <p className="text-gray-600">{auth.user_type}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  