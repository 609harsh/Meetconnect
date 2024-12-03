import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import Navbar from "../components/Navbar";
const data = [
  {
    id: "1",
    label: "HTML",
    easy: [
      {
        question: "What are void elements in HTML?",
        solution:
          "HTML elements which do not have closing tags or do not need to be closed are Void elements. For Example <br />, <img />, <hr />, etc.",
      },
      {
        question: "What is !DOCTYPE?",
        solution:
          "A doctype or document-type declaration is an instruction that tells the web browser about the markup language in which the current page is written. The doctype is not an element or tag, it lets the browser know about the version of or standard of HTML or any other markup language that is being used in the document",
      },
      {
        question: "What are elements and tags?",
        solution: `Tags are the starting and ending parts of an HTML element. They begin with < symbol and end with > symbol. Whatever is written inside < and > are called tags.\n Elements enclose the contents in between the tags. They consist of some kind of structure or expression. It generally consists of a start tag, content, and an end tag. `,
      },
      {
        question: "How are comments added in HTML?",
        solution:
          "The comment tag (<!– Comment –>) is used to insert comments in the HTML code.",
      },
    ],
    medium: [
      {
        question: "How can we include audio or video in a webpage?",
        solution:
          "HTML5 provides two tags: <audio> and <video> tags using which we can add the audio or video directly in the webpage.",
      },
      {
        question: "Explain the concept of web storage in HTML5.",
        solution: `This web storage helps in storing some of the static data in the local storage of the browser so that we do not need to fetch it from the server every time we need it. There is a size limit based on different browsers. This helps in decreasing the load time and a smooth user experience. There are two types of web storage that are used to store data locally in HTML5:\n
                  Local Storage - This helps in storing data that will be retained even though the user reopens the browser. It is stored for each webapp on different browsers.\n
                  Session Storage - This is used for one session only. After the user closes the browser this gets deleted.\n`,
      },
    ],
    hard: [
      {
        question: "What is Microdata in HTML5?",
        solution:
          "It is used to help extract data for site crawlers and search engines. It is basically a group of name-value pairs. The groups are called items, and each name-value pair is a property. Most of the search engines like Google, Microsoft, Yandex, etc follow schema.org vocabulary to extract this microdata.",
      },
      {
        question:
          "What is the difference between “display: none” and “visibility: hidden”, when used as attributes to the HTML element.",
        solution:
          "When we use the attribute “visibility: hidden” for an HTML element then that element will be hidden from the webpage but still takes up space. Whereas, if we use the “display: none” attribute for an HTML element then the element will be hidden, and also it won’t take up any space on the webpage take up any space on the webpag",
      },
    ],
  },
];

const Resources = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        {data.map((ele, idx) => {
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

export default Resources;
