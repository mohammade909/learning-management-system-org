import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Resources', href: '#' },
  { name: 'Company', href: '#' },
]
const stats = [
  { label: 'Transactions every 24 hours', value: '44 million' },
  { label: 'Assets under holding', value: '$119 trillion' },
  { label: 'New users annually', value: '46,000' },
]
const values = [
  {
    name: 'Provide High-Quality IT Education',
    description:
      'Provide High-Quality IT EducationWe offer up-to-date courses that give students practical skills and knowledge needed in the IT industry. Our curriculum is regularly updated with the latest technologies and best practices.',
  },
  {
    name: 'Encourage Innovation',
    description:
      'We inspire creative thinking and problem-solving skills to prepare students for the changing world of technology. Through real-world projects, we nurture an innovative mindset in our students.',
  },
  {
    name: 'Make Learning Accessible',
    description:
      'We provide flexible class schedules to make IT education accessible to learners from diverse backgrounds. Our conveniently located facility and varied course timings ensure quality education is available to all, accommodating different work and life commitments.',
  },
  {
    name: 'Build a Supportive Community',
    description:
      'We create a collaborative environment where students learn, share, and grow together. Networking opportunities, peer learning, and mentorship programs enhance the overall learning experience.',
  },
  {
    name: 'Bridge the Skills Gap',
    description:
      'Our curriculum is designed in collaboration with industry needs to prepare students for jobs. We partner with tech companies to ensure our courses meet current market demands and trends.',
  },
  {
    name: 'Promote Lifelong Learning',
    description:
      'We encourage our students to keep learning and developing professionally. Our resources and guidance support ongoing skill enhancement, helping alumni stay competitive in their careers long after completing our courses.',
  },
]
const team = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://i.pinimg.com/originals/3d/ee/6d/3dee6ded4c09c2640187fbafe98c3c05.jpg',
      alt: 'Michael'
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://i.pinimg.com/236x/d4/1d/41/d41d41fff98ffbbac4a7e9b02eee43a5.jpg',
      alt: 'Michael Foster'
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  alt: 'Michael Foster'
    },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:  'https://i.pinimg.com/originals/39/c2/95/39c2959cc41d7c746977de07471b34d7.jpg',
  alt: 'Michael Foster'
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://i.pinimg.com/236x/81/8f/1b/818f1b3ee137f5891a952ce42744161f.jpg',
  alt: 'Michael Foster'
    },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://i.pinimg.com/474x/68/06/24/680624236bf7c6d77afc034674244be7.jpg',
  alt: 'Michael Foster'
    },
  
  // More people...
]
const blogPosts = [
  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://media.istockphoto.com/id/1371339413/photo/co-working-team-meeting-concept-businessman-using-smart-phone-and-digital-tablet-and-laptop.jpg?s=612x612&w=0&k=20&c=ysEsVw3q2axYt3oVZAuQjtHRlN3lY-U_e0ikK5yKIXQ=',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    alt: "expedita assumenda",
    author: {
      name: 'Michael Foster',
      alt: "Michael Foster",
      imageUrl:
        'https://i.pinimg.com/474x/68/06/24/680624236bf7c6d77afc034674244be7.jpg',
    },
  },
  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://www.skillreactor.io/blog/wp-content/uploads/2024/05/Full-Stack-Developer.jpg',
    date: 'Mar 16, 2020',
    alt: "voluptates",
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      alt: "Michael",
      imageUrl:
        'https://i.pinimg.com/236x/81/8f/1b/818f1b3ee137f5891a952ce42744161f.jpg',
    },
  },
  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    alt: "voluptas",
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    imageUrl:
      'https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4=',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: {
      name: 'Michael Foster',
      alt: "Michael Foster",
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]
const footerNavigation = {
  main: [
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

const OurMission = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
      <div className="bg-white">
        
        <main className="isolate">
          {/* Hero section */}
          <div className="relative isolate -z-10">
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
            >
              <defs>
                <pattern
                  x="50%"
                  y={-1}
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            <div
              aria-hidden="true"
              className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
            >
              <div
                style={{
                  clipPath:
                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                }}
                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              />
            </div>
          </div>
  
          {/* Content section */}
          <div className="mx-auto  max-w-7xl px-6 sm:mt-0 lg:px-8 ">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get the IT Skills You Need to Succeed</h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className="ext-base leading-8 text-gray-600">
                  At CyberSolvings, we love helping people like you reach their IT goals. Technology is always changing, and there's a big need for skilled IT workers. That's why we offer a wide range of IT courses to give you the knowledge and skills you need to succeed. Our courses are designed to be easy to understand and practical.
                  </p>
                  <div className="mt-5 max-w-xl text-base leading-7 text-gray-700">
                    <p>
                    We aim to connect theory with practice by providing high-quality, relevant IT education. We believe everyone should have the chance to learn and grow in the tech world. We strive to make our courses accessible and beneficial for all learners.
                    </p>
                    <p className="mt-5">
                    We focus on the learner, offering interactive learning experiences for different learning styles. Our courses are created and taught by experienced IT professionals who are eager to share their knowledge. We ensure our teaching methods are engaging and effective.
                    </p>
                  </div>
                </div>
                <div className="lg:flex lg:flex-auto lg:justify-center">
                  <dl className="w-64 space-y-8 xl:w-80">
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                        <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                        <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
  
          {/* Image section */}
          <div className="mt-16 sm:mt-16 xl:mx-auto xl:max-w-7xl xl:px-8">
            <img
              alt="unsplash"
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
            />
          </div>.ḍ 
  
          {/* Values section */}
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-16 lg:px-8">
            <div className="mx-auto max-w-7xl lg:mx-0 text-center ">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900  sm:text-4xl">Our Values</h2>
              <p className="mt-2 text-lg mb-8 mx-auto px-16 text-gray-600">
              Our core values shape everything we do. These principles guide our approach to education, innovation, and student success.
              </p>
            </div>
            <dl className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {values.map((value) => (
                <div key={value.name}>
                  <dt className=" text-gray-900 text-base font-semibold">{value.name}</dt>
                  <dd className="mt-1 text-gray-600 text-base">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
  
          {/* Logo cloud */}
          <div className="relative isolate -z-10 mt-5 sm:mt-5">
            <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
              <svg aria-hidden="true" className="h-[40rem] w-[80rem] flex-none stroke-gray-200">
                <defs>
                  <pattern
                    x="50%"
                    y="50%"
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(-100 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                  <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" width="100%" height="100%" strokeWidth={0} />
              </svg>
            </div>
          </div>
  
          {/* Team section */}
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-16 lg:px-8">
            <div className="mx-auto max-w-7xl lg:mx-0 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Team</h2>
              <p className="mt-1 text-lg  text-gray-600">
              Meet the team at CyberSolvings. Our instructors and support staff are dedicated professionals with years of industry experience and a strong passion for teaching in every class.
              </p>
            </div>
            <ul
              role="list"
              className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
            >
              {team.map((person) => (
                <li key={person.name}>
                  <img alt={person.alt} src={person.imageUrl} className="mx-auto h-24 w-24 rounded-full" />
                  <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Blog section */}
          <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-10 lg:px-8 py-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none text-center">
              <h2 className="text-3xl font-bold  text-gray-900 sm:text-4xl">From the blog</h2>
              <p className="mt-2 text-lg  text-gray-600">
              Stay informed about the latest IT trends, career advice, and tech insights. Our blog offers expert articles, industry news, and valuable tips to help you learn and grow in your career.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                  <img alt={post.alt} src={post.imageUrl} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
  
                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.datetime} className="mr-8">
                      {post.date}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <div className="flex gap-x-2.5">
                        <img alt={post.alt} src={post.author.imageUrl} className="h-6 w-6 flex-none rounded-full bg-white/10" />
                        {post.author.name}
                      </div>
                      
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

export default OurMission
