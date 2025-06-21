import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import connectToDb from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req) {
  try {
    await connectToDb();
    const session = await getServerSession(authOptions);

    console.log(session);
    const res = await req.json();
    const payload = {
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      merchantTransactionId: res.transactionId,
      name: res.name,
      amount: res.amount * 100,
      message: res.message,
      redirectUrl: `http://localhost:3000/api/status/?id=${res.transactionId}`,
      callbackUrl: `http://localhost:3000/api/status/?id=${res.transactionId}`,
      redirectMode: "POST",
      mobileNumber: res.mobileNo,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    if (payload) {
      await Payment.create({
        name: res.name,
        to_user: res.to_user,
        tid: payload.merchantTransactionId,
        message: res.message,
        amount: res.amount,
        done: false,
      });
      console.log("Initial Entry created");
    }

    console.log("payload", payload);
    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = crypto
      .createHash("sha256")
      .update(fullURL)
      .digest("hex");

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const UAT_PAY_API_URL = `${process.env.NEXT_PUBLIC_PHONE_PAY_HOST_URL}/pg/v1/pay`;

    const options = {
      method: "POST",
      url: UAT_PAY_API_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: dataBase64,
      },
    };

    const response = await axios(options);
    console.log(response);
    console.log("url", response.data.data.instrumentResponse.redirectInfo.url);
    return NextResponse.json(
      response.data.data.instrumentResponse.redirectInfo.url
    );
  } catch (err) {
    return NextResponse.json({
      err: err,
    });
  }
}
