import React from "react";

const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60%] p-8 bg-gray-100 dark:bg-gray-900 mt-8 gap-8">
      <div className="title text-3xl">Your Fans Can By You A Tea</div>
      <div className="container flex justify-evenly">
        <div className="item1 w-[30%] flex justify-between items-center">
          <div className="item-title flex justify-center text-center items-center flex-col">
            <h1 className="text-2xl">Fans Want to Help</h1>
            <p>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
        <div className="item2 w-[30%] flex justify-center items-center">
          <div className="img2">
            {/* <img src="" alt="" srcset="" /> */}
          </div>
          <div className=" item-title flex justify-center items-center text-center flex-col">
            <h1 className="text-2xl">GetMeATea</h1>
            <p>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
        <div className="item3 w-[30%] flex justify-center items-center">
          <div className="img3">
            {/* <img src="" alt="" srcset="" /> */}
          </div>
          <div className="item-title flex justify-center items-center text-center flex-col">
            <h1 className="text-2xl">GetMeATea</h1>
            <p>
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
