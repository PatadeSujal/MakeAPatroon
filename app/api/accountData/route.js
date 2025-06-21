import { NextResponse } from "next/server";
import UserAccount from "@/models/UserAccount";
import connectToDb from "@/lib/db";
export async function POST(req) {
    try {
        let res = await req.json();
        const data = {
            username: res.username,
            email: res.email,
            profilePic: res.profilepic, // Ensure this matches the incoming JSON key
            coverPic: res.coverpic, 
            paynumber: res.paynumber,
            description: res.description,
        }
        console.log("server",data);
        if (data) {
            console.log("data",data.coverPic);
            await connectToDb();
            await UserAccount.create(data);
            console.log("User data created successfully");
        }
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Error occurred",err });
    }
}   