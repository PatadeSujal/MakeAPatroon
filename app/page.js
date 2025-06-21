import Intro from "./components/Intro";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen  bg-gray-100 dark:bg-gray-900 mt-8 ">
        <div className="w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-1.5 items-center justify-center ">
          <a href="#">
            <h5 className="mb-2 text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              GetMeATea
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 text-4xl dark:text-gray-400 text-center">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <div className="buttons flex items-center justify-center gap-3">
            <button className="relative inline-flex items-center justify-center p-0 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Read More
              </span>
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Start Here
            </button>
          </div>
        </div>
      </div>
      <Intro/>
    </>
  );
}
