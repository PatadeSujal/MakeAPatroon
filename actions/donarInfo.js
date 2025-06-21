"use server";
import Payment from "@/models/Payment";
import connectToDb from "@/lib/db";
import UserAccount from "@/models/UserAccount";



export const fetchUser = async(name) => {
    await connectToDb();
    console.log("username ",name);
    let user = await UserAccount.findOne({ username:name });
    console.log("user", user);
    return user ? user.toObject({ flattenObjectIds: true }) : null;
}

export const fetchPayments = async(username) => {
    await connectToDb();
    let payments = await Payment.find({to_user: username, done: true}).sort({ amount: -1 });

  
    // Return payments data as an array of plain objects
    return payments.map(payment => payment.toObject({flattenObjectIds: true}));
}

