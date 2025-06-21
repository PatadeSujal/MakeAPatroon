"use client"
import React from "react";
import { useState,useEffect } from "react";
import { fetchPayments } from "@/actions/donarInfo";
const DisplayPayments = ({username}) => {
//   const [currentUser,setCurrentUser] = useState();
  const [payments,setPayments] = useState([]);
  
  const getData = async() =>{
    //   let u = await fetchUser(username);
    //  setCurrentUser(u);
      let p = await fetchPayments(username);
      setPayments(p);
      // console.log/("Payments",p);
    }
    
    useEffect(() =>{
        getData();
    },[]);
   
console.log("payments",payments);
  return (
    <div className="w-full max-w-md  bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Doners
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
            {payments.map((payment) =>{
                return(

          <li className="py-3 sm:py-4" key={payment.tid}>
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  // src="/docs/images/people/profile-picture-1.jpg"
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {payment.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {payment.message}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    ₹{payment.amount}
              </div>
            </div>
          </li>
                );
            })}
          
        </ul>
      </div>
    </div>
  );
};

export default DisplayPayments;
