import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import Navbar from "../components/Navbar";
import { useFetchResourcesQuery } from "../redux/ApiSlice/publicApi";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const resources = () => {
  const { data, isFetching, isError } = useFetchResourcesQuery();
  if (isError) {
    toast.error("Error Fetching Data");
    return;
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        {isFetching ? (
          <Loader />
        ) : (
          data?.map((ele, idx) => {
            return (
              <div key={ele.id + "" + idx}>
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
                        <div key={idx + "" + list.id}>
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
                        </div>
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
                        <div key={idx + "" + list.id}>
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
                        </div>
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
                      {ele.hard.map((list, idx) => (
                        <div key={idx + "" + list.id}>
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
                        </div>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default resources;
