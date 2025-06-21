"use client";

import PaymentForm from "../components/PaymentForm";
import { useParams } from "next/navigation";

import DisplayPayments from "../components/DisplayPayments";
import { useEffect, useState } from "react";
import { fetchUser } from "@/actions/donarInfo";
const Username = () => {
  const [currentUser,setCurrentUser] = useState([]);

  
  const params = useParams();
  let accHoldername = params.username;
  
  const getData = async () =>{
    let cu = await fetchUser(accHoldername);
    setCurrentUser(cu);
    console.log("Current User",currentUser);
  }
  useEffect(() =>{
    getData();
  },[accHoldername])
  console.log("current user ",currentUser);
  
  return (
    <>
      <div className="w-full h-[68vh] relative">
        <div className="banner">
          <img className="w-full h-48 md:h-64 object-cover" src={currentUser.coverPic} alt="" />
        </div>
        <div className="profile-img bg-amber-50 rounded-full flex justify-center absolute -bottom-1 left-1/2 transform -translate-x-1/2 size-32 md:size-40 border-4 border-white shadow-lg">
          <img
            className="rounded-full border border-black object-cover w-full h-full"
            src={currentUser.profilePic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex flex-col items-center mt-14 md:mt-8">
        <h1 className="text-xl md:text-2xl font-bold">{currentUser.username}</h1>
        <p className="text-slate-400 text-center px-4">{currentUser.description}</p>
      </div>

      <div className="donations-payments flex flex-wrap md:flex-nowrap w-[95%] md:w-[80%] justify-center my-10 gap-5 mx-auto">
        <div className=" md:w-1/2 flex justify-center p-5">
          <DisplayPayments username={accHoldername} />
        </div>

        <div className="payment  md:w-1/2 flex justify-center p-5">
          <PaymentForm accHoldername={accHoldername} />
        </div>
      </div>
    </>
  );
};

export default Username;
