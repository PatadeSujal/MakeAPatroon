"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PaymentForm =  ({accHoldername}) => {

  // const [pay,setPay] = useState(false);

  const { data: session } = useSession();
  let nameRef = useRef(null);
  let messageRef = useRef(null);
  let amountRef = useRef(null);

  const router = useRouter();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const message = messageRef.current.value;
    const amount = amountRef.current.value;
    const mobileNo = "8806437844";
    const data = {
      name,
      message,
      amount,
      mobileNo,
      to_user:accHoldername,
      transactionId: "T" + Date.now(),
      MUID: "M" + Date.now(),
    };

    try {
      const res = await axios.post("http://localhost:3000/api/payments", data);
      console.log("response ", res.data);
      // Assuming the API returns a URL in res.data.url
      router.push(res.data);
    } catch (error) {
      console.log(error + " to send request");
    }
  };

  const payAmount = (ruppes) =>{
    amountRef.current.value = ruppes;
    handleOnSubmit();
  }
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="max-w-sm mx-auto" onSubmit={handleOnSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              ref={nameRef}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="John Doe"
             defaultValue={session?.user?.name || ""}
             
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>
            <input
              type="text"
              ref={messageRef}
              id="password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Type Your Message here..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>
            <input
              ref={amountRef}
              id="repeat-password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="Ex. $100"
              required
            />
            <div className="or flex justify-center my-5 flex-col gap-5">
              <span className="text-center">OR</span>
              <div className="amount-btn flex justify-center items-center flex-wrap ">
                <button onClick={(e) => { e.preventDefault(); payAmount(10); }} className={`  "cursor-not-allowed" : ""} relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`}>
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    ₹10
                  </span>
                </button>
                <button onClick={(e) => { e.preventDefault(); payAmount(100); }} className={`  "cursor-not-allowed" : ""} relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800`}>
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    ₹100
                  </span>
                </button>
                <button onClick={(e) => { e.preventDefault(); payAmount(1000); }} className={`  "cursor-not-allowed" : ""}relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800`}>
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    ₹1000
                  </span>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={` text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 `}

          >
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
