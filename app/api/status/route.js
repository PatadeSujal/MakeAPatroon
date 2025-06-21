import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDb from "@/lib/db";
import Payment from "@/models/Payment";

const db = await connectToDb();
export async function POST(req) {
  const salt_key = process.env.NEXT_PUBLIC_SALT_KEY;
  const merchant_id = process.env.NEXT_PUBLIC_MERCHANT_ID;

  try {
    const params = req.nextUrl.searchParams;
    const transactionId = await params.get("id");
    console.log("transactionId ", transactionId);
    const st = `/pg/v1/status/${merchant_id}/${transactionId}` + salt_key;
    const dataSha256 = crypto.createHash("sha256").update(st).digest("hex");
    const checksum = dataSha256 + "###" + 1;

    const url =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/" +
      merchant_id +
      "/" +
      transactionId;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchant_id,
      },
    };

    console.log("st ", options);
    const response = await fetch(url, options);
    const data = await response.json();
    // const statusCode = data.code;
    console.log("Status code from PhonePe:", data);

    const initData = await Payment.findOne({ tid: transactionId });
    if (!initData) {
      return NextResponse("No Entry in Database", {
        status: 301,
      });
    }
    if (data.code === "PAYMENT_SUCCESS") {
      if (initData) {
        const updatedPayment = await Payment.findOneAndUpdate(
          { tid: transactionId },
          { $set: { done: true } },
          { new: true }
        );
        console.log("Data updated in database", updatedPayment);
      }
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        {
          status: 301,
        }
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`,
        {
          status: 301,
        }
      );
    }
  } catch (err) {
    console.error("Error in status route:", err);
    return NextResponse.json({ err: err }, { status: 500 });
  }
}
