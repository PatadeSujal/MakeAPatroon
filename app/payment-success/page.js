import Link from "next/link";
import React from "react";

const SuccessPayment = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="paymentSuccess bg-green-600 w-[30%] flex flex-col rounded-2xl gap-7 justify-center items-center h-[140px]">
        <div className="title text-white text-2xl">Payment Successfull</div>
        <div className="para text-white hover:text-blue-600  hover:cursor-pointer">
          <Link href="/">
            {" "}
            <i>Back to Home</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
