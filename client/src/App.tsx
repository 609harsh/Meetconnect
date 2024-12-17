import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./components/Navbar";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="h-full">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>
      <section className="relative bg-gradient-to-r from-blue-900/90 via-blue-700/90 to-cyan-800/90 h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-4">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="animate-slidein300 opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Simplify Your Job Hunt with{" "}
              <span className="underline decoration-cyan-300">
                One Powerful Tool!
              </span>
            </h1>
            <p className="animate-slidein500 opacity-0 mt-4 text-lg text-gray-100">
              Track interviews, manage job applications, showcase your profile,
              and access free career resources—all in one place.
            </p>
            <div className="animate-slidein700 opacity-0 mt-6 flex justify-center md:justify-start space-x-4">
              <Link
                to="/signin"
                className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-100"
              >
                Get Started for Free
              </Link>
              <a
                href="#features"
                className="bg-transparent text-white border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src="/Screenshot 2024-12-17 150255.png"
              alt="Job Hunt Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        {/* <div className="absolute bottom-4 w-full flex justify-center">
          <button className="bg-white bg-opacity-90 text-blue-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-100 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-6.704 3.886a1 1 0 01-1.516-.858V8.804a1 1 0 011.516-.858l6.704 3.886a1 1 0 010 1.716z"
              />
            </svg>
            Watch Demo
          </button>
        </div> */}
      </section>
      <section
        className="carousel h-svh flex flex-col my-auto items-center justify-evenly"
        id="features"
      >
        <h2 className="text-5xl lg:text-6xl font-extrabold tracking-widest">
          Features
        </h2>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="w-full py-12 "
          style={{ scrollbarWidth: "none" }}
        >
          <SwiperSlide className="bg-center bg-cover w-80 md:w-96 ">
            <div className="flex flex-col bg-white items-center text-black">
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                className="block w-full"
              />
              <p className="py-5 text-xl font-semibold">Interview Tracker</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-center bg-cover w-80 md:w-96">
            <div className="flex flex-col bg-white items-center text-black">
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                className="block w-full"
              />
              <p className="py-5 text-xl font-semibold">
                Job Application Tracker
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-center bg-cover w-80 md:w-96">
            <div className="flex flex-col bg-white items-center text-black">
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                className="block w-full"
              />
              <p className="py-5 text-xl font-semibold">Public Profile</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-center bg-cover w-80 md:w-96 ">
            <div className="flex flex-col bg-white items-center text-black">
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                className="block w-full"
              />
              <p className="py-5 text-xl font-semibold">Free Resources</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
              Meet the Creator
            </h2>
          </div>
          <div className="flex justify-center max-w-3xl  mx-auto">
            <div className="bg-gray-50 rounded-lg shadow sm:flex ">
              <img
                className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Avatar"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                  <a href="#">Harsh Gupta</a>
                </h3>
                <span className="text-gray-500 ">Full Stack Web Developer</span>
                <p className="mt-3 mb-4 font-light text-gray-500 text-sm ">
                  Hi! I’m Harsh Gupta, a passionate Full Stack Developer based
                  in India. With a background in Computer Science and experience
                  in building impactful web applications, I created this
                  platform to simplify the job search process.
                  <br />
                  I’ve built every feature from scratch—whether it's the job
                  tracker, interview scheduler, or the public profile feature. I
                  believe technology should make life easier, and this project
                  is my way of contributing to that goal.
                  <br />
                  Got feedback? Feel free to reach out—I’d love to hear from
                  you!
                </p>
                <ul className="flex space-x-4 sm:mt-0">
                  <li>
                    <Link
                      to="https://www.linkedin.com/in/harsh-gupta-a72902244/"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M20.447 20.452H17.32v-4.981c0-1.188-.023-2.722-1.658-2.722-1.659 0-1.912 1.297-1.912 2.637v5.066H10.61V9.75h2.923v1.464h.042c.407-.771 1.398-1.586 2.879-1.586 3.074 0 3.642 2.024 3.642 4.654v6.17zM6.337 8.286a1.605 1.605 0 110-3.211 1.605 1.605 0 010 3.211zm1.697 12.166H4.642V9.75h3.392v10.702zM22 2H2C.895 2 0 2.895 0 4v16c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://x.com/609hgharsh"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://github.com/609harsh"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://harsh-gupta-portfolio.vercel.app/"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="h-1 bg-black" />
      <p className="text-center font-medium p-4">
        ©️ 2024| Built by Harsh Gupta - Crafted with ❣️ and copious amounts of
        coffee!!
      </p>
    </div>
  );
}

export default App;
