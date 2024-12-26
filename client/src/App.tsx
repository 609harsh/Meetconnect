import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./components/Navbar";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import TwitterIcon from "./icons/TwitterIcon";
import InternetIcon from "./icons/InternetIcon";
import "./index.css";
function App() {
  return (
    <div className="h-full">
      <div className="fixed z-10 w-full">
        <Navbar />
      </div>
      <section className="relative bg-gradient-to-r from-blue-900/90 via-blue-700/90 to-cyan-800/90 h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse md:flex-row items-center gap-4">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="animate-slidein300 opacity-0 text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Simplify Your Job Hunt with{" "}
              <span className="text-emerald-300 ">One Powerful Tool!</span>
            </h1>
            <p className="animate-slidein500 opacity-0 mt-4 md:text-base lg:text-lg text-gray-100">
              Track interviews, manage job applications, showcase your profile,
              and access free career resources—all in one place.
            </p>
            <div className="animate-slidein700 opacity-0 mt-6 flex justify-center md:justify-start space-x-4">
              <Link
                to="/signin"
                className="bg-white text-blue-500 font-semibold text-sm md:text-base px-1  py-3 md:px-2 lg:px-6 md:py-3 rounded-lg shadow-md hover:bg-blue-100 self-center"
              >
                Get Started for Free
              </Link>
              <a
                href="#features"
                className="bg-transparent text-white border border-white text-sm md:text-base px-1  py-3 md:px-2 lg:px-6 md:py-3 rounded-lg hover:bg-white hover:text-blue-500 self-center"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src="/hero.webp"
              alt="Job Hunt Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <section
        className="carousel md:h-svh flex flex-col items-center my-20 md:my-auto md:items-center justify-start md:justify-evenly"
        id="features"
      >
        <h2 className="text-5xl lg:text-6xl font-bold md:font-extrabold tracking-widest">
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
          className="w-full py-4 md:py-12 "
          style={{ scrollbarWidth: "none" }}
        >
          <SwiperSlide className="bg-center bg-cover sliders w-full md:w-4/6 lg:w-3/6">
            <div className="flex flex-col flex-grow bg-white items-center text-black">
              <img src={"/interview.webp"} />
              <p className="py-5 text-xl text-center font-semibold">
                Interviews Dashboard
              </p>
              <p className="py-1 px-2 text-base font-mono text-center font-light">
                "Seamlessly track, manage, and conquer your interview journey
                with our all-in-one Interview Dashboard!"
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-center bg-cover   w-full md:w-4/6 lg:w-3/6 ">
            <div className="flex flex-col flex-grow bg-white items-center text-black">
              <img src={"/tracker.webp"} />
              <p className="py-5 text-xl font-semibold">
                Job Application Tracker
              </p>
              <p className="py-1 px-2 text-base font-mono text-center font-light">
                "Stay organized and land your dream job with our Job Application
                Tracker—your personalized Kanban board to monitor progress, set
                priorities, and never miss an opportunity!"
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-center bg-cover w-full md:w-4/6 lg:w-3/6">
            <div className="flex flex-col flex-grow bg-white items-center text-black">
              <img src={"/publicprofile.webp"} loading="lazy" />
              <p className="py-5 text-xl font-semibold">Public Profile</p>
              <p className="py-1 px-2 text-base font-mono text-center font-light">
                "Turn your resume into a sharable digital profile in seconds!"
              </p>
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
            <div className="bg-gray-50 rounded-lg shadow sm:flex h-fit md:h-80">
              <img
                className="rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={"/creator.jpg"}
                alt="Harsh Gupta"
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
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <LinkedinIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://x.com/609hgharsh"
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <TwitterIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://github.com/609harsh"
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <GithubIcon />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://harsh-gupta-portfolio.vercel.app/"
                      target="_blank"
                      className="text-gray-500 hover:text-gray-900 "
                    >
                      <InternetIcon />
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
