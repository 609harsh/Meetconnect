import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import Navbar from "../components/Navbar";
import { Resources } from "../types";
import { useEffect, useState } from "react";

const resources = () => {
  const [data, setData] = useState<Resources[]>();

  useEffect(() => {
    const fetchResouces = async () => {
      const responsse = await fetch("http://localhost:3000/resources");
      const data = await responsse.json();
      setData(data.data);
    };
    fetchResouces();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        {data?.map((ele, idx) => {
          return (
            <div key={idx}>
              <h1 className="text-center font-bold text-4xl my-10">
                Top {ele.label} questions!!{" "}
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-4">
                  <h2 className="font-bold text-xl text-center">Easy</h2>
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper max-w-xs"
                  >
                    {ele.easy.map((list) => (
                      <SwiperSlide
                        className="p-5 space-y-4 leading-6 "
                        style={{
                          height: "320px",
                          overflow: "scroll",
                          scrollbarWidth: "none",
                        }}
                      >
                        <p className="text-black font-bold text-lg">
                          {list.question}
                        </p>

                        <p>{list.solution}</p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="space-y-4">
                  <h2 className="font-bold text-xl text-center">Medium</h2>
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper max-w-xs"
                  >
                    {ele.medium.map((list) => (
                      <SwiperSlide
                        className="p-5 space-y-4 leading-6"
                        style={{
                          height: "320px",
                          overflow: "scroll",
                          scrollbarWidth: "none",
                        }}
                      >
                        <p className="text-black font-bold text-lg">
                          {list.question}
                        </p>
                        <p>{list.solution}</p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="space-y-4">
                  <h2 className="font-bold text-xl text-center">Hard</h2>
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper max-w-xs"
                  >
                    {ele.hard.map((list) => (
                      <SwiperSlide
                        className="p-5 space-y-4 leading-6"
                        style={{
                          height: "320px",
                          overflow: "scroll",
                          scrollbarWidth: "none",
                        }}
                      >
                        <p className="text-black font-bold text-lg">
                          {list.question}
                        </p>
                        <p>{list.solution}</p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default resources;
